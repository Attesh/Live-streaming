<template>
    <section class="main-guest-section ">
        <SideBar @updateValue="updateValueFromHeader"></SideBar>
        <section
            :class="valueFromHeader ? 'guest-main-page-shop-header sidebar-section' : 'guest-main-page-shop-header sidebar-section1'">
            <GuestHeader></GuestHeader>
            <div>
                <CorsacasterBioComponent></CorsacasterBioComponent>
             
                <div>
                    <div class="home-page-navigation">
                        <h1 :class="this.tab == 'home' ? 'active-nav-btn' : ''" @click="changeTab('home')">Home</h1>
                        <h1 :class="(this.tab == 'video' || this.tab == 'linked-video' || this.tab == 'viewed-video') ? 'active-nav-btn tab-decoration' : 'tab-decoration'"
                            @click="changeTab('video')">Video</h1>
                            <h1 :class="this.tab == 'roster' ? 'active-nav-btn tab-decoration' : 'tab-decoration'"
                            @click="changeTab('roster')"> Roster</h1>
                      
                        <h1 :class="this.tab == 'about' ? 'active-nav-btn tab-decoration' : 'tab-decoration'"
                            @click="changeTab('about')">About</h1>
                        <h1 :class="this.tab == 'shorts' ? 'active-nav-btn tab-decoration' : 'tab-decoration'"
                            @click="changeTab('shorts')">Shorts</h1>
                      
                    </div>
                    <HomeComponent v-if="this.tab == 'home'" @changeTab="changeTab"></HomeComponent>

                    <VideoComponent v-if="this.tab == 'video'"></VideoComponent>
                    
                    <CorsacasterRosterComponent v-if="this.tab == 'roster'"></CorsacasterRosterComponent>
                    <CorsacastershortsComponent v-if="this.tab == 'shorts'"></CorsacastershortsComponent>
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
    import CorsacasterRosterComponent from '@components/globals/costacaster/CorsacasterRosterComponent.vue';
    import CorsacastershortsComponent from '@components/globals/costacaster/CorsacastershortsComponent.vue';
    import FanFollowersComponent from '@components/globals/fan/FanFollowersComponent.vue';
    import CorsacasterBioComponent from '@components/globals/costacaster/CorsacasterBioComponent.vue';
    export default {
        components: {
            GuestHeader,
            SideBar,
            HomeComponent,
            VideoComponent,
            AboutComponent,
         
            CorsacasterRosterComponent,
            CorsacastershortsComponent,
            FanFollowersComponent,
            CorsacasterBioComponent,
            valueFromHeader: false,
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
            async changeRoute(name) {
                this.$router.push({ name: name })
            },
            async setTabAccordingToHash(value) {
                this.tab = value.substring(1)
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