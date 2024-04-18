<template>
	<section :class="{ 'sidemenushow': valueFromHeader === 'show', 'dpnon-wdth': !isActive }" class="sidemenu sidemenu-home">
		<div class="guest-sidemenu-container" id="container">

			<img alt="Click me" @click="toggleValue" class="hamburgermenuicon-sidemenu"
				src="@assets/hamburger-menu-icon-png-white-10.jpg" />

			<div :class="this.isActive ? 'guest-logo-div' : 'guest-logo-div dpnon'">
				<router-link :to="{ name: 'home' }"><img class="logo-guest-page" src="@assets/Corsacaster.png" />
				</router-link>
			</div>

			<h2 :class="this.isActive ? '' : 'dpnon'" class="guest-sidemenu-color menu-title calender-menu">Menu</h2>
			<div class="parent-div-calender">
				<router-link :to="{ name: 'home' }" style="text-decoration:none">
					<div :class="this.tab == 'home' ? 'selectd guest-sidemenu-selection' : 'guest-sidemenu-selection'">
						<img src="@assets/Vector (6).png" />
						<h2 :class="this.isActive ? '' : 'dpnon'" class="guest-sidemenu-color">
							Home
						</h2>
					</div>
				</router-link>
				<router-link :to="{ name: 'calendar' }" style="text-decoration:none">
					<div
						:class="this.tab == 'calendar' ? 'selectd guest-sidemenu-selection' : 'guest-sidemenu-selection'">
						<img src="@assets/category.png" />
						<h2 :class="this.isActive ? '' : 'dpnon'" class="guest-sidemenu-color">Calendar</h2>
					</div>
				</router-link>
				<router-link :to="{ name: 'shop' }" style="text-decoration:none">
					<div :class="this.tab == 'shop' ? 'selectd guest-sidemenu-selection' : 'guest-sidemenu-selection'">
						<img src="@assets/profile.png" />
						<h2 :class="this.isActive ? '' : 'dpnon'" class="guest-sidemenu-color">
							Shop
						</h2>
					</div>
				</router-link>
				<router-link :to="{ name: 'about' }" style="text-decoration:none">
					<div :class="this.tab == 'about' ? 'selectd guest-sidemenu-selection' : 'guest-sidemenu-selection'">
						<img src="@assets/@.png" />
						<h2 :class="this.isActive ? '' : 'dpnon'" class="guest-sidemenu-color">About </h2>
					</div>
				</router-link>
				<div style="padding: 25px;" :class="this.isActive ? '' : 'dpnon'">
					<div>
						<h1 style="font-size: 16px; ">
							Featured Athelete
						</h1>
						<img style="width: 100%;border-radius: 10px; height: 200px; " src="@assets/Rectangle-9574.png" alt="">
					</div>
					<div>
						<h1 style="font-size: 16px; margin-top: 10px;">
							Overwatch 2
						</h1>
						<div style="display: flex; align-items: baseline; gap: 11px; margin-top: 0px; ">
							<img width="7px" src="@assets/Ellipse-11.png" alt="">
							<p style="font-size: 14px;">
								823k
							</p>
						</div>
						<img style="width: 100%;border-radius: 10px; object-fit: cover; height: 200px;" src="@assets/cycling-2.png"
							alt="">
					</div>
					<div>
						<h1 style="font-size: 16px;margin-top: 10px; ">
							Overwatch 3
						</h1>
						<div style="display: flex; align-items: baseline; gap: 11px; margin-top: 0px;">
							<img style=" width:7px ; " src="@assets/Ellipse-11.png" alt="">
							<p style="font-size: 14px;">
								823k
							</p>
						</div>
						<img style="width: 100%;border-radius: 10px; object-fit: cover; height: 200px;" src="@assets/cycling-1.png"
							alt="">
					</div>
				</div>


			</div>


			<div class="feature-athlete" v-if="!user">
				<h1>Featured Athlete</h1>
				<div class="athlete-container">
					<div class="img">
						<img src="@assets/featured-athlete/1.png" alt="" />
					</div>
					<h5>Overwatch 2</h5>
					<h6>
						<img src="@assets/featured-athlete/ellipse.svg" alt="" /> 823K
					</h6>
				</div>
				<div class="athlete-container">
					<div class="img">
						<img src="@assets/featured-athlete/2.png" alt="" />
					</div>
					<h5>Valorant</h5>
					<h6>
						<img src="@assets/featured-athlete/ellipse.svg" alt="" /> 182sK
					</h6>
				</div>
				<div class="athlete-container">
					<div class="img">
						<img src="@assets/featured-athlete/3.png" alt="" />
					</div>
					<h5>Genshin Impact</h5>
					<h6>
						<img src="@assets/featured-athlete/ellipse.svg" alt="" /> 328K
					</h6>
				</div>
				<div class="athlete-container">
					<div class="img">
						<img src="@assets/featured-athlete/4.png" alt="" />
					</div>
					<h5>Dota 2</h5>
					<h6>
						<img src="@assets/featured-athlete/ellipse.svg" alt="" /> 189K
					</h6>
				</div>
				<div class="athlete-container">
					<div class="img">
						<img src="@assets/featured-athlete/5.png" alt="" />
					</div>
					<h5>Call of Duty: War...</h5>
					<h6>
						<img src="@assets/featured-athlete/ellipse.svg" alt="" /> 219K
					</h6>
				</div>
				<div class="athlete-container">
					<div class="img">
						<img src="@assets/featured-athlete/6.png" alt="" />
					</div>
					<h5>Language of Leg...</h5>
					<h6>
						<img src="@assets/featured-athlete/ellipse.svg" alt="" /> 18K
					</h6>
				</div>
				<button class="see-all-btn">See All</button>
			</div>

			<div :class="this.isActive ? '' : 'dpnon'" class="sidebar-img">
				<div class="sidebar-content">
					<div class="sidebar-img-heading">Want to Create
						Sports Video?</div>
					<div class="sidebar-para">
						Become an succeed streamer.
					</div>
					<div class="sidebar-link" @click="register">
						Start Live Streaming
					</div>
				</div>
				<img src="../../../assets/sidebarimg.png" />

			</div>
		</div>
	</section>
</template>
<style></style>
<script>
	import 'vue3-toastify/dist/index.css';
	import { toast } from 'vue3-toastify';
	import { defineComponent, ref } from 'vue';
	import Vue from 'vue';
	import VueRouter from 'vue-router';

	export default defineComponent({
		props: {
			valueFromHeader: String
		},
		data() {
			return {
				user: {
				},
				tab: 'home',
				isActive: true,
			};
		},
		created() {
			this.user = JSON.parse(localStorage.getItem('user'));
			this.tabSelected(this.$route.name);
		},
		methods: {
			logout() {
				localStorage.removeItem('user');
				localStorage.removeItem('authToken');
				toast.success("Logout Successfully", {
					autoClose: 1000,
				});
				let props = this.$router.resolve({
					name: 'home',
				});
				setTimeout(() => window.location.href = props.href, 3000);
			},
			async tabSelected(route) {
				const tabArray = ['home', 'about', 'shop', 'calendar']
				if (tabArray.includes(route)) {
					this.tab = route;
				} else {
					this.tab = 'home';
				}

			},
			async register() {
				this.$router.push({ name: 'home' })
			},
			toggleValue() {
				this.isActive = !this.isActive;
				this.$emit('updateValue', this.isActive);
			},
		},
		created() {
			this.tabSelected(this.$route.name)
		}

	});

</script>