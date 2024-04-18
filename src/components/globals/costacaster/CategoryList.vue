User
<template>
	<!-- <div class="category-list">
		<ul>
			<li class="category-item active" v-for="data in categories?.data?.data">
				<p>
					<img src="@assets//featured-athlete/category.svg" alt="" />
					{{ data.name }}
				</p>
			</li>
		</ul>
	</div> -->
	<div class="category-list">
		<ul class="items" ref="items" @mousedown="start" @touchstart="start" @mousemove="move" @touchmove="move"
			@mouseleave="end" @mouseup="end" @touchend="end">
			<li class="item" v-for="data in categories?.data?.data" :key="data.id">
				<p>
					<img src="@assets//featured-athlete/category.svg" alt="" />
					{{ data.name }}
				</p>
			</li>
		</ul>
	</div>
</template>
<style scoped>
	:root {
		--bg-color: #222;
		--margin: 20px;
	}

	body {
		color: #333;
		text-align: center;
		background: var(--bg-color);
		margin: 0;
	}

	ul {
		padding: 0;
	}

	li {
		list-style: none;
	}

	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 50px 0;
	}

	main h1 {
		margin-bottom: 50px;
	}

	.wrapper {
		position: relative;
	}

	.wrapper:before,
	.wrapper:after {
		position: absolute;
		top: 0;
		z-index: 1;
		content: "";
		display: block;
		width: var(--margin);
		height: 100%;
	}

	.wrapper:before {
		left: 0;
		background: linear-gradient(90deg, var(--bg-color), transparent);
	}

	.wrapper:after {
		right: 0;
		background: linear-gradient(-90deg, var(--bg-color), transparent);
	}

	.items {
		position: relative;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		font-size: 0;
		cursor: pointer;
		gap: 11px;
	}

	.items.active {
		cursor: grab;
	}

	.item {
		display: inline-block;
		margin-left: var(--margin);
		user-select: none;
		background: transparent;
		width: 50%;
		color: var(--bg-color);
		font-size: 33px;
		font-weight: bold;
		&:hover{
			background-color: #A3241C;
		}
	}

	.item:last-child {
		margin-right: var(--margin);
	}

	@media screen and (min-width: 500px) {
		.item {
			width: 33%;
		}
	}

	@media screen and (min-width: 800px) {
		.item {
			width: 25%;
		}
	}

	@media screen and (min-width: 1200px) {
		.wrapper {
			margin-left: calc(-1 * var(--margin));
		}

		.item {
			width: 20%;
		}
	}
</style>
<script>

	import { reactive, Vue } from 'vue';
	import { postData, fetchData } from '@services/base.js';

	export default {
		data() {
			return {
				categories: {},
				isDown: false,
				startX: 0,
				scrollLeft: 0
			}
		},
		created() {
			this.getAllCategories()
		},
		methods: {
			async getAllCategories() {
				const endpoint = 'get-all-parent-categories'; // Replace with your desired endpoint
				this.categories = await fetchData(endpoint, { 'type': 'product' });
			},
			start(e) {
				this.isDown = true;
				this.$refs.items.classList.add('active');
				this.startX = e.pageX || e.touches[0].pageX - this.$refs.items.offsetLeft;
				this.scrollLeft = this.$refs.items.scrollLeft;
			},
			move(e) {
				if (!this.isDown) return;
				e.preventDefault();
				const x = e.pageX || e.touches[0].pageX - this.$refs.items.offsetLeft;
				const dist = (x - this.startX);
				this.$refs.items.scrollLeft = this.scrollLeft - dist;
			},
			end() {
				this.isDown = false;
				this.$refs.items.classList.remove('active');
			}
		}
	}
</script>