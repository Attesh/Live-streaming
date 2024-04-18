<template>
  <div id="slider">
    <transition-group tag="div" :name="transitionName" class="slides-group">
      <div :key="current" class="slide" :class="slides[current].className"></div>
    </transition-group>
    <div class="btn btn-prev" aria-label="Previous slide" @click.prevent="slide(-1)">
      &#10094;
    </div>
    <div class="btn btn-next" aria-label="Next slide" @click.prevent="slide(1)">
      &#10095;
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      direction: 1,
      transitionName: "fade",
      slides: [
        { className: "blue" },
        { className: "red" },
        { className: "yellow" },
      ],
    };
  },
  methods: {
    slide(dir) {
      this.direction = dir;
      dir === 1
        ? (this.transitionName = "slide-next")
        : (this.transitionName = "slide-prev");
      var len = this.slides.length;
      this.current = (this.current + dir % len + len) % len;
    },
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.slide(1); // Move to the next slide
      }, 3000); // Adjust the interval as needed (e.g., 3000ms for 3 seconds)
    },
  },
  mounted() {
    this.startAutoplay();
  },
  beforeDestroy() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Crimson+Text");

/* FADE IN */
.fade-enter-active {
  transition: opacity 1s;
}
.fade-enter {
  opacity: 0;
}

/* GO TO NEXT SLIDE */
.slide-next-enter-active,
.slide-next-leave-active {
  /* transition: transform 0.5s ease-in-out; */
}
.slide-next-enter {
  transform: translate(100%);
}
.slide-next-leave-to {
  transform: translate(-100%);
}

/* GO TO PREVIOUS SLIDE */
.slide-prev-enter-active,
.slide-prev-leave-active {
}
.slide-prev-enter {
  transform: translate(-100%);
}
.slide-prev-leave-to {
  transform: translate(100%);
}

/* SLIDES CLASSES */

.blue {
  background-image: url(../../@assets/Profile-1.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
}

.red {
  background-image: url(../../../assets/8942867.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
}

.yellow {
  background-image: url(../../../assets/7356066.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
 
}

/* SLIDER STYLES */
body {
  overflow: hidden;
  margin: 0;
  font-size: 50px;
  font-family: "Crimson Text", sans-serif;
  color: #fff;
}

#slider {
    width: 100%;
    height: 160px;
  position: relative;
}

.slide {
  width: 90%;
  height: 150px;
  position: absolute;
  top: 0;
  left: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  z-index: 10;
  cursor: pointer;
 
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  position: absolute;
  top: 50px;
  left: 0%;
  transition: transform 0.3s ease-in-out;
  user-select: none;
}

.btn-next {
  left: auto;
  right: 1%;
}

.btn:hover {
  transform: scale(1.1);
}
</style>