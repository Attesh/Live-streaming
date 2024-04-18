<template>
    <section class="main-guest-section">
        <SideBar @updateValue="updateValueFromHeader"></SideBar>
        <section class="guest-main-page-shop-header sidebar-section">
            <div class="guest-header">
                <GuestHeader @sendValue="sendValueToSidebar"></GuestHeader>
                <div class="content-type">
                    <h1>
                        Select content type
                    </h1>
                    <div>
                        <div class="dropdown">
                            <div style="display: flex;align-items: center;gap: 20px;">
                                <p style="color: #fff;">Race content</p>
                                <img style="width: 20px;" src="@assets/Vector-2.png" alt="Image" id="dropdown-btn">
                            </div>
                            <div class="dropdown-content" id="myDropdown">
                                <a href="#">Race content</a>
                                <a href="#">Cycle culture</a>
                                <a href="#">Promotional</a>
                                <a href="#">Promotional</a>
                                <a href="#">Educational</a>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="upload-img">
                    <label for="fileInput" class="custom-file-upload">
                        <img src="@assets/uploadimg.png" alt="Click to Upload">
                    </label>
                    <input type="file" id="fileInput" accept="image/*" onchange="displayImage(this)">
                </div>
                <div style="margin-left: 15%;">
                    <div class="user-board-main">
                        <div class="password">
                            <p>
                                Event Title:
                            </p>
                            <div class="password-container">
                                <input type="password" id="password">
                                <img src="@assets/eye.png">
                            </div>
                        </div>
                    </div>
                    <div class="user-board-main">
                        <div class="password">
                            <p>
                                Date:
                            </p>
                            <div class="password-container">
                                <input type="password" id="password">
                                <img src="@assets/eye.png">
                            </div>
                        </div>
                    </div>
                    <div class="user-board-main">
                        <div class="password">
                            <p>
                                Location::
                            </p>
                            <div class="password-container">
                                <input type="password" id="password">
                                <img src="@assets/eye.png">
                            </div>
                        </div>
                    </div>
                    <div class="user-board-main">
                        <div class="password">
                            <p>
                                Description:
                            </p>
                            <div class="password-container">
                                <input type="password" id="password">
                                <img src="@assets/eye.png">
                            </div>
                        </div>
                    </div>
                    <div class="user-board-main">
                        <div class="password">
                            <p>
                                Race discipline:
                            </p>
                            <div class="password-container">
                                <input type="password" id="password">
                                <img src="@assets/eye.png">
                            </div>
                        </div>
                    </div>
                    <div class="user-board-main">
                        <div class="password">
                            <p>
                                Race heat timestamps:
                            </p>
                            <div class="password-container">
                                <input type="password" id="password">
                                <img src="@assets/eye.png">
                            </div>
                        </div>
                    </div>
                    <div class="user-board-main">
                        <div class="password">
                            <p>
                                Sanctioning body:
                            </p>
                            <div class="password-container">
                                <input type="password" id="password">
                                <img src="@assets/eye.png">
                            </div>
                        </div>
                    </div>
                    <div class="user-board-main">
                        <div class="password">
                            <p>
                                Result Link:
                            </p>
                            <div class="password-container">
                                <input type="password" id="password">
                                <img src="@assets/eye.png">
                            </div>
                        </div>
                    </div>
                    <div class="create-content-btn">
                        <button>
                            Create Content
                        </button>
                    </div>
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
                sendValueToSidebar,
            };
        },
        method: {
            updateValueFromHeader(value) {
                // Update the value in the parent component
                this.valueFromHeader = value;
            },
        }
    }
    function displayImage(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var img = input.previousElementSibling;
                img.src = e.target.result;
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

</script>