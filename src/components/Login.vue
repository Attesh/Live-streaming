<template>
	<div style="display:flex;">
		<section class="left-section">
			<div id="container">
				<img class="leftside-image-login" src="@assets/Content.png">
			</div>
		</section>
		<section class="right-section">
			<div id="space" class="right-side-space1"></div>
			<div id="container">
				<h1 class="heading-main">Hey there,<br> welcome back</h1>
				<div class="socail-buttons">
					<img src="@assets/Button.png" @click="googleLogin" style="cursor:pointer"><br>
					<img src="@assets/Button-1.png" @click="facebookLogin" style="cursor:pointer">
				</div>
				<img class="loinorimg" src="@assets/Login.png">
			</div>
			<div class="form">
				<form @submit.prevent="onSubmit">
					<p class="label-color">Email Address</p>
					<input class="input" v-model="v$.form.email.$model" type="email" placeholder="Enter Your Email Address">
					<div class="input-errors" v-for="(error, index) of v$.form.email.$errors" :key="index">
						<div class="error-msg">{{ error.$message }}</div>
					</div>
					<p class="label-color">Password</p>
					<div class="login-password-container">
						<input type="password" v-model="v$.form.password.$model" id="oldPassword"
							placeholder="............">
						<img src="@assets/eye.png" v-if="!passwordEye" @click="togglePasswordVisibility('oldPassword')">
						<img src="@assets/eye-slash.png" v-if="passwordEye"
							@click="togglePasswordVisibility('oldPassword')">
					</div>
					<div class="input-errors" v-for="(error, index) of v$.form.password.$errors" :key="index">
						<div class="error-msg">{{ error.$message }}</div>
					</div>
					<!-- <img class="eye-img" src="@assets/eye-slash.png"> -->
					<p class="forgot-btn"> <router-link :to="{ name: 'forgot-password' }" style="text-decoration:none">
							<span class="color-reg"> Forgot Password</span></router-link></p>

					<button type="submit" :disabled="v$.form.$invalid" class="btn-login"
						style="cursor:pointer">Login</button>

					<p class="last-test">Don’t have an account? <router-link :to="{ name: 'register' }"
							style="text-decoration:none"> <span class="color-reg"> Register</span></router-link></p>
				</form>
			</div>
		</section>
	</div>
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
	created() {
		if (this.$route.params.provider == 'google') {
			this.loginBySocailMedia(this.$route.params.provider);
		}
	},

	data() {
		return {
			responseData: '',
			socialData: '',
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
				// console.log('aya');
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
						// console.log(this.responseData.data.error[0]);
						toast.error(this.responseData.data.error[0], {
							autoClose: 1000
						})
					} else {
						toast.success(this.responseData.data.message, {
							autoClose: 1000,
						});
						saveUserToLocalStorage(this.responseData.data.user);
						localStorage.setItem('authToken', this.responseData.data.token);
						if(this.responseData.data.user.role == 'athelete'){
							let props = this.$router.resolve({
								name: 'athelete-home',
							});
							setTimeout(() => window.location.href = props.href, 5000);
						}else if(this.responseData.data.user.role == 'fan'){
							let props = this.$router.resolve({
								name: 'fan-home',
							});
							setTimeout(() => window.location.href = props.href, 5000);
						}else if(this.responseData.data.user.role == 'costacaster'){
							let props = this.$router.resolve({
								name: 'corsacaster-home',
							});
							setTimeout(() => window.location.href = props.href, 5000);
						}else{
							let props = this.$router.resolve({
								name: 'home',
							});
							setTimeout(() => window.location.href = props.href, 5000);
						}
						
					}

				} catch (error) {
					console.log(error)
				}
			}
		},
		async googleLogin() {
			try {
				const endpoint = '/authorize/google/redirect'; // Replace with your desired endpoint
				this.socialData = await fetchData(endpoint);
				window.location.href = this.socialData.url;
			} catch (error) {
				console.log(error);
				// toast.error(error.response.data.message,{
				// 	autoClose : 1000
				// })
			}
		},
		async facebookLogin() {
			try {
				const endpoint = '/authorize/facebook/redirect'; // Replace with your desired endpoint
				this.socialData = await fetchData(endpoint);
				window.location.href = this.socialData.url;
			} catch (error) {
				console.log(error);
				// toast.error(error.response.data.message,{
				// 	autoClose : 1000
				// })
			}
		},
		async loginBySocailMedia(platform) {

			const endpoint = 'authorize/' + platform + '/callback'; // Replace with your desired endpoint
			this.responseData = await fetchData(endpoint, { 'code': this.$route.query.code });
			console.log(this.responseData);
			toast.success(this.responseData.message, {
				autoClose: 1000,
			});
			saveUserToLocalStorage(this.responseData.user);
			localStorage.setItem('authToken', this.responseData.token);
			let props = this.$router.resolve({
				name: 'dashboard',
			});
			setTimeout(() => window.location.href = props.href, 5000);
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