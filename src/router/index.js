
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@components/HomePage.vue';
import OrderList from '@components/OrderList.vue';
import ViewOrder from '@components/ViewOrder.vue';
import ShortsComponent from '@components/ShortsComponent.vue';
import Login from '@components/Login.vue';
import Register from '@components/Register.vue';
import ForgotPassword from '@components/globals/costacaster/ForgotPassword.vue';
import VerificationCode from '@components/globals/costacaster/VerificationCode.vue';
import Packages from '@components/Packages.vue';
import CostacastorDashboard from '@components/globals/costacaster/Dashboard.vue';
import Calender from '@components/globals/costacaster/Calender.vue';
import GuestShop from '@components/globals/guest/GuestShop.vue';
import ProductDetail from '@components/ProductDetail.vue';
import GuestShopCart from '@components/globals/guest/GuestShopCart.vue';
import About from '@components/About.vue';
import GuestDetailstream from '@components/globals/guest/GuestDetailstream.vue';
import GuestSearchResult from '@components/globals/guest/GuestSearchResult.vue';
import MainShop from '@components/MainShop.vue';
import Featured from '@components/Featured.vue';
import CorsacasterHome from '@components/globals/costacaster/CorsacasterHome.vue';
import Corsacasterprofile from '@components/globals/costacaster/Corsacasterprofile.vue';
import CorsacasterChangePassword from '@components/globals/costacaster/CorsacasterChangePassword.vue';
import CorsacasterShorts from '@components/globals/costacaster/Corsacastershorts.vue';
import GuestPayment from '@components/globals/guest/GuestPayment.vue';
import livestream from '@components/globals/costacaster/livestream.vue';
import Notification from '@components/Notification.vue';
import CorsacasterChat from '@components/globals/costacaster/Corsacasterchat.vue';
import corsacasterupload from '@components/globals/costacaster/Corsacasterupload.vue';
import CorsacasterContantType from '@components/globals/costacaster/ContentType.vue';
import UploadDetail from '@components/UploadDetail.vue';
import AtheleteHome from '@components/globals/athelete/AtheleteHome.vue';
import AtheleteFeatured from '@components/globals/athelete/AtheleteFeatured.vue';
import AtheleteShorts from '@components/globals/athelete/AtheleteShorts.vue';
import AtheleteAbout from '@components/globals/athelete/AtheleteAbout.vue';
import AtheleteProfile from '@components/globals/athelete/AtheleteProfile.vue';
import AtheleteChangePassword from '@components/globals/athelete/AtheleteChangePassword.vue';
import VedioElement from '@components/VedioElement';
import VideoFunction from '@components/VideoFunction';
import Visibility from '@components/Visibility';
import FanHome from '@components/globals/fan/FanHome.vue';
import FanProfile from '@components/globals/fan/FanProfile.vue';
import FanChangePassword from '@components/globals/fan/FanChangePassword.vue';
import FanComment from '@components/globals/fan/FanComment.vue';
import FanUploadVideo from '@components/globals/fan/FanUploadVideo.vue';
import LiveComments from '@components/LiveComments.vue';
import StreamVideo from '@components/StreamVideo.vue';
import UserProfilePage from '@components/globals/user-profile/UserProfilePage.vue';
import EventDetail from '@components/EventDetail.vue';
import AddProduct from '@components/AddProduct.vue';
import EditLeaderboard from '@components/EditLeaderboard.vue';
import LeaderboardFolder from '@components/LeaderboardFolder.vue';
import CorsacasterRoster from '@components/globals/costacaster/CorsacasterRoster.vue';




