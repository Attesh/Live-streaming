<template style="overflow: hidden;">
  <div :class="showEventPopup ? 'add-event-main' : ''">
    <AddEventPopup v-if="showEventPopup" @eventModal="eventModal" />
  </div>
  <div :class="showEditEventPopup ? 'add-edit-main' : ''">
    <EditEventPopup v-if="showEditEventPopup" :event="currentEvent" @EditModal="EditModal(event)" />
  </div>
  <section class="main-guest-section calender-main-section">
    <SideBar @updateValue="true"></SideBar>

    <section :class="valueFromHeader ? 'sidebar-section' : 'sidebar-section1' ">
      <GuestHeader @sendValue="true"></GuestHeader>
      <CategoryList></CategoryList>
      <div class="add-calender">
        <div class="calendar-tabs">
          <ul>
            <select
              v-bind:class="{ 'tab-item active': tabCountrySelected === 'country', 'tab-item': changeTabCountry !== 'country' }"
              @change="getStateByCountry($event.target.value)" name="Country">
              <option value="">Country</option>
              <option v-for="country in countries.data" :value="country.id" :key="country.id">{{ country.name }}
              </option>
            </select>
            <select
              v-bind:class="{ 'tab-item active': tabCountrySelected === 'state', 'tab-item': getStateByCountry !== 'state' }"
              @change="getCityByState($event.target.value)" name="state">
              <option value="">State</option>
              <option v-for="state in states.data" :value="state.id" :key="state.id">{{ state.name }}</option>
            </select>
            <select
              v-bind:class="{ 'tab-item active': tabCountrySelected === 'city', 'tab-item': getCityByState !== 'city' }"
              name="city">
              <option value="">City</option>
              <option v-for="city in cities.data" :value="city.id" :key="city.id">{{ city.name }}</option>
            </select>
          </ul>
        </div>
        <div class=" date-wrapper">
          <div class="calander-add-events">
            <div class="calender-main-date">
              <label for="start-date">Start Date:</label>
              <input type="date" id="start-date" name="start-date" class="custom-calendar-input">
            </div>
            <div>
              <label for="end-date">End Date:</label>
              <input type="date" id="end-date" name="end-date" class="custom-calendar-input">
            </div>
          </div>

          <button class="addevent-btn" @click="eventModal"
            v-if="user.value && (user.value.role != 'guest' && user.value.role != 'fan')">
            Add Event
          </button>



        </div>
      </div>
      <div class="guest-header search-parent-wrapper">
        <div class="search-event">
          <!-- <h1>Search by event name</h1> -->
          <div class="home-search-field">
            <img src="@assets/featured-athlete/search-normal.svg" alt="Search Icon" srcset="" />
            <input type="text" placeholder="Event Search" />
          </div>

          <div class="card" v-for="(event, index) in eventlist" :key="index">
            <div class="card-data">
              <div class="calender-checkbox"
                v-if="user.value && (user.value.role != 'guest' && user.value.role != 'fan')">
                <input type="checkbox" name="" id="">
              </div>
              <div class="thumbnail">
                <router-link :to="{ name: 'event-detail',params : { id : event.id } }" style="  text-decoration: none;  
              cursor: pointer;"> <img :src="event.thumbnail" alt="Video Thumbnail" srcset="" />
                </router-link>

              </div>

              <div class="video-details">
                <h1>{{ event.name }}</h1>
                <div class="stats">
                  <p>{{ event.views }} Views</p>
                  <p>{{ event.date }}</p>
                </div>
                <div class="video-profile">
                  <img class="video-profile-img" src="https://picsum.photos/200/300" alt="Profile Image" />
                  <p class="video-profile-name">{{ event.name }}</p>
                  <img class="video-verify-icon" src="@assets/calender/verify.svg" alt="Verified Icon" />
                </div>
              </div>
            </div>
            <div class="dropdown" v-if="user.value && (user.value.role != 'guest' && user.value.role != 'fan')">
              <a class="btn btn-secondary dropdown-button " href="#" role="button" id="dropdownMenuLink"
                data-bs-toggle="dropdown" aria-expanded="false">
                <img style="width: 5px; cursor: pointer;" src="../../../assets/pointer.png" alt="">
              </a>

              <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li><a class="dropdown-item" href="#" @click="EditModal(event)">Edit</a></li>
                <li><a class="dropdown-item" href="#">Refresh</a></li>

              </ul>
            </div>

          </div>


        </div>
        <div class="map">
          <h1>Search by Map</h1>
          <div style="width: 100%;">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2965.0824050173574!2d-93.63905729999999!3d41.998507000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sWebFilings%2C+University+Boulevard%2C+Ames%2C+IA!5e0!3m2!1sen!2sus!4v1390839289319"
              width="100%" height="300px" frameborder="0" style="border:0; border-radius: 10px; "></iframe>
          </div>

        </div>
      </div>

    </section>
  </section>
  <Footer></Footer>

