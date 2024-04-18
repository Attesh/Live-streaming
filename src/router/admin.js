import { createRouter, createWebHistory } from 'vue-router';
import AdminLayout from '@components/admin/layout/Layout.vue';
import AdminDashboard from '@components/admin/Dashboard.vue';
import AdminUsers from '@components/admin/Users.vue';
import AdminUsersList from '@components/admin/User/Index.vue';
import AdminLogin from '@components/admin/Login.vue';

const adminRoutes = [
  {
    path: '/admin',
    component: AdminLayout,
    meta: {
      requiresAuth: true,
      isAdmin: true,
    }, // Use the AdminLayout for admin routes
    children: [
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: AdminDashboard,
        meta: {
          requiresAuth: true,
          isAdmin: true,
          role: 'admin', // Set the role if applicable
          page: 'dashboard', // Set the page if applicable
        },
      },
      // {
      //   path: 'users',
      //   name: 'admin-users',
      //   component: AdminUsers,
      //   meta: { requiresAuth: true, role: 'admin', isAdmin: true },
      // },
      {
        path: 'users',
        name: 'admin-users',
        component: AdminUsersList,
        meta: { requiresAuth: true, role: 'admin', isAdmin: true },
      },
      {
        path: 'login',
        name: 'admin-login',
        component: AdminLogin,
        meta: { requiresAuth: false, role: 'admin', isAdmin: true },
      },
      // Add more admin routes here
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: adminRoutes, // Corrected: use `routes` property instead of `adminRoutes`
});

router.beforeEach(async (to, from, next) => {
  const matchedRoute = to.matched.find(route => route.meta);
  if (matchedRoute && matchedRoute.meta) {
    const meta = matchedRoute.meta;

    if (meta.requiresAuth) {
      try {
        const isAuthenticated = await checkAuthentication();

        if (isAuthenticated) {
          // console.log(meta.role);
          await redirectUserAccordingToItsRole('admin',to, next);
        } else {
          // console.log('User not authenticated. Redirecting to login.');
          if (to.path !== '/admin/login') {
            // Add a condition to avoid infinite redirection
            next('/admin/login');
          } else {
            // If already on the login page, proceed to avoid the loop
            next();
          }
        }
      } catch (error) {
        // console.log('Error while checking authentication:', error);
        next('/admin/dashboard');
      }
    } else {
      // console.log('No authentication required');
      next();
    }
  } else {
    // console.log('No matched routes with meta information');
    next();
  }
});




async function checkAuthentication() {
  // Implement your authentication check logic here
  const token = localStorage.getItem('admin-token');
  return !!token; // Convert to boolean
}

async function redirectUserAccordingToItsRole(role,to, next) {
  const user = JSON.parse(localStorage.getItem('user'));
  // console.log(user.role,user,role);
  // console.log(to);
  if (role && role === user.role) {
  
      next();
  } else {
    if (to.name !== 'admin-dashboard') {
      next({ name: 'admin-dashboard' });
    } else {
      next();
    }
  }
}



export default router;
