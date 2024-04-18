<template>
  <!-- <div :class="showEventPopup ? 'add-event-main' : ''">
      <AddEventPopup v-if="showEventPopup" @eventModal="eventModal" />
    </div> -->
  <section class="main-guest-section">
      <SideBar @updateValue="updateValueFromHeader"></SideBar>
      <section class="guest-main-page guest-home-page">
          <GuestHeader @sendValue="sendValueToSidebar"></GuestHeader>



          <div class="guest-header">

              <div class="live-comment-videos-main">

                  <div>
                      <div>
                          <video ref="videoPlayer" controls :src="video.video_location" type="video/mp4">
                          </video>
                      </div>
                      <div class="main-box-videos  live-name-box">
                          <h2>{{ video.title }}</h2>
                          <div class="btn-tagss">
                              <button>FPS</button>
                              <button>Gaming</button>
                              <button>Shooter</button>
                          </div>
                          <div class="main-videos-profile-flex">
                              <router-link :to="{ name: 'userprofile',params : { id : video?.user?.id } }" style="  text-decoration: none;  
                          cursor: pointer;"> <img style="height: 40px;border-radius: 20px;width: 40px;"
                                      src="https://picsum.photos/200/300" alt="">
                              </router-link>

                              <router-link :to="{ name: 'userprofile' ,params : { id : video?.user?.id }}" style="  text-decoration: none;  
                          cursor: pointer;">
                                  <p class="video-profile-name">{{ video.user?.first_name}}</p>
                              </router-link>
                          </div>
                      </div>
                  </div>


                  <div class="live-comment-video-scrol">
                      <div class="live-comment-video">
                          <video ref="videoPlayer" controls>
                              <source :src="require('@/assets/video.mp4')" type="video/mp4" />
                              Your browser does not support the video tag.
                          </video>
                          <div>
                              <p>
                                  Rio Replay: Men's Cycling Road Race Final
                              </p>
                              <div class="main-videos-profile-flex" style="margin-top: -10px;">
                                  <img class="video-profile-img" style="width: 22px;" src="@assets/Profile-1.png" />
                                  <p class="video-profile-name">Shroud</p>
                              </div>
                              <span>
                                  25M Views . 7 year ago
                              </span>
                          </div>

                      </div>
                      <div class="live-comment-video">
                          <video ref="videoPlayer" controls>
                              <source :src="require('@/assets/video.mp4')" type="video/mp4" />
                              Your browser does not support the video tag.
                          </video>
                          <div>
                              <p>
                                  Rio Replay: Men's Cycling Road Race Final
                              </p>
                              <div class="main-videos-profile-flex" style="margin-top: -10px;">
                                  <img class="video-profile-img" style="width: 22px;" src="@assets/Profile-1.png" />
                                  <p class="video-profile-name">Shroud</p>
                              </div>
                              <span>
                                  25M Views . 7 year ago
                              </span>
                          </div>

                      </div>
                      <div class="live-comment-video">
                          <video ref="videoPlayer" controls>
                              <source :src="require('@/assets/video.mp4')" type="video/mp4" />
                              Your browser does not support the video tag.
                          </video>
                          <div>
                              <p>
                                  Rio Replay: Men's Cycling Road Race Final
                              </p>
                              <div class="main-videos-profile-flex" style="margin-top: -10px;">
                                  <img class="video-profile-img" style="width: 22px;" src="@assets/Profile-1.png" />
                                  <p class="video-profile-name">Shroud</p>
                              </div>
                              <span>
                                  25M Views . 7 year ago
                              </span>
                          </div>

                      </div>
                      <div class="live-comment-video">
                          <video ref="videoPlayer" controls>
                              <source :src="require('@/assets/video.mp4')" type="video/mp4" />
                              Your browser does not support the video tag.
                          </video>
                          <div>
                              <p>
                                  Rio Replay: Men's Cycling Road Race Final
                              </p>
                              <div class="main-videos-profile-flex" style="margin-top: -10px;">
                                  <img class="video-profile-img" style="width: 22px;" src="@assets/Profile-1.png" />
                                  <p class="video-profile-name">Shroud</p>
                              </div>
                              <span>
                                  25M Views . 7 year ago
                              </span>
                          </div>

                      </div>
                      <div class="live-comment-video">
                          <video ref="videoPlayer" controls>
                              <source :src="require('@/assets/video.mp4')" type="video/mp4" />
                              Your browser does not support the video tag.
                          </video>
                          <div>
                              <p>
                                  Rio Replay: Men's Cycling Road Race Final
                              </p>
                              <div class="main-videos-profile-flex" style="margin-top: -10px;">
                                  <img class="video-profile-img" style="width: 22px;" src="@assets/Profile-1.png" />
                                  <p class="video-profile-name">Shroud</p>
                              </div>
                              <span>
                                  25M Views . 7 year ago
                              </span>
                          </div>

                      </div>
                      <div class="live-comment-video">
                          <video ref="videoPlayer" controls>
                              <source :src="require('@/assets/video.mp4')" type="video/mp4" />
                              Your browser does not support the video tag.
                          </video>
                          <div>
                              <p>
                                  Rio Replay: Men's Cycling Road Race Final
                              </p>
                              <div class="main-videos-profile-flex" style="margin-top: -10px;">
                                  <img class="video-profile-img" style="width: 22px;" src="@assets/Profile-1.png" />
                                  <p class="video-profile-name">Shroud</p>
                              </div>
                              <span>
                                  25M Views . 7 year ago
                              </span>
                          </div>

                      </div>

                  </div>
              </div>
          </div>




          <div class="commits-main">
              <h1>Comments</h1>

              <div v-for="(comment, key) in comments" :key="key" class="commits">
                  <div>
                      <router-link :to="{ name: 'userprofile' ,params : { id : video?.user?.id } }" style="  text-decoration: none;  
                      cursor: pointer;"> <img style="height: 40px;border-radius: 20px;width: 40px;"
                              src="https://picsum.photos/200/300" alt="">
                      </router-link>
                  </div>

                  <div class="commits-com">

                      <router-link :to="{ name: 'userprofile' ,params : { id : video?.user?.id } }" style="  text-decoration: none;  
                      cursor: pointer;">
                          <h3>{{ comment.user.name }}</h3>
                      </router-link>
                      <p>{{ comment.text }} </p>

                      <div style="display: flex; gap: 20px;">
                          <div class="like-dislike">
                              <img style="width: 18px;" src="@assets/like.png" v-if="!comment.like"
                                  @click="togglePasswordVisibility('likes', key)">
                              <img style="width: 18px;" src="@assets/solar_like.png" v-if="comment.like"
                                  @click="togglePasswordVisibility('likes', key)">{{ comment.impression_likes }}
                          </div>

                          <div class="like-dislike">
                              <img style="width: 18px;" src="@assets/dislike.png" v-if="!comment.dislike"
                                  @click="togglePasswordVisibility('dislike', key)">
                              <img style="width: 18px;" src="@assets/solar_dislike.png" v-if="comment.dislike"
                                  @click="togglePasswordVisibility('dislike', key)">{{ comment.impression_dislikes
                              }}
                          </div>
                      </div>
                      <div class="reply-btn">
                          <button @click="toggleReplyForm(key)">Reply</button>
                      </div>


                      <div v-if="isReplyFormVisible[key]">
                          <form @submit.prevent="newsubmitReply(comment.id)">
                              <div class="reply-input-field">
                                  <input v-model="newReply" type="text" placeholder="Reply...">
                                  <button type="submit"
                                      style="border: none; background-color: transparent;cursor: none; "> <img type:
                                          style="position: absolute;right: 11px;width: 15px; top: 3px;cursor: pointer; "
                                          src="../assets/send.png"></button>
                              </div>
                          </form>
                          <div class="reply-buttons">
                              <button @click="hideReplyForm(key)">Cancel</button>
                          </div>
                      </div>
                      <div v-for="(reply, key) in comment.replies" v-if="comment.has_child > 0"
                          style="display: flex;align-items: start; margin-top: 25px; background-color: #161531;width: 100%;gap: 11px;padding: 22px;border-radius: 20px;position: relative;">
                          <div>
                              <router-link :to="{ name: 'userprofile',params : { id : video?.user?.id } }" style="  text-decoration: none;  
                              cursor: pointer;"> <img style="height: 40px;border-radius: 20px;"
                                      src="https://picsum.photos/200/300" alt="">
                              </router-link>
                          </div>
                          <div style="width: 100%;">

                              <router-link :to="{ name: 'userprofile' , params : { id : video?.user?.id } }" style="  text-decoration: none;  
                              cursor: pointer;">
                                  <h3>{{ comment.user.name }} </h3>
                              </router-link>
                              <p>{{ reply.text }}</p>

                              <div style="display: flex; justify-content: space-between;align-items: center;">
                                  <div style="display: flex; gap: 20px;">
                                      <div class="like-dislike">
                                          <img style="width: 18px;" src="@assets/like.png" v-if="!comment.like2"
                                              @click="togglePasswordVisibility2('likes2', video)">
                                          <img style="width: 18px;" src="@assets/solar_like.png" v-if="comment.like2"
                                              @click="togglePasswordVisibility2('likes2', video)">{{
                                          comment.impression_likes2 }}
                                      </div>

                                      <div class="like-dislike">
                                          <img style="width: 18px;" src="@assets/dislike.png" v-if="!comment.dislike2"
                                              @click="togglePasswordVisibility2('dislike2', video)">
                                          <img style="width: 18px;" src="@assets/solar_dislike.png"
                                              v-if="comment.dislike2"
                                              @click="togglePasswordVisibility2('dislike2', video)">{{
                                          comment.impression_dislikes2
                                          }}
                                      </div>
                                  </div>
                                  <div class="delete-cmnt-btn">
                                      <button @click="deleteComment(comment.id)">Delete</button>
                                  </div>
                              </div>

                              <div v-if="isReplyFormVisible2">
                                  <div class="reply-input-field">
                                      <input type="text" placeholder="Reply...">
                                      <img style="position: absolute;right: 11px;width: 15px; top: 3px;cursor: pointer; "
                                          src="../assets/send.png">
                                  </div>
                                  <div class="reply-buttons">
                                      <button @click="hideReplyForm2">Cancel</button>

                                  </div>
                              </div>
                              <!-- <div class="comment-reply-button">
                                  <button @click="toggleReplyForm2">Reply</button>
                              </div> -->
                          </div>
                      </div>
                  </div>
              </div>


              <div class="commits-guest-header-home-search-field">
                  <input type="text" placeholder="Write a Comment" v-model="commentText" />
                  <img @click="toggletimestamp" src="@assets/arrow-down.png" alt="">
                  <img src="../assets/send.png" alt="" @click="onSubmit" />

              </div>
              <TimeStampPopup v-if="showtimestamp" @toggletimestamp="toggletimestamp" />
          </div>



      </section>
  </section>

