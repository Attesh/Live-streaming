<template>
    <UserProfileVideoComponent></UserProfileVideoComponent>

    <UserProfileViewedVideoComponent> </UserProfileViewedVideoComponent>
     <UserProfileLinkedVideoComponent></UserProfileLinkedVideoComponent>
    <div class="guest-page-navigation-tatle">
        <h1>Shorts</h1>
        <p @click="changeRoute('shorts')">See All </p>
    </div>
    <div class="athelete-shorts">
        <div class="main-video-box2">
            <div class="video-image-box2">

                <img src="@assets/athelete1.png">
                <p>
                    Bronze To Radiant In One <br> Stream!
                </p>
                <p>
                    2M Views
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import UserProfileViewedVideoComponent  from '@components/globals/user-profile/UserProfileViewedVideoComponent.vue';
    import UserProfileLinkedVideoComponent  from '@components/globals/user-profile/UserProfileLinkedVideoComponent.vue';
    import UserProfileVideoComponent  from '@components/globals/user-profile/UserProfileVideoComponent.vue';
    import VueRouter from 'vue-router';
    import { postData, fetchData } from '@services/base.js';
    export default {
        components: {
            UserProfileViewedVideoComponent,
            UserProfileLinkedVideoComponent,
            UserProfileVideoComponent
        },
        data() {

            return {

                response: {},
                videos: [],
            }
        },
        methods: {
            async setTabName(name) {
                this.$emit("changeTab", name)
            },
            async changeRoute(name) {
                this.$router.push({ name: name })
            },
        }
    }
</script>