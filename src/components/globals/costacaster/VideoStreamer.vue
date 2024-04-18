<template>
    <div>
      <div>
        <video v-if="mediaStream" ref="video" :srcObject="mediaStream" autoplay playsinline></video>
      </div>
      <div>
        <button @click="startStreaming" :disabled="isStreaming">Start Streaming</button>
        <button @click="stopStreaming" :disabled="!isStreaming">Stop Streaming</button>
      </div>
      <video-player v-if="isStreaming" ref="videoPlayer" :options="playerOptions" />
    </div>
  </template>
  
  <script>
  // import { VueMediaRecorder } from 'vue-media-recorder';
  // import VideoPlayer from 'vue-video-player';
  import Echo from 'laravel-echo';
  import { postData, fetchData } from '@services/base.js';
  
  export default {
    components: {
      // VueMediaRecorder,
      // VideoPlayer,
    },
    data() {
      return {
        responseData: '',
        mediaStream: null,
        isStreaming: false,
        playerOptions: {
          controls: true,
          autoplay: false,
          muted: false,
          preload: 'auto',
          language: 'en',
          aspectRatio: '16:9',
          fluid: true,
        },
      };
    },
    methods: {
      startStreaming() {
        this.isStreaming = true;
  
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            this.mediaStream = stream;
  
            // Use $nextTick to ensure that the video element is properly mounted
            this.$nextTick(() => {
              const videoElement = this.$refs.video;
              videoElement.srcObject = stream;
            });
            const endpoint = '/start-stream';
            this.responseData = postData(endpoint, this.form);
            console.log(this.responseData);
          })
          .catch((error) => {
            console.log('Error accessing media devices:', error);
            this.isStreaming = false;
          });
      },
      stopStreaming() {
        this.isStreaming = false;
  
        // Stop local media stream
        if (this.mediaStream) {
          const tracks = this.mediaStream.getTracks();
          tracks.forEach((track) => track.stop());
          this.mediaStream = null;
        }
            const endpoint = '/stop-stream';
            this.responseData = postData(endpoint, this.form);
            console.log(this.responseData);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles here if needed */
  </style>