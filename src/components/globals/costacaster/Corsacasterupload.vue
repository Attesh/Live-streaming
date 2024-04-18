<template>
  <section class="main-guest-section">
    <SideBar @updateValue="updateValueFromHeader"></SideBar>
    <section
      :class="valueFromHeader ? 'guest-main-page-shop-header sidebar-section' : 'guest-main-page-shop-header sidebar-section1'">
      <GuestHeader></GuestHeader>
      <div class="wizard my-5">
        <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">

          <li class="nav-item flex-fill" role="presentation" data-bs-toggle="tooltip" data-bs-placement="top"
            title="Step 1">
            <p href="" style="position: absolute;
            top: -25px;
            left: 115px;text-decoration: none;color: #fff;font-size: 14px;"> Upload</p>
            <a class="nav-link active rounded-circle mx-auto d-flex align-items-center justify-content-center"
              href="#step1" id="step1-tab" data-bs-toggle="tab" role="tab" aria-controls="step1" aria-selected="true">
              <i class="fas fa-folder-open"></i>
            </a>
          </li>

          <li class="nav-item flex-fill" role="presentation" data-bs-toggle="tooltip" data-bs-placement="top"
            title="Step 2">
            <p href="" style="position: absolute;
            top: -25px;
            left: 115px;text-decoration: none;color: #fff;font-size: 14px;"> Details</p>
            <a class="nav-link rounded-circle mx-auto d-flex align-items-center justify-content-center" href="#step2"
              id="step2-tab" data-bs-toggle="tab" role="tab" aria-controls="step2" aria-selected="false" title="Step 2">
              <i class="fas fa-briefcase"></i>
            </a>
          </li>
          <li class="nav-item flex-fill" role="presentation" data-bs-toggle="tooltip" data-bs-placement="top"
            title="Step 3">
            <p href="" style="position: absolute;
            top: -25px;
            left: 95px;text-decoration: none;color: #fff;font-size: 14px;"> Video Elements</p>
            <a class="nav-link rounded-circle mx-auto d-flex align-items-center justify-content-center" href="#step3"
              id="step3-tab" data-bs-toggle="tab" role="tab" aria-controls="step3" aria-selected="false" title="Step 3">
              <i class="fas fa-star"></i>
            </a>
          </li>
          <li class="nav-item flex-fill" role="presentation" data-bs-toggle="tooltip" data-bs-placement="top"
            title="Step 4">
            <p href="" style="position: absolute;
            top: -25px;
            left: 111px; text-decoration: none;color: #fff; font-size: 14px;"> Visibility </p>
            <a class="nav-link rounded-circle mx-auto d-flex align-items-center justify-content-center" href="#step4"
              id="step4-tab" data-bs-toggle="tab" role="tab" aria-controls="step4" aria-selected="false" title="Step 4">
              <i class="fas fa-flag-checkered"></i>
            </a>
          </li>
        </ul>
        <hr class="hr">
        <form @submit.prevent="onSubmit" id="upload-form" class="upload-form" enctype="multipart/form-data">
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" role="tabpanel" id="step1" aria-labelledby="step1-tab">
              <div class="upload-area">
                <div class="upload-corsacaster">
                  <div>
                    <div class="uploaded" id="uploaded">
                      <img src="@assets/upload.png" class="existing-image" id="existing-image">
                    </div>
                  </div>
                  <div>
                    <input type="file" ref="fileInput" id="videoUploader" name="Upload" accept="video/*"
                      @change="handleFileChange" />
                  </div>
                  <div class="uploaded-text">
                    <h6>Drag and drop file to upload</h6>
                    <p>Your video will be praivate until you publish them.</p>
                    <button type="button" @click="calltovideoInput" v-if="isVisible">SELECT MEDIA</button>
                    <button type="button" @click="removeVideo" v-if="!isVisible">Remove</button>
                  </div>

                </div>
                <div class="">
                  <button style="color: #ffff;" type="button" class="btn btn-info next ">Continue<i
                      class="fas fa-angle-right"></i></button>
                </div>
              </div>

            </div>
            <div class="tab-pane fade" role="tabpanel" id="step2" aria-labelledby="step2-tab">
              <div class="upload-area  uploaddetail-area ">
                <div class="upload-corsacaster upload-detail">
                  <div>
                    <div class="uploadDetail">
                      <img src="@assets/uploaded.png">
                    </div>
                    <div class="uploadFile">
                      <p>File Name</p>
                      <p>Video (2160p)</p>
                    </div>
                    <div class="check-detail">
                      <input type="checkbox" id="#" name="text">
                      <label for="vehicle1"> Video upload complete. No issues found.</label>
                    </div>

                  </div>

                  <div class="uploadDetail-text">
                    <h6>Video title</h6>
                    <input class="uploadInput" type="text" name="video-title" v-model="form.title">
                    <p>Your video title, 2-55 characters</p>
                    <h6>Video Description</h6>
                    <textarea class="uploadDetail-area" name="description" style="color:white"
                      v-model="form.description" id="" cols="30" rows="10"></textarea>
                    <h6>Thumbnail</h6>
                    <p style="margin: -7px 0px 30px -1px;">Select or upload a picture that shows what’s in your video. A
                      good thumbnail stands out
                      and draws viewer’s attention</p>
                    <div class="Upload-Thumbnail">
                      <img src="@assets/Thumbnail.png">
                      <p>Upload Thumbnail</p>
                      <input type="file" id="thumbnailUploader" name="thumbnail" @change="thumbnailUpload"
                        accept="image/*">
                      <button type="button" @click="calltoImageInput">Select Thumbnail</button>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center"
                  style="    padding: 10px 35px 10px 35px;">
                  <button class="btn btn-secondary previous"><i class="fas fa-angle-left"></i> Go Back</button>
                  <button type="button" class="btn btn-info next">NEXT STEP <i class="fas fa-angle-right"></i></button>
                </div>
              </div>

            </div>
            <div class="tab-pane fade" role="tabpanel" id="step3" aria-labelledby="step3-tab">
              <div class="upload-area">
                <div class="upload-corsacaster">
                  <div class="vedio-element">
                    <img src="@assets/vedio-element.png">

                    <h6>Video</h6>
                    <p>Upload a stock video</p>
                  </div>

                </div>
                <div class="d-flex justify-content-between align-items-center"
                  style="    padding: 10px 35px 10px 35px;">
                  <button type="button" class="btn btn-secondary previous"><i class="fas fa-angle-left"></i>
                    Go Back</button>
                  <button type="button" class="btn btn-info next">Continue <i class="fas fa-angle-right"></i></button>
                </div>
              </div>

            </div>
            <div class="tab-pane fade" role="tabpanel" id="step4" aria-labelledby="step4-tab">
              <div class="upload-area  visibility-area">

                <div class="upload-corsacaster">

                  <div class="visibility">
                    <div class="col-8 offset-1 mb-2">
                      <p class="visibilityP">Add category to your video</p>
                      <select class="form-select" v-model="form.type" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="short">short</option>
                        <option value="video">video</option>
                      </select>
                    </div>
                    <div class="col-8 offset-1 mb-2">
                      <!-- <p class="visibilityP">Country</p> -->
                      <select
                        v-bind:class="{ 'form-select active': tabCountrySelected === 'country', 'form-select': changeTabCountry !== 'country' }"
                        @change="getStateByCountry($event.target.value)" v-model="form.country_id" name="Country">
                        <option value="">Country</option>
                        <option v-for="country in countries.data" :value="country.id" :key="country.id">{{ country.name
                          }}
                        </option>
                      </select>
                    </div>
                    <div class="col-8 offset-1 mb-2">
                      <!-- <p class="visibilityP">State</p> -->
                      <select
                        v-bind:class="{ 'form-select active': tabCountrySelected === 'state', 'form-select': getStateByCountry !== 'state' }"
                        @change="getCityByState($event.target.value)" v-model="form.state_id" name="state">
                        <option value="">State</option>
                        <option v-for="state in states.data" :value="state.id" :key="state.id">{{ state.name }}</option>
                      </select>
                    </div>
                    <div class="col-8 offset-1 mb-2">
                      <!-- <p class="visibilityP">City</p> -->
                      <select
                        v-bind:class="{ 'form-select active': tabCountrySelected === 'city', 'form-select': getCityByState !== 'city' }"
                        name="city" v-model="form.city_id">
                        <option value="">City</option>
                        <option v-for="city in cities.data" :value="city.id" :key="city.id">{{ city.name }}</option>
                      </select>
                    </div>
                    <!--  <div class="col offset-1">
                    
                  </div> -->
                    <!-- <input class="visibilityInput" type="text" name="" id="">
                  <p class="visibilityP">Add category to your video</p>
                  <input class="visibilityInput" type="text" name="" id="">
                  <p class="visibilityP">Add category to your video</p> -->
                    <div class="visibility-text">
                      <div class="left-text">
                        <h5>Privacy</h5>
                        <p>Choose the video privacy</p>
                        <div class="radioBtn-box" style=" margin: 25px 0px 11px;">
                          <input type="radio" id="ageRadio1" v-model="form.privacy" name="privacy">
                          <label for="ageRadio1">Public</label>
                        </div>
                        <div class="radioBtn-box">
                          <input type="radio" id="ageRadio2" v-model="form.privacy" name="privacy">
                          <label for="ageRadio2">Private</label>
                        </div>
                      </div>
                      <div class="right-text">
                        <h5>Age Restriction</h5>
                        <div class="radioBtn-box" style=" margin: 45px 0px 11px;">
                          <input type="radio" v-model="form.age" name="age">
                          <label>All ages can view this video</label>
                        </div>
                        <div class="radioBtn-box">
                          <input type="radio" v-model="form.age" name="age">
                          <label>Only +18</label>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center"
                      style="    padding: 10px 35px 10px 35px;">
                      <button type="button" class="btn btn-secondary previous"><i class="fas fa-angle-left"></i>
                        Go Back</button>
                      <button style="width: 120px;background-color: #A3241C !important;border: none !important;margin-top: 20px;margin-left: 20px;color: #fff !important;margin-bottom: 20px;padding: 10px;border-radius: 15px;font-size: 14px;" type="submit" class="btn btn-info" :disabled="isSubmitting">PUBLISH <i
                          class="fas fa-angle-right"></i></button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </form>
      </div>
    </section>
  </section>
