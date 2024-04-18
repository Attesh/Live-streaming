<template>
    <section class="main-guest-section">
        <SideBar @updateValue="updateValueFromHeader"></SideBar>
        <section class="guest-main-page-shop-header sidebar-section">
            <GuestHeader></GuestHeader>
            <div class="guest-header">
                <div class="video-container">
                    <!-- <video ref="videoPlayer" class="video" controls>
                    <source :src="require('@/assets/video.mp4')" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video> -->
                    <!-- <VideoStreamer></VideoStreamer> -->
                    <!-- <OpenTok></OpenTok> -->
                </div>
            </div>
            <div class="guest-header video-info">
                <div class="left">
                    <div class="event-details">
                        <p class="event-title">Cycling Race World Class One Stream! 🔥</p>
                    </div>
                </div>
                <div class="right">
                    <div class="user-info">
                        <img src="@assets/featured-athlete/user.png" alt="" class="profile-image" />
                        <div class="user-details">
                            <p class="username">William John</p>
                            <p class="follower-count">
                                4.4M <span class="follower-text">followers</span>
                            </p>
                        </div>
                    </div>
                    <div class="follow-button-container">
                        <button class="follow-button">Following</button>
                    </div>
                </div>
            </div>
            <div class="event-tags">
                <button class="tag-button">Cycling</button>
                <button class="tag-button">Racing</button>
                <button class="tag-button">World Championship</button>
            </div>

            <div class="live-comments-main">
                <div class="live-comments">
                    <img src="@assets/live1.png" alt="">
                    <p class="name">
                        Jyane
                    </p>
                    <p class="comments">
                        Wow, this is really epic
                    </p>
                </div>
                <div class="live-comments">
                    <img src="@assets/live2.png" alt="">
                    <p class="name">
                        MatthewG
                    </p>
                    <p class="comments">
                        I'll be there in 2 mins
                    </p>
                </div>
                <div class="live-comments">
                    <img src="@assets/live3.png" alt="">
                    <p class="name">
                        Josh
                    </p>
                    <p class="comments">
                        Haha that's terrifying 😂
                    </p>
                </div>
                <div class="live-comments">
                    <img src="@assets/live4.png" alt="">
                    <p class="name">
                        Klea
                    </p>
                    <p class="comments">
                        Haha oh man
                    </p>
                </div>
                <div class="live-comments">
                    <img src="@assets/live5.png" alt="">
                    <p class="name">
                        millan_sue
                    </p>
                    <p class="comments">
                        just ideas for next time
                    </p>
                </div>
                <div class="live-comments">
                    <img src="@assets/live6.png" alt="">
                    <p class="name">
                        nobarainc
                    </p>
                    <p class="comments">
                        nobarainc
                    </p>
                </div>
                <div class="live-comments">
                    <img src="@assets/live7.png" alt="">
                    <p class="name">
                        lootbox
                    </p>
                    <p class="comments">
                        aww
                    </p>
                </div>
                <div class="live-comments">
                    <img src="@assets/live8.png" alt="">
                    <p class="name">
                        Menaruchan
                    </p>
                    <p class="comments">
                        omg, this is amazing
                    </p>
                </div>

            </div>
            <div class="commits-guest-header-home-search-field live-send">
                <img src="@assets/featured-athlete/search-normal.svg" alt="">
                <input type="text" placeholder="Write a Comment">
                <img src="@/assets/send.png" alt="">
            </div>
        </section>
    </section>
</template>
<script>
    import GuestHeader from '@components/globals/guest/GuestHeader.vue';
    import SideBar from '@components/globals/costacaster/SideBar.vue';
    import VideoStreamer from '@components/globals/costacaster/VideoStreamer.vue';
    import OpenTok from '@components/globals/costacaster/OpenTokComponent.vue';
    export default {
        components: {
            GuestHeader,
            SideBar,
            VideoStreamer,
            OpenTok,
        },
        data() {

            return {
                valueFromHeader: false,
            }
        },
        methods: {
            uploadVideo() {
                this.$router.push({ name: 'Visibility' })
            },
            updateValueFromHeader(value) {
                // Update the value in the parent component
                this.valueFromHeader = value;
            },
        }



    }
</script>