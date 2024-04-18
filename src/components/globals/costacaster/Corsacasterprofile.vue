<template>
  <section class="main-guest-section">
    <SideBar @updateValue="updateValueFromHeader"></SideBar>
    <section
      :class="valueFromHeader ? 'guest-main-page-shop-header sidebar-section' : 'guest-main-page-shop-header sidebar-section1'">
      <GuestHeader @sendValue="sendValueToSidebar"></GuestHeader>
      <div>
        <div class="guest-header-img">
          <img src="@assets/Rectangle-9583.png">
        </div>
        <div class="main-div-change-name-btns">
          <div class="guest-user-info-chanel">
            <div class="guest-chanel-img-white">
              <img class="guest-chanel-img guest-chanel-img-active" src="@assets/avatar.jpg">
              <!-- <button class="live-user-btn">Live</button> -->
            </div>
            <div>
              <div class="guest-verify-nameofchanel">
                <h1>Shroud</h1>
                <img src="@assets/verify.png">
              </div>
              <div class="follower-text-box">
                <p class="follower-text"><span>4,4M</span> followers</p>
              </div>
            </div>
          </div>
          <div class="subscribe-box-collection">
            <button class="subscribe-btn">Subscribe</button>
            <img class="sub-more-btn" src="@assets/Frame-1624721.png">
          </div>
        </div>
        <div class="main-box-share-btn-text">
          <p>Loved to create content about sports 🏀🚀</p>
          <div class="share-btn-alignment-flex">
            <div class="share-btn-alignment-flex">
              <img src="@assets/Group.png">
              <p>discord.gg/shroudc</p>
            </div>
            <div class="share-btn-alignment-flex">
              <img src="@assets/twitter.png">
              <p>@shroud</p>
            </div>
            <div class="share-btn-alignment-flex">
              <img src="@assets/instagram.png">
              <p>@shroud</p>
            </div>
          </div>
        </div>

        <form @submit.prevent="onSubmit">
          <div class="edit-profile">
            <h1>
              Billing Info
            </h1>
            <!-- <button type="submit" class="edit-btn">Edit Profile</button> -->
          </div>
          <div class="image-uploader">
            <input type="file" id="fileInput" accept="image/*" style="display: none;">

            <!-- <div class="selected-image">

                  <label for="fileInput" class="upload-button"> <img id="preview" src="@assets/avatar.jpg"
                          alt="Selected Image"> </label>
              </div> -->

            <div class="user-board-main">
              <div class="user-board">
                <p>
                  First Name:
                </p>

                <input type="name" id="password" placeholder="First name" v-model="user.first_name">

              </div>
            </div>
            <div class="user-board-main">
              <div class="user-board">
                <p>
                  Last Name:
                </p>

                <input type="name" id="password" placeholder="Last name" v-model="user.last_name">

              </div>
            </div>
            <div class="user-board-main">
              <div class="user-board">
                <p>
                  Email Address:
                </p>

                <input type="Email" id="password" placeholder="Email address" v-model="user.email">

              </div>
            </div>
            <div class="user-board-main">
              <div class="user-board">
                <p>
                  Phone Number:
                </p>

                <input type="Phone" id="password" placeholder="Phone number" v-model="user.phone_number">

              </div>
            </div>
            <div class="user-board-main">
              <div class="user-board">
                <p>
                  Address:
                </p>

                <input type="Address" id="password" placeholder="Address" v-model="user.address">

              </div>
            </div>
            <div class="submit-btn">
              <button type="submit">Submit</button>
            </div>


          </div>
        </form>
      </div>
    </section>




  </section>

</template>
<script>

  import GuestHeader from '@components/globals/guest/GuestHeader.vue';
  import SideBar from '@components/globals/costacaster/SideBar.vue';
  import ProductList from '@components/globals/costacaster/ProductList.vue';
  import RatingComponent from '@components/globals/costacaster/Rating.vue';
  import Counter from '@components/globals/costacaster/Counter.vue';
  import { reactive, Vue, ref } from 'vue'; // Import reactive
  import useVuelidate from '@vuelidate/core';
  import { required, email, minLength, sameAs } from '@vuelidate/validators';
  import { postData, fetchData } from '@services/base.js';
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';

  export default {
    data() {
      return {
        selectedImage: '',
        responseData: '',
        valueFromHeader: false,
      };
    },
    components: {
      GuestHeader,
      ProductList,
      SideBar,
      RatingComponent,
      Counter,


    },
    method: {
      async onSubmit() {


        const endpoint = '/update-profile'; // Replace with your desired endpoint
        this.responseData = await postData(endpoint, this.user);
        console.log(this.responseData);
        ;

      },
      methods: {
        uploadVideo() {
          this.$router.push({ name: 'Visibility' })
        },
        updateValueFromHeader(value) {
          // Update the value in the parent component
          this.valueFromHeader = value;
        },
      }
    },
    setup() {
      const valueFromHeader = ref('');

      function sendValueToSidebar(value) {
        valueFromHeader.value = value;
      }

      return {
        valueFromHeader,
        sendValueToSidebar,
      }

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.selectedImage = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.selectedImage = '';
      }
    },
    created() {
      this.user = JSON.parse(localStorage.getItem('user') || null);

      console.log(this.user);
    }
  }


</script>