<template>
    <VideoComponent></VideoComponent>

    <ViewedVideoComponent> </ViewedVideoComponent>
     <LinkedVideoComponent></LinkedVideoComponent>
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
        <!-- <div class="main-video-box2">
            <div class="video-image-box2">

                <img src="@assets/athelete2.png">
                <p>
                    Bronze To Radiant In One <br> Stream!
                </p>
                <p>
                    2M Views
                </p>
            </div>

        </div>
        <div class="main-video-box2">
            <div class="video-image-box2">

                <img src="@assets/athelete3.png">
                <p>
                    Bronze To Radiant In One <br> Stream!
                </p>
                <p>
                    2M Views
                </p>
            </div>

        </div>
        <div class="main-video-box2">
            <div class="video-image-box2">

                <img src="@assets/athelete4.png">
                <p>
                    Bronze To Radiant In One <br> Stream!
                </p>
                <p>
                    2M Views
                </p>
            </div>

        </div> -->

    </div>
</template>

<script>
    import ViewedVideoComponent  from '@components/globals/costacaster/ViewedVideoComponent.vue';
    import LinkedVideoComponent  from '@components/globals/costacaster/LinkedVideoComponent.vue';
    import VideoComponent  from '@components/globals/costacaster/VideoComponent.vue';
    import VueRouter from 'vue-router';
    import { postData, fetchData } from '@services/base.js';
    export default {
        components: {
            ViewedVideoComponent,
            LinkedVideoComponent,
            VideoComponent
        },
        data() {

            return {

                response: {},
                videos: [],
            }
        },
        mounted() {
            // Fetch videos when the component is mounted
            this.fetchVideos();
        },
        methods: {
            async setTabName(name) {
                this.$emit("changeTab", name)
            },
            async changeRoute(name) {
                this.$router.push({ name: name })
            },
            async fetchVideos() {
                const endpoint = '/list-videos?limit=3';
                this.response = await fetchData(endpoint);
                this.videos = this.response.data?.data;
                console.log(this.videos);
            },
        }
    }
</script>