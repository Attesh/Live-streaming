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
         
            <div class="upload-area">
                <div style="display: flex;justify-content: space-around; color: #fff;">
                    <p>Upload</p>
                    <p>Details</p>
                    <p>Video Elements</p>
                    <p>Visibility</p>
                </div>
                <div style="display: flex;justify-content: space-around; margin-bottom: 40px;">
                    <div class="point1"></div>
                    <div class="upload-Detail-hr"></div>
                    <div class="points"></div>
                    <div class="point2"></div>
                    <div class="point3"></div>
                </div>
                <div class="upload-corsacaster">
                    <div>
                        <div class="uploadDetail">
                            <img src="@assets/uploaded.png">
                        </div>
                        <div class="uploadFile">
                            <p>File Name</p>
                            <p>Video (2160p)</p>
                        </div>
                        <div class="check-detail">
                            <input type="checkbox" id="#" name="text">
                            <label for="vehicle1"> Video upload complete. No issues found.</label>
                        </div>

                    </div>

                    <div class="uploadDetail-text">
                        <h6>Video title</h6>
                        <input class="uploadInput" type="text" name="" id="">
                        <p>Your video title, 2-55 characters</p>
                        <h6>Video Description</h6>
                        <textarea class="uploadDetail-area" name="" id="" cols="30" rows="10"></textarea>
                        <h6>Thumbnail</h6>
                        <p style="margin: -7px 0px 30px -1px;">Select or upload a picture that shows what’s in your video. A
                            good thumbnail stands out
                            and draws viewer’s attention</p>
                        <div class="Upload-Thumbnail">
                            <img src="@assets/Thumbnail.png">
                            <p>Upload Thumbnail</p>
                        </div>
                        <button @click="videoelement">NEXT STEP</button>
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
        videoelement() {
            this.$router.push({ name: 'video-element' })
        },
        updateValueFromHeader(value) {
                // Update the value in the parent component
                this.valueFromHeader = value;
            },

    }



}
</script>