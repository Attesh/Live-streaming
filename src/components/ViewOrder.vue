<template>
    <section class="main-guest-section">
        <SideBar @updateValue="updateValueFromHeader"></SideBar>
        <section :class="valueFromHeader ? 'sidebar-section' : 'sidebar-section1' ">
            <GuestHeader @sendValue="sendValueToSidebar"></GuestHeader>
            <div class="container">
                <div class="account-margin">
                    <div class="row">
                        <div class="wishlist-heading d-flex align-items-center justify-content-between">
                            <h3>Items in your Order {{ orderList?.details?.length }}</h3>
                            <!-- <div class="delete-icon d-flex align-items-center" @click="showDeleteModal">
                                <img src="@assets/Vecto.png" /> <span>Delete</span>
                            </div> -->
                        </div>
                        <div class="mt-3">
                            <table class="wishlist-table">
                                <thead>
                                    <tr>
                                        <th>Item ID</th>
                                        <th>Image</th>
                                        <th>Product Name</th>
                                        <th>Product Brand</th>
                                        <th>Product Category</th>
                                        <th>Unit Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="wishlist-item" v-for="(item, index) in orderList.details" :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td><img :src="item.product.images[0].image" /></td>
                                        <td>{{ item.product.name }}</td>
                                        <td>{{ item.product.brand }}</td>
                                        <td>{{ item.product.category }}</td>
                                        <td>{{ item.price }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-if="showCustomModal" class="custom-modal">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Delete Product</h5>
                                </div>
                                <div class="modal-body">
                                    Are you sure you want to delete this product?
                                </div>
                                <div class="modal-footer">
                                    <button @click="hideCustomModal" class="cancel-button">Cancel</button>
                                    <button @click="deleteProduct" class="delete-button">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="view-orders">
                    <router-link :to="{ name: 'orderList' }"> <button>
                            Back
                        </button>
                    </router-link>
                </div>
            </div>
          
        </section>
    </section>

    <Footer></Footer>
</template>
<style scoped>
    .wishlist-heading h3 {
        font-size: 22px;
        color: #ffff;
        font-weight: 700;
    }

    .container {
        background: hsl(240, 20%, 18%);
        box-shadow: 0px -1px 18px 3px rgb(154 154 154 / 8%);
        width: 90%;
        padding: 25px;
    }
    .view-orders{
    display: flex;
    justify-content: end;
    padding: 25px 30px 20px 10px;
}
.view-orders button{
    background-color: transparent;
  border: solid 2px #A3241C;
  color: #f15858;
  padding: 10px 30px 10px 30px;
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

    .delete-icon {
        color: #F76356;
        gap: 6px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 400;
    }

    .delete-icon img {
        width: 17px;
        height: 20px;
        object-fit: cover;
    }

    .wishlist-table {
        width: 100%;
    }

    .wishlist-table thead {
        background-color: #CECECE;
        height: 30px;
        color: #000000;
        font-size: 14px;
        font-weight: 800;
    }

    .wishlist-item {
        font-size: 15px;
        font-weight: 800;
        color: #fff;
        height: 100px;
    }

    .wishlist-item input[type="checkbox"] {
        width: 20px;
        height: 20px;
        border: 1px solid #8D8D8D;
        margin-left: 25px;
    }

    .wishlist-item img {
        width: 70px;
        height: 70px;
    }

    .custom-modal {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
    }

    .modal-content {
        background-color: #fff;
        padding: 20px;
        border-radius: 30px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        width: 500px;
        height: 180px;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .modal-title {
        color: #ffff;
    font-size: 18px;
    font-weight: 700;
    margin: 0 auto;
    }

    .modal-body {
        margin-bottom: 20px;
        margin-top: 20px;
        color: #ffff;
        font-size: 14px;
        font-weight: 500;
    }

    .modal-footer {
        display: flex;
        justify-content: center;
        gap: 15px;
    }

    .cancel-button {
        background-color: transparent;
  border: solid 2px #A3241C;
  color: #f15858;
  padding: 10px 30px 10px 30px;
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

    .delete-button {
        background-color: transparent;
  border: solid 2px #A3241C;
  color: #f15858;
  padding: 10px 30px 10px 30px;
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
</style>
<script>

    import GuestHeader from '@components/globals/guest/GuestHeader.vue';
    import SideBar from '@components/globals/costacaster/SideBar.vue';
    import { ref } from 'vue';
    import Footer from '@components/globals/costacaster/Footer.vue';
    import { postData, fetchData } from '@services/base.js';

    export default {
        components: {
            GuestHeader,
            SideBar,
            Footer,
        },
        data() {
            return {
                orderList : {},
                showCustomModal: false,
            }
        },

        mounted(){
            this.getOrderDetails();
        },
        methods: {
            showDeleteModal() {
                this.showCustomModal = true;
            },

            hideCustomModal() {
                this.showCustomModal = false;
            },
            deleteProduct() {
                this.hideCustomModal();
            },
            async getOrderDetails(){
                try {
                    const response = await fetchData('/order-detail/'+this.$route.params.id);
                    this.orderList = response.data.data;
                    console.log(this.orderList);
                } catch (error) {
                    console.log('Error fetching data:', error);
                }
            }
        }
    }

</script>