</template>
<style scoped>
  .wizard {
    position: relative;
  }

  .form-select {
    background-color: transparent;
    padding: 10px;
    color: #ffff;
  }

  .steppy-pane {
    background-color: transparent !important;
    text-align: start !important;
  }

  .previous {
    width: 120px;
    height: 40px;
    font-size: 14px;
  }

  .upload-detail {
    margin-top: 0px;
  }

  .controls .btn {
    display: none !important;
  }

  .uploaddetail-area {
    height: auto;
  }

  .visibility-area {
    height: auto;
  }
  .mb-2{
    margin-bottom: 1.5rem !important;
  }
  .steppy {
    display: flex;
    align-items: start;
    justify-content: space-between;
    width: 90% !important;
    position: relative;
    z-index: 0;
    margin-bottom: 5px;
    left: 50px !important;
  }

  .steppy-progress {
    background-color: #303046 !important;
  }

  .wizard,
  .wizard .nav-tabs,
  .wizard .nav-tabs .nav-item {
    position: relative;

  }

  .wizard .nav-tabs {
    border-bottom: none;
  }

  .wizard .nav-tabs:after {
    content: "";
    width: 80%;
    border-bottom: solid 2px #ccc;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 38%;
    z-index: -1;
  }

  .wizard .nav-tabs .nav-item .nav-link {
    width: 20px;
    height: 20px;
    margin-bottom: 6%;
    background: white;
    border: 2px solid #303046;
    color: #000;
    z-index: 10;
    position: relative;
    background-color: #303046;
  }

  /* .wizard .nav-tabs .nav-item .nav-link:hover {
    color: #333;
    border: 2px solid #333;
  } */

  .wizard .nav-tabs .nav-item .nav-link.active {
    background: #fff;
    border: 2px solid #fff;
    color: #A3241C;
    background-color: #A3241C;
  }

  .wizard .nav-tabs .nav-item .nav-link:after {
    content: " ";
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    opacity: 0;
    margin: 0 auto;
    bottom: 0px;
    border: 5px solid transparent;
    border-bottom-color: #0dcaf0;
    transition: 0.1s ease-in-out;
  }

  .nav-tabs .nav-item .nav-link.active:after {
    content: " ";
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    opacity: 1;
    top: 25px;
    margin: 0 auto;
    bottom: 0px;
    border: 10px solid transparent;
    border-bottom-color: #A3241C;
  }

  .wizard .nav-tabs .nav-item .nav-link svg {
    font-size: 25px;
  }

  hr {
    border: 1px solid grey;
    /* position: absolute; */
    /* top: 120px; */
    /* height: 5px; */
    position: relative;
    top: -28px;
    width: 90%;
    margin: 0;
    opacity: 1;
    left: 50px;
  }

  .nav-link {
    padding: 5px;
  }

  .tab-content>.active {
    padding: 25px;
  }

  option {
    background-color: #0d0d1c;
  }

  .next {
    width: 120px;
    background-color: #A3241C !important;
    border: none !important;
    color: #ffff;
    margin-top: 20px;
    margin-left: 20px;
    color: #fff !important;
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 15px;
    font-size: 14px;

  }
