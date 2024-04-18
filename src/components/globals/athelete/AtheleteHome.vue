<template>
    <section class="main-guest-section ">
        <SideBar @updateValue="updateValueFromHeader"></SideBar>
       <section :class="valueFromHeader ? 'guest-main-page-shop-header sidebar-section' : 'guest-main-page-shop-header sidebar-section1'">
            <GuestHeader></GuestHeader>
            <div>
                <!-- <div class="guest-header-img">
                    <img src="@assets/Rectangle-9583.png">
                </div>
                <div class="main-div-change-name-btns">
                    <div class="guest-user-info-chanel">
                        <div class="guest-chanel-img-white">
                            <img class="guest-chanel-img guest-chanel-img-active" src="@assets/avatar.jpg">
                          
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
                    <p>{{ this.bioText }}</p>
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
                </div> -->
                <div class="main-profile-box">
                    <div class="uploaded-profile">
                        <img src="@assets/uploadedprofile.png" alt="">
                    </div>
                    <div class="user-name">
                        <h6>
                            Taimur Tariq Athlete
                        </h6>
                        <div class="user-followers-main">
                            <div class="user-followers">
                                <h2>
                                    25
                                </h2>
                                <p>
                                    Videos
                                </p>
                            </div>
                            <div class="user-followers">
                                <h2>
                                    65
                                </h2>
                                <p>
                                    Followers
                                </p>
                            </div>
                            <div class="user-followers">
                                <h2>
                                    105
                                </h2>
                                <p>
                                    Following
                                </p>
                            </div>
                        </div>
                        <p class="welcome">
                            Hello, Welcome To My Athlete Profile.
                        </p>
                        <hr>
                        <div class="cyclingteam">
                            <img src="@assets/cyclingteam.png" alt="">
                            <p>
                                Great Britain Cycling Team
                            </p>
                        </div>

                        <div class="user-bio-main">
                            <div class="user-bio">
                                <h6>
                                    Racing Age:
                                </h6>
                                <p>
                                    32
                                </p>
                            </div>
                            <div class="user-bio">
                                <h6>
                                    Racer ID:
                                </h6>
                                <p>
                                    987523
                                </p>
                            </div>
                            <div class="user-bio">
                                <h6>
                                    Racing Category:
                                </h6>
                                <p>
                                    BMX, Road
                                </p>
                            </div>
                            <div class="user-bio">
                                <h6>
                                    Sanotioning Body:
                                </h6>
                                <p>
                                    Xxxxx
                                </p>
                            </div>
                            <div class="user-bio">
                                <h6>
                                    Location
                                </h6>
                                <p>
                                    Sampletown, Xx, USA
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div class="edit-mnge">
                            <!-- <router-link class="mnge-btn" style="  text-decoration: none;  
                                  " :to="{ name: 'upload' }">
                                Manage
                            </router-link> -->
                            <router-link class="edit-btn" style="  text-decoration: none;  
                                  " :to="{ name: 'athelete-profile' }">Edit Profile </router-link>
                        </div>
                        <div class="hashtags-main">
                            <div class="hashtags">
                                <h6 class="sponsor">
                                    Achievement/Hashtags
                                    /Sponsor Links
                                </h6>
                                <div class="list">
                                    <li>
                                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do
                                    </li>
                                    <li>
                                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do
                                    </li>
                                    <li>
                                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do
                                    </li>
                                </div>
                                <h6 class="theman">
                                    #Theman #Homeboy
                                    #Bigplaya
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
                <AtheleteHomeCarousel v-if="this.tab == 'home'"></AtheleteHomeCarousel>
                
                <div>
                    <div class="home-page-navigation">
                        <h1 :class="this.tab == 'home' ? 'active-nav-btn' : ''" @click="changeTab('home')">Home</h1>
                        <h1 :class="(this.tab == 'video') ? 'active-nav-btn tab-decoration' : 'tab-decoration'"
                            @click="changeTab('video')">Video</h1>
                        <h1 :class="this.tab == 'shorts' ? 'active-nav-btn tab-decoration' : 'tab-decoration'"
                            @click="changeTab('shorts')">Shorts</h1>
                        <h1 :class="this.tab == 'about' ? 'active-nav-btn tab-decoration' : 'tab-decoration'"
                            @click="changeTab('about')">About</h1>
                    </div>
                    <AtheleteFeatured :count="count" v-if="this.tab == 'home' || this.tab == 'video'" @changeTab="changeTab"
                        :tab="tab"></AtheleteFeatured>
                    <AtheleteShorts v-if="this.tab == 'shorts'"></AtheleteShorts>
                </div>
                <AtheleteAbout v-if="this.tab == 'about'"></AtheleteAbout>
              

            </div>
           
            <!-- <div class="guest-page-navigation-tatle" v-if="this.tab == 'home'">
                <h1>Shorts</h1>
                <button  @click="changeTab('shorts')">See All </button>
            </div>
            <div class="athelete-shorts" v-if="this.tab == 'home'">
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
                <div class="main-video-box2">
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

                </div>

            </div> -->


        </section>
    </section>
</template>
<script>
import GuestHeader from '@components/globals/guest/GuestHeader.vue';
import SideBar from '@components/globals/costacaster/SideBar.vue';
import AtheleteHomeCarousel from '@components/globals/athelete/AtheleteHomeCarousel.vue';
import AtheleteFeatured from '@components/globals/athelete/AtheleteFeatured.vue';
import AtheleteShorts from '@components/globals/athelete/AtheleteShorts.vue';
import AtheleteAbout from '@components/globals/athelete/AtheleteAbout.vue';
import LinkedVideoComponent from '@components/globals/costacaster/LinkedVideoComponent.vue';
import CorsacastershortsComponent from '@components/globals/costacaster/CorsacastershortsComponent.vue';

export default {
    components: {
        GuestHeader,
        SideBar,
        AtheleteFeatured,
        AtheleteHomeCarousel,
        AtheleteAbout,
        AtheleteShorts,
        LinkedVideoComponent,
        CorsacastershortsComponent,
    },
    data() {
        return {
            bioText: 'Athelete Bio',
            tab: 'home',
            count: 3,
            valueFromHeader: false,
        };
    },
    methods: {
        async changeTab(tabName) {
            this.tab = tabName;
            if (tabName == 'video' || tabName == 'shorts') {
                this.bioText = 'Loved to create content about sports 🏀🚀';
                this.count = 12;
            } else {
                this.bioText = 'Athelete Bio';
                this.count = 3;
            }
            this.$router.replace({ hash: null });
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
};
</script>