const router = createRouter({
  history: createWebHistory(),
  routes: [

    {
      path: '/livestream',///done///////
      name: 'livestream',
      component: livestream,
      meta: { requiresAuth: false },
    },
    {
      path: '/event-detail/:id',///done///////
      name: 'event-detail',
      component: EventDetail,
      meta: { requiresAuth: false },
    },
    {
      path: '/user-profile/:id',///done///////
      name: 'userprofile',
      component: UserProfilePage,
      meta: { requiresAuth: false },
    },
    {
      path: '/video-detail/:id',///done///////
      name: 'video-detail',
      component: LiveComments,
      meta: { requiresAuth: false },
    },
    {
      path: '/live-video/:id',///done///////
      name: 'live-video',
      component: StreamVideo,
      meta: { requiresAuth: false },
    },
    
    {
      path: '/Notification',///done///////
      name: 'Notification',
      component: Notification,
      meta: { requiresAuth: false },
    },


    {
      path: '/dashboard',///done///////
      name: 'dashboard',
      component: CostacastorDashboard,
      meta: { requiresAuth: false },
    },

    {
      path: '/mainshop',
      name: 'mainshop',
      component: MainShop,
      meta: { requiresAuth: false },
    },

    // {
    //   path: '/packages',
    //   name: 'packages',
    //   component: Packages,
    //   meta: { requiresAuth: true },
    // },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresAuth: false, page: 'login' }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { requiresAuth: false, page: 'register' }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword,
      meta: { requiresAuth: false, page: 'forgot-password' }
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: VerificationCode,
      meta: { requiresAuth: false, page: 'reset-password' }
    },
    {
      path: '/auth/:provider/callback',
      name: "socaillogingoogle",
      component: Login,
    }
    // Rehman pages below this////////////////////////////////////////////////////////////////////////

    , {
      path: '/upload',
      name: 'upload',
      component: corsacasterupload,
      meta: { requiresAuth: false },
    },
    {
      path: '/chat',
      name: 'chat',
      component: CorsacasterChat,
      meta: { requiresAuth: false },
    },
    {
      path: '/upload-detail',
      name: 'upload-detail',
      component: UploadDetail,
      meta: { requiresAuth: false },
    },
    {
      path: '/video-element',
      name: 'video-element',
      component: VedioElement,
      meta: { requiresAuth: false },
    },
    {
      path: '/VideoFunction',
      name: 'VideoFunction',
      component: VideoFunction,
      meta: { requiresAuth: false },
    },
    
    {
      path: '/Visibility',
      name: 'Visibility',
      component: Visibility,
      meta: { requiresAuth: false },
    },
    {
      path: '/ShortsComponent',
      name: 'ShortsComponent',
      component: ShortsComponent,
      meta: { requiresAuth: false },
    },
    {
      path: '/add-product',
      name: 'add-product',
      component: AddProduct,
      meta: { requiresAuth: false },
      meta: { requiresAuth: true, role: 'athelete' },
    },
    // Rehman pages below this////////////////////////////////////////////////////////////////////////



    ////Fan Final//////////////////////////////////////////////////////
    {
      path: '/fan-home',///done///////
      name: 'fan-home',
      component: FanHome,
      meta: { requiresAuth: true, role: 'fan' },
    },
    {
      path: '/fan-profile',///done///////
      name: 'fan-profile',
      component: FanProfile,
      meta: { requiresAuth: true, role: 'fan' },
    },
    {
      path: '/fan-change-password',///done///////
      name: 'fan-change-password',
      component: FanChangePassword,
      meta: { requiresAuth: true, role: 'fan' },
    },
    {
      path: '/fan-upload-video',///done///////
      name: 'fan-upload-video',
      component: FanUploadVideo,
      meta: { requiresAuth: true, role: 'fan' },
    },
    {
      path: '/fan-comment',///done///////
      name: 'fan-comment',
      component: FanComment,
      meta: { requiresAuth: true, role: 'fan' },
    },
    ////Fan Final//////////////////////////////////////////////////////



    ////Athelete Final//////////////////////////////////////////////////////
    {
      path: '/athelete-home',///done///////
      name: 'athelete-home',
      component: AtheleteHome,
      meta: { requiresAuth: true, role: 'athelete' },
    },
    {
      path: '/athelete-profile',///done///////
      name: 'athelete-profile',
      component: AtheleteProfile,
      meta: { requiresAuth: true, role: 'athelete' },
    },
    {
      path: '/athelete-change-password',///done///////
      name: 'athelete-change-password',
      component: AtheleteChangePassword,
      meta: { requiresAuth: true, role: 'athelete' },
    },
    ////Athelete Final//////////////////////////////////////////////////////

    //corsacaster Role final///////////////////////////
    , {
      path: '/corsacaster-home',///done///////
      name: 'corsacaster-home',
      component: CorsacasterHome,
      meta: { requiresAuth: true, role: 'corsacaster' },
    },
    {
      path: '/corsacaster-profile',///done///////
      name: 'corsacaster-profile',
      component: Corsacasterprofile,
      meta: { requiresAuth: true, role: 'corsacaster' },
    },
    {
      path: '/featured',///done///////
      name: 'featured',
      component: Featured,
      meta: { requiresAuth: true, role: 'corsacaster' },
    },
    {
      path: '/shorts',///done///////
      name: 'shorts',
      component: CorsacasterShorts,
      meta: { requiresAuth: true },
    },
    {
      path: '/corsacaster-change-password',///done///////
      name: 'corsacaster-change-password',
      component: CorsacasterChangePassword,
      meta: { requiresAuth: true, role: 'corsacaster' },
    },
    {
      path: '/corsacaster-content',
      name: 'corsacaster-content',
      component: CorsacasterContantType,
      meta: { requiresAuth: true, role: 'corsacaster' },
    },
    {
      path: '/corsacaster-roster',
      name: 'corsacaster-roster',
      component: CorsacasterRoster,
      meta: { requiresAuth: true, role: 'corsacaster' },
    },
    {
      path: '/leader-board',///done///////
      name: 'leader-board',
      component: GuestDetailstream,
      meta: { requiresAuth: true, role: 'corsacaster' },
    },
    {
      path: '/edit-leader-board',///done///////
      name: 'edit-leader-board',
      component: EditLeaderboard,
      meta: { requiresAuth: true, role: 'corsacaster' },
    },
    {
      path: '/leader-board-folder',///done///////
      name: 'leader-board-folder',
      component: LeaderboardFolder,
      meta: { requiresAuth: true, role: 'corsacaster' },
    },
    //corsacaster Role final///////////////////////////

    // guest Role final////////////////////////////////
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: false },
    },
    {
      path: '/shop',///done///////
      name: 'shop',
      component: GuestShop,
      meta: { requiresAuth: false },
    },
    {
      path: '/product-detail/:productId',
      name: 'product-detail',
      component: ProductDetail,
      meta: { requiresAuth: false },
    },
    {
      path: '/cart',
      name: 'cart',
      component: GuestShopCart,
      meta: { requiresAuth: false },
    },
    , {
      path: '/payment',  ///done///////
      name: 'payment',
      component: GuestPayment,
      meta: { requiresAuth: false },
    },
    , {
      path: '/guest-search-result',  ///done///////
      name: 'guest-search-result',
      component: GuestSearchResult,
      meta: { requiresAuth: false },
    },
    , {
      path: '/about',
      name: 'about',
      component: About,
      meta: { requiresAuth: false },
    },
    {
      path: '/calendar',///done///////
      name: 'calendar',
      component: Calender,
      meta: { requiresAuth: false },
    },
    {
      path: '/guest-profile',///done///////
      name: 'guest-profile',
      component: FanProfile,
      meta: { requiresAuth: true, role: 'guest' },
    },
    {
      path: '/guest-change-password',///done///////
      name: 'guest-change-password',
      component: FanChangePassword,
      meta: { requiresAuth: true, role: 'guest' },
    },
    {
      path: '/order-list',///done///////
      name: 'orderList',
      component: OrderList,
      meta: { requiresAuth: true, },
    },
    {
      path: '/view-order/:id',///done///////
      name: 'ViewOrder',
      component: ViewOrder,
      meta: { requiresAuth: true, },
    },

    //guest Role final////////////////////////////////////////
  ]
});

