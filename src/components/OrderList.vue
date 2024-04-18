<template>
    <section class="main-guest-section">
        <SideBar @updateValue="false"></SideBar>
        <section :class="valueFromHeader ? 'sidebar-section' : 'sidebar-section1'">
            <GuestHeader @sendValue="true"></GuestHeader>
            <div class="order-detail-head">
                <h1>Order Details :</h1>
            </div>
            <div class="order-box">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col"> Order ID </th>
                            <th scope="col">Start Date</th>
                            <th scope="col"> Order Number </th>
                            <!-- <th scope="col" v-if="role === 'admin'"> Product Price </th> -->
                            <th scope="col" v-if="role === 'vendor'"> Total Amount </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="data in orderManagementLists">
                            <td>
                                <div class="d-flex align-items-center ">
                                    <!-- <div class="product-title-img">
                                        <img class="img-fluid" :src="data?.image" alt="">
                                    </div> -->
                                    <div class="product-title-text ms-2">{{ data?.id }}</div>
                                </div>
                            </td>
                            <td style="padding-top: 13px!important;">{{ data?.user.created_at }}</td>
                            <td style="padding-top: 13px!important;">{{ data?.order_number }}</td>
                            <!-- <td style="padding-top: 13px!important;" v-if="role === 'admin'">{{ data?.total_amount }}</td> -->
                            <td style="padding-top: 13px!important;" v-if="role === 'vendor'">{{ data?.total_amount }}
                            </td>
                            <router-link :to="{ name: 'ViewOrder' , params : { id : data.id } }">
                                <td style="padding-top: 13px!important;">
                                    <button class="view-detail-button"> View Detail </button>
                                </td>
                            </router-link>
                        </tr>

                    </tbody>
                </table>
            </div>
        </section>
    </section>
    <Footer></Footer>
</template>

<style scoped>
    select#exampleSelect {
        width: 150px;
        height: 40px;
        background: #FFFFFF;
        border: 1px solid #9A9A9A;
        border-radius: 29px;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        /* background-image: url('../assets/arrow.png'); */
        background-repeat: no-repeat;
        background-position-x: 115px;
        background-position-y: 10px;
        background-size: 20px;
        cursor: pointer;

    }

    .order-detail-head h1 {
        font-size: 30px;
        color: #fff;
        padding: 10px 10px 10px 60px;
    }

    .view-detail-button {
        background-color: transparent;
        border: solid 2px #A3241C;
        color: #f15858;
        padding: 9px;
        padding: 10px;
        border-radius: 28px;
        font-size: 13px;
        cursor: pointer;

        &:hover {
            background-color: #A3241C;
            color: var(--bg-sidemenu-color);
            transition: 0.1s ease-in;
            font-weight: 600;
            color: #fff;
        }
    }

    select#exampleSelect:focus {
        outline: none;
        box-shadow: none;
    }

    .view-orders {
        display: flex;
        justify-content: end;
        padding: 25px 30px 20px 10px;
    }

    .view-orders button {
        background-color: transparent;
        border: solid 2px #A3241C;
        color: #f15858;
        padding: 9px;
        padding: 10px;
        border-radius: 28px;
        font-size: 13px;
        cursor: pointer;

        &:hover {
            background-color: #A3241C;
            color: var(--bg-sidemenu-color);
            transition: 0.1s ease-in;
            font-weight: 600;
            color: #fff;
        }
    }


    .product-title-img img {
        height: 35px;
        width: 35px;
        object-fit: cover;
    }

    .product-title-text {
        /* font-family: 'Roboto'; */
        font-size: 12px;
        font-weight: 600;
        color: #ffff;



    }

    .order-box {
        background: hsl(240, 20%, 18%);
        box-shadow: 0px -1px 18px 3px rgb(154 154 154 / 8%);
        border-radius: 28px;
        width: 90%;
        /* height: 100%; */
        margin: 0 auto;
        margin-top: 25px;
        padding: 10px;
    }

    .order-box table {
        margin-top: 20px;

    }

    .order-box table th {

        /* font-family: 'Roboto'; */
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        color: #979797;

        padding-left: 20px !important;
        padding-right: 20px !important;



    }

    .order-box table td {
        /* font-family: 'Roboto'; */
        font-style: normal;
        /* font-weight: 800; */
        font-size: 14px;
        color: #fff;
        border-bottom: none !important;
        padding-left: 20px !important;
        padding-right: 20px !important;

    }

    #searchInput {

        background: white;
        border: 1px solid #FFFFFF;
        border-radius: 0px 28px 29px 0px;
        width: 300px;
        height: 40px;
        border-left: none;

    }

    .order-search-box {
        background: #CDCDCD;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #FFFFFF;
        border-radius: 29px 0 0 29px;
        border-right: none;
        width: 50px;
        cursor: pointer;
    }



    .order-search-container {
        display: flex;
        max-width: 400px;
    }

    #ordersearchInput {

        background: #CDCDCD;
        border: 1px solid #FFFFFF;
        border-radius: 0px 28px 29px 0px;
        width: 300px;
        height: 40px;
        border-left: none;
        outline: none;

    }

    .styled-checkbox {
        width: 18px;
        height: 18px;
    }

    .styled-checkbox:checked {
        accent-color: #020035;
        mix-blend-mode: multiply;
        outline: none;
    }

    #searchInput:focus {
        outline: none;
    }

    .table {
        --bs-table-bg: none;
    }

    thead {
        border-bottom: 1px solid grey;
    }
</style>
<script>
    import GuestHeader from '@components/globals/guest/GuestHeader.vue';
    import SideBar from '@components/globals/costacaster/SideBar.vue';
    import Footer from '@components/globals/costacaster/Footer.vue';
    import VueRouter from 'vue-router';
    import { postData, fetchData } from '@services/base.js';

    export default {
        components: {
            GuestHeader,
            SideBar,
            Footer,
        },
        data() {
            return {
                orderManagementLists: [],
                role: '',
                valueFromHeader: true
            };
        },
        async mounted() {
            await this.checkRole();
            await this.fetchData();
        },
        methods: {
            async checkRole() {
                this.role = this.$route.path.includes('admin') ? 'admin' : 'vendor';
            },
            async fetchData() {
                // console.log("working")
                try {
                    const response = await fetchData('/get-my-orders');
                    this.orderManagementLists = response.data.data.data;
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            },
            updateValueFromHeader(value) {
                // Update the value in the parent component
                this.valueFromHeader = value;
                // console.log(this.valueFromHeader, "this is value ");
            }
        },
    };
</script>