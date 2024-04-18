<template>
    <main>
    <div class="container">
      <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

              <div class="d-flex justify-content-center py-4">
                <router-link :to="{name : 'admin-login'}" class="logo d-flex align-items-center w-auto">
                  <img src="@public/admin-assets/img/logo.png" alt="">
                  <span class="d-none d-lg-block">Admin</span>
                </router-link>
              </div>

              <div class="card mb-3">

                <div class="card-body">

                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                    <p class="text-center small">Enter your username & password to login</p>
                  </div>

                  <form class="row g-3 needs-validation"  @submit.prevent="onSubmit">

                    <div class="col-12">
                      <label for="email" class="form-label">Email</label>
                      <div class="input-group has-validation">
                        <span class="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="email" v-model="v$.form.email.$model" name="email" class="form-control" id="email">
                        <!-- <div class="invalid-feedback">Please enter your Email.</div> -->
                        <div class="invalid-feedback" v-for="(error, index) of v$.form.email.$errors" :key="index">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="yourPassword" class="form-label">Password</label>
                      <input type="password" v-model="v$.form.password.$model" name="password" class="form-control" id="yourPassword">
                      <!-- <div class="invalid-feedback">Please enter your password!</div> -->
                        <div class="input-errors" v-for="(error, index) of v$.form.password.$errors" :key="index">
						    <div class="error-msg">{{ error.$message }}</div>
					    </div>
                    </div>

                    <div class="col-12">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe">
                        <label class="form-check-label" for="rememberMe">Remember me</label>
                      </div>
                    </div>
                    <div class="col-12">
                      <button class="btn btn-primary w-100" :disabled="v$.form.$invalid" type="submit">Login</button>
                    </div>
                    
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>
  </main>
</template>
<script>
import { reactive, Vue } from 'vue'; // Import reactive
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, sameAs } from '@vuelidate/validators';
import { postData, fetchData } from '@services/base.js';
import { saveUserToLocalStorage } from '@/store/Global/local-storage.js';
import { mapState, mapActions, mapMutations } from 'vuex';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
	computed: {
		...mapState(['user']),
	},
	setup() {
		return { v$: useVuelidate() }
	},
	data() {
		return {
			responseData: '',
			form: {
				email: '',
				password: '',
			},
			passwordEye: false
		}
	},
	methods: {
		...mapActions('global', ['store']),
		async onSubmit() {
			if (this.v$.form.$invalid) {
				toast.error('Form is not valid', {
					autoClose: 1000
				})
			} else {
				try {
					const endpoint = '/login'; // Replace with your desired endpoint
					this.responseData = await this.store({
						method: 'post',
						route: endpoint,
						data: this.form,
						mutation: 'SET_USER',
						variable: 'user',
					});
					if (this.responseData.data.error) {
						console.log(this.responseData.data.error[0]);
						toast.error(this.responseData.data.error[0], {
							autoClose: 1000
						})
					} else {
						toast.success(this.responseData.data.message, {
							autoClose: 1000,
						});
						saveUserToLocalStorage(this.responseData.data.user);
						localStorage.setItem('admin-token', this.responseData.data.token);
						let props = this.$router.resolve({
							name: 'admin-dashboard',
						});
						setTimeout(() => window.location.href = props.href, 5000);
					}

				} catch (error) {
					console.log(error)
				}
			}
		},
		togglePasswordVisibility(inputId) {
			const passwordInput = document.getElementById(inputId);
			if (passwordInput.type === 'password') {
				passwordInput.type = 'text';
				this.passwordEye = true;
			} else {
				passwordInput.type = 'password';
				this.passwordEye = false;
			}
		}
	},
	validations() {
		return {
			form: {
				email: { required, email },
				password: { required },
			},
		}
	},

}
</script>