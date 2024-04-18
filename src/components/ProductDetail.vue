<template>
  <section class="main-guest-section">
    <SideBar @updateValue="updateValueFromHeader"></SideBar>
    <section class="guest-main-page">
      <GuestHeader @sendValue="sendValueToSidebar"></GuestHeader>
      <div>
        <div class="main-gallery">
          <!-- Small images -->
          <div>
            <div class="big-image">
              <img :src="featuredImage" alt="Big Image">
            </div>
            <div class="small-image">
              <div v-for="(image, index) in product?.data?.images" :key="index" @click="displayImage(image)">
                <img :src="image.image" class="small-imageimg" alt="Small Image">
              </div>
            </div>
            <!-- Big image -->
          </div>
          <div  class="product-stock" >

            <div class="product-heart-main">
              <h1 class="h1-text">{{ productName }}</h1>
              <div class="heart">
                <svg width="30" height="25" viewBox="0 0 37 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M26.7589 0C23.348 0 20.3616 1.48035 18.5 3.98261C16.6384 1.48035 13.652 0 10.2411 0C7.52591 0.00308862 4.92283 1.09302 3.00292 3.03069C1.08301 4.96835 0.00306033 7.5955 0 10.3358C0 22.0052 17.1439 31.4508 17.874 31.8408C18.0664 31.9453 18.2815 32 18.5 32C18.7185 32 18.9336 31.9453 19.126 31.8408C19.8561 31.4508 37 22.0052 37 10.3358C36.9969 7.5955 35.917 4.96835 33.9971 3.03069C32.0772 1.09302 29.4741 0.00308862 26.7589 0ZM18.5 29.1402C15.4838 27.3665 2.64286 19.2862 2.64286 10.3358C2.64548 8.30278 3.44685 6.35381 4.87122 4.91626C6.29559 3.47872 8.2267 2.66994 10.2411 2.6673C13.4538 2.6673 16.1512 4.39437 17.2777 7.16836C17.3772 7.41296 17.5466 7.62218 17.7642 7.76941C17.9819 7.91665 18.238 7.99526 18.5 7.99526C18.762 7.99526 19.0181 7.91665 19.2358 7.76941C19.4534 7.62218 19.6228 7.41296 19.7223 7.16836C20.8488 4.38937 23.5462 2.6673 26.7589 2.6673C28.7733 2.66994 30.7044 3.47872 32.1288 4.91626C33.5532 6.35381 34.3545 8.30278 34.3571 10.3358C34.3571 19.2729 21.5129 27.3648 18.5 29.1402Z"
                    fill="#F8F8F8" />
                </svg>


              </div>
            </div>

            <div style="display: flex; gap: 20px;">
              <div style="text-align: center;">
                <div class="product-sizes">Size:</div>
                <div class="product-sizes">Color:</div>
              </div>
              <div v-for="variation in product?.data?.variations" :key="variation.id"
                @click="updateProductNameAccordingToVariation(variation)" class="product-variation-box">
                <div>
                  <p>{{ variation.size }}</p>
                </div>
                <div>
                  <p>{{ variation.color }}</p>
                </div>

              </div>
            </div>
            <div class="icons-div">

            </div>
            <div class="rating-box">
              <RatingComponent class="ratingcmp" v-if="this.user" :productId="product?.data?.id" />
              <p class="bg-color" v-if="product?.data?.ratings">{{ product?.data?.ratings }} Rating(s)</p>
              <p class="bg-color" v-else>0 Rating</p>
            </div>
            <div class="rating-box">
              <p>Brand: <span class="bg-color">{{ product?.data?.brand }}</span></p>
            </div>
            <div class="rating-box">
              <p style="margin-top: -10px;">Category: <span class="bg-color">{{ product?.data?.category }}</span></p>
            </div>
            <div>
              <h1 class="price-tag bg-color">{{ productPrice }}$</h1>
              <h1 class="price-tag bg-color">Stock: {{ productStock }}</h1>
            </div>
            <div class="quantity-count">
              <h1 class="qty-tag">Quantity:</h1>
              <counter :productStock="productStock" @setQuantityOfProduct="setQuantityOfProduct"
                :quantity="quantityCount" :productId="product?.data?.id"></counter>
            </div>
            <div v-if="!this.user || (this.user && this.user.role != 'athelete')">
              <button class="buynow-btn" @click="buyOrAddToCartButton('payment', product?.data)">Buy Now</button>
              <button class="buynow-btn1" @click="buyOrAddToCartButton('cart', product?.data)">Add to Cart</button>
            </div>
          </div>
        </div>
        <div class="shop-div-txt">
          <h1>Product Description:</h1>
          <p>
            {{ product?.data?.description }}
          </p>
        </div>
      </div>
    </section>
  </section>

  <div class="custom-modal" v-if="modalVisible">
    <div class="product-modal-content">
      <img class="icon-img icon" src="../assets/cross.png" @click="closeModal" />
      <p>Either <router-link :to="{ name: 'login' }">Sign In</router-link> or Provide Details Below to Proceed Forward.
      </p>
      <hr class="fan-line">
      <form @submit.prevent="proceedToPayemntPage(product?.data)">
        <label class="label-modal">Name:</label>
        <input class="input-modal" type="text" placeholder="Enter your Name" v-model="v$.form.name.$model">
        <div class="input-errors" v-for="(error, index) of v$.form.name.$errors" :key="index">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
        <br>
        <label class="label-modal">Email:</label>
        <input class="input-modal" type="email" placeholder="Enter your Email" v-model="v$.form.email.$model">
        <div class="input-errors" v-for="(error, index) of v$.form.email.$errors" :key="index">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
        <br>
        <label class="label-modal">Contact:</label>
        <input class="input-modal" type="number" placeholder="Enter your Number" v-model="v$.form.contact.$model">
        <div class="input-errors" v-for="(error, index) of v$.form.contact.$errors" :key="index">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
        <br>
        <button type="submit" :disabled="v$.form.$invalid">Proceed</button>
      </form>
    </div>
  </div>
