<template>
  <div>
    <video ref="videoPlayer" controls autoplay></video>
    <button @click="startVideoStream">Start Video Stream</button>
  </div>
</template>

<script>
import { postData } from '@services/base.js';
export default {
  data(){
    return {
      responseData : '',
      channel: null,
      videoPlayer: null,
    } 
  },
  methods: {
    async startVideoStream() {
      const formData = new FormData(); 
      const endpoint = '/live-streaming';
      this.responseData = await postData(endpoint, formData);
    }
  },
  mounted() {
    // Ensure Echo is initialized before using it
    if (!this.$echo) {
      console.error('$echo is not initialized. Make sure it is properly configured.');
      return;
    }

    // Initialize the Pusher channel
    this.channel = this.$echo.channel('video-stream');
    console.log(this.channel);
    // Listen for the video stream event
    this.channel.listen('LiveStreamEvent', (event) => {
      // Ensure that the videoPlayer reference is set
      if (!this.videoPlayer) {
        this.videoPlayer = this.$refs.videoPlayer;
      }

      // Check if videoPlayer is still not set
      if (!this.videoPlayer) {
        console.error('Video player element is not available.');
        return;
      }

      const videoBlob = new Blob([event.stream], { type: 'video/webm' });
      this.videoPlayer.src = URL.createObjectURL(videoBlob);
    });
  },
};
</script>
