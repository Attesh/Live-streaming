<template>
  <section class="main-guest-section">
    <SideBar @updateValue="updateValueFromHeader"></SideBar>
    <section :class="valueFromHeader ? 'sidebar-section' : 'sidebar-section1' ">
      <GuestHeader @sendValue="updateValueFromHeader"></GuestHeader>

      <CategoryList></CategoryList>

      <div style="height: 160px; display: flex;
align-items: center;">
        <div class="story-list">
          <ul>
            <li class="story-item active">
              <img src="@assets/featured-athlete/user.png" alt="" />
            </li>

            <li class="story-item active">
              <img src="@assets/featured-athlete/userstory.png" alt="" />
            </li>
            <li class="story-item active">
              <img src="@assets/featured-athlete/user.png" alt="" />
            </li>
            <li class="story-item active">
              <img src="@assets/featured-athlete/userstory.png" alt="" />
            </li>
            <li class="story-item active">
              <img src="@assets/featured-athlete/user.png" alt="" />
            </li>
            <li class="story-item active">
              <img src="@assets/featured-athlete/userstory.png" alt="" />
            </li>
            <li class="story-item active">
              <img src="@assets/featured-athlete/user.png" alt="" />
            </li>
            <li class="story-item active">
              <img src="@assets/featured-athlete/userstory.png" alt="" />
            </li>
            <li class="story-item active">
              <img src="@assets/featured-athlete/user.png" alt="" />
            </li>
            <li class="story-item active">
              <img src="@assets/featured-athlete/userstory.png" alt="" />
            </li>
            <li class="story-item active">
              <img src="@assets/featured-athlete/user.png" alt="" />
            </li>

          </ul>
        </div>
      </div>
      <!-- <Slider></Slider> -->
      <div style="position: relative;">

        <div class="video-container" style="height: 20%; border: 1px solid grey;width: 90%; margin-left: 50px;">
          <video ref="videoPlayer" class="video" @click="togglePlay">
            <source :src="require('@/assets/video.mp4')" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

        </div>
        <!-- <router-link :to="{  name: 'video-detail/' + item.id } "> -->
        <div class="main-box-videos">
          <h2>Bronze To Radiant In One Stream! 🔥</h2>
          <div class="btn-tagss">
            <button>FPS</button>
            <button>Gaming</button>
            <button>Shooter</button>
          </div>
          <div class="main-videos-profile-flex">
            <img class="video-profile-img" src="@assets/Profile-1.png" />
            <p class="video-profile-name">Shroud</p>
          </div>
        </div>
        <!-- </router-link> -->


      </div>
      <!--  -->
   



<div>
    <div class="guest-page-navigation-tatle">
      <h1>LIVE Videos</h1>
      <!-- <button>See All</button> -->
    </div>
    <div class="main-videos-box">
      <div v-for="room in roomsData" :key="room" class="main-video-box">
    <div class="video-image-box">
      <span>Live</span><!-- Bind the image URL dynamically -->
      <router-link :to="{ name: 'live-video', params: { id: room } }">
        <img src="https://costacaster-backend.instantsolutionslab.site/video/images/17115684415417.png" alt="Video Thumbnail">
      </router-link>
    </div>
    <div class="main-box-video">
      <h2>taha video</h2>
      <div class="main-video-profile-flex">
        <img class="video-profile-img" src="https://picsum.photos/200/300" alt="Profile Image">
        <p class="video-profile-name">taha huhu</p>
      </div>
    </div>
  </div>

    </div>
  </div>


<!--  -->
     <TopVideos></TopVideos>
      <RecentVideos></RecentVideos>
    </section>
  </section>

  <Footer></Footer>
</template>

<script>
  import CategoryList from '@components/globals/costacaster/CategoryList.vue';
  import RecentVideos from '@components/globals/costacaster/RecentVideos.vue';
  import TopVideos from '@components/globals/costacaster/TopVideos.vue';
  import GuestHeader from '@components/globals/guest/GuestHeader.vue';
  import SideBar from '@components/globals/costacaster/SideBar.vue';
  import { ref } from 'vue';
  import Slider from '@components/globals/costacaster/Slider.vue';
  import Footer from '@components/globals/costacaster/Footer.vue';
  import VueRouter from 'vue-router';
  import { postData, fetchData } from '@services/base.js';
  import io from 'socket.io-client';

  export default {
    components: {
      GuestHeader,
      SideBar,
      CategoryList,
      Slider,
      Footer,
      RecentVideos,
      TopVideos,
      
    },
    data() {
      return {
        valueFromHeader: true,
        seekingDisabled: false,
        isPlaying: false,
        response: {},
        videos: [],
        roomsData: [], // Array to store room IDs
      }
    },
    mounted() {
      // Fetch videos when the component is mounted
      this.fetchVideos();

    // Connect to socket.io server
    this.socket = io('http://localhost:5000');
    this.socket.on('connect', () => {
            console.log('Connected to Socket.IO server');
            });


            
    // Call a method to fetch room IDs when the component is mounted
    this.fetchRoomsData();
    },
    methods: {
      leaderBoard() {
        this.$router.push({ name: 'leader-board' })
      },
      fetchRoomsData() {
      // Emit an event to request room IDs from the server
      this.socket.on('rooms-data', (rooms) => {
        // Update roomsData with the received room IDs
        console.log('rooms are ',rooms);

        this.roomsData = rooms;
      });
    },
    getVideoThumbnail(room) {
      // Replace this with the actual URL of the video thumbnail for the room ID
      // This is just a placeholder
      return 'https://example.com/thumbnails/' + room + '.jpg';
    },
    getVideoLink(room) {
      // Replace this with the actual URL of the video for the room ID
      // This is just a placeholder
      return 'https://example.com/video/' + room;
    },
      async fetchVideos() {
        const endpoint = '/list-videos?limit=3';
        this.response = await fetchData(endpoint);
        this.videos = this.response.data?.data;
        console.log(this.videos);
      },
      handleImageError(event) {
        console.error('Error loading image:', event.target.src);
        // You can also set a default image or take other actions
      },
      updateValueFromHeader(value) {
        // Update the value in the parent component
        this.valueFromHeader = value;
        // console.log(this.valueFromHeader, "this is value ");
      },
      togglePlay() {
        const video = this.$refs.videoPlayer;

        if (this.isPlaying) {
          video.pause();
        } else {
          video.play();
        }

        this.isPlaying = !this.isPlaying;

      },
      handleTimeUpdate() {
        if (this.seekingDisabled) {
          // Prevent seeking by setting currentTime back to 0
          this.$refs.videoPlayer.currentTime = 0;
          this.seekingDisabled = false; // Reset seekingDisabled
        }
      },

    },
    // setup() {
    //   const valueFromHeader = ref('');
    //   function sendValueToSidebar(value) {
    //     valueFromHeader.value = value;
    //   }
    //   return {
    //     valueFromHeader,
    //     sendValueToSidebar,
    //   };
    // },
    openLink() {
      alert("");
      const link = "http://learn.shayhowe.com/assets/misc/courses/html-css/adding-media/earth.mp4"; // Replace with your desired URL
      window.open(link, "_blank"); // Opens the link in a new tab or window
    },
  }
</script>