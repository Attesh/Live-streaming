<template>
    <section class="main-guest-section">
        <SideBar @updateValue="updateValueFromHeader"></SideBar>
        <section
            :class="valueFromHeader ? 'guest-main-page-shop-header sidebar-section' : 'guest-main-page-shop-header sidebar-section1'">
            <GuestHeader></GuestHeader>
            <div style="    border: 1px solid grey;
            margin: 25px;
            padding: 20px;
            height: auto;">
                <div class="notifi-head-button">
                    <h1>Notifications</h1>
                    <button @click="deleteNotifications">
                        Delete Notification
                    </button>
                </div>
                <div class="main-notifi">

                    <div class="notifi">
                        <div v-for="(notification, index) in notifications.data" :key="index"
                            style="display: flex;align-items: center;width: 100%;">
                            <img src="https://picsum.photos/200/300" alt="">
                            <div class="name-com">
                                <h3>{{ notification.user.name }}</h3>
                                <p>{{ notification.message }}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    </section>
</template>

<script>
    import GuestHeader from '@components/globals/guest/GuestHeader.vue';
    import SideBar from '@components/globals/costacaster/SideBar.vue';
    import { fetchData, postData } from '@services/base.js'; // Assuming you have fetchData and postData methods for making GET and POST requests
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    export default {
        components: {
            GuestHeader,
            SideBar
        },
        data() {
            return {
                valueFromHeader: false,
                notifications: [] // To store notifications
            }
        },
        methods: {
            async fetchData() {
                const endpoint = '/get-my-notifications'; // Replace with your desired endpoint to fetch notifications
                try {
                    const response = await fetchData(endpoint);
                    this.notifications = response.data?.data;
                } catch (error) {
                    console.error('Error fetching notifications:', error);
                }
            },
            async deleteNotifications() {
                const endpoint = '/clear-notifications'; // Endpoint to clear notifications
                try {
                    const response = await postData(endpoint, {}); // Assuming it's a POST request, pass empty object if no additional data is required
                    if (response.status === 200) {
                        this.notifications = []; // Clear notifications locally
                        toast.success('Notifications deleted successfully.');
                    } else {
                        toast.error('Failed to delete notifications.');
                    }
                } catch (error) {
                    console.error('Error deleting notifications:', error);
                    toast.error('An error occurred while deleting notifications.');
                }
            },
            updateValueFromHeader(value) {
                this.valueFromHeader = value;
            }
        },
        mounted() {
            // Fetch notifications when component is mounted
            this.fetchData();
        }
    }
</script>