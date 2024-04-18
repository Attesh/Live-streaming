<template>
    <section class="main-guest-section">
        <SideBar @updateValue="updateValueFromHeader"></SideBar>
        <section class="guest-main-page">

            <GuestHeader @sendValue="sendValueToSidebar"></GuestHeader>
            <div class="fan-video-head">
                <h1>
                    Add Video
                </h1>

                <h2>
                    Upload Video
                </h2>
            </div>
            <div class="fan-upload-img">
                <label for="fileInput" class="custom-file-upload">
                    <img src="@assets/uploadimg.png" alt="Click to Upload">
                    <h1>
                        Select file to upload
                    </h1>
                    <p>
                        Video's length should not be of more than 1:30 minutes
                    </p>
                </label>
                <input type="file" id="fileInput" accept="image/*" @change="displayImage(this)">
            </div>
            <div>

            </div>
            <div style="margin-left: 15%;">
                <div class="user-board-main">
                    <div class="password">
                        <p>
                            Event Title:
                        </p>
                        <div class="password-container">
                            <input type="text" name="" id="">

                        </div>
                    </div>
                </div>
                <div class="user-board-main">
                    <div class="password">
                        <p>
                            Date:
                        </p>
                        <div class="password-container">
                            <input type="text" name="" id="">

                        </div>
                    </div>
                </div>
                <div class="user-board-main">
                    <div class="password">
                        <p>
                            Location::
                        </p>
                        <div class="password-container">
                            <input type="text" name="" id="">

                        </div>
                    </div>
                </div>
                <div class="user-board-main">
                    <div class="password">
                        <p>
                            Description:
                        </p>
                        <div class="password-container">
                            <textarea name="" id="" cols="30" rows="10"></textarea>

                        </div>
                    </div>
                </div>

                <div class="create-content-btn">
                    <button>
                        Upload Video
                    </button>
                </div>
            </div>



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

    export default {
        components: {
            GuestHeader,
            ProductList,
            SideBar,
            RatingComponent,
            Counter,
        },
        data() {

            return {
                valueFromHeader: false,
            }
        },
        setup() {
            const valueFromHeader = ref('');

            function sendValueToSidebar(value) {
                valueFromHeader.value = value;
            }

            return {
                valueFromHeader,
                sendValueToSidebar
            };
        },
        methods: {
            displayImage(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        var img = input.previousElementSibling;
                        img.src = e.target.result;
                    };

                    reader.readAsDataURL(input.files[0]);
                }
            },
            updateValueFromHeader(value) {
                // Update the value in the parent component
                this.valueFromHeader = value;
            },

        }
    }
</script>