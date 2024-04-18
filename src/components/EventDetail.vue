<template>
    <section class="main-guest-section">
        <SideBar @updateValue="true"></SideBar>
        <section
            :class="valueFromHeader ? 'guest-main-page-shop-header sidebar-section' : 'guest-main-page-shop-header sidebar-section1'">
            <GuestHeader @sendValue="true"></GuestHeader>
            <div>
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
                                <h1>Shroud</h1>
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


                <div class="edit-profile">
                    <h1>
                        Event Detail
                    </h1>
                    <!-- <button type="submit" class="edit-btn">Edit Profile</button> -->
                </div>
                <div class="event-detail-main">
                    <div class="event-detail">
                        <img :src="event.thumbnail" alt="">
                        <h5>
                            Event Name :
                            <span>
                                {{event.name}}
                            </span>
                        </h5>
                        <h5>
                            Category :
                            <span>
                                {{event.category}}
                            </span>
                        </h5>
                        <h5>
                            Country :
                            <span>
                                {{event.country}}
                            </span>
                        </h5>
                        <h5>
                            State :
                            <span>
                                {{event.state}}
                            </span>
                        </h5>
                        <h5>
                            City :
                            <span>
                                {{event.city}}
                            </span>
                        </h5>
                        <h5>
                            Event Date :
                            <span>
                                {{event.date}}
                            </span>
                        </h5>
                        <h5>
                            Event Location :
                            <span>
                                {{event.location}}
                            </span>
                        </h5>
                        <h5>
                            Description :
                            <span>
                                {{event.description}}
                            </span>
                        </h5>
                    </div>
                    <div class="map">
                        <h1>Search by Map</h1>
                        <div style="width: 100%;">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2965.0824050173574!2d-93.63905729999999!3d41.998507000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sWebFilings%2C+University+Boulevard%2C+Ames%2C+IA!5e0!3m2!1sen!2sus!4v1390839289319"
                                width="100%" height="300px" frameborder="0"
                                style="border:0; border-radius: 10px; "></iframe>
                        </div>

                    </div>
                </div>


            </div>
        </section>




    </section>

</template>
<style scoped>
    .map{
width: 40%;
    }
    .event-detail-main {
        display: flex;
        justify-content: space-between;
        padding: 10px 70px 10px 0px;
        align-items: flex-start;
    }

    .event-detail {
        padding: 20px;
        width: 50%;
    }

    .event-detail img {
        width: 500px;
        height: 250px;
        -o-object-fit: cover;
        object-fit: cover;
        /* margin-left: 20px; */
    }

    .event-detail h5 {
        font-size: 16px;
        color: #fff;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 18px;
    }

    .event-detail span {
        font-size: 14px;
        width: 50%;
        display: flex;
        justify-content: end;
    }
</style>
<script>

    import GuestHeader from '@components/globals/guest/GuestHeader.vue';
    import SideBar from '@components/globals/costacaster/SideBar.vue';
    import ProductList from '@components/globals/costacaster/ProductList.vue';
    import RatingComponent from '@components/globals/costacaster/Rating.vue';
    import Counter from '@components/globals/costacaster/Counter.vue';
    import { reactive, Vue, ref } from 'vue'; // Import reactive
    import { postData, fetchData } from '@services/base.js';
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    export default {
        data() {
            return {
                selectedImage: '',
                valueFromHeader: false,
                event : {

                },
            };
        },
        components: {
            GuestHeader,
            ProductList,
            SideBar,
            RatingComponent,
            Counter,


        },
        methods: {
                updateValueFromHeader(value) {
                    // Update the value in the parent component
                    this.valueFromHeader = value;
                },
                async getEventDetails(){
                    try {
                    const response = await fetchData('/event-detail/'+this.$route.params.id);
                    this.event = response.data.data;
                    // console.log(this.event);
                    } catch (error) {
                        console.log('Error fetching data:', error);
                    }
                }
        },
        setup() {
            const valueFromHeader = ref('');

            function sendValueToSidebar(value) {
                valueFromHeader.value = value;
            }

            return {
                valueFromHeader,
                sendValueToSidebar,
            }

            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.selectedImage = reader.result;
                };
                reader.readAsDataURL(file);
            } else {
                this.selectedImage = '';
            }
        },
        mounted(){
            this.getEventDetails();            
        }
    }


</script>