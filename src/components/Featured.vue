<template>
    <section class="main-guest-section ">
        <SideBar @updateValue="updateValueFromHeader"></SideBar>
       <section :class="valueFromHeader ? 'guest-main-page-shop-header sidebar-section' : 'guest-main-page-shop-header sidebar-section1'">
            <GuestHeader></GuestHeader>
            <div>
                <div class="guest-header-img">
                    <img src="@assets/Rectangle-9583.png">
                </div>
                <div class="main-div-change-name-btns">
                    <div class="guest-user-info-chanel">
                        <div class="guest-chanel-img-white">
                            <img class="guest-chanel-img guest-chanel-img-active" src="@assets/Ellipse-15.png">
                            <button class="live-user-btn">Live</button>
                        </div>
                        <div>
                            <div class="guest-verify-nameofchanel">
                                <h1>Corsacaster </h1>
                                <img src="@assets/verify.png">
                            </div>
                            <div class="follower-text-box">
                                <p class="follower-text"><span>4,4M</span> followers</p>
                            </div>
                        </div>
                    </div>
                    <div class="subscribe-box-collection">
                        <button class="subscribe-btn">Subscribe</button>
                        <img class="sub-more-btn" src="@assets/Frame-1624721.png">
                    </div>
                </div>
                <div class="main-box-share-btn-text">
                    <p>Loved to create content about sports 🏀🚀</p>
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
                <div>
                    <div class="home-page-navigation">
                        <h1 :class="this.tab == 'home' ? 'active-nav-btn' : ''" @click="changeTab('home')">Home</h1>
                        <h1 :class="(this.tab == 'video' || this.tab == 'linked-video') ? 'active-nav-btn tab-decoration' : 'tab-decoration'"
                            @click="changeTab('video')">Video</h1>
                        <h1 :class="this.tab == 'home' ? 'tab-decoration' : 'tab-decoration'"
                            @click="changeTab('home')">
                            Roster</h1>
                        <h1 :class="this.tab == 'about' ? 'active-nav-btn tab-decoration' : 'tab-decoration'"
                            @click="changeTab('about')">About</h1>
                    </div>
                    <div class="guest-page-navigation-tatle">
                        <h1>Videos</h1>
                        <button>See All</button>
                    </div>
                    <div class="main-videos-box">
                        <div class="main-video-box">
                            <div class="video-image-box">
                                <span>04:21:22</span>
                                <img src="@assets/Overlay.png">
                            </div>
                            <div class="main-box-video">
                                <h2>Bronze To Radiant In One Stream! 🔥</h2>
                                <div class="btn-tags">
                                    <button>FPS</button>
                                    <button>Gaming</button>
                                    <button>Shooter</button>
                                </div>
                                <div class="main-video-profile-flex">
                                    <img class="video-profile-img" src="@assets/Profile-1.png">
                                    <p class="video-profile-name">Shroud</p>
                                    <button class="video-profile-btn"> <img src="@assets/game.png">
                                        <span>Valorant</span></button>
                                </div>
                            </div>
                        </div>
                        <div class="main-video-box">
                            <div class="video-image-box">
                                <span>04:21:22</span>
                                <img src="@assets/Overlay.png">
                            </div>
                            <div class="main-box-video">
                                <h2>Bronze To Radiant In One Stream! 🔥</h2>
                                <div class="btn-tags">
                                    <button>FPS</button>
                                    <button>Gaming</button>
                                    <button>Shooter</button>
                                </div>
                                <div class="main-video-profile-flex">
                                    <img class="video-profile-img" src="@assets/Profile-1.png">
                                    <p class="video-profile-name">Shroud</p>
                                    <button class="video-profile-btn"> <img src="@assets/game.png">
                                        <span>Valorant</span></button>
                                </div>
                            </div>
                        </div>
                        <div class="main-video-box">
                            <div class="video-image-box">
                                <span>04:21:22</span>
                                <img src="@assets/Overlay.png">
                            </div>
                            <div class="main-box-video">
                                <h2>Bronze To Radiant In One Stream! 🔥</h2>
                                <div class="btn-tags">
                                    <button>FPS</button>
                                    <button>Gaming</button>
                                    <button>Shooter</button>
                                </div>
                                <div class="main-video-profile-flex">
                                    <img class="video-profile-img" src="@assets/Profile-1.png">
                                    <p class="video-profile-name">Shroud</p>
                                    <button class="video-profile-btn"> <img src="@assets/game.png">
                                        <span>Valorant</span></button>
                                </div>
                            </div>
                        </div>
                        <div class="main-video-box">
                            <div class="video-image-box">
                                <span>04:21:22</span>
                                <img src="@assets/Overlay.png">
                            </div>
                            <div class="main-box-video">
                                <h2>Bronze To Radiant In One Stream! 🔥</h2>
                                <div class="btn-tags">
                                    <button>FPS</button>
                                    <button>Gaming</button>
                                    <button>Shooter</button>
                                </div>
                                <div class="main-video-profile-flex">
                                    <img class="video-profile-img" src="@assets/Profile-1.png">
                                    <p class="video-profile-name">Shroud</p>
                                    <button class="video-profile-btn"> <img src="@assets/game.png">
                                        <span>Valorant</span></button>
                                </div>
                            </div>
                        </div>
                        <div class="main-video-box">
                            <div class="video-image-box">
                                <span>04:21:22</span>
                                <img src="@assets/Overlay.png">
                            </div>
                            <div class="main-box-video">
                                <h2>Bronze To Radiant In One Stream! 🔥</h2>
                                <div class="btn-tags">
                                    <button>FPS</button>
                                    <button>Gaming</button>
                                    <button>Shooter</button>
                                </div>
                                <div class="main-video-profile-flex">
                                    <img class="video-profile-img" src="@assets/Profile-1.png">
                                    <p class="video-profile-name">Shroud</p>
                                    <button class="video-profile-btn"> <img src="@assets/game.png">
                                        <span>Valorant</span></button>
                                </div>
                            </div>
                        </div>
                        <div class="main-video-box">
                            <div class="video-image-box">
                                <span>04:21:22</span>
                                <img src="@assets/Overlay.png">
                            </div>
                            <div class="main-box-video">
                                <h2>Bronze To Radiant In One Stream! 🔥</h2>
                                <div class="btn-tags">
                                    <button>FPS</button>
                                    <button>Gaming</button>
                                    <button>Shooter</button>
                                </div>
                                <div class="main-video-profile-flex">
                                    <img class="video-profile-img" src="@assets/Profile-1.png">
                                    <p class="video-profile-name">Shroud</p>
                                    <button class="video-profile-btn"> <img src="@assets/game.png">
                                        <span>Valorant</span></button>
                                </div>
                            </div>
                        </div>
                        <div class="main-video-box">
                            <div class="video-image-box">
                                <span>04:21:22</span>
                                <img src="@assets/Overlay.png">
                            </div>
                            <div class="main-box-video">
                                <h2>Bronze To Radiant In One Stream! 🔥</h2>
                                <div class="btn-tags">
                                    <button>FPS</button>
                                    <button>Gaming</button>
                                    <button>Shooter</button>
                                </div>
                                <div class="main-video-profile-flex">
                                    <img class="video-profile-img" src="@assets/Profile-1.png">
                                    <p class="video-profile-name">Shroud</p>
                                    <button class="video-profile-btn"> <img src="@assets/game.png">
                                        <span>Valorant</span></button>
                                </div>
                            </div>
                        </div>
                        <div class="main-video-box">
                            <div class="video-image-box">
                                <span>04:21:22</span>
                                <img src="@assets/Overlay.png">
                            </div>
                            <div class="main-box-video">
                                <h2>Bronze To Radiant In One Stream! 🔥</h2>
                                <div class="btn-tags">
                                    <button>FPS</button>
                                    <button>Gaming</button>
                                    <button>Shooter</button>
                                </div>
                                <div class="main-video-profile-flex">
                                    <img class="video-profile-img" src="@assets/Profile-1.png">
                                    <p class="video-profile-name">Shroud</p>
                                    <button class="video-profile-btn"> <img src="@assets/game.png">
                                        <span>Valorant</span></button>
                                </div>
                            </div>
                        </div>
                        <div class="main-video-box">
                            <div class="video-image-box">
                                <span>04:21:22</span>
                                <img src="@assets/Overlay.png">
                            </div>
                            <div class="main-box-video">
                                <h2>Bronze To Radiant In One Stream! 🔥</h2>
                                <div class="btn-tags">
                                    <button>FPS</button>
                                    <button>Gaming</button>
                                    <button>Shooter</button>
                                </div>
                                <div class="main-video-profile-flex">
                                    <img class="video-profile-img" src="@assets/Profile-1.png">
                                    <p class="video-profile-name">Shroud</p>
                                    <button class="video-profile-btn"> <img src="@assets/game.png">
                                        <span>Valorant</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    </section>
</template>
<script>
    import GuestHeader from '@components/globals/guest/GuestHeader.vue';
    import SideBar from '@components/globals/costacaster/SideBar.vue';
    export default {
        components: {
           GuestHeader,
            SideBar
        }



    }
</script>