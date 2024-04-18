<template>
  <div class="guest-header">
    <div class="guest-header-alignment">
      <div class="amp-side">
        <img @click="sendValueToParent" class="sidemenuicon" src="@assets/hamburger-menu-icon-png-white-10.jpg" />
        <img :class="{ 'hideclose': sidemenuicon === 'hide' }" @click="hidesidemenu" class="clonsepng"
          src="@assets/close.png" />
        <div class="guest-header-home-search-field">
          <img src="@assets/featured-athlete/search-normal.svg" alt="" srcset="" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div class="guest-header-subimges" v-if="!user.value">
        <router-link class="home-signup" :to="{ name: 'register' }"> Sign Up </router-link>
        <router-link class="home-signup" :to="{ name: 'login' }"> Sign In </router-link>
      </div>

      <div class="guest-header-subimages-main" v-else>
        <div class="header-icon">
          <div class="dropdown" v-if="user.value && (user.value.role != 'guest' && user.value.role != 'fan')">
            <!-- Button to trigger the dropdown -->
            <img class="dropdown-button" src="@assets/pointer.png" alt="">

            <!-- Dropdown content -->
            <div class="dropdown-content">
              <!-- Dropdown items -->
              <a href="#">Message</a>
              <a href="#">Upload</a>
              <a href="#">Go Live</a>
              <a href="#">Notification</a>

            </div>
          </div>
        </div>
        <div class="guest-header-subimges">
          <router-link :to="{ name: 'chat' }">
            <div class="header-upload">
              <img class=" " src="@assets/msg.png">
            </div>
          </router-link>
          <div class="dropdown">
            <div>

              <div class="header-upload">
                <img src="@assets/headv.png">
              </div>

            </div>
            <div class="dropdown-content" id="myDropdown">
              <router-link :to="{ name: 'upload' }" style="  text-decoration: none;  
                  cursor: pointer;">Upload</router-link>
              <router-link :to="{ name: 'VideoFunction' }" v-if=" this.user.value.role == 'corsacaster' " style="  text-decoration: none;  
              cursor: pointer;">Go live
              </router-link>
            </div>
          </div>
          <div class="header-upload" @click="toggleNotification">
            <img src="@assets/notifimg.png" />
            <span >
              {{ countnotification }}
            </span>
          </div>
          <NotificationComponent v-if="showNotification" @toggleNotification="toggleNotification" />
        </div>
        <div class="dropdown">
          <div style="display: flex;align-items: center;gap: 20px; width: 200px;" v-if="this.user.value.role !='admin'">
            <div style="display: flex;align-items: center ;gap: 11px;" v-if="this.user.value.role !='guest'">
              <router-link :to="{ name: `${this.user.value.role}-home` }">
                <img class="guest-header-subimges-img" src="@assets/avatar.jpg" alt="">
              </router-link>
              <router-link class="header-user-name" :to="{ name: `${this.user.value.role}-home` }">
                <p>
                  {{
                  this.user.value.name }}</p>
              </router-link>
            </div>
            <div v-else style="display: flex;
            align-items: center;
            gap: 11px;">
              <router-link :to="{ name: `home` }">
                <img class="guest-header-subimges-img" src="@assets/avatar.jpg" alt="">
              </router-link>
              <router-link :to="{ name: `home` }">
                <p style="color: #fff; font-weight: bold; text-decoration: none;  "> {{ this.user.value.name }}</p>
              </router-link>
            </div>

            <img style="width: 16px;" src="@assets/Vector-2.png" alt="Image" id="dropdown-btn">
          </div>
          <div class="dropdown-content" id="myDropdown" v-if="this.user.value.role !='admin'">
            <router-link style="  text-decoration: none;  
            cursor: pointer;" :to="{ name: `${this.user.value.role}-profile` }" v-if="user.value"> Account
            </router-link>
            <router-link :to="{ name: `login` }" style="  text-decoration: none;  
            cursor: pointer;">Add Profile
            </router-link>
            <router-link :to="{ name: 'orderList' }" style="  text-decoration: none;  
            cursor: pointer;">My Orders
            </router-link>
            <router-link style="  text-decoration: none;  
                cursor: pointer;" :to="{ name: `${this.user.value.role}-change-password` }" v-if="user.value">Change
              Password</router-link>
            <a @click="showLogoutModal" href="#" v-if="user.value">Logout</a>
            <div class="dark-mode-container">
              <div class="dark-mode">Dark Mode</div>
              <div><label class="switch">
                  <input type="checkbox">
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="custom-modal" v-if="isLogoutModalVisible">
    <div class="modal-content">
      <p>Are you sure you want to log out?</p>
      <button @click="logout">Yes</button>
      <button @click="closeLogoutModal">No</button>
    </div>
  </div>
</template>
<style></style>
<script>
  import { defineComponent, ref } from 'vue';
  import NotificationComponent from '@components/globals/costacaster/Notificationpopup.vue';
  import 'vue3-toastify/dist/index.css';
  import { toast } from 'vue3-toastify';
  import Vue from 'vue';
  import { useRouter } from 'vue-router';
  import { fetchData } from '@services/base.js'

  export default defineComponent({
    components: {
      NotificationComponent,
    },
    data() {
      return {
        showNotification: false,
        countnotification: 0,
      };
    },
    mounted() {

      this.CountData();
    },
    methods: {
      toggleNotification() {
        this.showNotification = !this.showNotification;
      },
      async CountData() {
        const endpoint = '/get-my-unseen-notification-count';
        try {
          const response = await fetchData(endpoint);
          // Update countnotification with the fetched data
          console.log(response)
          this.countnotification = response.data.data;
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      },
    },
    setup(props, { emit }) {
      const router = useRouter();
      const user = ref({}); // Create a ref for user data
      const sidemenuicon = ref("hide"); // Create a ref for sidemenuicon
      const isLogoutModalVisible = ref(false); // Create a ref for the logout modal visibility

      const sendValueToParent = () => {
        const valueToSend = 'show';
        emit('sendValue', valueToSend);
        sidemenuicon.value = "show";
      };

      const hidesidemenu = () => {
        const valueToSend = 'hide';
        emit('sendValue', valueToSend);
        sidemenuicon.value = "hide";
      };

      const showLogoutModal = () => {
        isLogoutModalVisible.value = true;
      };

      const closeLogoutModal = () => {
        isLogoutModalVisible.value = false;
      };

      const logout = () => {
        closeLogoutModal();
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        toast.success("Logout Successfully", {
          autoClose: 1000,
        });
        let props = router.resolve({
          name: 'home',
        });
        setTimeout(() => window.location.href = props.href, 3000);
      };

      return {
        user,
        sidemenuicon,
        isLogoutModalVisible,
        sendValueToParent,
        hidesidemenu,
        showLogoutModal,
        closeLogoutModal,
        logout,
      };
    },

    created() {
      this.user.value = JSON.parse(localStorage.getItem('user') || null);
    },


  });
</script>