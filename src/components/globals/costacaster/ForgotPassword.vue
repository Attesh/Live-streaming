<template>
  <div style="display:flex;">
    <section class="left-section">
      <div id="container">
        <img class="leftside-image-login" src="@assets/Content-1.png">
      </div>
    </section>

    <section class="right-section">
      <div id="container">
        <h1 class="heading-main">Forgot Password</h1>
      </div>
      <div class="form">
        <form @submit.prevent="onSubmit">
          <p class="label-color">Email Address</p>
          <input v-model="v$.form.email.$model" class="input" type="text" placeholder="Enter your email address">
          <div class="input-errors" v-for="(error, index) of v$.form.email.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
          </div>

          <button class="btn-login" type="submit" style="cursor: pointer;" :disabled="v$.form.$invalid">
            Send
          </button>

          <!-- <button class="btn-login">
            <router-link :to="{ name: 'reset-password' }" style="text-decoration: none; color: #ffff;" type="submit"
              :disabled="v$.form.$invalid">Send</router-link>
          </button> -->

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
import { required, email, minLength, sameAs } from '@vuelidate/validators';
import { postData, fetchData } from '@services/base.js';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


export function validName(name) {
  let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
  if (validNamePattern.test(name)) {
    return true;
  }
  return false;
}


export default {
  setup() {
    return { v$: useVuelidate() }
  },

  data() {
    return {
      responseData: '',
      form: {
        email: '',
      }
    }
  },
  methods: {

    checkPassword() {
      if (this.form.password !== this.form.password_confirmation) {
        // toast.error('Password and confirm password should be matched',{
        //         autoClose : 1000
        // })
      }
    },
    async onSubmit() {
      console.log('submit')
      if (this.v$.form.$invalid) {
        toast.error('Form is not valid', {
          autoClose: 1000
        })
      } else {
        try {
          const endpoint = '/forget/password'; // Replace with your desired endpoint
          this.responseData = await postData(endpoint, this.form);
          if (this.responseData.status) {
            toast.success(this.responseData.message, {
              autoClose: 1000,
            });
            setTimeout(() => this.$router.push({ name: 'reset-password' }), 3000);
          } else {
            toast.error(this.responseData.message, {
              autoClose: 1000,
            });
          }
        } catch (error) {
          console.log(error);
          // toast.error(error.response.data.message,{
          //     autoClose : 1000
          // });
        }
      }
    }
  },

  validations() {
    return {
      form: {
        email: { required, email },
      },
    }
  },
}
</script>
