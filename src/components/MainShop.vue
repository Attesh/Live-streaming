<template>
   <section class="main-guest-section ">
    
    <section :class="{ 'sidemenushow': valueFromHeader === 'show' }" class="sidemenu sidemenu-home">
            <div class="guest-sidemenu-container" id="container">
                <GuestSidebar :valueFromHeader="valueFromHeader"></GuestSidebar>
            </div>
        </section>
        <section class="guest-main-page-shop-header ad-width">
            <GuestHeader @sendValue="sendValueToSidebar"></GuestHeader>
                <div>
                <h1 class="shop-first-h1">
                    Products
                </h1>
                <div class="shop-main-cards">
                    <div class="shop-card">
                        <img class="Rectangle" src="../assets/Rectangle-9574.png" alt="">
                        <h2>Jumping Rope</h2>
                        <h2>Skipping</h2>
                        <p>Product description goes here</p>
                        <div class="shop-card-main-elips">
                            <img class="shop-card-elips" src="../assets/Ellipse11.png" alt="">
                            <h1>$ 210</h1>
                        </div>
                        <button class="btn-cart"> <img src="../assets/game.png" alt=""> Add to Cart</button>
                        <button class="btn-Wishlist">Wishlist</button>
                    </div>

                    <div class="shop-card">
                        <img class="Rectangle" src="../assets/Rectangle-9574.png" alt="Image 2">
                        <h2>Jumping Rope</h2>
                        <h2>Skipping</h2>
                        <p>Product description goes here</p>
                        <div class="shop-card-main-elips">
                            <img class="shop-card-elips" src="../assets/Ellipse11.png" alt="">
                            <h1>$ 210</h1>
                        </div>
                        <button class="btn-cart"> <img src="../assets/game.png" alt=""> Add to Cart</button>
                        <button class="btn-Wishlist">Wishlist</button>
                    </div>

                    <div class="shop-card">
                        <img class="Rectangle" src="../assets/Rectangle-9574.png" alt="Image 3">
                        <h2>Jumping Rope</h2>
                        <h2>Skipping</h2>
                        <p>Product description goes here</p>
                        <div class="shop-card-main-elips">
                            <img class="shop-card-elips" src="../assets/Ellipse11.png" alt="">
                            <h1>$ 210</h1>
                        </div>
                        <button class="btn-cart"> <img src="../assets/game.png" alt=""> Add to Cart</button>
                        <button class="btn-Wishlist">Wishlist</button>
                    </div>

                    <div class="shop-card">
                        <img class="Rectangle" src="../assets/Rectangle-9574.png" alt="Image 4">
                        <h2>Jumping Rope</h2>
                        <h2>Skipping</h2>
                        <p>Product description goes here</p>
                        <div class="shop-card-main-elips">
                            <img class="shop-card-elips" src="../assets/Ellipse11.png" alt="">
                            <h1>$ 210</h1>
                        </div>
                        <button class="btn-cart"> <img src="../assets/game.png" alt=""> Add to Cart</button>
                        <button class="btn-Wishlist">Wishlist</button>
                    </div>
                </div>
                <div>
                
                    <div class="shop-main-cards">
                        <div class="shop-card">
                            <img class="Rectangle" src="../assets/Rectangle-9574.png" alt="">
                            <h2>Jumping Rope</h2>
                            <h2>Skipping</h2>
                            <p>Product description goes here</p>
                            <div class="shop-card-main-elips">
                                <img class="shop-card-elips" src="../assets/Ellipse11.png" alt="">
                                <h1>$ 210</h1>
                            </div>
                            <button class="btn-cart"> <img src="../assets/game.png" alt=""> Add to Cart</button>
                            <button class="btn-Wishlist">Wishlist</button>
                        </div>
    
                        <div class="shop-card">
                            <img class="Rectangle" src="../assets/Rectangle-9574.png" alt="Image 2">
                            <h2>Jumping Rope</h2>
                            <h2>Skipping</h2>
                            <p>Product description goes here</p>
                            <div class="shop-card-main-elips">
                                <img class="shop-card-elips" src="../assets/Ellipse11.png" alt="">
                                <h1>$ 210</h1>
                            </div>
                            <button class="btn-cart"> <img src="../assets/game.png" alt=""> Add to Cart</button>
                            <button class="btn-Wishlist">Wishlist</button>
                        </div>
    
                        <div class="shop-card">
                            <img class="Rectangle" src="../assets/Rectangle-9574.png" alt="Image 3">
                            <h2>Jumping Rope</h2>
                            <h2>Skipping</h2>
                            <p>Product description goes here</p>
                            <div class="shop-card-main-elips">
                                <img class="shop-card-elips" src="../assets/Ellipse11.png" alt="">
                                <h1>$ 210</h1>
                            </div>
                            <button class="btn-cart"> <img src="../assets/game.png" alt=""> Add to Cart</button>
                            <button class="btn-Wishlist">Wishlist</button>
                        </div>
    
                        <div class="shop-card">
                            <img class="Rectangle" src="../assets/Rectangle-9574.png" alt="Image 4">
                            <h2>Jumping Rope</h2>
                            <h2>Skipping</h2>
                            <p>Product description goes here</p>
                            <div class="shop-card-main-elips">
                                <img class="shop-card-elips" src="../assets/Ellipse11.png" alt="">
                                <h1>$ 210</h1>
                            </div>
                            <button class="btn-cart"> <img src="../assets/game.png" alt=""> Add to Cart</button>
                            <button class="btn-Wishlist">Wishlist</button>
                        </div>
                    </div>
                    <h1 class="shop-first-h1">
                        Products
                    </h1>
                </div>
            </div>
        </section>
    </section>
  </template>
  <style scoped>
      .ad-width{
        width: 80%;
      }  
      .shop-main-cards{
        margin-left: 50px;
        margin-top: 50px;   
      }
      .shop-card{
        width:22%
      }
  </style>
  <script>
  import GuestHeader from '@components/globals/guest/GuestHeader.vue';
  import GuestSidebar from '@components/globals/guest/GuestSidebar.vue';
  import ProductList from '@components/globals/costacaster/ProductList.vue';
  import { ref } from 'vue';

  export default {
    components: {
      GuestHeader,
      ProductList,
      GuestSidebar,
    },
    setup() {
      const valueFromHeader = ref('');

      function sendValueToSidebar(value) {
        valueFromHeader.value = value;
      }

      return {
        valueFromHeader,
        sendValueToSidebar
      };
    }
  };
  </script>
  