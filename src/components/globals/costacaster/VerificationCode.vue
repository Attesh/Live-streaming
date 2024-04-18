<template>
    <div style="display:flex;">
        <section class="left-section">
            <div id="container">
                <img class="leftside-image-login" src="@assets/Content-1.png">
            </div>
        </section>

        <section class="right-section">
            <div id="container">
                <h1 class="heading-main">Reset Password</h1>
            </div>
            <div class="form">
                <form @submit.prevent="onSubmit">
                    <p class="label-color">Code</p>
                    <input class="input" type="number" v-model="v$.form.token.$model" placeholder="Enter Code">

                    <div class="input-errors" v-for="(error, index) of v$.form.token.$errors" :key="index">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                    <p class="label-color">New Password</p>
                    <div class="login-password-container">
                        <input class="input" type="password" placeholder="New Password" v-model="v$.form.password.$model"
                            id="password">
                        <img src="@assets/eye.png" v-if="!passwordEye" @click="togglePasswordVisibility('password')">
                        <img src="@assets/eye-slash.png" v-if="passwordEye" @click="togglePasswordVisibility('password')">
                    </div>


                    <div class="input-errors" v-for="(error, index) of v$.form.password.$errors" :key="index">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                    <p class="label-color">Confirm Password</p>
                    <div class="login-password-container">
                        <input class="input" type="password" placeholder="Confirm Password"
                            v-model="v$.form.password_confirmation.$model" id="confirm_password">
                        <img src="@assets/eye.png" v-if="!confirmPasswordEye"
                            @click="togglePasswordVisibility('confirm_password')">
                        <img src="@assets/eye-slash.png" v-if="confirmPasswordEye"
                            @click="togglePasswordVisibility('confirm_password')">
                    </div>


                    <div class="input-errors" v-for="(error, index) of v$.form.password_confirmation.$errors" :key="index">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                    <button type="submit" :disabled="v$.form.$invalid" class="btn-login" style="cursor: pointer;">
                        Reset Password
                    </button>
                </form>
                <p class="last-test">
                    Already have an account?
                    <router-link :to="{ name: 'login' }" style="text-decoration:none">
                        <span class="color-reg"> Login</span>
                    </router-link>
                </p>
            </div>
        </section>
    </div>
</template>
<style type="text/css">
.list-data ul {
    list-style: none;
}
</style>
<script>
import { reactive, Vue } from 'vue'; // Import reactive
import useVuelidate from '@vuelidate/core';
import { required, maxLength, minLength, sameAs } from '@vuelidate/validators';
import { postData, fetchData } from '@services/base.js';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


export default {
    setup() {
        return { v$: useVuelidate() }
    },

    data() {
        return {
            responseData: '',
            form: {
                token: '',
                password: '',
                password_confirmation: '',
            },
            passwordEye: false,
            confirmPasswordEye: false,
        }
    },
    methods: {
        async onSubmit() {

            if (this.v$.form.$invalid) {
                toast.error('Form is not valid', {
                    autoClose: 1000
                })
            } else {
                try {
                    const endpoint = '/set/password'; // Replace with your desired endpoint
                    this.responseData = await postData(endpoint, this.form);
                    toast.success(this.responseData.message, {
                        autoClose: 1000,
                    });
                    setTimeout(() => this.$router.push({ name: 'login' }), 3000);
                } catch (error) {
                    var errorObject = error.response.data.errors
                    if (errorObject) {
                        toast.error(errorObject[Object.keys(errorObject)[0]][0], {
                            autoClose: 1000
                        });
                    } else {
                        toast.error(error.response.data.message, {
                            autoClose: 1000
                        });
                    }

                }
            }
        },
        togglePasswordVisibility(inputId) {
            const passwordInput = document.getElementById(inputId);
            if (inputId == 'password') {
                this.passwordEye = !this.passwordEye;
            } else {
                this.confirmPasswordEye = !this.confirmPasswordEye;
            }
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
            } else {
                passwordInput.type = 'password';
            }
        }
    },

    validations() {
        return {
            form: {
                token: { required, min: minLength(3), max: maxLength(4) },
                password: { required, min: minLength(8) },
                password_confirmation: { sameAsPassword: sameAs(this.form.password) }
            },
        }
    },
}
</script>