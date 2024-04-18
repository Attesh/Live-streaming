<template>
    <div
        style="background-color: #000c;position: fixed;top: 0;width: 100%;height: 100%;z-index: 99999999999999999999999999;left: 0;">
        <div class="timestamp-popup">
            <div class="share-livestream">
                <h2>
                    Time Stamp
                </h2>
                <img class="cros-pointer" src="@assets/close.png" alt="" @click="closetimestamp">
            </div>
            <form @submit.prevent="onSubmit">
                <div>
                    <div class="timestamp-input-field">
                        <p>
                            Text :
                        </p>
                        <input v-model="form.text" type="text" name="" id="">
                    </div>
                    <div class="timestamp-input-field">
                        <p>
                            URL :
                        </p>
                        <input v-model="form.url" type="text" name="" id="">
                    </div>
                    <div class="timestamp-input-field">
                        <p>
                            Time Stamp :
                        </p>
                        <input v-model="form.link_timestamp"  type="text" name="" id="">
                      
                    </div>
                </div>
                <div class="timestamp-submit">
                    <button type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
    .timestamp-popup {
        width: 500px;
        padding: 30px;
        border-radius: 25px;
        position: absolute;
        right: 30%;
        z-index: 99999999;
        background-color: #0d0d1c;
        top: 10%;
    }

    .timestamp-input-field input {
        width: 100%;
        background: transparent;
        border: 1px solid grey;
        padding: 8px;
        border-radius: 20px;
        color: #fff;
    }

    .timestamp-input-field {
        margin-bottom: 20px;
    }

    .timestamp-submit button {
        background-color: transparent;
        border: solid 2px #A3241C;
        color: #f15858;
        padding: 10px 30px 10px 30px;
        border-radius: 28px;
        font-size: 13px;
        cursor: pointer;

        &:hover {
            background-color: #A3241C;
            color: var(--bg-sidemenu-color);
            transition: 0.1s ease-in;
            font-weight: 600;
            color: #fff;
        }
    }

    .timestamp-submit {
        display: flex;
        justify-content: center;
    }
</style>
<script>
    import { postData, fetchData } from '@services/base.js';
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    export default {
        data() {
            return {
                form: {
                    text: '',
                    url: '',
                    link_timestamp: '',
                },
                responseData: {},
            };
        },
        methods: {
            async closetimestamp() {
                this.$emit('toggletimestamp', false);
            },
            async onSubmit() {
                const endpoint = '/add-timestamp-comment'; // Replace with your desired endpoint
                this.form.video_id =  this.$route.params.id;
                console.log(endpoint); // Add this line for debugging
                try {
                    this.responseData = await postData(endpoint, this.form);
                    toast.success(this.responseData.data.message, {
                        autoClose: 1000,
                    });
                    this.closetimestamp();
                } catch (error) {
                    console.error('Error submitting timestamp', error);
                    toast.error('Error submitting timestamp'); // Show an error toast
                }
            }
        },
        created() {
            this.user = JSON.parse(localStorage.getItem('user') || null);
            console.log(this.form);
        },
    }
</script>