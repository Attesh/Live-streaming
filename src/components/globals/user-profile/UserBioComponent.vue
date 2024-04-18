<template>
    <div class="guest-header-img">
        <img src="@assets/Rectangle-9583.png">
    </div>
    <div class="main-div-change-name-btns">
        <div class="guest-user-info-chanel">
            <div class="guest-chanel-img-white">
                <img class="guest-chanel-img guest-chanel-img-active" src="@assets/avatar.jpg">
                <!-- <button class="live-user-btn">Live</button> -->
            </div>
            <div>
                <div class="guest-verify-nameofchanel">
                    <h1>{{ profile.name }} </h1>
                    <img src="@assets/verify.png">
                </div>
                <div class="bio-followers">
                    <div class="follower-text-box">
                        <p class="follower-text"><span>{{ profile.videos_count }}</span> Video</p>
                    </div>
                    <div class="follower-text-box">
                        <p class="follower-text"><span>{{ profile.total_follower }}</span> followers</p>
                    </div>
                    <div class="follower-text-box">
                        <p class="follower-text"><span>{{ profile.followings }}</span> following</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="user-profile-bio-btn">
            <div class="corsacaster-edit-prof" v-if="hideButton">
                <a href="javascript:void(0)" @click="initiateChat" style="border:none">
                    <img width="30px" class=" " src="@assets/msg.png">
                </a>
            </div>


            <div class="corsacaster-edit-prof" v-if="hideButton">
                <router-link :to="{ name: 'corsacaster-profile' }" >
                    <button>Follow</button>
                </router-link>
            </div>
        </div>


    </div>
    <div class="main-box-share-btn-text">
        <p>SUBSCRIBE for latest content and videos!!!</p>
        <div class="share-btn-alignment-flex">
            <div class="share-btn-alignment-flex">
                <img src="@assets/Group.png">
                <p>discord.gg/shroudc</p>
            </div>
            <div class="share-btn-alignment-flex">
                <img src="@assets/twitter.png">
                <p>@shroud</p>
            </div>
            <div class="share-btn-alignment-flex">
                <img src="@assets/instagram.png">
                <p>@shroud</p>
            </div>
        </div>
    </div>
</template>

<script>
    import VueRouter from 'vue-router';
    import { postData, fetchData } from '@services/base.js';
    export default {

        data() {
            return {
                response: {},
                profile: {},
                user : {},
                responseData : {},
                conversation : {},
                hideButton : true,
            }
        },
        methods: {
                async getUserProfile() {
                    const endpoint = '/get-user-profile/' + this.$route.params.id;
                    this.response = await fetchData(endpoint);
                    this.profile = this.response.data?.data;
                },
                async initiateChat(){
                    if (this.user) {
                        const endpoint = 'initiate-conversation/' + this.$route.params.id;
                        this.responseData = await postData(endpoint);
                        if (this.responseData.data.status == 200) {
                            this.$router.push({ name : 'chat'});
                        }
                    }else{
                        this.$router.push({ name : 'login' });
                    }
                }  
        },
        mounted() {
            this.getUserProfile();
        },
        created(){
            this.user = JSON.parse(localStorage.getItem('user') || null);
            if(this.user){
                if(this.user?.id == this.$route.params.id){
                    this.hideButton = false;
                }
            }
        }
    }
</script>