</template>

<script>
  import GuestHeader from '@components/globals/guest/GuestHeader.vue';
  import SideBar from '@components/globals/costacaster/SideBar.vue';
  import useVuelidate from '@vuelidate/core';
  import { required, email } from '@vuelidate/validators';
  import ProductList from '@components/globals/costacaster/ProductList.vue';
  import RatingComponent from '@components/globals/costacaster/Rating.vue';
  import Counter from '@components/globals/costacaster/Counter.vue';
  import { ref } from 'vue';
  import { fetchData } from '@services/base.js';
  import { addItemToCart } from '@/store/Global/Cart';
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';

  export default {
    components: {
      GuestHeader,
      ProductList,
      SideBar,
      RatingComponent,
      Counter,
    },
    setup() {
      const valueFromHeader = ref('');

      function sendValueToSidebar(value) {
        valueFromHeader.value = value;
      }

      return {
        valueFromHeader,
        sendValueToSidebar,
        v$: useVuelidate()
      };
    },
    data() {
      return {
        featuredImage: '',
        featuredImageForCart: '',
        modalVisible: false,
        user: {},
        product: {},
        productName: '',
        productPrice: '',
        productStock: '',
        quantityCount: 0,
        variationId: null,
        form: {
          email: '',
          name: '',
          contact: '',
        },
        valueFromHeader: false,
      };
    },
    methods: {
      setQuantityOfProduct(quantity) {
        this.quantityCount = quantity;
      },
      displayImage(image) {
        this.featuredImage = image.image;
      },
      async buyOrAddToCartButton(route, product) {
        if (this.quantityCount > 0) {
          const item = {
            product_id: product.id,
            variation_id: this.variationId,
            price: this.productPrice,
            name: this.productName,
            stock: this.productStock,
            featured_image: this.featuredImageForCart,
          }
          if (this.user) {
            addItemToCart(this.user, item, this.quantityCount)
            this.$router.push({ name: route })
          } else {
            const newUser = JSON.parse(localStorage.getItem('new_user'))
            if (!newUser) {
              this.modalVisible = true
            } else {
              addItemToCart(this.user, item, this.quantityCount)
              this.$router.push({ name: route })
            }

          }
        } else {
          toast.error('Please add quantity', {
            autoClose: 1000
          })
        }

      },
      closeModal() {
        this.modalVisible = false;
      },
      proceedToPayemntPage(product) {
        if (this.v$.form.$invalid) {
          toast.error('Form is not valid', {
            autoClose: 1000
          })
        } else {
          const item = {
            product_id: product.id,
            variation_id: this.variationId,
            price: this.productPrice,
            name: this.productName,
            stock: this.productStock,
            featured_image: this.featuredImageForCart,
          }
          addItemToCart(this.user, item, this.quantityCount, this.form)
          this.$router.push({ name: 'payment' })

        }

      },
      async getProductDetail(productId) {
        try {
          const endPoint = `/get-product-by-id/${productId}`
           const getProduct = await fetchData(endPoint);
           this.product = getProduct.data;
          this.productName = this.product.data.name
          for (let index = 0; index < this.product.data.images.length; index++) {
            if (this.product.data.images[index].featured_image == 'Yes') {
              this.featuredImage = this.product.data.images[index].image;
              this.featuredImageForCart = this.product.data.images[index].image;
            }
          }
          for (let index = 0; index < this.product.data.variations.length; index++) {
            if (index == 0) {
              this.productPrice = this.product.data.variations[index].price;
              this.productStock = this.product.data.variations[index].stock_quantity;
              this.variationId = this.product.data.variations[index].id;
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
      updateProductNameAccordingToVariation(variation) {
        this.productName = variation.name
        this.productPrice = variation.price
        this.productStock = variation.stock_quantity
        this.variationId = variation.id
      },
      updateValueFromHeader(value) {
                // Update the value in the parent component
                this.valueFromHeader = value;
            },

    },
    created() {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.getProductDetail(this.$route.params.productId);
    },
    validations() {
      return {
        form: {
          email: { required, email },
          name: { required },
          contact: { required },
        },
      }
    },
  };
</script>

<style scoped>
  .icon {
    margin: 0 120px 0 800px;
    cursor: pointer;
  }

  .label-modal {
    color: #78828a;
    font-size: 23px;
    margin-right: 120px;
  }

  .input-modal {
    width: 50%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: none;
    border-bottom: 3px solid #666666;
    background-color: #303046;
    color: white;
    font-size: 22px;
  }

  .input-modal:focus {
    outline: none;
  }
</style>