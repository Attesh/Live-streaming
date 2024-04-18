<template>
    <div class="add-edit-popup-main">
        <div class="add-event-popup-cross">
            <h1>
                Edit EVENT
            </h1>
            <img src="@assets/closered.png" alt="" @click="closeEditModal">
        </div>
        <form @submit.prevent="onSubmit" enctype="multipart/form-data">


            <div class="add-event-popup">
                <p>
                    Event Name
                </p>
                <input type="text" placeholder="Event Name" name="" id="event-name" v-model="form.name" />
            </div>


            <div class="add-event-popup">
                <p>
                    Category
                </p>
                <select name="category" v-model='v$.form.category_id.$model'>
                    <option value="" disabled>Please Select Category </option>
                    <option v-for="category in category.data?.data" :value="category.id"> {{ category.name }}</option>

                </select>
            </div>
            <div class="add-event-popup">
                <p>
                    Country
                </p>
                <select class="dropdown-payment" v-model='v$.form.country_id.$model'
                    @change="getStateByCountry(v$.form.country_id.$model)">
                    <option value="" disabled>Please Select Country</option>
                    <option v-for="country in countries.data" :key="country.id" :value="country.id">
                        {{ country.name }}
                    </option>
                </select>
            </div>
            <div class="add-event-popup">
                <p>
                    State
                </p>
                <select class="dropdown-payment" v-model='v$.form.state_id.$model'
                    @change="getCityByState(v$.form.state_id.$model)">
                    <option value="" disabled>Please Select State</option>
                    <option v-for="state in states.data" :key="state.id" :value="state.id">
                        {{ state.name }}
                    </option>
                </select>
            </div>
            <div class="add-event-popup">
                <p>
                    City
                </p>
                <select class="dropdown-payment" v-model='v$.form.city_id.$model'>
                    <option value="" disabled>Please Select City</option>
                    <option v-for="city in cities.data" :key="city.id" :value="city.id">
                        {{ city.name }}
                    </option>
                </select>
            </div>
            <div class="add-event-popup">
                <p>
                    Event Date
                </p>
                <input type="date" name="" id="" v-model='v$.form.date.$model'>
            </div>
            <!-- <div class="add-event-popup">
          <p>
            Event Time
          </p>
          <input type="time" name="" id="" v-model='v$.form.eventtime.$model'>
        </div> -->

            <div class="add-event-popup">
                <p>
                    Event Location
                </p>
                <div style="width: 100%;">
                    <input type="text" placeholder="Search..." v-model='v$.form.location.$model'>
                    <img src="@assets/featured-athlete/search-normal.svg" alt="" srcset="" />
                </div>
            </div>
            <div class="add-event-popup">
                <p>
                    Description
                </p>
                <textarea name="" id="" cols="30" rows="10" v-model='v$.form.description.$model'></textarea>
            </div>
            <div class="add-event-popup">
                <p>
                    Thumbnail
                </p>
                <button type="button" @click="calltothumnailInput">SELECT MEDIA</button>
                <input type="file" name="thumbnail" id="thumbnailInput" @change="handleinputthumnail">
            </div>
            <div class="Event-popup-btn">
                <button type="submit">
                    Add Event
                </button>
                <button @click="closeEditModal">
                    Cancel
                </button>
            </div>
        </form>
    </div>
</template>
<script>

    import useVuelidate from '@vuelidate/core';
    import { required, numeric, minLength, maxLength } from '@vuelidate/validators';
    import { getAllCountries, getAllStatesByCountry, getAllCitiesByState } from '@/store/Global/global';
    import { postData, fetchData, buildFormData } from '@services/base.js'
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    export default {

        setup() {
            return { v$: useVuelidate() }
        },
        props : {
            event : Object,
        },
        data() {
            return {
                responseData: {},
                user: {},
                countries: {},
                states: {},
                cities: {},
                category: {},
                thumnail: {},
                form: {
                    name: '',
                    category_id: '',
                    country_id: '',
                    state_id: '',
                    city_id: '',
                    date: '',
                    eventtime: '',
                    location: '',
                    description: '',
                    thumbnail: '',
                }

            }
        },
        methods: {

            async closeEditModal() {
                this.$emit('EditModal', false);
            },
            async onSubmit() {
                let fd = new FormData();
                if (this.thumbnail) {
                    // console.log(this.thumbnail);
                    fd.append('thumbnail', this.thumbnail)
                }

                buildFormData(fd, this.form);
                const endpoint = '/add-event'; // Replace with your desired endpoint
                this.responseData = await postData(endpoint, fd);
                toast.success(this.responseData.data.message, {
                    autoClose: 1000,
                });
                // console.log(this.form);
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
            async getallcategories() {
                const params = { type: 'event' };
                const endpoint = '/get-all-parent-categories'
                this.category = await fetchData(endpoint, params);
                // console.log('..>>>>>>>>>>>>>>>>', this.category);
            },
            updateValueFromHeader(value) {
                // Update the value in the parent component
                this.valueFromHeader = value;
            },
            handleinputthumnail(e) {
                var file = e.target.files[0];
                this.thumbnail = file;
            },
            calltothumnailInput() {
                console.log('click');
                document.getElementById('thumbnailInput').click();
            }


        },
        mounted() {
            this.user = JSON.parse(localStorage.getItem('user'));
            this.getAllCountries(); // Call the init method to fetch countries
            this.getallcategories();
            this.form = this.event;
        },
        validations() {
            return {
                form: {
                    name: { required },
                    country_id: { required },
                    state_id: { required },
                    city_id: { required },
                    date: { required },
                    eventtime: { required },
                    location: { required },
                    description: { required },
                    category_id: { required }
                },
            }
        },
    }
</script>