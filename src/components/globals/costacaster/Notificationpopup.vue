<template>

    <div
        style="background-color: #000c;position: fixed;top: 0;width: 100%;height: 100%;z-index: 99999999999999999999999999;left: 0;">
        <div class="small-notifi-main">
            <div class="main-notifi">
                <div class="close-notif">
                    <h1 style="font-weight: bold;">
                        Notifications
                    </h1>

                    <img style="width: 20px; height: 20px;" src="@assets/whitecross.png" alt=""
                        @click="closeNotificationPopup">

                </div>
                <div class="notifi-seen-all" @click="SeenNotifications">
                    <button>
                        Seen All Notification
                    </button>
                </div>
                <hr>
                <div style="overflow: scroll; height: 300px; overflow-x: hidden;">
                    <div :class="notification.is_seen==0 ? 'notification-unseen-background small-notifi' : 'small-notifi'  " v-for="(notification, index) in recentnotifications" :key="index">
                        <div style="margin-top: -20px;">
                            <img style="width: 40px; height: 40px;" src="@assets/notifi1.png" alt="">
                        </div>
                        <div class="name-com">
                            <h3>{{ notification.user.name }}</h3>
                            <p>{{ notification.message }}</p>
                        </div>
                    </div>
                </div>
                <div class="notifi-btn">
                    <router-link :to="{ name: 'Notification' }">
                        <button>
                            View All
                        </button>
                    </router-link>
                </div>
            </div>
        </div>

    </div>

</template>
<script>
    import GuestHeader from '@components/globals/guest/GuestHeader.vue';
    import SideBar from '@components/globals/costacaster/SideBar.vue';
    import { fetchData, postData } from '@services/base.js'; // Assuming you have a fetchData method for making GET requests
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
                recentnotifications: {}, // To store notifications
                notifications: [],
            }
        },
        methods: {
            async closeNotificationPopup() {
                this.$emit('toggleNotification', false);
            },
            async RecentNotification() {
                const endpoint = '/get-my-recent-notifications'; // Replace with your desired endpoint to fetch notifications
                try {
                    const response = await fetchData(endpoint);
                    this.recentnotifications = response.data?.data;
                    // console.log(this.recentnotifications)
                } catch (error) {
                    console.error('Error fetching notifications:', error);
                }
            },
            async SeenNotifications() {
                const endpoint = '/seen-all-notifications'; // Endpoint to clear notifications
                try {
                    const response = await postData(endpoint, {}); // Assuming it's a POST request, pass empty object if no additional data is required
                    if (response.status === 200) {
                        this.notifications = []; // Clear notifications locally
                        toast.success(' Seen Notifications successfully.');
                        this.RecentNotification();
                    } else {
                        toast.error('Failed to Seen Notifications.');
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
            this.RecentNotification();
        }
    }
</script>