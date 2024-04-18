<template>
    <section class="main-guest-section">
        <SideBar @updateValue="updateValueFromHeader"></SideBar>
        <section
            :class="valueFromHeader ? 'guest-main-page-shop-header sidebar-section' : 'guest-main-page-shop-header sidebar-section1'">
            <GuestHeader @sendValue="sendValueToSidebar"></GuestHeader>
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
                        <img src="@assets/instagram.png">
                        <p>@shroud</p>
                    </div>
                    <div class="share-btn-alignment-flex">
                        <img src="@assets/instagram.png">
                        <p>@shroud</p>
                    </div>
                </div>
            </div>
            <div class="main-profile-box">
                <div class="uploaded-profile">
                    <img src="@assets/uploadedprofile.png" alt="">
                </div>
                <div class="user-name">
                    <h6>
                        Taimur Tariq Athlete
                    </h6>
                    <div class="user-followers-main">
                        <div class="user-followers">
                            <h2>
                                25
                            </h2>
                            <p>
                                Videos
                            </p>
                        </div>
                        <div class="user-followers">
                            <h2>
                                65
                            </h2>
                            <p>
                                Followers
                            </p>
                        </div>
                        <div class="user-followers">
                            <h2>
                                105
                            </h2>
                            <p>
                                Following
                            </p>
                        </div>
                    </div>
                    <p class="welcome">
                        Hello, Welcome To My Athlete Profile.
                    </p>
                    <hr>
                    <div class="cyclingteam">
                        <img src="@assets/cyclingteam.png" alt="">
                        <p>
                            Great Britain Cycling Team
                        </p>
                    </div>

                    <div class="user-bio-main">
                        <div class="user-bio">
                            <h6>
                                Racing Age:
                            </h6>
                            <p>
                                32
                            </p>
                        </div>
                        <div class="user-bio">
                            <h6>
                                Racer ID:
                            </h6>
                            <p>
                                987523
                            </p>
                        </div>
                        <div class="user-bio">
                            <h6>
                                Racing Category:
                            </h6>
                            <p>
                                BMX, Road
                            </p>
                        </div>
                        <div class="user-bio">
                            <h6>
                                Sanotioning Body:
                            </h6>
                            <p>
                                Xxxxx
                            </p>
                        </div>
                        <div class="user-bio">
                            <h6>
                                Location
                            </h6>
                            <p>
                                Sampletown, Xx, USA
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="edit-mnge">
                        <!-- <button class="mnge-btn">
                            Manage
                        </button> -->
                        <button class="edit-btn">
                            Edit Profile
                        </button>
                    </div>
                    <div class="hashtags-main">
                        <div class="hashtags">
                            <h6 class="sponsor">
                                Achievement/Hashtags
                                /Sponsor Links
                            </h6>
                            <div class="list">
                                <li>
                                    Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do
                                </li>
                                <li>
                                    Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do
                                </li>
                                <li>
                                    Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do
                                </li>
                            </div>
                            <h6 class="theman">
                                #Theman #Homeboy
                                #Bigplaya
                            </h6>
                        </div>
                    </div>
                </div>
            </div>

            <div class="athelete-change-main">
                <div class="change">
                    <h1>
                        Change Password
                    </h1>
                    <p>
                        Strong password required. Enter 8-15 characters. Do not include common words or names.
                        Combine
                        uppercase
                        letters, lowercase letters, numbers and symbols.
                    </p>
                </div>
                <div class="logo">
                    <h3>
                        User Name
                    </h3>
                    <p>
                        Athlete
                    </p>
                </div>

                <form @submit.prevent="onSubmit">
                    <div class="user-board-main">
                        <div class="password">
                            <p>
                                Old password:
                            </p>
                            <div class="password-container">
                                <input type="password" id="old_password" placeholder="............"
                                    v-model="v$.form.old_password.$model">
                                <img src="@assets/eye.png" v-if="!oldPasswordEye"
                                    @click="togglePasswordVisibility('old_password')">
                                <img src="@assets/eye-slash.png" v-if="oldPasswordEye"
                                    @click="togglePasswordVisibility('old_password')">
                            </div>
                            <div class="input-errors" v-for="(error, index) of v$.form.old_password.$errors"
                                :key="index">
                                <div class="error-msg">{{ error.$message }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="user-board-main">
                        <div class="password">
                            <p>
                                Create new password:
                            </p>
                            <div class="password-container">
                                <input type="password" id="password" placeholder="............."
                                    v-model="v$.form.password.$model">
                                <img src="@assets/eye.png" v-if="!passwordEye"
                                    @click="togglePasswordVisibility('password')">
                                <img src="@assets/eye-slash.png" v-if="passwordEye"
                                    @click="togglePasswordVisibility('password')">
                            </div>
                            <div class="input-errors" v-for="(error, index) of v$.form.password.$errors" :key="index">
                                <div class="error-msg">{{ error.$message }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="user-board-main">
                        <div class="password">
                            <p>
                                Confirm new password:
                            </p>
                            <div class="password-container">
                                <input type="password" id="confirmPassword" placeholder=".............."
                                    v-model="v$.form.password_confirmation.$model">
                                <img src="@assets/eye.png" v-if="!confirmPasswordEye"
                                    @click="togglePasswordVisibility('confirmPassword')">
                                <img src="@assets/eye-slash.png" v-if="confirmPasswordEye"
                                    @click="togglePasswordVisibility('confirmPassword')">
                            </div>
                            <div class="input-errors" v-for="(error, index) of v$.form.password_confirmation.$errors"
                                :key="index">
                                <div class="error-msg">{{ error.$message }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="change-psword-save">
                        <button type="submit" :disabled="v$.form.$invalid">
                            Save
                        </button>
                    </div>
                </form>
            </div>

        </section>



    </section>

</template>
<script>
    import { reactive, Vue, ref } from 'vue'; // Import reactive
    import GuestHeader from '@components/globals/guest/GuestHeader.vue';
    import SideBar from '@components/globals/costacaster/SideBar.vue';
    import ProductList from '@components/globals/costacaster/ProductList.vue';
    import RatingComponent from '@components/globals/costacaster/Rating.vue';
    import Counter from '@components/globals/costacaster/Counter.vue';
    import useVuelidate from '@vuelidate/core';
    import { required, minLength, sameAs } from '@vuelidate/validators';
    import { postData, fetchData } from '@services/base.js';
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    export default {
        components: {
            GuestHeader,
            ProductList,
            SideBar,
            RatingComponent,
            Counter,

        },
        data() {

            return {
                valueFromHeader: false,
                passwordEye: false,
                confirmPasswordEye: false,
                oldPasswordEye: false,
                form: {
                    old_password: '',
                    password: '',
                    password_confirmation: '',
                }
            }
        },
        setup() {
            const valueFromHeader = ref('');

            function sendValueToSidebar(value) {
                valueFromHeader.value = value;
            }


            function togglePasswordVisibility(inputId) {
                const passwordInput = document.getElementById(inputId);
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                } else {
                    passwordInput.type = 'password';
                }
            }

            return {
                valueFromHeader,
                sendValueToSidebar,
                togglePasswordVisibility,
                v$: useVuelidate()
            };
        },
        method: {
            updateValueFromHeader(value) {
                // Update the value in the parent component
                this.valueFromHeader = value;
            },
            async onSubmit() {


                const endpoint = '/change-password'; // Replace with your desired endpoint
                this.responseData = await postData(endpoint, this.form);
                console.log(this.responseData);
                toast.success(this.responseData.message, {
                    autoClose: 1000,
                });

            },
            checkPassword() {
                if (this.form.password !== this.form.password_confirmation) {
                    // toast.error('Password and confirm password should be matched',{
                    //         autoClose : 1000
                    // })
                }
            },
            togglePasswordVisibility(inputId) {
                const passwordInput = document.getElementById(inputId);
                if (inputId == 'password') {
                    this.passwordEye = !this.passwordEye;
                } else if (inputId == 'old_password') {
                    this.oldPasswordEye = !this.oldPasswordEye;
                } else {
                    this.confirmPasswordEye = !this.confirmPasswordEye;
                }
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                } else {
                    passwordInput.type = 'password';
                }
            },
        },
        created() {
            this.user = JSON.parse(localStorage.getItem('user') || null);
            console.log(this.form);
        },



        validations() {
            return {
                form: {
                    old_password: { required },
                    password: { required, min: minLength(8) },
                    password_confirmation: { sameAsPassword: sameAs(this.form.password) }
                },
            }
        },
    }

</script>