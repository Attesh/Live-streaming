<template>
    <section class="main-guest-section">
        <SideBar @updateValue="updateValueFromHeader"></SideBar>
        <section :class="valueFromHeader ? 'guest-main-page-shop-header sidebar-section' : 'guest-main-page-shop-header sidebar-section1'">
            <GuestHeader @sendValue="sendValueToSidebar"></GuestHeader>
            <div v-if="user && user.role == 'fan'">
                <FanFollowersComponent></FanFollowersComponent>
                <hr class="fan-line">
            </div>


            <div style="padding: 30px; padding-bottom: 100px;">
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
                    <p>
                        User Name
                    </p>
                    <p>
                        Shroud
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
    import FanFollowersComponent from '@components/globals/fan/FanFollowersComponent.vue';
    import useVuelidate from '@vuelidate/core';
    import { required, minLength, sameAs } from '@vuelidate/validators';
    import { postData, fetchData } from '@services/base.js';
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    export default {
        components: {
            GuestHeader,
            SideBar,
            FanFollowersComponent,
        },
        data() {
            return {
                user: {},
                passwordEye: false,
                confirmPasswordEye: false,
                oldPasswordEye: false,
                valueFromHeader: false,

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
            return {
                valueFromHeader,
                sendValueToSidebar,
                v$: useVuelidate()
            };
        },
        methods: {
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
        created() {
            this.user = JSON.parse(localStorage.getItem('user') || null);
            console.log(this.form);
        },
    };
</script>