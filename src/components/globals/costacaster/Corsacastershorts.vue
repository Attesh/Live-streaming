<template>
    <section class="main-guest-section ">
        <SideBar @updateValue="updateValueFromHeader"></SideBar>
       <section :class="valueFromHeader ? 'guest-main-page-shop-header sidebar-section' : 'guest-main-page-shop-header sidebar-section1'">
            <GuestHeader></GuestHeader>
            <div>
                <CorsacasterBioComponent></CorsacasterBioComponent>
                <div>
                    <!-- <div class="home-page-navigation">
                        <h1 >Home</h1>
                        <h1>Videos</h1>
                        <h1 class="active-nav-btn">Shorts</h1>
                        <h1>Roster</h1>
                        <h1>About</h1>
                    </div> -->
                    <div class="guest-page-navigation-tatle">
                        <h1>Videos</h1>
                        <!-- <button>See All</button> -->
                    </div>
                    <div class="Corsacaster-shorts">
                        <div class="main-video-box2">
                            <div class="shorts-image-box2s">

                                <img src="@assets/athelete1.png">
                                <p>
                                    Bronze To Radiant In One <br> Stream!
                                </p>
                                <p style="color: #88888C;font-weight: 600;">
                                    2M Views
                                </p>
                            </div>

                        </div>
                        <div class="main-video-box2">
                            <div class="shorts-image-box2s">

                                <img src="@assets/athelete2.png">
                                <p>
                                    Bronze To Radiant In One <br> Stream!
                                </p>
                                <p style="color: #88888C;font-weight: 600;">
                                    2M Views
                                </p>
                            </div>

                        </div>
                        <div class="main-video-box2">
                            <div class="shorts-image-box2s">

                                <img src="@assets/athelete3.png">
                                <p>
                                    Bronze To Radiant In One <br> Stream!
                                </p>
                                <p style="color: #88888C;font-weight: 600;">
                                    2M Views
                                </p>
                            </div>

                        </div>
                        <div class="main-video-box2">
                            <div class="shorts-image-box2s">

                                <img src="@assets/athelete4.png">
                                <p>
                                    Bronze To Radiant In One <br> Stream!
                                </p>
                                <p style="color: #88888C;font-weight: 600;">
                                    2M Views
                                </p>
                            </div>

                        </div>
                        <div class="main-video-box2">
                            <div class="shorts-image-box2s">

                                <img src="@assets/athelete1.png">
                                <p>
                                    Bronze To Radiant In One <br> Stream!
                                </p>
                                <p style="color: #88888C;font-weight: 600;">
                                    2M Views
                                </p>
                            </div>

                        </div>
                        <div class="main-video-box2">
                            <div class="shorts-image-box2s">

                                <img src="@assets/athelete2.png">
                                <p>
                                    Bronze To Radiant In One <br> Stream!
                                </p>
                                <p style="color: #88888C;font-weight: 600;">
                                    2M Views
                                </p>
                            </div>

                        </div>
                        <div class="main-video-box2">
                            <div class="shorts-image-box2s">

                                <img src="@assets/athelete3.png">
                                <p>
                                    Bronze To Radiant In One <br> Stream!
                                </p>
                                <p style="color: #88888C;font-weight: 600;">
                                    2M Views
                                </p>
                            </div>

                        </div>
                        <div class="main-video-box2">
                            <div class="shorts-image-box2s">

                                <img src="@assets/athelete4.png">
                                <p>
                                    Bronze To Radiant In One <br> Stream!
                                </p>
                                <p style="color: #88888C;font-weight: 600;">
                                    2M Views
                                </p>
                            </div>

                        </div>
                        <div class="main-video-box2">
                            <div class="shorts-image-box2s">

                                <img src="@assets/athelete1.png">
                                <p>
                                    Bronze To Radiant In One <br> Stream!
                                </p>
                                <p style="color: #88888C;font-weight: 600;">
                                    2M Views
                                </p>
                            </div>

                        </div>
                        <div class="main-video-box2">
                            <div class="shorts-image-box2s">

                                <img src="@assets/athelete2.png">
                                <p>
                                    Bronze To Radiant In One <br> Stream!
                                </p>
                                <p style="color: #88888C;font-weight: 600;">
                                    2M Views
                                </p>
                            </div>

                        </div>
                        <div class="main-video-box2">
                            <div class="shorts-image-box2s">

                                <img src="@assets/athelete3.png">
                                <p>
                                    Bronze To Radiant In One <br> Stream!
                                </p>
                                <p style="color: #88888C;font-weight: 600;">
                                    2M Views
                                </p>
                            </div>

                        </div>
                        <div class="main-video-box2">
                            <div class="shorts-image-box2s">

                                <img src="@assets/athelete4.png">
                                <p>
                                    Bronze To Radiant In One <br> Stream!
                                </p>
                                <p style="color: #88888C;font-weight: 600;">
                                    2M Views
                                </p>
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
import CorsacasterBioComponent from '@components/globals/costacaster/CorsacasterBioComponent.vue';
export default {
    components: {
        GuestHeader,
        SideBar,
        CorsacasterBioComponent,
    },
    data(){

return{
    valueFromHeader: false,
}
},
methods: {

updateValueFromHeader(value) {
    // Update the value in the parent component
    this.valueFromHeader = value;
},
}



}
</script>