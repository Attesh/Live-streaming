<template>
  <div class="guest-header">
    <div class="guest-header-alignment">
      <div class="heading-menu-btn">
        <img @click="sendValueToParent" class="sidemenuicon" src="@assets/hamburger-menu-icon-png-white-10.jpg"/>
        <img :class="{ 'hideclose': sidemenuicon === 'hide' }" @click="hidesidemenu" class="clonsepng" src="@assets/close.png"/>
        <div class="home-search-field">
          <img src="@assets/featured-athlete/search-normal.svg" alt="" srcset=""/>
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div class="guest-header-subimges" v-if="!user">
        <router-link class="home-signup" :to="{ name:'register' }"> Sign Up </router-link>
        <router-link class="home-signup" :to="{ name:'login' }"> Sign In </router-link>
      </div>
      <div class="guest-header-subimges" v-else>
        <img class="golive" src="@assets/Button-live.png" />
        <img class="guest-header-subimges-img" src="@assets/Frame-162477.png" />
        <img class="guest-header-subimges-img" src="@assets/Frame-162472.png" />
        <div class="calender-user-profile">
          <img class="calender-user-avatar" src="@assets/calender/william-avatar.svg" alt="User Avatar" srcset="" />
          <p class="calender-user-name">{{ user.name }}</p>
          <img class="calender-dropdown-icon" src="@assets/calender/chevron-down.svg" alt="Dropdown Icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .sidemenuicon{
    width: 40px;
  }
  .clonsepng{
    width: 35px;
    position: absolute;
    top: 5px;
    left: 340px;
  }
</style>

<script>
export default {
  data() {
    return {
      user: null,
      sidemenuicon: "hide",
    };
  },
  methods: {
    sendValueToParent() {
      const valueToSend = 'show';
      this.$emit('sendValue', valueToSend);
      this.sidemenuicon = "show";
    },
    hideSidemenu() {
      const valueToSend = 'hide';
      this.$emit('sendValue', valueToSend);
      this.sidemenuicon = "hide";
    },
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user'));

  },
};
</script>

