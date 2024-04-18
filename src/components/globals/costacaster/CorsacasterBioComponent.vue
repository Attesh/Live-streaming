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
                    <h1>Corsacaster </h1>
                    <img src="@assets/verify.png">
                </div>
                <div class="bio-followers" >
                    <div class="follower-text-box">
                        <p class="follower-text"><span>25</span> Video</p>
                    </div>
                    <div class="follower-text-box">
                        <p class="follower-text"><span>65</span> followers</p>
                    </div>
                    <div class="follower-text-box">
                        <p class="follower-text"><span>4,4M</span> following</p>
                    </div>
                </div>
            </div>
        </div>
        
        

            <div class="corsacaster-edit-prof">
                <router-link :to="{ name: 'corsacaster-profile' }" >
                    <button >Edit Profile</button>
                </router-link>
            </div>
            <div class="corsacaster-edit-prof">
                <router-link :to="{ name: 'ShortsComponent' }" style="text-decoration:none">
                    <button>
                          Shorts
                    </button>
                </router-link>
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
    export default {
        methods: {
            async changeRoute(name) {
                this.$router.push({ name: name })
            },
        },
    }
</script>