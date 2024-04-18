<template>
    <section class="main-guest-section ">
        <SideBar @updateValue="updateValueFromHeader"></SideBar>
        <section
            :class="valueFromHeader ? 'guest-main-page-shop-header sidebar-section' : 'guest-main-page-shop-header sidebar-section1'">
            <GuestHeader></GuestHeader>
            <div class="total-payment">
                <h2>
                    Total:
                </h2>
                <h1>
                    ${{ this.totalAmount }}
                </h1>
            </div>
            <div class="payment-cycle-main" v-if="this.cartItems.length < 1">
                <h1>No Items In Your Cart. Go to <router-link :to="{ name: 'shop' }">Shop</router-link></h1>
            </div>
            <div class="payment-cycle-main" v-else v-for="(item, index) in cartItems" :key="index">
                <div class="payment-cycle">
                    <img class="cycle-img" :src="item.featured_image" alt="">

                    <div class="qty">
                        <div>
                            <h2>
                                {{ item.name }}
                            </h2>

                        </div>
                        <div class="Vector">
                            <p>
                                Qty {{ item.count }}
                            </p>
                        </div>
                    </div>
                </div>


                <h1>${{ (item.price * item.count).toFixed(2) }}</h1>

            </div>
            <div>
                <div class="subtotal">
                    <h1>
                        Subtotal
                    </h1>
                    <h2>
                        ${{ this.totalAmount.toFixed(2) }}
                    </h2>
                </div>
                <hr class="line">
                <div class="shipping">
                    <div>
                        <p>
                            Shipping
                        </p>
                        <p>
                            Ground shipping (3-5 business days)
                        </p>
                    </div>
                    <div>
                        <h2>
                            $5.00
                        </h2>
                    </div>
                </div>
                <hr class="line">
                <div class="total-due">
                    <h1>
                        Total due
                    </h1>
                    <h2>
                        ${{ this.totalAmount.toFixed(2) }}
                    </h2>
                </div>
            </div>
            <hr>
            <form @submit.prevent="processOrder">
                <div class="info-add-state-main">
                    <div class="shipping-info-main">
                        <h1>
                            Shipping Information
                        </h1>
                        <p>
                            Email
                        </p>
                        <div class="mail">
                            <input type="text" :value="this.user ? this.user.email : this.newUser.email" disabled>
                            <img src="@assets/mail.png" alt="">
                        </div>
                    </div>
                    <div class="shipping-address-main">
                        <h1>
                            Shipping addresss
                        </h1>
                        <div class="ship-name">
                            <input placeholder="Name" type="text"
                                :value="this.user ? this.user.name : this.newUser.name" disabled>
                        </div>
                        <div class="ship-state">
                            <select class="dropdown-payment" v-model='v$.form.country_id.$model'
                                @change="getStateByCountry(v$.form.country_id.$model)">
                                <option value="" disabled>Please Select Country</option>
                                <option v-for="country in countries.data" :key="country.id" :value="country.id">
                                    {{ country.name }}
                                </option>
                            </select>
                        </div>
                        <div class="ship-state">
                            <select class="dropdown-payment" v-model='v$.form.state_id.$model'
                                @change="getCityByState(v$.form.state_id.$model)">
                                <option value="" disabled>Please Select State</option>
                                <option v-for="state in states.data" :key="state.id" :value="state.id">
                                    {{ state.name }}
                                </option>
                            </select>
                        </div>
                        <div class="ship-state">
                            <select class="dropdown-payment" v-model='v$.form.city_id.$model'>
                                <option value="" disabled>Please Select City</option>
                                <option v-for="city in cities.data" :key="city.id" :value="city.id">
                                    {{ city.name }}
                                </option>
                            </select>
                        </div>
                        <div class="ship-address">
                            <input placeholder="Address" type="text" v-model="v$.form.address.$model">
                            <div class="input-errors" v-for="(error, index) of v$.form.address.$errors" :key="index">
                                <div class="error-msg">{{ error.$message }}</div>
                            </div>
                        </div>
                        <u>
                            Enter address manually
                        </u>
                    </div>
                    <div class="payment-info-main">
                        <h1>
                            Payment information
                        </h1>
                        <p>
                            Card information
                        </p>
                        <div class="card-pay">
                            <input placeholder="13253124643" type="number" maxlength="16" v-model="v$.form.card_number.$model" @input="restrictInput">
                            <img class="credit1" src="@assets/credit1.png" alt="">
                            <img src="@assets/credit2.png" alt="">
                            <div class="input-errors" v-for="(error, index) of v$.form.card_number.$errors"
                                :key="index">
                                <div class="error-msg">{{ error.$message }}</div>
                            </div>
                        </div>
                        <div class="date-cvc-main">
                            <div class="date">
                                <input type="date" v-model="v$.form.exp_date.$model" class="custom-calendar-input">
                                <div class="input-errors" v-for="(error, index) of v$.form.exp_date.$errors"
                                    :key="index">
                                    <div class="error-msg">{{ error.$message }}</div>
                                </div>
                            </div>
                            <div class="cvc">
                                <input placeholder="cvc" type="number" v-model="v$.form.cvc.$model">
                                <img src="@assets/mail.png" alt="">
                                <div class="input-errors" v-for="(error, index) of v$.form.cvc.$errors" :key="index">
                                    <div class="error-msg">{{ error.$message }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="checkbox">
                            <input type="checkbox" name="" id="">Billing address is same as shipping
                        </div>
                        <div class="guest-pay-btn" :disabled="v$.form.$invalid">
                            <button type="submit">
                                Pay ${{ this.totalAmount.toFixed(2) }}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <Spinner v-if="this.showSpinner"></Spinner>
        </section>
    </section>
</template>
<script>
    import GuestHeader from '@components/globals/guest/GuestHeader.vue';
    import SideBar from '@components/globals/costacaster/SideBar.vue';
    import Spinner from '@components/globals/costacaster/Spinner.vue';
    import useVuelidate from '@vuelidate/core';
    import { required, numeric, minLength, maxLength } from '@vuelidate/validators';
    import { getItemsFromCart, calculateTotalAmountOfCart, deleteAllCartItems } from '@/store/Global/Cart';
    import { getAllCountries, getAllStatesByCountry, getAllCitiesByState } from '@/store/Global/global';
    import { postData } from '@services/base.js';
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';
    export default {
        components: {
            GuestHeader,
            SideBar,
            Spinner
        },
        setup() {
            return { v$: useVuelidate() }
        },
        data() {
            return {
                cartItems: {},
                user: {},
                countries: {},
                states: {},
                cities: {},
                totalAmount: 0,
                orderDetails: {},
                showSpinner: false,
                form: {
                    address: '',
                    country_id: '',
                    state_id: '',
                    city_id: '',
                    zip_code: '',
                    card_number: '',
                    exp_month: '',
                    exp_year: '',
                    exp_date: '',
                    cvc: '',

                },
                valueFromHeader: false,
            }
        },
        methods: {
            async processOrder() {
                if (this.v$.form.$invalid) {
                    toast.error('Form is not valid', {
                        autoClose: 1000,
                    });
                } else {
                    try {
                        this.showSpinner = !this.showSpinner;
                        this.form.products = this.cartItems;
                        this.form.totalPrice = this.totalAmount;
                        this.form.exp_year = new Date(this.form.exp_date).getFullYear();
                        this.form.exp_month = new Date(this.form.exp_date).getMonth() + 1; // it return 0 to 11
                        const endpoint = '/add-order';
                        this.responseData = await postData(endpoint, this.form);
                        toast.success(this.responseData.message, {
                            autoClose: 1000,
                        });
                        deleteAllCartItems(this.user);
                        setTimeout(() => this.$router.push({ name: 'shop' }), 2000);
                    } catch (error) {
                        console.log(error)
                        this.showSpinner = false;
                    }
                }
            },
            async init() {
                this.cartItems = getItemsFromCart(this.user);
                this.totalAmount = calculateTotalAmountOfCart(this.user);
                this.countries = await getAllCountries();
            },
            async getStateByCountry(country_id) {
                this.states = await getAllStatesByCountry(country_id);
            },
            async getCityByState(state_id) {
                this.cities = await getAllCitiesByState(state_id);
            },
            updateValueFromHeader(value) {
                // Update the value in the parent component
                this.valueFromHeader = value;
            },
            restrictInput(event) {
              // Get the input value
              let inputValue = event.target.value;

              // Remove any non-numeric characters
              inputValue = inputValue.replace(/\D/g, '');

              // Ensure the input doesn't exceed 16 characters
              if (inputValue.length > 16) {
                inputValue = inputValue.slice(0, 16);
              }

              // Update the model
              this.v$.form.card_number.$model = inputValue;
            }
        },
        mounted() {
            this.user = JSON.parse(localStorage.getItem('user'));
            this.newUser = JSON.parse(localStorage.getItem('new_user'));
            this.init();
        },
        validations() {
            return {
                form: {
                    country_id: { required },
                    state_id: { required },
                    city_id: { required },
                    cvc: { required, numeric, minLength: minLength(3), maxLength: maxLength(3) },
                    card_number: { required, numeric },
                    exp_date: { required },
                    address: { required },
                },
            }
        },



    }
</script>