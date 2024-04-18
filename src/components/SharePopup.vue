<template>
    <div
        style="background-color: #000c;position: fixed;top: 0;width: 100%;height: 100%;z-index: 99999999999999999999999999;left: 0;">
        <div class="share-popup-main">
            <div class="share-livestream">
                <h2>
                    Share Live Stream
                </h2>
                <img class="cros-pointer" src="@assets/close.png" alt="" @click="SharePopupClose">
            </div>
            <div class="share-popup">
                <img src="@assets/cycling-2.png" alt="">
                <p>
                    Michele Jordan Season Finale 2020
                </p>
            </div>
            <h6>
                Share a Link
            </h6>
            <div class="share-icons-main">
                <div class="share-icon" >
                    <img src="@assets/facebookicon.png" alt="">
                    <p>
                        Facebook
                    </p>
                </div>
                <div style="text-align: center;">
                    <img src="@assets/twittericon.png" alt="">
                    <p>
                        Twitter
                    </p>
                </div >
                <div style="text-align: center;" >
                    <img src="@assets/whatsapp.png" alt="">
                    <p>
                        Whatsapp
                    </p>
                </div>
                <div style="text-align: center;">
                    <img src="@assets/reddit.png" alt="">
                    <p>
                        Reddit
                    </p>
                </div>
                <div style="text-align: center;">
                    <img src="@assets/emailicon.png" alt="">
                    <p>
                        Email
                    </p>
                </div>

            </div>
            <div>
                <div>
                    <p>
                        Video Link
                    </p>
                    <span>
                        Http//Youtube.com/live/lkndaskdhs
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        components: {

        },
        methods: {
            async SharePopupClose() {
                this.$emit('showShareComponent', false);
            }
        }



    }
</script>