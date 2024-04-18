<template>

  <div>
    <div class="guest-page-navigation-tatle">
      <h1>Most Viewed Videos</h1>
      <button>See All</button>
    </div>
    <div class="main-videos-box">
      <div class="main-videos-box">
        <!-- Loop through the videos in responseData -->
        <div v-for="item in videos" :key="item.id" class="main-video-box">
          <div class="video-image-box">
            <span>{{ item.duration }}</span>
            <!-- Bind the image URL dynamically -->
            <router-link :to="{  name: 'video-detail', params: {id: item.id} }"> <img :src="item.thumbnail"
                alt="Video Thumbnail" @error="handleImageError"> </router-link>

          </div>
          <div class="main-box-video">
            <h2>{{ item.title }}</h2>
            <div class="main-video-profile-flex">
              <img class="video-profile-img" src="https://picsum.photos/200/300" alt="Profile Image">
              <p class="video-profile-name">{{ item.user.name }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import { ref } from 'vue';
  import VueRouter from 'vue-router';
  import { postData, fetchData } from '@services/base.js';

  export default {
    data() {
      return {
        response: {},
        videos: [],
      }
    },
    mounted() {
      // Fetch videos when the component is mounted
      this.fetchVideos();
    },
    methods: {  // <-- Fix the typo here
      async fetchVideos() {
        const endpoint = '/get-user-videos/'+ this.$route.params.id +'?limit=3';
        this.response = await fetchData(endpoint);
        this.videos = this.response.data?.data;
        // console.log(this.videos);
      },

    },
    openLink() {
      // alert("");
      const link = "http://learn.shayhowe.com/assets/misc/courses/html-css/adding-media/earth.mp4"; // Replace with your desired URL
      window.open(link, "_blank"); // Opens the link in a new tab or window
    },
  }
</script>