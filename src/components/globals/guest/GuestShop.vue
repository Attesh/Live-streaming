<template>
	<section class="main-guest-section ">
		<SideBar @updateValue="updateValueFromHeader"></SideBar>

		<section
			:class="valueFromHeader ? 'guest-main-page-shop-header sidebar-section' : 'guest-main-page-shop-header sidebar-section1'">
			<GuestHeader></GuestHeader>
			<Slider></Slider>
			<div class="shop-first-main">
				<h1 class="shop-first-h1">
					Products
				</h1>
				<div class="guest-btns-main">
					<div class="heading-menu-btn" style="width: 35%; padding: 15px 0px 0px 34px; color: #fff;">
						<!-- <img class="sidemenuicon" src="@assets/hamburger-menu-icon-png-white-10.jpg" /> -->
						<div class="  home-search-field">
							<img src="@assets/featured-athlete/search-normal.svg" alt="" srcset="" />
							<input type="text" placeholder="Search..." />
						</div>
					</div>
					<router-link v-if="this.user && this.user.role == 'athelete'" :to="{ name: 'add-product' }"
						class="btn-login" style="cursor:pointer">Add Product +</router-link>
				</div>
				<div class="shop-main-cards guest-header">
					<div style="color: #fff; font-size: 20px; font-weight: 900;"
						v-if="products?.data?.data?.length < 1">
						<h1>No Product Available right now.</h1>
					</div>
					<div class="shop-card" v-for="product in products?.data?.data" :key="product.id" v-else>
						<div v-for="(image, index) in product.images" :key="index"
							@click="changeRoute('product-detail', product.id)">
							<img class="Rectangle" v-if="image.featured_image == 'Yes'" :src="image.image" alt="">
						</div>
						<h2 @click="changeRoute('product-detail', product.id)">{{ product.name }}</h2>
						<p @click="changeRoute('product-detail', product.id)">{{ product.description }}</p>
						<div class="shop-card-main-elips">
							<img class="shop-card-elips" src="@assets/Ellipse-11.png" alt="">
							<h1>$ {{ product.price }}</h1>
						</div>
						<div class="prod-button">

							<button class="btn-cart" @click="changeRoute('product-detail', product.id)"> <img
									src="@assets/game.png" alt=""> Add to Cart</button>
							<button class="btn-Wishlist" @click="toggleWishlist(product.id)">
								{{ 'Add Wishlist' }}
							</button>


						</div>
					</div>


				</div>
				<div>

				</div>
			</div>
			<Spinner v-if="this.showSpinner"></Spinner>
			<div class="pagination">
				<button class="next" @click="prevPage(currentPage - 1)" :disabled="currentPage === 1">Prev</button>
				<span style="color: #ffff;">Page {{ currentPage }} of {{ totalPages }}</span>
				<button class="next" @click="nextPage(currentPage + 1)"
					:disabled="currentPage === totalPages">Next</button>
			</div>
		</section>

	</section>
	<Footer></Footer>
</template>
<script>
	import GuestHeader from '@components/globals/guest/GuestHeader.vue';
	import Footer from '@components/globals/costacaster/Footer.vue';
	import SideBar from '@components/globals/costacaster/SideBar.vue';
	import Slider from '@components/globals/costacaster/Slider.vue';
	import Spinner from '@components/globals/costacaster/Spinner.vue';
	import { fetchData, postData } from '@services/base.js';
	import { toast } from 'vue3-toastify';
	import 'vue3-toastify/dist/index.css';

	export default {
		components: {
			GuestHeader,
			SideBar,
			Slider,
			Footer,
			Spinner,
		},
		data() {
			return {
				user: {},
				products: {},
				showSpinner: true,
				currentPage: 1,
				totalPages: 1,
				valueFromHeader: false,
			}
		},
		created() {
			this.user = JSON.parse(localStorage.getItem('user'))
			this.getMyProductsOrAllProducts();
		},
		methods: {
			async changeRoute(name, productId) {
				this.$router.push({ name: name, params: { productId: productId } })
			},
			async getMyProductsOrAllProducts(pageNumber = 1) {
				try {
					this.showSpinner = true
					const params = { page: pageNumber };
					const endPoint = this.user ? (this.user.role == 'athelete' ? 'get-my-products' : 'get-all-products') : 'get-all-products';
					const getProducts = await fetchData(endPoint, params);
					this.products = getProducts.data;
					this.showSpinner = false
					this.totalPages = this.products.data.last_page
				} catch (error) {
					console.log(error);
				}
			},
			async toggleWishlist(productId) {

				const endpoint = `toggle-product-wishlist/${productId}`;
				try {
					const data = { productId }
					const responseData = await postData(endpoint, data);
					console.log('Wishlist toggle response:', responseData);
					toast.success(responseData.message, {
						autoClose: 1000,
					});
				} catch (error) {
					console.error('Error toggling wishlist:', error);
					toast.error('Failed to toggle wishlist');
				}
			},
			nextPage(page) {
				this.currentPage += 1;
				this.getMyProductsOrAllProducts(page)
			},
			prevPage(page) {
				this.currentPage -= 1;
				this.getMyProductsOrAllProducts(page)
			},
			updateValueFromHeader(value) {
				// Update the value in the parent component
				this.valueFromHeader = value;
			},

		}



	}
</script>