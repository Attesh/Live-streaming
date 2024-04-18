<template>
    <section class="main-guest-section">
        <SideBar @updateValue="updateValueFromHeader"></SideBar>
        <section class="guest-main-page">
            <GuestHeader @sendValue="sendValueToSidebar"></GuestHeader>
            <div>
                <div class="main-gallery">
                    <div class="select-main-box">
                        <div class="select-box">
                            <input class="checkbox1" type="checkbox" v-model="selectAll" @change="toggleSelectAll">
                            <h1 class="fast-txt">SELECT ALL ( {{ this.cartItems.length }} ITEM(S) )</h1>
                        </div>
                        <div class="select-box" style="cursor: pointer;" @click="deleteAllItems">
                            <img class="icon-img" src="@assets/Vecto.png" />
                            <h1>DELETE</h1>
                        </div>
                    </div>
                </div>
                <div class="main-gallery1">
                    <div class="select-main-box1" v-if="this.cartItems.length < 1">
                        <h1>No Items In Your Cart. Go to <router-link :to="{ name: 'shop' }">Shop</router-link></h1>
                    </div>
                    <div class="select-main-box1" v-else>
                        <div class="select-box" v-for="(item, index) in cartItems" :key="index">
                            <input class="checkbox2" type="checkbox" v-model="selectedItems" :value="item.product_id">
                            <div class="cyclbox">
                                <img class="cycleimg" :src="item.featured_image" />
                                <div>
                                    <p class="grt-txt">{{ item.name }}</p>
                                </div>

                            </div>
                            <div class="count-box">
                                <div class="quantity-count">
                                    <h1 class="price-tag bg-color ttcount">{{ item.price * item.count }}$</h1>
                                    <counter :productStock="item.stock" :quantity="item.count"
                                        :productId="item.product_id" @setQuantityOfProduct="setQuantityOfProduct">
                                    </counter>
                                    <img class="icon-img" src="@assets/Vecto.png" style="cursor: pointer;"
                                        @click="deleteItem(item.product_id)" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-gallery2">
                    <div class="box-w-size">
                        <h1 class="grt-txt mg-10">Order Summary</h1>
                    </div>
                    <div class="box-w-size">
                        <p class="grt-txt mg-10">Total</p>
                        <p class="grt-txt mg-10">{{ this.totalAmount }}$</p>
                    </div>
                    <div>
                        <button class="apply-button1 proceedbtn" @click="checkout">PROCEED TO CHECKOUT ({{
                            this.cartItems.length }})</button>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>
<style>
    .mg-10 {
        margin: 30px;
    }

    .proceedbtn {
        display: block;
        margin: 0 auto;
        margin-bottom: 30px;
    }

    .box-w-size {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 20px;
    }

    .apply-button {
        flex-shrink: 0;
        border-radius: 4px;
        border: 1px solid #A3241C;
        background: #A3241C;
        color: #fff;
        font-size: 30px;
        padding: 15px 30px;
        margin-right: 30px;
    }

    .apply-button1 {
        flex-shrink: 0;
        border-radius: 4px;
        border: 1px solid #A3241C;
        background: #A3241C;
        color: #fff;
        font-size: 16px;
        padding: 12px 30px;
        width: 40%;
    }

    .input-padding {
        padding: 15px 30px;
        background-color: transparent;
        border: solid 1px #fff;
        border-radius: 5px;
        width: 78%;
        margin-left: 30px;
    }

    .hrstyl {
        position: absolute;
        width: 100%;
        left: 0;
    }

    .count-box {
        position: relative;
        /* top: 110px; */
    }

    .ttcount {
        position: relative;
        /* top: -10px; */
    }

    .nnb {
        color: #A1A1A1;
    }

    .grt-txt {
        font-size: 16px;
    }

    .cyclbox {
        display: flex;
        gap: 20px;
        align-items: center;
        width: 100%;
    }

    .cycleimg {
        width: 100px;
        height: 100px;
        object-fit: cover;
    }

    .fast-txt {
        font-size: 25px;
    }

    .icon-img1 {
        width: 16px;
    }

    .select-main-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding-left: 30px;
        padding-right: 30px;
    }

    .select-main-box1 {
        width: 100%;
        padding-left: 30px;
        padding-right: 35px;
        text-align: center;
    }
