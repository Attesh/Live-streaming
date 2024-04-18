<template>
    <section class="main-guest-section ">
        <SideBar @updateValue="updateValueFromHeader"></SideBar>
       <section :class="valueFromHeader ? 'guest-main-page-shop-header sidebar-section' : 'guest-main-page-shop-header sidebar-section1'">
            <GuestHeader></GuestHeader>
            <div>
                <CorsacasterBioComponent></CorsacasterBioComponent>
                <div class="search-event roster-head">
                    <h1>
                        Roster
                    </h1>
                    <h1>Athelete List</h1>
                    <div class="home-search-field roster-search ">
                        <img src="@assets/featured-athlete/search-normal.svg" alt="Search Icon" srcset="" />
                        <input type="text" placeholder="Search..." />
                    </div>
                </div>
                <div class="search-result-main roster">
                    <div class="search-result">
                        <div>
                            <img src="@assets/notifi2.png" alt="">
                        </div>
                        <div style="margin-bottom: 30px; margin-left: 10px">
                            <h6>
                                William Santana
                            </h6>
                            <div class="search-para-btn">

                                <p style="color: grey;">
                                    California, Los Angeles
                                </p>
                                <p>
                                    Es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum
                                    ha
                                    sido
                                    el
                                    texto de relleno estándar de las industrias........
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style="margin-left: 130px;" class="Subscribe-btn">
                        <button>Subscribe

                        </button>
                    </div>
                    <div class="roster-plus">
                        <img src="@assets/plus.png" alt="">
                    </div>
                </div>
                <div class="search-result-main roster">
                    <div class="search-result">
                        <div>
                            <img src="@assets/notifi2.png" alt="">
                        </div>
                        <div style="margin-bottom: 30px; margin-left: 10px">
                            <h6>
                                William Santana
                            </h6>
                            <div class="search-para-btn">

                                <p style="color: grey;">
                                    California, Los Angeles
                                </p>
                                <p>
                                    Es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum
                                    ha
                                    sido
                                    el
                                    texto de relleno estándar de las industrias........
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style="margin-left: 130px;" class="Subscribe-btn">
                        <button>Subscribe

                        </button>
                    </div>
                    <div class="roster-plus">
                        <img src="@assets/plus.png" alt="">
                    </div>
                </div>
                <div class="search-result-main roster">
                    <div class="search-result">
                        <div>
                            <img src="@assets/notifi2.png" alt="">
                        </div>
                        <div style="margin-bottom: 30px; margin-left: 10px">
                            <h6>
                                William Santana
                            </h6>
                            <div class="search-para-btn">

                                <p style="color: grey;">
                                    California, Los Angeles
                                </p>
                                <p>
                                    Es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum
                                    ha
                                    sido
                                    el
                                    texto de relleno estándar de las industrias........
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style="margin-left: 130px;" class="Subscribe-btn">
                        <button>Subscribe

                        </button>
                    </div>
                    <div class="roster-plus">
                        <img src="@assets/plus.png" alt="">
                    </div>
                </div>

                <div class="roster-list">
                    <h1>
                        Roster List
                    </h1>
                    <div class="search-result-main roster">
                        <div class="search-result">
                            <div>
                                <img src="@assets/notifi2.png" alt="">
                            </div>
                            <div style="margin-bottom: 30px; margin-left: 10px">
                                <h6>
                                    William Santana
                                </h6>
                                <div class="search-para-btn">

                                    <p style="color: grey;">
                                        California, Los Angeles
                                    </p>
                                    <p>
                                        Es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum
                                        ha
                                        sido
                                        el
                                        texto de relleno estándar de las industrias........
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div style="margin-left: 130px;" class="Subscribe-btn">
                            <button>Subscribe

                            </button>
                        </div>
                        <div class="roster-plus">
                            <img src="@assets/minus.png" alt="">
                        </div>
                    </div>
                    <div class="search-result-main roster">
                        <div class="search-result">
                            <div>
                                <img src="@assets/notifi2.png" alt="">
                            </div>
                            <div style="margin-bottom: 30px; margin-left: 10px">
                                <h6>
                                    William Santana
                                </h6>
                                <div class="search-para-btn">

                                    <p style="color: grey;">
                                        California, Los Angeles
                                    </p>
                                    <p>
                                        Es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum
                                        ha
                                        sido
                                        el
                                        texto de relleno estándar de las industrias........
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div style="margin-left: 130px;" class="Subscribe-btn">
                            <button>Subscribe

                            </button>
                        </div>
                        <div class="roster-plus">
                            <img src="@assets/minus.png" alt="">
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
import CorsacasterBioComponent from '@components/globals/costacaster/CorsacasterBioComponent.vue';
export default {
    components: {
        GuestHeader,
        SideBar,
        CorsacasterBioComponent,
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
}
</script>