<template>
    <div>

        <div
            style="background-color: #000c;position: fixed;top: 0;width: 100%;height: 100%;z-index: 99999999999999999999999999;left: 0;">

            <section class="main2-list chat-component-main">
                <div class="chat-box">
                    <div style=" display: flex; gap: 16px; ">
                        <h6> Live Chat</h6>

                        
                    </div>
                    <img class="cros-pointer" src="@assets/close.png" @click="chatComponentClose">
                </div>
                <div style="border: 2px solid #242436;">

                    <div class="write-text chat-text ">
                        <input class="text-input" v-model="chatInput" type="text" placeholder="Write something....">


                      
                        <div class="input-img">
                            <img src="@assets/emoji.png">
                           <button @click="sendChatMessage">  send</button>
                        </div>
                    </div>
                </div>
                <div id="chat-messages"></div>
                <div v-for="(message, index) in chatMessages" :key="index" class="message">
                            {{ message }}
                        </div>

            </section>
        </div>

    </div>
</template>
<script>
    export default {
  components: {

  },
  data() {
        return {
            chatInput: '', // Initialize chatInput property
            chatMessages: [] // Initialize chatMessages array
        };
    },
  methods: {
    async chatComponentClose() {
      this.$emit('showChatComponent', false);
    },

    async sendChatMessage() {
        console.log("Sending message:", this.chatInput); // Check if message content is correct
            this.$emit('send-message', this.chatInput);
            this.chatInput = '';
    //   this.$emit('showChatComponent', false);
    }
  }



}
</script>