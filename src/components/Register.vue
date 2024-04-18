<template>
  <div style="display:flex;">
    <section class="left-section">
      <div id="container">
        <img class="leftside-image-login" src="@assets/Content-1.png">
      </div>
    </section>

    <section class="right-section">
      <div id="container">
        <h1 class="heading-main">Register</h1>
      </div>
      <div class="form">
        <form @submit.prevent="onSubmit">
          <p class="label-color">First Name</p>
          <input v-model="v$.form.first_name.$model" class="input" type="text" placeholder="Enter your First Name">

          <div class="input-errors" v-for="(error, index) of v$.form.first_name.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
          </div>

          <p class="label-color">Last Name</p>
          <input v-model="v$.form.last_name.$model" class="input" type="text" placeholder="Enter your Last Name">

          <div class="input-errors" v-for="(error, index) of v$.form.last_name.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
          </div>

          <p class="label-color">Role</p>
          <select class="input drop-down-wrapper" v-model='v$.form.role_id.$model'
            @change="getPlan(v$.form.role_id.$model)">
            <option value="" disabled>Please Select Role </option>
            <option v-for="role in roles.data" :key="role.id" :value="role.id">{{ role.name }} </option>
          </select>

          <p v-if="plan.data">
            Price : {{ plan.data?.data?.price }} $ Per Month
          </p>
          <p v-if="planData">
            Features
          </p>
          <p v-html="planData" class="list-data">

          </p>

          <p class="label-color">Email Address</p>
          <input v-model="v$.form.email.$model" class="input" type="text" placeholder="Enter Your Email Address">

          <div class="input-errors" v-for="(error, index) of v$.form.email.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
          </div>

          <p class="label-color">Password</p>
          <div class="login-password-container">
            <input v-model="v$.form.password.$model" class="input" type="password" placeholder="Enter Your Password"
              id="password">
            <img src="@assets/eye.png" v-if="!passwordEye" @click="togglePasswordVisibility('password')">
            <img src="@assets/eye-slash.png" v-if="passwordEye" @click="togglePasswordVisibility('password')">
          </div>
          <div class="input-errors" v-for="(error, index) of v$.form.password.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
          </div>

          <p class="label-color">Confirm Password</p>
          <div class="login-password-container">
            <input v-model="v$.form.password_confirmation.$model" class="input" @input="checkPassword()" type="password"
              placeholder="Enter Your Password" id="confirm_password">
            <img src="@assets/eye.png" v-if="!confirmPasswordEye" @click="togglePasswordVisibility('confirm_password')">
            <img src="@assets/eye-slash.png" v-if="confirmPasswordEye"
              @click="togglePasswordVisibility('confirm_password')">
          </div>
          <div class="input-errors" v-for="(error, index) of v$.form.password_confirmation.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
          </div>

          <button type="submit" :disabled="v$.form.$invalid" class="btn-login">Register</button>
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
    mounted() {
      this.getRoles();
    },
    setup() {
      return { v$: useVuelidate() }
    },

    data() {
      return {
        responseData: '',
        roles: {},
        plan: {},
        planData: '',
        form: {
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          password_confirmation: '',
          role_id: '',
        },
        passwordEye: false,
        confirmPasswordEye: false,
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

        if (this.v$.form.$invalid) {
          toast.error('Form is not valid', {
            autoClose: 1000
          })
        } else {
          try {
            const endpoint = '/register'; // Replace with your desired endpoint
            this.responseData = await postData(endpoint, this.form);
            toast.success(this.responseData.data.message, {
              autoClose: 1000,
            });
            setTimeout(() => this.$router.push({ name: 'login' }), 5000);
          } catch (error) {
            console.log(error);
            // toast.error(error.response.data.message,{
            //     autoClose : 1000
            // });
          }
        }
      },
      async getRoles() {
        try {
          const getRole = await fetchData('get-all-roles');
          this.roles = getRole.data;
          console.log(this.roles.data);
        } catch (error) {
          console.log(error);
          // toast.error(error.response.data.message,{
          //     autoClose : 1000
          // });
        }
      },
      async getPlan(roleId) {
        try {
          if (roleId) {
            console.log(roleId);
            this.plan = await fetchData('get-plan-by-role/' + roleId);
            console.log(this.plan);
            this.planData = this.plan.data?.data?.content;
          }
        } catch (error) {
          console.log(error);
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
          first_name: {
            required, name_validation: {
              $validator: validName,
              $message: 'Invalid Name. Valid name only contain letters, dashes (-) and spaces'
            }
          },
          last_name: {
            required, name_validation: {
              $validator: validName,
              $message: 'Invalid Name. Valid name only contain letters, dashes (-) and spaces'
            }
          },
          email: { required, email },
          role_id: { required },
          password: { required, min: minLength(8) },
          password_confirmation: { sameAsPassword: sameAs(this.form.password) }
        },
      }
    },
  }
</script>