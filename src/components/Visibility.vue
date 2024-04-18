<template>
    <section class="main-guest-section ">
        <SideBar @updateValue="updateValueFromHeader"></SideBar>
        <section
            :class="valueFromHeader ? 'guest-main-page-shop-header sidebar-section' : 'guest-main-page-shop-header sidebar-section1'">
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
                    <div class="visibility-hr"></div>
                    <div class="point2"></div>
                    <div class="point3"></div>
                    <div class="points"></div>
                </div>
                <div class="upload-corsacaster">
                    <div class="visibility">
                        <input class="visibilityInput" type="text" name="" id="">
                        <p class="visibilityP">Add category to your video</p>
                        <input class="visibilityInput" type="text" name="" id="">
                        <p class="visibilityP">Add category to your video</p>
                        <div class="visibility-text">
                            <div class="left-text">
                                <h5>Privacy</h5>
                                <p>Choose the video privacy</p>
                                <div class="radioBtn-box" style="margin: 48px 0 11px 0;">
                                    <input type="radio" id="ageRadio1" name="privacy">
                                    <label for="ageRadio1">Public</label>
                                </div>
                                <div class="radioBtn-box">
                                    <input type="radio" id="ageRadio2" name="privacy">
                                    <label for="ageRadio2">Private</label>
                                </div>
                            </div>
                            <div class="right-text">
                                <h5>Age Restriction</h5>
                                <div class="radioBtn-box" style="margin: 48px 0 11px 0;">
                                    <input type="radio" id="" name="text">
                                    <label>All ages can view this video</label>
                                </div>
                                <div class="radioBtn-box">
                                    <input type="radio" id="#" name="text">
                                    <label>Only +18</label>
                                </div>
                            </div>
                            <div style="margin: 48px 0 11px 0;">
                                <button class="publish-btn" @click="publishVideo">PUBLISH</button>
                                <button class="back-btn" @click="backToVideoElement">GO BACK</button>
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
        },
        data() {

            return {
                valueFromHeader: false,
            }
        },
        methods: {
            publishVideo() {
                this.$router.push({ name: 'home' })
            },
            backToVideoElement() {
                this.$router.push({ name: 'video-element' })
            },
            updateValueFromHeader(value) {
                // Update the value in the parent component
                this.valueFromHeader = value;
            },
        }
    }









</script>