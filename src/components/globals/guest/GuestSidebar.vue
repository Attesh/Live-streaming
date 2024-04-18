<template>
    <section :class="{ 'sidemenushow': valueFromHeader === 'show' }" class="sidemenu">
        <div class="guest-sidemenu-container" id="container">
            <div class="guest-logo-div">
                <img class="logo-guest-page" src="@assets/Corsacaster.png">
            </div>
            <h2 class="guest-sidemenu-color menu-title">Menu</h2>
            <div>
                <div class="selectd guest-sidemenu-selection">
                    <img src="@assets/Vector.png">
                    <h2 class="guest-sidemenu-color">Home</h2>
                </div>
                <div class="guest-sidemenu-selection">
                    <img src="@assets/category.png">
                    <h2 class="guest-sidemenu-color">Calendar</h2>
                </div>
                <div class="guest-sidemenu-selection">
                    <img src="@assets/profile.png">
                    <h2 class="guest-sidemenu-color">Shop</h2>
                </div>
                <div class="guest-sidemenu-selection">
                    <img src="@assets/video.png">
                    <h2 class="guest-sidemenu-color">About</h2>
                </div>
            </div>

            <h2 class="guest-sidemenu-color menu-title">Other</h2>
            <div>
                <div class="guest-sidemenu-selection">
                    <img src="@assets/profile.png">
                    <h2 class="guest-sidemenu-color">Account</h2>
                </div>
                <div class="guest-sidemenu-selection">
                    <img src="@assets/category.png">
                    <h2 class="guest-sidemenu-color">Recharge</h2>
                </div>
                <div class="guest-sidemenu-selection">
                    <img src="@assets/profile.png">
                    <h2 class="guest-sidemenu-color">Logout</h2>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
	import { toast } from 'vue3-toastify';
	import 'vue3-toastify/dist/index.css';
	import { defineComponent, ref } from 'vue';

	export default defineComponent({
	props: {
		valueFromHeader: String
	},
	data () {
			return {
				user : {
				}
			};
		},
		created(){
			this.user = localStorage.getItem('user');
		},	
		methods : {
			logout() {
				localStorage.removeItem('user');
				localStorage.removeItem('authToken');
				toast.success( "Logout Successfully" ,{
			            	autoClose: 1000,
			            });
				let props = this.$router.resolve({ 
					name: 'home',
				});
				setTimeout( () => window.location.href = props.href , 5000);
			},
		}

	});
	
</script>