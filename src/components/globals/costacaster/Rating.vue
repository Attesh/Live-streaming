<template>
  <div class="rating">
    <span v-for="(star, index) in stars" :key="index" @click="addProductRating(index + 1)"
      :class="{ 'filled': index < selected }">
      &#9733; <!-- Unicode star character -->
    </span>
  </div>
</template>
  
<script>
import { postData, fetchData } from '@services/base.js';
export default {
  props: {
    productId: Number
  },
  data() {
    return {
      selected: 0,
      totalStars: 5,
      responseData: {}
    };
  },
  computed: {
    stars() {
      return Array(this.totalStars).fill(null);
    },
  },
  methods: {
    async addProductRating(rating) {
      this.selected = rating;
      try {
        const formData = new FormData();
        formData.append('rating', rating)
        await postData(`/add-product-rating/${this.productId}`, formData);
      } catch (error) {
        console.log(error)
      }
    },
    async getMyProductRating() {
      try {
        this.responseData = await fetchData(`/get-my-product-rating/${this.productId}`);
        this.selected = this.responseData.data;
      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.getMyProductRating()
    }, 4000)
  }
};
</script>
  
<style scoped>
.rating .filled {
  color: gold;
}
</style>
  