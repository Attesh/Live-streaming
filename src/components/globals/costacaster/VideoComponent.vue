<template>
    <div class="guest-page-navigation-tatle">
        <h1>Videos</h1>

    </div>
    <form @submit.prevent="onSubmit">
        <div class="main-videos-box">
            <div v-for="item in videos" :key="item.id" class="main-video-box">
                <div class="video-image-box">
                    <span>{{ item.duration }}</span>
                    <!-- Bind the image URL dynamically -->
                    <router-link :to="{  name: 'video-detail', params: {id: item.id} }"> <img :src="item.thumbnail"
                            alt="Video Thumbnail" @error="handleImageError"> </router-link>

                </div>
                <div class="main-box-video">
                    <h2>{{ item.title }}</h2>
                    <div class="main-video-profile-flex">
                        <img class="video-profile-img" src="https://picsum.photos/200/300" alt="Profile Image">
                        <p class="video-profile-name">{{ item.user.name }}</p>
                    </div>
                </div>
            </div>

        </div>
    </form>
</template>
<script>
    import VueRouter from 'vue-router';
    import { postData, fetchData } from '@services/base.js';
    export default {
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