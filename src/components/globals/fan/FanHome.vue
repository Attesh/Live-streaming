<template>
    <section class="main-guest-section ">
        <SideBar @updateValue="updateValueFromHeader"></SideBar>
        <section
            :class="valueFromHeader ? 'guest-main-page-shop-header sidebar-section' : 'guest-main-page-shop-header sidebar-section1'">
            <GuestHeader></GuestHeader>
            <div class="fan-visit-main">
                <FanFollowersComponent></FanFollowersComponent>
                <hr class="fan-line">
                <div>
                    <div class="home-page-navigation-fan">
                        <h1 :class="this.tab == 'home' ? 'active-nav-btn' : ''" @click="changeTab('home')">Home</h1>
                        <h1 :class="(this.tab == 'video' || this.tab == 'linked-video') ? 'active-nav-btn tab-decoration' : 'tab-decoration'"
                            @click="changeTab('video')">Video</h1>
                            <h1 :class="this.tab == 'CorsacastershortsComponent' ? 'active-nav-btn tab-decoration' : 'tab-decoration'"
                            @click="changeTab('CorsacastershortsComponent')">Shorts</h1>
                        <h1 :class="this.tab == 'about' ? 'active-nav-btn tab-decoration' : 'tab-decoration'"
                            @click="changeTab('about')">About</h1>
                    </div>
                    <HomeComponent v-if="this.tab == 'home'" @changeTab="changeTab"></HomeComponent>

                    <VideoComponent v-if="this.tab == 'video'"></VideoComponent>
                    <ViewedVideoComponent v-if="this.tab == 'viewed-video'"></ViewedVideoComponent>
                    <LinkedVideoComponent v-if="this.tab == 'linked-video'"></LinkedVideoComponent>
                    <CorsacastershortsComponent v-if="this.tab == 'CorsacastershortsComponent'">
                    </CorsacastershortsComponent>

                </div>
            </div>
            <AboutComponent v-if="this.tab == 'about'"></AboutComponent>

        </section>
    </section>
</template>
<script>
    import GuestHeader from '@components/globals/guest/GuestHeader.vue';
    import SideBar from '@components/globals/costacaster/SideBar.vue';
    import HomeComponent from '@components/globals/costacaster/HomeComponent.vue';
    import VideoComponent from '@components/globals/costacaster/VideoComponent.vue';
    import AboutComponent from '@components/globals/costacaster/AboutComponent.vue';
    import ViewedVideoComponent from '@components/globals/costacaster/ViewedVideoComponent.vue';
    import LinkedVideoComponent from '@components/globals/costacaster/LinkedVideoComponent.vue';
    import FanFollowersComponent from '@components/globals/fan/FanFollowersComponent.vue';
    import CorsacastershortsComponent from '@components/globals/costacaster/CorsacastershortsComponent.vue';
    import VueRouter from 'vue-router';
    export default {
        components: {
            GuestHeader,
            SideBar,
            HomeComponent,
            VideoComponent,
            AboutComponent,
            ViewedVideoComponent,
            LinkedVideoComponent,
            FanFollowersComponent,
            CorsacastershortsComponent,
        },
        data() {
            return {
                tab: 'home',
                valueFromHeader: false,
            }
        },
        methods: {
            async changeTab(tabName) {
                this.tab = tabName;
                this.$router.replace({ hash: null });
            },
            async setTabAccordingToHash(value) {
                this.tab = value.substring(1)
            },
            async changeRoute(name) {
                this.$router.push({ name: name })
            },
            updateValueFromHeader(value) {
                // Update the value in the parent component
                this.valueFromHeader = value;
            },
        },
        created() {
            if (this.$route.hash) {
                this.setTabAccordingToHash(this.$route.hash)
            }
        },
        watch: {
            '$route': function (newRoute, oldRoute) {
                if (newRoute.hash) {
                    if (newRoute.hash !== oldRoute.hash) {
                        this.setTabAccordingToHash(newRoute.hash)
                    }
                }

            }
        }



    }
</script>