</style>

<script>

  import { computed } from 'vue'; // Import computed from Vue
  import GuestHeader from '@components/globals/guest/GuestHeader.vue';
  import SideBar from '@components/globals/costacaster/SideBar.vue';
  import { Vue3MultiStepper } from "vue3-multi-stepper";
  import { postData, fetchData, buildFormData } from '@services/base.js';
  import { getAllCountries, getAllStatesByCountry, getAllCitiesByState } from '@/store/Global/global';
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  export default {
    components: {
      GuestHeader,
      SideBar,
      Vue3MultiStepper,
    },
    data() {
      return {
        step: 1,
        responseData: {},
        isSubmitting: false,
       countries: {},
        states: {},
        cities: {},
        form: {
          title: "",
          description: "",
          category_id: 1,
        },
        video: {},
        thumbnail: {},
        loading: false,
        valueFromHeader: false,
        file: null,
        isVisible: true,
      };

    },

    computed: {
      tabs() {
        return [
          { title: "Upload", iconSuccess: null, isValid: true },
          { title: "Detail", iconSuccess: null, isValid: true },
          { title: "Video Element", iconSuccess: null, isValid: true },
          { title: "Visibility", iconSuccess: null, isValid: true },

        ];
      },
    },
    methods: {

      toggleVisibility() {
        this.isVisible = !this.isVisible;
      },

      calltovideoInput() {
        document.getElementById('videoUploader').click();
      },
      calltoImageInput() {
        document.getElementById('thumbnailUploader').click();
      },
      async onSubmit() {
        this.isSubmitting = true;
        let fd = new FormData();

        
          console.log(this.form);
        if (this.thumbnail) {
          fd.append('thumbnail', this.thumbnail)
        }
        if (this.form.type == 'short') {
          if (this.video) {
              fd.append('short', this.video);
          }
        }else{
          if (this.video) {
              fd.append('video', this.video);
          }
        }

        var endpoint = null;
        if (this.form.type) {
           endpoint = '/add-'+this.form.type; // Replace with your desired endpoint
        }else{


           endpoint = '/add-video'; // Replace with your desired endpoint
        }
        buildFormData(fd, this.form);

        this.responseData = await postData(endpoint, fd);
        toast.success(this.responseData.data.message, {
          autoClose: 1000,
        });
        setTimeout(() => this.$router.push({ name: 'home' }), 5000);
      },
      uploadDetail() {
        this.$router.push({ name: 'upload-detail' });
      },
      updateValueFromHeader(value) {
        this.valueFromHeader = value;
      },
      async handleFormSubmission() {
        this.loading = true;
        setTimeout(() => {
          location.reload();
        }, 2000);
      },
      thumbnailUpload(e) {
        var img = event.target.files[0];
        this.thumbnail = img;
      },
      removeVideo() {
        this.video = {};
        this.isVisible = true;
        const dynamicImagePath = 'img/upload.fc2c049c.png';
        const container = document.getElementById('uploaded');
        const existingImage = container.querySelector('img');
        container.innerHTML = '';

        // Create a new image element with the new source
        const newImage = document.createElement('img');
        newImage.alt = 'Uploaded Image';
        newImage.src = dynamicImagePath;

        // Append the new image element to the container
        container.appendChild(newImage);

      },
      handleFileChange(e) {
        e.preventDefault();
        var file = event.target.files[0];
        this.video = file;
        var fileReader = new FileReader();
        this.isVisible = false;
        if (file.type.match('image')) {
          fileReader.onload = function () {
            var img = document.createElement('img');
            img.src = fileReader.result;
            console.log(img);
            document.getElementById('uploaded').appendChild(img);
            document.getElementById('existing-image').remove();
          };
          fileReader.readAsDataURL(file);
        } else {
          fileReader.onload = function () {
            var blob = new Blob([fileReader.result], { type: file.type });
            var url = URL.createObjectURL(blob);
            var video = document.createElement('video');
            var timeupdate = function () {
              if (snapImage()) {
                video.removeEventListener('timeupdate', timeupdate);
                video.pause();
              }
            };
            video.addEventListener('loadeddata', function () {
              if (snapImage()) {
                video.removeEventListener('timeupdate', timeupdate);
              }
            });
            var snapImage = function () {
              var canvas = document.createElement('canvas');
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
              var image = canvas.toDataURL();
              var success = image.length > 100000;
              if (success) {
                var img = document.createElement('img');
                img.src = image;
                // console.log(image);
                document.getElementById('uploaded').appendChild(img);
                URL.revokeObjectURL(url);
              }
              const parent = document.getElementById('uploaded');
              parent.querySelector('img').remove();
              return success;
            };
            video.addEventListener('timeupdate', timeupdate);
            video.preload = 'metadata';
            video.src = url;
            // Load video in Safari / IE11
            video.muted = true;
            video.playsInline = true;
            video.play();
          };
          fileReader.readAsArrayBuffer(file);
        }

        // console.log(e);
      },
      // Add your step validation methods here

      async getAllCountries() {
        this.countries = await getAllCountries();
      },
      async getStateByCountry(country_id) {
        this.states = await getAllStatesByCountry(country_id);
      },
      async getCityByState(state_id) {
        this.cities = await getAllCitiesByState(state_id);
      },
    },

    mounted(){
      this.getAllCountries();
       var tooltipTriggerList = [].slice.call(
          document.querySelectorAll('[data-bs-toggle="tooltip"]')
        );
        var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
          return new bootstrap.Tooltip(tooltipTriggerEl);
        });

      // Advance Tabs
      $(".next").click(function () {
        const nextTabLinkEl = $(".nav-tabs .active")
          .closest("li")
          .next("li")
          .find("a")[0];
        const nextTab = new bootstrap.Tab(nextTabLinkEl);
        nextTab.show();
      });

      $(".previous").click(function () {
        const prevTabLinkEl = $(".nav-tabs .active")
          .closest("li")
          .prev("li")
          .find("a")[0];
        const prevTab = new bootstrap.Tab(prevTabLinkEl);
        prevTab.show();
      });
    }

  };

</script>