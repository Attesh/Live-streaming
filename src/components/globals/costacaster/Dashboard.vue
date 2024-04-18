<template>
  <section class="main-guest-section">
    <SideBar @updateValue="updateValueFromHeader"></SideBar>
    <section  class="guest-main-page-shop-header sidebar-section">
      <GuestHeader></GuestHeader>
      <div class="guest-header">
        <CategoryList></CategoryList>
        <div class="story-list">
          <ul>
            <li class="story-item active">
              <img src="@assets/featured-athlete/user.png" alt="" />
            </li>
            <li class="story-item active">
              <img src="@assets/featured-athlete/userstory.png" alt="" />
            </li>
            <li class="story-item active">
              <img src="@assets/featured-athlete/livestory.png" alt="" />
            </li>

          </ul>
        </div>
      </div>
      <div class="guest-header">
        <!-- <video controls>
          <source
          src="http://learn.shayhowe.com/assets/misc/courses/html-css/adding-media/earth.ogv"
          type="video/ogg"
          />
          <source
          src="http://learn.shayhowe.com/assets/misc/courses/html-css/adding-media/earth.mp4"
          type="video/mp4"
          />
          Please
          <a
          href="http://learn.shayhowe.com/assets/misc/courses/html-css/adding-media/earth.mp4"
          download
          >download</a
          >
          the video.
        </video> -->

      </div>
      <div class="guest-header video-info">
        <div class="left">
          <div class="event-details">
            <p class="event-title">Cycling Race World Class One Stream! 🔥</p>
          </div>
          <!-- <div class="event-actions">
            <button class="share-button">
              <img src="@assets/featured-athlete/export.png" alt="" />share
            </button>
            <button class="more-button">
              <img src="@assets/featured-athlete/more.png" alt="" />
            </button>
          </div> -->
        </div>
        <div class="right">
          <div class="user-info">
            <img src="@assets/featured-athlete/user.png" alt="" class="profile-image" />
            <div class="user-details">
              <p class="username">William John</p>
              <p class="follower-count">
                4.4M <span class="follower-text">followers</span>
              </p>
            </div>
          </div>
          <div class="follow-button-container">
            <button class="follow-button">Following</button>
          </div>
        </div>
      </div>
      <div class="event-tags">
        <button class="tag-button">Cycling</button>
        <button class="tag-button">Racing</button>
        <button class="tag-button">World Championship</button>
      </div>
      <TopVideos></TopVideos>
      <RecentVideos></RecentVideos>
    </section>
  
  </section>
  <Footer></Footer>
 
</template>
<script>
import SideBar from '@components/globals/costacaster/SideBar.vue';
import CategoryList from '@components/globals/costacaster/CategoryList.vue';
import GuestHeader from '@components/globals/guest/GuestHeader.vue';
import TopVideos from '@components/globals/costacaster/TopVideos.vue';
import RecentVideos from '@components/globals/costacaster/RecentVideos.vue';
import Footer from '@components/globals/costacaster/Footer.vue';
export default {
  data() {
    return {
      data: {

      }
    };
  },
  components: {
    GuestHeader,
    SideBar,
    TopVideos,
    RecentVideos,
    Footer,
    CategoryList
  }
}
</script>