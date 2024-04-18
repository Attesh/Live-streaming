<template>
  <section class="main-guest-section ">
    <SideBar @updateValue="updateValueFromHeader"></SideBar>
    <section
      :class="valueFromHeader ? 'guest-main-page-shop-header sidebar-section' : 'guest-main-page-shop-header sidebar-section1'">
      <GuestHeader></GuestHeader>
      <div class="row pt_22" style="    width: 100%;
      padding: 20px;
      overflow: auto;">
        <h1 style="    margin-top: 30px;
        margin-bottom: 30px;
        font-size: 35px;
        font-weight: 700; color: #ffff;">
          Chat
        </h1>
        <div class="col-md-4">
          <div style="    background-color: rgb(13, 13, 28);
          border-radius: 20px;
          height: 50%;
          /* overflow: scroll;
          overflow-x: hidden; */
          max-height: fit-content;">
            <div class="search-input">
              <div class="order-search-container">
                <span class="order-search-box" type="button"><svg style="       position: absolute;
                            top: 28px;
                            z-index: 99999999;
                           margin-left: 20px;
                        " width="23" height="23" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14.0388 24.4688C7.79411 24.4688 2.7099 19.2938 2.7099 12.9375C2.7099 6.58125 7.79411 1.40625 14.0388 1.40625C20.2836 1.40625 25.3678 6.58125 25.3678 12.9375C25.3678 19.2938 20.2836 24.4688 14.0388 24.4688ZM14.0388 3.09375C8.70043 3.09375 4.36779 7.515 4.36779 12.9375C4.36779 18.36 8.70043 22.7812 14.0388 22.7812C19.3773 22.7812 23.7099 18.36 23.7099 12.9375C23.7099 7.515 19.3773 3.09375 14.0388 3.09375Z"
                      fill="#707581" />
                    <path
                      d="M25.6442 25.5939C25.4342 25.5939 25.2242 25.5151 25.0584 25.3464L22.8478 23.0964C22.5273 22.7701 22.5273 22.2301 22.8478 21.9039C23.1684 21.5776 23.6989 21.5776 24.0194 21.9039L26.23 24.1539C26.5505 24.4801 26.5505 25.0201 26.23 25.3464C26.0642 25.5151 25.8542 25.5939 25.6442 25.5939Z"
                      fill="#707581" />
                  </svg>
                </span>
                <input type="text" id="ordersearchInput" placeholder="Search by name .....">

              </div>
              <div>

              </div>
            </div>
            <div class="chating-name-main" v-for="item in conversations" @click="getConversationMessages(item)">

              <div class="all-chats"  :key="index" @click="toggleActive(index)"
                :class="{ 'active-chat': activeChatIndex === index }">
                <div>
                  <img src="@assets/Profile-1.png" alt="">
                </div>
                <div class="chat-guest-name">
                  <h6 v-if="item.to_user?.id == user.id">
                    {{ item.from_user.name }}
                  </h6>
                  <h6 v-else>
                    {{ item.to_user.name }}
                  </h6>
                  <!-- <p>
                    Thanks again you have been...
                  </p> -->
                </div>
                <!-- <div class="last-seen">
                  <p>
                    16 min
                  </p>
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="show-chating-main">
            <div class="d-flex justify-content-between align-items-center chating-first-head">
              <h6 style="color: #fff;">
                {{ currentUser.name }}
              </h6>
              <img src="@assets/more.png" alt="">
            </div>

            <div>
              <div>
                <div ref="messageContainer"
                  style="border-top: 1px solid grey; margin-top: 20px; padding: 15px; overflow: scroll; overflow-x: hidden; height: 400px;">
                  <div v-if="loadingMessages" class="d-flex justify-content-center mt-3">
                    <div class="spinner-border text-primary" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  <div v-for="data in messages">
                    <div class="main2-chat" v-if="data.user_id != currentUser.id">
                      <div class="Profile2-chat">
                        <div class="Profile2-text">
                          <p>{{ data.message }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="main1-chat" v-else>
                      <div class="Profile2-chat">
                        <div class="Profile1-text">
                          <p>{{ data.message }}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <form @submit.prevent="sentChat" enctype="multipart/form-data">
              <div class="write-text">
                <img style="width: 25px;" src="@assets/emoji.png" alt="">
                <input class="text-input" v-model="form.message" type="text" placeholder="Write something....">
                <button type="submit" class="chat-snd">
                  <img width="20px" src="@assets/sender.png" alt="">
                </button>

              </div>
            </form>
          </div>

        </div>

      </div>

    </section>
  </section>
</template>
<style scoped>
  .order-search-container {
    display: flex;
    justify-content: center;
  }

  .chat-snd {
    border: none;
    background-color: transparent;
  }

  .search-input {
    position: relative;
  }

  .order-search-container ::placeholder {
    position: relative;
    /* left: 50px; */
    font-size: 16px;

  }

  #ordersearchInput {
    margin-left: 5px;
    margin-top: 20px;
    background: transparent;
    border: 1px solid #FFFFFF;
    border-radius: 20px;
    width: 280px;
    height: 40px;
    border-left: none;
    font-size: 16px;
    color: #ffff;
    position: relative;
    padding-left: 50px;


  }

  .write-text {
    display: flex;
    align-items: center;
    gap: 20px;
    border-radius: 20px;
  }

  .write-text input {
    padding: 20px;
    width: 80%;
    border: 1px solid #7B7B7B;
    border-radius: 20px;
  }

  .main2-chat {
    display: flex;
    gap: 18px;
    width: 97%;
    justify-content: end;
    padding: 5px 0px 0px 120px;
  }

  .Profile2-chat img {
    width: 45px;
    height: 45px;
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
  }

  .Profile1-chat img {
    position: absolute;
    /* right: 20px; */
    left: 11px;
    top: 15px;
  }

  .Profile1-chat {
    position: relative;
  }

  .Profile2-text p {
    color: #ffff;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    padding: 20px 20px;
    line-height: 130%;
  }

  .Profile2-chat {
    position: relative;
  }

  .Profile1-text p {
    color: #ffff;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    padding: 20px 20px;
    line-height: 130%;
  }

  .main1-chat {
    display: flex;
    gap: 18px;
    width: 75%;
    padding: 5px 6px 5px 0px;
  }

  .Profile2-text {
    border-radius: 15px 15px 0px 15px;
    background: hsl(240, 20%, 18%);
  }

  .Profile1-text {
    border-radius: 15px 15px 15px 0px;
    background: hsl(240, 20%, 18%);

  }



  .pt_20 {
    padding-top: 20px;
  }

  .chating-name-main {
    background-color: #0d0d1c;
    height: auto;
    width: 100%;
    padding: 20px;
    margin-top: 20px;
  }

  .show-chating-main {
    background-color: #0d0d1c;
    width: 100%;
    padding: 20px;
    border-radius: 20px;
    /* height: 50%; */
  }

  .last-seen {
    position: absolute;
    right: 11px;
  }

  .chating-first-head img {
    width: 30px;
    height: 30px;
  }

  .last-seen p {
    font-size: 12px;
  }

  .all-chats {
    display: flex;
    width: 100%;
    gap: 11px;
    justify-content: flex-start;
    position: relative;
    cursor: pointer;


  }

  .chat-guest-name h6 {
    font-size: 16px;
    font-weight: 700;
    color: #fff;
  }

  .chat-guest-name p {
    font-size: 12px;
  }

  .all-chats img {
    width: 50px;
  }

  .active-chat {
    background-color: #A3241C;
    padding: 15px 15px 15px 9px;
    border-radius: 5px;
    cursor: pointer;

  }
