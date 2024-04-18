<template>
  <div>
    <video ref="localVideo" autoplay></video>
    <video ref="remoteVideo" autoplay></video>
  </div>
</template>

<script>
import SimpleWebRTC from 'simplewebrtc';

export default {
  mounted() {
    const webrtc = new SimpleWebRTC({
      localVideoEl: this.$refs.localVideo,
      remoteVideosEl: this.$refs.remoteVideo,
      autoRequestMedia: true,
    });

    // Event handler when a video stream is added
    webrtc.on('videoAdded', (video, peer) => {
      if (peer.id === webrtc.connection.connection.id) {
        video.style.width = '100%';
        video.style.height = 'auto';
      }
    });
  },
};
</script>

<style scoped>
video {
  width: 100%;
  height: auto;
}
</style>