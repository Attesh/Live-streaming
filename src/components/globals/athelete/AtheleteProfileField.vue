<template>
    <div>
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
        <div style="text-align: start; margin-left: 130px;">
            <h6 style="color: #fff; font-size: 16px;">
                #Racer #Rider #Nike
            </h6>
            <u style="font-size: 17px; color: #A3241C;">
                Future Event Itinerary Links
            </u>
        </div>
    </div>

</template>
<script>
    import { reactive, Vue, ref } from 'vue'; // Import reactive
    import useVuelidate from '@vuelidate/core';
    import { required, email, minLength, sameAs } from '@vuelidate/validators';
    import { postData, fetchData } from '@services/base.js';
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';


    export default {
        data() {
            return {

                user: {},
                responseData: '',
                countries: '',
                valueFromHeader: false,
            };
        },

        methods: {
            async onSubmit() {


                const endpoint = '/update-profile'; // Replace with your desired endpoint
                this.responseData = await postData(endpoint, this.user);
                console.log(this.responseData);
                toast.success(this.responseData.message, {
                    autoClose: 1000,
                });

            },
            async getAllcountries() {
                const endpoint = '/get-all-countries'; // Replace with your desired endpoint
                this.countries = await fetchData(endpoint);
                console.log(this.countries);
            },
            updateValueFromHeader(value) {
                // Update the value in the parent component
                this.valueFromHeader = value;
            },

        },
        created() {
            this.user = JSON.parse(localStorage.getItem('user') || null);
            this.getAllcountries();

            console.log(this.user);
        }
    }
</script>