</template>
<script>
  import GuestHeader from '@components/globals/guest/GuestHeader.vue';
  import SideBar from '@components/globals/costacaster/SideBar.vue';
  import Footer from '@components/globals/costacaster/Footer.vue';
  import CategoryList from '@components/globals/costacaster/CategoryList.vue';
  import AddEventPopup from '@components/globals/costacaster/AddEventPopup.vue';
  import EditEventPopup from '@components/globals/costacaster/EditEventPopup.vue';
  import { defineComponent, ref } from 'vue';
  import { getAllCountries, getAllStatesByCountry, getAllCitiesByState } from '@/store/Global/global';
  import { fetchData } from '@services/base.js';
  import { useRouter } from 'vue-router';
  import { toast } from 'vue3-toastify';

  export default defineComponent({
    emits: ['sendValue'],
    components: {
      AddEventPopup,
      EditEventPopup,
      SideBar,
      GuestHeader,
      Footer,
      CategoryList,
    },
    data() {
      return {
        responseData: {},
        showEventPopup: false,
        showEditEventPopup: false,
        tabCountrySelected: 'country',
        valueFromHeader: true,
        eventlist: {},
        countries: {},
        states: {},
        cities: {},
        currentEvent : {}
      };
    },
    mounted() {
      this.getEventlist()
      this.getAllCountries();
    },
    methods: {
      eventModal() {
        this.showEventPopup = !this.showEventPopup;
      },
      EditModal(event) {
        this.currentEvent = event;
        this.showEditEventPopup = !this.showEditEventPopup;
      },
      async changeTabCountry(tab) {
        this.tabCountrySelected = tab;
      },
      updateValueFromHeader(value) {
        // Update the value in the parent component
        this.valueFromHeader = value;
      },
      async getEventlist() {
        try {
          const endpoint = '/event-list'; // Replace with your actual API endpoint
          const response = await fetchData(endpoint);

          // Assuming the API response has a property named 'events' that contains the event list
          this.eventlist = response.data?.data?.data;
          // console.log(this.eventlist, 'eventlist');
        } catch (error) {
          // console.error('Error fetching event list:', error);
        }
      },
      async getAllCountries() {
        // console.log('Init method called');
        this.countries = await getAllCountries();
        // console.log('Countries data:', this.countries.data);
      },
      async getStateByCountry(country_id) {
        this.states = await getAllStatesByCountry(country_id);
      },
      async getCityByState(state_id) {
        this.cities = await getAllCitiesByState(state_id);
      },



    },
    setup(props, { emit }) {
      const router = useRouter();
      const user = ref({}); // Create a ref for user data
      const sidemenuicon = ref("hide"); // Create a ref for sidemenuicon
      const isLogoutModalVisible = ref(false); // Create a ref for the logout modal visibility

      const sendValueToParent = () => {
        const valueToSend = 'show';
        emit('sendValue', valueToSend);
        sidemenuicon.value = "show";
      };

      const hidesidemenu = () => {
        const valueToSend = 'hide';
        emit('sendValue', valueToSend);
        sidemenuicon.value = "hide";
      };

      const showLogoutModal = () => {
        isLogoutModalVisible.value = true;
      };

      const closeLogoutModal = () => {
        isLogoutModalVisible.value = false;
      };

      const logout = () => {
        closeLogoutModal();
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        toast.success("Logout Successfully", {
          autoClose: 1000,
        });
        let props = router.resolve({
          name: 'home',
        });
        setTimeout(() => window.location.href = props.href, 3000);
      };

      return {
        user,
        sidemenuicon,
        isLogoutModalVisible,
        sendValueToParent,
        hidesidemenu,
        showLogoutModal,
        closeLogoutModal,
        logout,
      };
    },

    created() {
      this.user.value = JSON.parse(localStorage.getItem('user') || null);
    },


  });
</script>