.select-main-box1 h1 {
font-size: 16px;
}
    .select-box {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-top: 20px;
    }

    .select-box h1 {
        font-size: 16px !important;
        margin: 0;
    }

    .checkbox1 {
        height: 20px;
        width: 18px;
    }

    .checkbox2 {
        height: 25px;
        width: 25px;
        position: relative;
        /* top: 13px; */
    }

    .shop-div-txt {
        padding: 30px;
        font-size: 28px;
        font-style: normal;
        font-weight: 400;
    }

    .buynow-btn {
        background-color: transparent;
        color: #fff;
        text-align: center;
        padding: 12px 35px 12px 35px;
        font-size: 30px;
        border: 1px solid #FFF;
        margin-right: 20px;
    }

    .buynow-btn1 {
        background-color: #E73C31;
        color: #fff;
        text-align: center;
        padding: 12px 35px 12px 35px;
        font-size: 30px;
        border: 1px solid #E73C31;
    }

    .big-image img {
        width: 630px;
    }

  

    .small-image {
        display: flex;
        gap: 10px;
        margin-top: 15px;
    }

    .main-gallery {
        display: flex;
        gap: 20px;
        border: solid 1px #fff;
        padding: 10px;
        margin: 27px;
        border-radius: 10px;
        width: 88%;
        margin-left: 5%;
    }

    .main-gallery1 {
        display: flex;
        gap: 20px;
        border: solid 1px #fff;
        padding: 10px;
        margin: 27px;
        border-radius: 10px;
        width: 88%;
        margin-left: 5%;
        height: auto;
        position: relative;
    }

    .main-gallery2 {
        border: solid 1px #fff;
        padding: 10px;
        margin: 27px;
        border-radius: 10px;
        width: 88%;
        margin-left: 5%;
        position: relative;
    }

    .h1-text {
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
    }

    /* .icon-img {
        width: 25px;
    } */

    .icons-div {
        display: flex;
        gap: 20px;
        justify-content: start;
        margin-right: 0%;
    }

    .ratingcmp {
        cursor: pointer;
    }

    .bg-color {
        color: #A3241C;
    }

    .rating-box {
        display: flex;
        align-items: center;
        gap: 20px;
        font-size: 18px;
    }

    .border-bg {
        border-right: solid 2px #fff;
        padding-right: 30px;
    }

    .price-tag {
        font-size: 60px;
    }

    .qty-tag {
        color: #A1A1A1;
        font-family: Plus Jakarta Sans;
        font-size: 40px;
        font-style: normal;
        font-weight: 400;
    }

    .quantity-count {
        display: flex;
        align-items: center;
        gap: 20px;
    }
</style>
<script>
    import GuestHeader from '@components/globals/guest/GuestHeader.vue';
    import SideBar from '@components/globals/costacaster/SideBar.vue';
    import ProductList from '@components/globals/costacaster/ProductList.vue';
    import RatingComponent from '@components/globals/costacaster/Rating.vue';
    import Counter from '@components/globals/costacaster/Counter.vue';
    import { getItemsFromCart, calculateTotalAmountOfCart, updateCartItemQuantity, deleteCartItem, deleteAllCartItems } from '@/store/Global/Cart';
    export default {
        components: {
            GuestHeader,
            ProductList,
            SideBar,
            RatingComponent,
            Counter,
        },
        data() {
            return {
                cartItems: {},
                user: {},
                totalAmount: 0,
                selectAll: false,
                selectedItems: [],
                valueFromHeader: false,
            };
        },
        methods: {
            checkout() {
                this.$router.push({ name: 'payment' })
            },
            setQuantityOfProduct(quantity, productId) {
                updateCartItemQuantity(this.user, productId, quantity)
                this.init();
            },
            deleteItem(productId) {
                deleteCartItem(this.user, productId)
                this.init();
            },
            init() {
                this.cartItems = getItemsFromCart(this.user);
                this.totalAmount = calculateTotalAmountOfCart(this.user);
            },
            toggleSelectAll() {
                if (this.selectAll) {
                    this.selectedItems = this.cartItems.map(item => item.product_id);
                } else {
                    this.selectedItems = [];
                }
            },
            deleteAllItems() {
                if (this.selectAll) {
                    deleteAllCartItems(this.user);
                    this.init()
                }
            },
            updateValueFromHeader(value) {
                // Update the value in the parent component
                this.valueFromHeader = value;
            },
        },
        mounted() {
            this.user = JSON.parse(localStorage.getItem('user'));
            this.init();
        },
    };
</script>


