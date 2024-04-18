<template>
    <section class="main-guest-section">
        <SideBar @updateValue="updateValueFromHeader"></SideBar>
        <!-- guest-main-page-shop-header sidebar-section -->
        <section
            :class="valueFromHeader ? 'guest-main-page-shop-header sidebar-section' : 'guest-main-page-shop-header sidebar-section1'">
            <GuestHeader></GuestHeader>
            <div class="short-head">
                <h1>Shorts</h1>
            </div>
            <div class="shorts-container" v-show="showShorts">
                <video ref="videoPlayer" class="short" controls>
                    <source :src="require('@/assets/video.mp4')" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <img @click="hideShorts" class="short-cross-img" src="@assets/whitecross.png" alt="">
                <img class="short-msg-img" src="@assets/msg.png">
                <img class="short-share-img" src="@assets/Vector-11.png" alt="">
                <img class="short-like-img" src="@assets/solar_like-bold.png" alt="">
                <img class="short-dislike-img" src="@assets/solar_dislike-bold.png" alt="">
            </div>
        </section>
    </section>
</template>

<script>
    import GuestHeader from '@components/globals/guest/GuestHeader.vue';
    import SideBar from '@components/globals/costacaster/SideBar.vue';

    export default {
        components: {
            GuestHeader,
            SideBar,
        },
        data() {
            return {
                showShorts: true,
            }
        },
        methods: {
            hideShorts() {
                this.showShorts = false;
            },
            updateValueFromHeader() {
                // Define your logic for updating valueFromHeader if needed
            }
        }
    };
</script>