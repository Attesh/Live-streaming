<template>
    <section class="main-guest-section">
        <SideBar @updateValue="updateValueFromHeader"></SideBar>
      <section :class="valueFromHeader ? 'guest-main-page-shop-header sidebar-section' : 'guest-main-page-shop-header sidebar-section1'">
        <GuestHeader @sendValue="sendValueToSidebar"></GuestHeader>
        <div class="guest-header-img">
            <img src="@assets/Rectangle-9583.png">
        </div>
        <div class="main-div-change-name-btns">
            <div class="guest-user-info-chanel">
                <div class="guest-chanel-img-white">
                    <img class="guest-chanel-img guest-chanel-img-active" src="@assets/avatar.jpg">
                   
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
     
      
        <AtheleteProfileField> </AtheleteProfileField>
      </section>




    </section>

</template>
<script>
    import { ref } from 'vue';
    import GuestHeader from '@components/globals/guest/GuestHeader.vue';
    import SideBar from '@components/globals/costacaster/SideBar.vue';
    import ProductList from '@components/globals/costacaster/ProductList.vue';
    import RatingComponent from '@components/globals/costacaster/Rating.vue';
    import Counter from '@components/globals/costacaster/Counter.vue';
    import  AtheleteProfileField from '@components/globals/athelete/AtheleteProfileField.vue';

    export default {
        data() {
            return {
                selectedImage: '',
                valueFromHeader: false,
            };
        },
        components: {
            GuestHeader,
            ProductList,
            SideBar,
            RatingComponent,
            Counter,
            AtheleteProfileField ,


        },
        method:{
            updateValueFromHeader(value) {
                // Update the value in the parent component
                this.valueFromHeader = value;
            },
            
        },
        setup() {
            const valueFromHeader = ref('');

            function sendValueToSidebar(value) {
                valueFromHeader.value = value;
            }

            return {
                valueFromHeader,
                sendValueToSidebar
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
        }

    }


</script>