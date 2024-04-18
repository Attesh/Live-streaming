<template>
  <section class="main-guest-section ">
    <SideBar @updateValue="updateValueFromHeader"></SideBar>

    <section class="guest-main-page-shop-header sidebar-section">

      <GuestHeader @sendValue="sendValueToSidebar"></GuestHeader>


      <div class=" ad-1">
        <div class="video-child-div ad-2">
          <video controls width="100%">
            <source src="http://learn.shayhowe.com/assets/misc/courses/html-css/adding-media/earth.ogv"
              type="video/ogg" />
            <source src="http://learn.shayhowe.com/assets/misc/courses/html-css/adding-media/earth.mp4"
              type="video/mp4" />
            Please
            <a href="http://learn.shayhowe.com/assets/misc/courses/html-css/adding-media/earth.mp4"
              download>download</a>
            the video.
          </video>

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
          <div class="view-leaderboard" style="        
          width: fit-content;
       ">
            <button @click="showleaderComponent">View Leaderboard</button>
            <ViewLeaderboardPopup v-if="ViewLeaderboardPopup" @showleaderComponent="showleaderComponent" />
            

          </div>

          <!-- Add a div with v-if directive to conditionally render it -->
          <div v-if="isDivVisible" class="your-div-class">
            <!-- Content of your div goes here -->
            <ViewLeaderboardPopup></ViewLeaderboardPopup>
          </div>
          <div class="event-tags">
            <button class="tag-button">Cycling</button>
            <button class="tag-button">Racing</button>
            <button class="tag-button">World Championship</button>
          </div>
        </div>

        <div class="leadBorder">

          <div class="leadBorderChild">
            <div style="display: flex ;align-items: center;">
              <router-link :to="{ name: 'VideoFunction' }"><img src="@assets/Frame.png" alt=""></router-link>
              <h1 style="color: #ffff; margin-left: 10px;">leaderboard</h1>
            </div>
            <div class="image-container">
              <img src="@assets/more.png" class="ad-6" alt="">
              <div class="dropdown-content">
                <router-link :to="{ name: 'edit-leader-board' }">Edit Leader</router-link>


                <router-link :to="{ name: 'edit-leader-board' }">Refresh</router-link>

              </div>

            </div>

          </div>

          <div class="leadBoard-main">
            <div class=" leader-uploaded-profile">
              <img src="@assets/uploadedprofile.png" alt="">
            </div>
            <div class=" leader-user-name">
              <h6>
                Taimur Tariq Athlete
              </h6>
              <div class="leader-cyclingteam">

                <img src="@assets/cyclingteam.png" alt="">
                <p>
                  Great Britain Cycling Team
                </p>
              </div>

              <div class="user-bio-main">
                <div class=" leader-user-bio">
                  <h6>
                    Racing Age:
                  </h6>
                  <p>
                    32
                  </p>
                </div>
                <div class="leader-user-bio">
                  <h6>
                    Racer ID:
                  </h6>
                  <p>
                    987523
                  </p>
                </div>
                <div class="leader-user-bio">
                  <h6>
                    Racing Category:
                  </h6>
                  <p>
                    BMX, Road
                  </p>
                </div>
                <div class="leader-user-bio">
                  <h6>
                    Sanotioning Body:
                  </h6>
                  <p>
                    Xxxxx
                  </p>
                </div>
                <div class="leader-user-bio">
                  <h6>
                    Location
                  </h6>
                  <p>
                    Sampletown, Xx, USA
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="leadBorderScrollExample">

            <div class="ad-8">

              <div class="ad-9">
                <p style="color: #ffff;">1</p>
                <h4 class="ad-10">Klea</h4>
              </div>
              <img src="@assets/Rectangle9587.png" class="ad-6" alt="">
            </div>

            <div class="ad-8">

              <div class="ad-9">
                <p style="color: #ffff;">2</p>
                <h4 class="ad-10">Klea</h4>
              </div>
              <img src="@assets/Rectangle9587.png" class="ad-6" alt="">
            </div>

            <div class="ad-8">

              <div class="ad-9">
                <p style="color: #ffff;">3</p>
                <h4 class="ad-10">Klea</h4>
              </div>
              <img src="@assets/Rectangle9587.png" class="ad-6" alt="">
            </div>

            <div class="ad-8">

              <div class="ad-9">
                <p style="color: #ffff;">4</p>
                <h4 class="ad-10">Klea</h4>
              </div>
              <img src="@assets/Rectangle9587.png" class="ad-6" alt="">
            </div>

            <div class="ad-8">

              <div class="ad-9">
                <p style="color: #ffff;">5</p>
                <h4 class="ad-10">Klea</h4>
              </div>
              <img src="@assets/Rectangle9587.png" class="ad-6" alt="">
            </div>


            <div class="leadBorderMessage">
              <input type="text" class="guest-sesarc-field ad-11" placeholder="send a message">
              <img src="@assets/send.png" alt="">
            </div>


          </div>




        </div>
        <div class="box-show-msg">
          <p>You don't have access to this section. Kindly upgrade your plan to view this.</p>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
  import GuestHeader from '@components/globals/guest/GuestHeader.vue';
  import SideBar from '@components/globals/costacaster/SideBar.vue';
  import ProductList from '@components/globals/costacaster/ProductList.vue';
  import ViewLeaderboardPopup from '@components/ViewLeaderboardPopup.vue';
 

  import { ref } from 'vue';
  export default {
    components: {
      GuestHeader,
      ProductList,
      ViewLeaderboardPopup,
      SideBar,
      

    },
    data() {

      return {
        valueFromHeader: false,
        ViewLeaderboardPopup: false,
      }
    },
    methods: {

      updateValueFromHeader(value) {
        // Update the value in the parent component
        this.valueFromHeader = value;
      },
      showleaderComponent() {
                this.ViewLeaderboardPopup = !this.ViewLeaderboardPopup;
            },
    
    },
    setup() {
      const valueFromHeader = ref('');
      const isDivVisible = ref(false);

      function sendValueToSidebar(value) {
        valueFromHeader.value = value;
      }

      function toggleDivVisibility() {
        isDivVisible.value = !isDivVisible.value;
      }

      return {
        valueFromHeader,
        sendValueToSidebar,
        isDivVisible,
        toggleDivVisibility,
      };

    },



  };

