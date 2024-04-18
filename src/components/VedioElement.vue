<template>
    <section class="main-guest-section ">
        <SideBar @updateValue="updateValueFromHeader"></SideBar>
       <section :class="valueFromHeader ? 'guest-main-page-shop-header sidebar-section' : 'guest-main-page-shop-header sidebar-section1'">
            <GuestHeader></GuestHeader>
            <div class="upload-heading">
                <div style=" display: flex; gap: 10px; ">
                    <img class="uploadimg" src="@assets/uploadRed.png">
                    <p>Upload new video</p>
                </div>
                <p>3 Steps Video Upload</p>
            </div>
            <hr style="width: 72%;height: 0px; border: 1px solid #303046;;">
            <div class="upload-area">
                <div style="display: flex;justify-content: space-around; color: #fff;">
                    <p>Upload</p>
                    <p>Details</p>
                    <p>Video Elements</p>
                    <p>Visibility</p>
                </div>
                <div style="display: flex;justify-content: space-around; margin-bottom: 40px;">
                    <div class="point1"></div>
                    <div class="vedio-element-hr"></div>
                    <div class="point2"></div>
                    <div class="points"></div>
                    <div class="point3"></div>
                </div>
                <div class="upload-corsacaster">
                    <div class="vedio-element">
                        <router-link :to="{ name : 'Visibility' }"> <img src="@assets/vedio-element.png"></router-link>

                        <h6>Video</h6>
                        <p @click="uploadVideo">Upload a stock video</p>
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
        },
        data(){

            return{
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