<template>
    <section class="main-guest-section ">
        <SideBar @updateValue="updateValueFromHeader"></SideBar>
        <section
            :class="valueFromHeader ? 'guest-main-page-shop-header sidebar-section' : 'guest-main-page-shop-header sidebar-section1'">
            <GuestHeader></GuestHeader>
            <div>
                <UserBioComponent></UserBioComponent>
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
                    <UserProfileHomeComponent v-if="this.tab == 'home'" @changeTab="changeTab">
                    </UserProfileHomeComponent>

                    <UserProfileVideoComponent v-if="this.tab == 'video'"></UserProfileVideoComponent>

                    <UserProfileRoasterComponent v-if="this.tab == 'roster'"></UserProfileRoasterComponent>
                    <UserProfileShortsComponent v-if="this.tab == 'shorts'"></UserProfileShortsComponent>
                </div>
            </div>
            <UserAboutComponent v-if="this.tab == 'about'"></UserAboutComponent>


        </section>
    </section>
</template>
<script>
    import GuestHeader from '@components/globals/guest/GuestHeader.vue';
    import SideBar from '@components/globals/costacaster/SideBar.vue';
    import UserProfileHomeComponent from '@components/globals/user-profile/UserProfileHomeComponent.vue';
    import UserProfileVideoComponent from '@components/globals/user-profile/UserProfileVideoComponent.vue';
    import UserAboutComponent from '@components/globals/user-profile/UserAboutComponent.vue';
    import UserProfileRoasterComponent from '@components/globals/user-profile/UserProfileRoasterComponent.vue';
    import UserProfileShortsComponent from '@components/globals/user-profile/UserProfileShortsComponent.vue';
    import FanFollowersComponent from '@components/globals/fan/FanFollowersComponent.vue';
    import UserBioComponent from '@components/globals/user-profile/UserBioComponent.vue';
    export default {
        components: {
            GuestHeader,
            SideBar,
            UserProfileHomeComponent,
            UserProfileVideoComponent,
            UserAboutComponent,
            UserProfileRoasterComponent,
            UserProfileShortsComponent,
            FanFollowersComponent,
            UserBioComponent,
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
        },

        mounted() {
            // console.log(this.$route.params.id);
        }
    }
</script>