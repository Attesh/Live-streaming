<template>
  <div
    style="background-color: #000c;position: fixed;top: 0;display: flex;justify-content: center;  width: 100%;height: 100%;z-index: 99999999999999999999999999;left: 0;">
    <div class="view-leader-popup">
      <!-- <div class=" leader-uploaded-profile">
        <img src="@assets/uploadedprofile.png" alt="">
      </div> -->
      <div class="close-notif">
        <h1 style="font-weight: bold; color: #ffff;">
            Leaderboard
        </h1>
        <img  style="width: 20px; height: 20px;"   src="@assets/closered.png" alt="" @click="leaderPopupClose">
    </div>
      <div>
        <div class=" leader-search-result">
          <div style="position: relative;top: 15px;">
            <img src="@assets/uploadedprofile.png" alt="">

          </div>

        </div>
        <div class="roster-user-bio-main">
          <!-- <div class="roster-user-bio">
            <p style="    font-size: 16px;
                background-color: grey;
                width: 120px;
                padding: 10px;
                border-radius: 10px;">
              William Santana
            </p>
         
            <p>
              <span>
                Location :
              </span>
              <span>
                Sampletown
              </span>
            </p>
          </div> -->
          <div class="roster-user-bio-sec">
            <p>
              <span>
                Racing Age
              </span>
              <span>
                32
              </span>
            </p>
            <p>
              <span>
                Racer ID:
              </span>
              <span>
                987646
              </span>
            </p>
            <p>
              <span>
                Racing Category:
              </span>
              <span>
                BMX Road
              </span>
            </p>
            <p>
              <span>
                Sanctioning body:

              </span>
              <span>
                xxxx
              </span>
            </p>
          </div>
        </div>



        <div style="padding: 20px;
        overflow: scroll;
        height: 100px;
        overflow-x: hidden;">
          <div class="leadar-popup-ad-8" style="    display: flex;
          justify-content: space-between;
          color: #ffff;
          align-items: center;">

            <div class="leadar-popup-ad-9" style="    display: flex;
            align-items: center;
            gap: 45px;">
              <p style="color: #ffff;">4</p>
              <h4 class="ad-10">Klea</h4>
            </div>
            <img src="@assets/Rectangle9587.png" class="ad-6" alt="">
          </div>
          <div>
            <div class="leadar-popup-ad-8" style="    display: flex;
            justify-content: space-between;
            color: #ffff;
            align-items: center;">

              <div class="leadar-popup-ad-9" style="    display: flex;
              align-items: center;
              gap: 45px;">
                <p style="color: #ffff;">4</p>
                <h4 class="ad-10">Klea</h4>
              </div>
              <img src="@assets/Rectangle9587.png" class="ad-6" alt="">
            </div>
          </div>
          <div>
            <div class="leadar-popup-ad-8" style="    display: flex;
            justify-content: space-between;
            color: #ffff;
            align-items: center;">

              <div class="leadar-popup-ad-9" style="    display: flex;
              align-items: center;
              gap: 45px;">
                <p style="color: #ffff;">4</p>
                <h4 class="ad-10">Klea</h4>
              </div>
              <img src="@assets/Rectangle9587.png" class="ad-6" alt="">
            </div>
          </div>
          <div>
            <div class="leadar-popup-ad-8" style="    display: flex;
            justify-content: space-between;
            color: #ffff;
            align-items: center;">

              <div class="leadar-popup-ad-9" style="    display: flex;
              align-items: center;
              gap: 45px;">
                <p style="color: #ffff;">4</p>
                <h4 class="ad-10">Klea</h4>
              </div>
              <img src="@assets/Rectangle9587.png" class="ad-6" alt="">
            </div>
          </div>
          <div>
            <div class="leadar-popup-ad-8" style="    display: flex;
            justify-content: space-between;
            color: #ffff;
            align-items: center;">

              <div class="leadar-popup-ad-9" style="    display: flex;
              align-items: center;
              gap: 45px;">
                <p style="color: #ffff;">4</p>
                <h4 class="ad-10">Klea</h4>
              </div>
              <img src="@assets/Rectangle9587.png" class="ad-6" alt="">
            </div>
          </div>
          <div>
            <div class="leadar-popup-ad-8" style="    display: flex;
            justify-content: space-between;
            color: #ffff;
            align-items: center;">

              <div class="leadar-popup-ad-9" style="    display: flex;
              align-items: center;
              gap: 45px;">
                <p style="color: #ffff;">4</p>
                <h4 class="ad-10">Klea</h4>
              </div>
              <img src="@assets/Rectangle9587.png" class="ad-6" alt="">
            </div>
          </div>
          <div>
            <div class="leadar-popup-ad-8" style="    display: flex;
            justify-content: space-between;
            color: #ffff;
            align-items: center;">

              <div class="leadar-popup-ad-9" style="    display: flex;
              align-items: center;
              gap: 45px;">
                <p style="color: #ffff;">4</p>
                <h4 class="ad-10">Klea</h4>
              </div>
              <img src="@assets/Rectangle9587.png" class="ad-6" alt="">
            </div>
          </div>
        </div>

     
      </div>
      <div class="leadBorderMessage-popup">
        <input type="text" class="guest-sesarc-field ad-11" placeholder="send a message">
        <img src="@assets/send.png" alt="">
      </div>
    </div>

  </div>

</template>
<script>
  export default {
    components: {

    },
    methods: {
            async leaderPopupClose() {
                this.$emit('showleaderComponent', false);
            }
        }



  }
</script>