</script>

<style scoped>
  /* Add basic styling to the container */
  .image-container {
    position: relative;
    display: inline-block;
  }

  /* Style the image */
  .image-container img {
    width: 60px;
    height: 100px;
    cursor: pointer;
  }

  /* Hide the dropdown initially */
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: transparent;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 99999;
  }

  /* Style the dropdown items */
  .dropdown-content a {
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    color: #fff;
  }

  /* Show the dropdown when hovering over the image container */
  .image-container:hover .dropdown-content {
    display: block;
    display: block;
    margin-left: -120px;
    margin-top: -35px;
  }

  /* .ad-1 {
    display: table;
    clear: both;
  } */

  .ad-2 {
    float: left;
  }

  .ad-3 {
    display: block;
  }

  .ad-4 {
    width: 100%;
  }

  .ad-5 {
    margin-top: 6%;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .ad-6 {
    cursor: pointer;
    object-fit: contain;
    width: 60px;

  }

  .ad-7 {
    object-fit: contain;
    margin-bottom: 20%;
  }

  .ad-8 {
    display: flex;
    justify-content: space-evenly;
    cursor: pointer;
    border-bottom: 1px solid grey;
    margin-top: -5px;
  }

  .ad-9 {
    display: flex;
    position: relative;
    right: 13%;
    align-items: center;
  }

  .ad-10 {
    color: #ffff;
    margin-left: 80%;
    margin-right: 30px;
    font-size: 16px;
  }

  .ad-11 {
    width: 85%;
    margin-top: 10px;
  }
  .ad-11::placeholder{
    font-size: 12px;
  }
  .leadBorder {
    /* -webkit-filter: blur(5px); */
  }
 
  /* .box-show-msg {
    position: absolute;
    border-radius: 27px;
    border: 1px solid #FFF;
    background: #151522;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    color: #fff;
    padding: 35px;
    width: 15%;
    font-size: 20px;
    text-align: center;
    right: 55px;
    margin-top: 10%;
  } */

  .ad-rpm {
    width: 80%;
  }
</style>