</style>
<script>
  import _ from 'lodash';
  import useVuelidate from '@vuelidate/core';
  import { required, numeric, minLength, maxLength } from '@vuelidate/validators';
  import GuestHeader from '@components/globals/guest/GuestHeader.vue';
  import SideBar from '@components/globals/costacaster/SideBar.vue';
  import VueRouter from 'vue-router';
  import { postData, fetchData } from '@services/base.js';
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';

  export default {
    components: {
      GuestHeader,
      SideBar
    },
    data() {
      return {
        valueFromHeader: false,
        conversations: {},
        messages: {},
        response: {},
        currentUser: {},
        currentConversation: {},
        messagesResponse: {},
        responseData: {},
        form: {

        },
        user: {

        },
        activeChatIndex: null,
        loadingMessages: false,
      }
    },
    methods: {
      async getAllConversations() {
        const endpoint = 'get-my-conversations';
        this.response = await fetchData(endpoint);
        this.conversations = this.response.data.data;
        // console.log(this.conversations);
      },
      updateValueFromHeader(value) {
        // Update the value in the parent component
        this.valueFromHeader = value;
      },
      async getConversationMessages(item) {
        if (item.to_user.id == this.user.id) {
          this.currentUser = item.from_user;
        } else {
          this.currentUser = item.to_user;
        }

        this.currentConversation = item;
        const endpoint = 'get-conversation-messages';
        this.messagesResponse = await fetchData(endpoint, { conversation_id: item.id });
        this.messages = this.messagesResponse.data.data;
      },
      async sentChat() {

        if (this.currentConversation) {
          this.form.conversation_id = this.currentConversation.id;
          const endpoint = '/sent-message-conversation';
          this.responseData = await postData(endpoint, this.form);
          toast.success(this.responseData.data.message, {
            autoClose: 1000,
          });
          this.getConversationMessages(this.currentConversation);
        }
      },
      toggleActive(index) {
        // Toggle active state for the clicked chat
        this.activeChatIndex = (this.activeChatIndex === index) ? null : index;
      },
      async getConversationMessages(item) {
        // Set loading state to true when fetching messages
        this.loadingMessages = true;

        if (item.to_user.id == this.user.id) {
          this.currentUser = item.from_user;
        } else {
          this.currentUser = item.to_user;
        }

        this.currentConversation = item;
        const endpoint = 'get-conversation-messages';
        this.messagesResponse = await fetchData(endpoint, { conversation_id: item.id });
        this.messages = this.messagesResponse.data.data;

        // Set loading state to false after messages are loaded
        this.loadingMessages = false;

        // Scroll to the bottom of the message container
        this.$nextTick(() => {
          if (this.$refs.messageContainer) {
            this.$refs.messageContainer.scrollTop = this.$refs.messageContainer.scrollHeight;
          }
        });
      },
    },
    mounted() {
      this.getAllConversations();
      if (this.currentConversation) {
        const debounceTime = 20000; // Adjust this value as needed
        this.debouncedGetAllConversations = _.debounce(this.getAllConversations, debounceTime);
        this.debouncedGetConversationMessages = _.debounce(this.getConversationMessages, debounceTime);
      }
    },
    created() {
      this.user = JSON.parse(localStorage.getItem('user'));
    },
    watch: {
      messages: {
        handler: function () {
          // Call the debounced method to fetch conversation messages
          this.debouncedGetConversationMessages(this.currentConversation);
        },
        deep: true
      },
      conversations: {
        handler: function () {
          // Call the debounced method to fetch all conversations
          this.debouncedGetAllConversations();
        },
        deep: true
      }
    }
  }
</script>