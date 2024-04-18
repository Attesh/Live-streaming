<template>
    <div class="fan-visit">
        <div>
            <img src="@assets/avatar.jpg" alt="">
        </div>
        <div class="see-follower-main" style="">
            <div class="see-followers">
                <div @click="changeRoute('fan-home', '#video')">
                    <h6>
                        50
                    </h6>
                    <p>
                        Videos
                    </p>
                </div>
                <div class="fan-followers" @click="changeRoute('guest-search-result')">
                    <h6>
                        10.k
                    </h6>
                    <p>
                        Followers
                    </p>
                </div>
                <div @click="changeRoute('guest-search-result')">
                    <h6>
                        30
                    </h6>
                    <p>
                        Following </p>
                </div>

            </div>
            <div class="corsacaster-edit-prof">
                <router-link :to="{ name: 'fan-profile' }">
                    <button>Edit Profile</button>
                </router-link>>
            </div>
        </div>
    </div>
    <div class="fan-bio-main">
        <div class="fan-bio">
            <h6>
                Shroud
            </h6>
            <p>
                Hey My name is Shroud and This is my Fan account. Welcome to my account. Liverpool Fan.
                YNWA.
            </p>
        </div>
        <!-- <div>
            <router-link :to="{ name: 'upload' }">
                <button>
                    Mange Video
                </button>
            </router-link>
        </div> -->
    </div>
    <div class="fan-icon-main">
        <div>
            <p>
                Loved to create content about sports 🏀🚀
            </p>
        </div>
        <div class="fan-icon">
            <div class="facebook" @click="openTheRespectedUrl('https://www.facebook.com/')">
                <img src="@assets/facebook.png" alt="">
                <p>Facebook</p>
            </div>
            <div class="instagram" @click="openTheRespectedUrl('https://instagram.com/')">
                <img src="@assets/insta.png" alt="">
                <p>instagram</p>
            </div>
            <div class="strava" @click="openTheRespectedUrl('https://www.strava.com/')">
                <img src="@assets/strava.png" alt="">
                <p>Strava</p>
            </div>
        </div>
    </div>
</template>
<script>
    import { defineComponent, ref } from 'vue';
    export default defineComponent({
        methods: {
            openTheRespectedUrl(url) {
                window.open(url, '_blank');
            },
            changeRoute(route, hash = null) {
                this.$router.push({ name: route, hash: hash })
            }
        }

    });
</script>