</template>
<script>
  import CategoryList from '@components/globals/costacaster/CategoryList.vue';
  import GuestHeader from '@components/globals/guest/GuestHeader.vue';
  import SideBar from '@components/globals/costacaster/SideBar.vue';
  import TimeStampPopup from '@components/TimeStampPopup.vue';
  import { ref } from 'vue';
  import Slider from '@components/globals/costacaster/Slider.vue';
  import VueRouter from 'vue-router';
  import { postData, fetchData } from '@services/base.js';

  export default {
      components: {
          GuestHeader,
          SideBar,
          CategoryList,
          Slider,
          TimeStampPopup,

      },
      data() {

          return {
              valueFromHeader: false,
              response: {},
              video: {

              },
              commentText: "",
              like: false,
              dislikes: false,
              replylike: false,
              replydislikes: false,
              comments: [
                  {
                      user:
                          { name: 'Ashley Edward' },
                      text: 'Lorem Ipsum...',
                      like: false,
                      dislike: false,
                      likesCount: 2,
                      dislikesCount: 8,

                  },

              ],
              isReplyFormVisible: {},
              isReplyFormVisible2: false,
              newReply: '',
              showtimestamp: false,
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
      openLink() {
          alert("");
          const link = "http://learn.shayhowe.com/assets/misc/courses/html-css/adding-media/earth.mp4"; // Replace with your desired URL
          window.open(link, "_blank"); // Opens the link in a new tab or window
      },
      methods: {
          toggletimestamp() {
              this.showtimestamp = !this.showtimestamp;
          },
          toggleReplyForm(key) {
              this.isReplyFormVisible[key] = !this.isReplyFormVisible[key];
          },
          toggleReplyForm2() {
              this.isReplyFormVisible2 = !this.isReplyFormVisible2;
          },
          hideReplyForm(key) {
              this.isReplyFormVisible[key] = false;
          },
          hideReplyForm2() {
              this.isReplyFormVisible2 = false;
          },
          submitReply() {
              // Handle the logic for submitting the reply
              // You can add your own functionality here
          },
          newsubmitReply(commentId) {
              const replyData = {
                  comment_id: commentId,
                  text: this.newReply,
                  video_id: this.$route.params.id
              };


              const endpoint = '/add-comment'; // Replace with your desired endpoint
              postData(endpoint, replyData)
                  .then((response) => {
                      // Handle the response as needed
                      console.log('Reply submitted successfully', response);

                      // Optionally, you can update the comments after submitting the reply
                      this.fetchVideos();

                      // Clear the input text after successful submission
                      this.newReply = '';  // <-- This line clears the input text
                  })
                  .catch((error) => {
                      console.error('Error submitting reply:', error);
                  });
          },
          leaderBoard() {
              this.$router.push({ name: 'leader-board' })
          },
          updateValueFromHeader(value) {
              // Update the value in the parent component
              this.valueFromHeader = value;
          },
          async fetchVideos() {
              const endpoint = '/video-detail/' + this.$route.params.id;
              this.response = await fetchData(endpoint);
              this.video = this.response.data?.data;
              this.comments = this.video.comments;
              console.log(this.video);
          },

          async toggleLike() {
              // console.log("Comment submitted:", this.commentText);
              const endpoint = '/toggle-comment-like' + this.$route.params.id; // Replace with your desired endpoint

              this.responseData = await postData(endpoint, this.user);
              console.log(this.responseData);

          },
          async deleteComment(commentId) {
              try {
                  const endpoint = `/delete-comment/` + comment_id; // Replace with your delete comment API endpoint
                  const response = await fetchData(endpoint, 'DELETE');

                  // Check the response and handle it accordingly
                  if (response.status === 200) {
                      // Comment deleted successfully, update your local data
                      this.comments = this.comments.filter(comment => comment.id !== commentId);
                      console.log('Comment deleted successfully');
                  } else {
                      // Handle error case
                      console.error('Error deleting comment:', response.statusText);
                  }
              } catch (error) {
                  console.error('Error deleting comment:', error);
              }
          },

          togglePasswordVisibility(type, video) {
              const comment = this.comments[video];
              if (type === 'likes') {
                  comment.like = !comment.like;
              } else {
                  comment.dislike = !comment.dislike;
              }
          },
          togglePasswordVisibility2(type, video) {
              const comment = this.comments[video];
              if (type === 'likes2') {
                  comment.like2 = !comment.like2;
              } else {
                  comment.dislike2 = !comment.dislike2;
              }
          },
          async onSubmit() {
              // console.log("Comment submitted:", this.commentText);

              const endpoint = '/add-comment' // Replace with your desired endpoint
              const data = {
                  video_id: this.$route.params.id,
                  text: this.commentText,
              }
              this.responseData = await postData(endpoint, data);
              this.fetchVideos();
              console.log(this.responseData);

          },


      },
      mounted() {
          // Access query parameter when the component is mounted
          this.fetchVideos();
      }
  }
</script>