router.beforeEach(async (to, from, next) => {
  await checkAuthenticationPages(to.meta.page, next);
  if (to.meta.requiresAuth) {
    try {
      // Use a separate async function to handle authentication check
      const isAuthenticated = await checkAuthentication();

      if (isAuthenticated) {
        await redirectUserAccordingToItsRole(to.meta.role, next);
      } else {
        next('/login');
      }
    } catch (error) {
      console.error('Error while checking authentication:', error);
      next('/login'); // Redirect to the login page on error
    }
  } else {
    next();
  }
});

async function checkAuthentication() {
  // Implement your authentication check logic here
  const token = localStorage.getItem('authToken');
  if (token) {
    // Successful authentication
    return true;
  } else {
    // Authentication failed
    return false;
  }
}

async function redirectUserAccordingToItsRole(role, next) {
  const user = JSON.parse(localStorage.getItem('user'))
  if (role) {
    if (role == user.role) {
      next();
    } else {
      next('/dashboard');
    }
  } else {
    next();
  }
}

async function checkAuthenticationPages(page, next) {
  const arrayOfAuthenticatedPages = ['login', 'register', 'forgot-password', 'reset-password'];
  if (page && arrayOfAuthenticatedPages.includes(page)) {
    const isAuthenticated = await checkAuthentication();
    if (isAuthenticated) {
      next('/dashboard')
    } else {
      next();
    }
  }
}

export default router