<template>
    <section class="main-guest-section ">
       <SideBar @updateValue="updateValueFromHeader"></SideBar>
       <!-- guest-main-page-shop-header sidebar-section -->
       <section
          :class="valueFromHeader ? 'guest-main-page-shop-header sidebar-section' : 'guest-main-page-shop-header sidebar-section1'">
          <GuestHeader></GuestHeader>
          <div class="guest-header">
             <div style="margin: 20px;background-color: var(--bg-sidemenu-color); ">
                <div class="video-function-main">
                   <div class="video-container ">
                      
                         <video id="video-preview" class="video" controls loop></video>
                     
                   </div>
                   <div class="vedio-bio-main">
                      <div class="vedio-bio">
                         <img style="width: 22px; height: 22px; cursor: pointer;margin-top: 5px;" src="@/assets/leadericon.png"
                            alt="" @click="openNewWindow">
                         <!-- <EditLeaderBoardPopup v-if="EditLeaderBoardPopup" @leaderpopup="leaderpopup" /> -->
                         <img style="width: 22px; height: 22px; cursor: pointer; margin-top: 5px;" src="@assets/msg.png"
                            @click="showChatComponent">
                         <ChatComponent v-if="chatComponent" @showChatComponent="showChatComponent"  @send-message="sendChatMessage"  :chat-messages="chatMessages" />
                         <img style="width: 22px; height: 22px; cursor: pointer;margin-top: 5px;" @click="showShareComponent"
                            src="@assets/Vector-11.png" alt="">
                         <SharePopup v-if="SharePopup" @showShareComponent="showShareComponent" />
                      </div>
                      <div style="padding-left: 10px;margin-top: 10px;">
                         <div class="second-hamb">
                            <img style="    position: absolute;
                               top: -29px;" alt="Click me" @click="toggleMenu"
                               src="@assets/hamburger-menu-icon-png-white-10.jpg" />
                            <div v-show="isMenuOpen" style="
                               background-color: #0d0d1c;
                               border: 1px solid grey;
                               width: 200px;
                               padding: 20px;
                               border-radius: 10px;    position: absolute;" id="menu" class="menu-container">
                               <router-link :to="{ name: 'home' }" style="text-decoration:none">
                                  <div style="display: flex;align-items: center ;gap: 11px;"
                                     :class="this.isActive ? '' : 'dpnon'">
                                     <img style="width: 35px;" src="@assets/Streamcon.png" />
                                     <h2 style="font-size: 16px;" :class="this.isActive ? '' : 'dpnon'"
                                        class="guest-sidemenu-color">
                                        Stream
                                     </h2>
                                  </div>
                               </router-link>
                               <router-link :to="{ name: 'calendar' }" style="text-decoration:none">
                                  <div style="display: flex;align-items: center ;gap: 11px;"
                                     :class="this.isActive ? '' : 'dpnon'">
                                     <img style="width: 30px;" src="@assets/Cameraicon.png" />
                                     <h2 style="font-size: 16px;" :class="this.isActive ? '' : 'dpnon'"
                                        class="guest-sidemenu-color">Webcam</h2>
                                  </div>
                               </router-link>
                               <router-link :to="{ name: 'shop' }" style="text-decoration:none">
                                  <div style="display: flex;align-items: center ;gap: 20px;"
                                     :class="this.isActive ? '' : 'dpnon'">
                                     <img style="width: 25px; height: 25px;" src="@assets/manageicon.png" />
                                     <h2 style="font-size :16px;" :class="this.isActive ? '' : 'dpnon'"
                                        class="guest-sidemenu-color">
                                        Manage
                                     </h2>
                                  </div>
                               </router-link>
                            </div>
                         </div>
                         <div class="video-deck-main">
                            <p>
                               Tittle
                            </p>
                            <h2>
                               Dick Lane Valodrane- Season
                            </h2>
                            <p>
                               Category
                            </p>
                            <h2>
                               Sports
                            </h2>
                            <p>
                               Tittle
                            </p>
                         </div>
                         <div class="video-function-public">
                            <img src="@assets/webicon.png" alt="">
                            <p>
                               public
                            </p>
                         </div>
                         <div class="Viewers-waiting">
                            <div>
                               <p>
                                  Viewers Waiting
                               </p>
                               <h2>
                                <div class="make-center" id="broadcast-viewers-counter">{{ broadcastViewersCounter }}</div>
                               </h2>
                            </div>
                            <div>
                               <p>
                                  Likes
                               </p>
                               <h2>
                                  0
                               </h2>
                            </div>
                         </div>
                      </div>
                   </div>
                   <p style="margin-left: 25px;font-size: 12px;">
                      Start Sending Us Your Video From Your Streaming Software To Go Live
                   </p>
                </div>
                <div class="livestream-tabs guest-header">
                   <ul>
                      <li style="border: none;" :class="this.tabStreamSelected == 'StreamSetting' ? 'video-item active' : 'video-item'"
                         @click="changeTabStream('StreamSetting')">Stream Setting</li>
                      <li :class="this.tabStreamSelected == 'Analytics' ? 'video-item active' : 'video-item'"
                         @click="changeTabStream('Analytics')">Analytics</li>
                      <li :class="this.tabStreamSelected == 'StreamHealth' ? 'video-item active' : 'video-item'"
                         @click="changeTabStream('StreamHealth')">Stream Health</li>
                   </ul>
                </div>
                <div class="stream-setting-main">
                   <div class="stream-setting">
                      <div>
                         <h2>
                            Stream Key
                         </h2>
                      </div>
                     <!--  <div class="add-event-popup video-key   key-select  ">
                         <p>
                            Select stream Key
                         </p>
                         <select name="">
                            <option value="">Please Select </option>
                         </select>
                      </div> -->
                      <div class="confirm-key-main">
                         <div class="password-container  confirm-key">
                            <input type="password" id="stream-key-unique" v-model="inputstreamkey" placeholder="............">

                            <img src="@assets/eye.png" v-if="!oldPasswordEye"
                               @click="togglePasswordVisibility('stream-key-unique')">
                            <img src="@assets/eye-slash.png" v-if="oldPasswordEye"
                               @click="togglePasswordVisibility('stream-key-unique')">
                         </div>
                         <div class="res-co">
                            <button>
                            RESET
                            </button>
                            <button>
                            COPY
                            </button>
                         </div>
                      </div>
                      <p>
                         Stream URL
                      </p>
                      <div class="stream-url-main">
                         <div class="password-container  confirm-key">
                            <input type="text" name="" id="streamurl" v-model="inputstreamurl">
                            <img src="@assets/lock.png">
                         </div>
                         <div>
                            <button>
                            COPY
                            </button>
                         </div>
                      </div>
                      <p>
                         Backup Server URL
                      </p>
                      <div class="stream-url-main">
                         <div class="password-container  confirm-key">
                            <input type="text" name="" id="Backupstreamurl" v-model="inputBackupstreamurl">
                            <img src="@assets/lock.png">
                         </div>
                         <div>
                            <button>
                            COPY
                            </button>
                         </div>
                      </div>
                   </div>
                   <div class="added-delay">
                      <div class="add-event-popup video-key   key-select  ">
                         <p>
                            Added Delay
                         </p>
                         <select v-model="selectedDelay" @change="updateCountdownValue">
                            <option value="">Please Select</option>
                            <option value="5">5 seconds</option>
                            <option value="10">10 seconds</option>
                            <option value="15">15 seconds</option>
                            <!-- Add more options as needed -->
                        </select>
                      </div>
                   </div>

                   <div class="added-delay">
                      <div class="add-event-popup video-key   key-select  ">
                        <p id="stream-start-count-down">{{ countdownValue }}</p>
                         
                      </div>
                   </div>

                   <div class="added-delay">
                      <div class="add-event-popup video-key   key-select  ">
                         <button v-if="!webcamStream" @click="startWebcam">Start Webcam</button>
                      </div>
                   </div>
                   <div class="added-delay">
                      <div class="add-event-popup video-key   key-select  ">
                         <button v-if="webcamStream " @click="startStreaming">Start Streaming</button>
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
    import ChatComponent from '@components/ChatComponent.vue';
    import SharePopup from '@components/SharePopup.vue';
    // import EditLeaderBoardPopup from '@components/EditLeaderBoardPopup.vue';
    import io from 'socket.io-client';
    
    import RTCMultiConnection from '@/RTC'; 
    import { v4 as uuidv4 } from 'uuid';
    
    export default {
        components: {
            GuestHeader,
            SideBar,
            ChatComponent,
            SharePopup,
            // EditLeaderBoardPopup,
            props: {
                valueFromHeader: String,
            },
        },
        data() {
            return {
                user: {},
                isMenuOpen: false,
                passwordEye: false,
                confirmPasswordEye: false,
                oldPasswordEye: false,
                tabStreamSelected: 'StreamSetting',
                chatComponent: false,
                SharePopup: false,
                valueFromHeader: false,
                // EditLeaderBoardPopup: false,
                user: {
                },
                tab: 'home',
                isActive: true,
                videoisMenuOpen: false,
                valueFromHeader: false,
                //
                broadcastId: '', // Assuming you have broadcastId in your data
                chatInput: '',
                chatMessages: [],
                
                broadcastViewersCounter: 0,
                connection: null,
                socket: null,
                webcamStream: null,
                streamingStarted: false,
                //
                inputstreamkey: "",
                inputstreamurl: "",
                inputBackupstreamurl: "",
                selectedDelay: "", // Define selectedDelay here
                countdownValue: "" // Initial countdown value
    
            }
        },
        methods: {
            togglePasswordVisibility(inputId) {
                const passwordInput = document.getElementById(inputId);
                if (inputId == 'password') {
                    this.passwordEye = !this.passwordEye;
                } else if (inputId == 'old_password') {
                    this.oldPasswordEye = !this.oldPasswordEye;
                } else {
                    this.confirmPasswordEye = !this.confirmPasswordEye;
                }
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                } else {
                    passwordInput.type = 'password';
                }
            },
            
            toggleMenu() {
                // Toggle the value of isMenuOpen
                this.isMenuOpen = !this.isMenuOpen;
            },
            updateValueFromHeader(value) {
                // Update the value in the parent component
                this.valueFromHeader = value;
            },
            openNewWindow() {
                // URL of the page you want to open in the new window
                const pageURL = 'https://costacaster.instantsolutionslab.site/LeaderBoard/LeaderBoard.html';
    
                // Open the new window with fixed width and height
                const newWindow = window.open(pageURL, '_blank');
    
                // Ensure that the window has been opened
                if (newWindow) {
    
                    newWindow.addEventListener('resize', () => {
    
                        const currentWidth = newWindow.innerWidth;
                        const currentHeight = newWindow.innerHeight;
                        console.log(currentWidth)
                        console.log(currentHeight)
                        if (currentWidth < 610 || currentHeight < 400) {
                            newWindow.resizeTo(480);
                        }
                    });
                }
            },
            showChatComponent() {
                this.chatComponent = !this.chatComponent;
                if (!this.chatComponent) {
                    // If the modal is being closed, no need to request previous messages
                    return;
                }
                if (this.inputstreamkey !== '') {
                    // Add a delay of 500 milliseconds (for example)
                    setTimeout(() => {
                        if (this.$el) {
                            // Check if the component is still mounted
                            this.socket.emit('request-previous-messages', this.inputstreamkey);
                        }
                    }, 500); // Adjust the delay time as needed
                }
            },

            showShareComponent() {
                this.SharePopup = !this.SharePopup;
            },
            // leaderpopup() {
            //     this.EditLeaderBoardPopup = !this.EditLeaderBoardPopup;
            // },
            async changeTabStream(tab) {
                this.tabStreamSelected = tab;
            },
            videofunction() {
                this.$router.push({ name: 'leader-board' })
            },
            async tabSelected(route) {
                const tabArray = ['home', 'about', 'shop', 'calendar']
                if (tabArray.includes(route)) {
                    this.tab = route;
                } else {
                    this.tab = 'home';
                }
    
            },
            async register() {
                this.$router.push({ name: 'register' })
            },
            videotoggleMenu: function () {
                this.videoisMenuOpen = !this.videoisMenuOpen; // Toggle the menu state
            },
            updateValueFromHeader(value) {
                // Update the value in the parent component
                this.valueFromHeader = value;
            },
            async startWebcam() {
    try {
        // Access webcam stream
        this.webcamStream = await navigator.mediaDevices.getUserMedia({
            video: true
        });
    
        // Display webcam stream in the video element
        const videoPreview = document.getElementById('video-preview');
        if (videoPreview) {
            videoPreview.srcObject = this.webcamStream;
        }
    } catch (error) {
        console.error('Error accessing webcam:', error);
    }
    },
    updateCountdownValue() {
        this.countdownValue = parseInt(this.selectedDelay) || 0;
    },
    startStreaming() {
            // Start the streaming connection
            // Set up the connection and session configuration

            let seconds = this.countdownValue;
            if(seconds === ''){
                seconds =0;
            }
    const countdownInterval = setInterval(() => {
        if (seconds === 0) {
            clearInterval(countdownInterval);
            // Start the stream when the countdown finishes
            // this.startStream();
       
            const broadcastId = uuidv4();
            this.inputstreamkey = broadcastId;
            this.inputstreamurl = window.location.origin + window.location.pathname + broadcastId;
            this.inputBackupstreamurl = window.location.origin + window.location.pathname + broadcastId;
            this.connection.extra.broadcastId = broadcastId;
            // this.connection.session = {
            //     audio: true,
            //     video: true,
            //     oneway: true
            // };
            const webcamTrack = this.webcamStream.getVideoTracks()[0];
            this.connection.session = {
            audio: true, // Assuming you don't want to include audio from the webcam
            video: webcamTrack,
            oneway: true
        };
            
            // Emit events to check broadcast presence and join the broadcast
            this.socket.emit('check-broadcast-presence', broadcastId, (isBroadcastExists) => {
                if (!isBroadcastExists) {
                    this.connection.userid = broadcastId;
                }
                this.socket.emit('join-broadcast', {
                    broadcastId: broadcastId,
                    userid: this.connection.userid,
                    typeOfStreams: this.connection.session
                });
            });
    
            // Update the state to indicate that streaming has started
            this.streamingStarted = true;
        } else {
            // Update the countdown in the video or wherever you want to display it
            this.countdownValue = seconds;
            seconds--;
        }
    }, 1000); // Update every second
        
        },
        sendChatMessage(message) {
        // Your existing sendChatMessage logic here
        console.log("Received message:", message); // Check if message content is received correctly
        console.log("Received  this broadcastId:", this.inputstreamkey); // Check if message content is received correctly
       
        const trimmedMessage = message.trim();
        if (trimmedMessage !== '' && this.inputstreamkey !== '') {
          
            this.socket.emit('chat-message', {
                broadcastId: this.inputstreamkey,
                userid: this.connection.userid,
                message: trimmedMessage
            });
        }
    },

  
        setupWebRTC() {
      this.connection = new RTCMultiConnection(io);
      this.connection.enableScalableBroadcast = true;
      this.connection.maxRelayLimitPerUser = 1;
      this.connection.autoCloseEntireSession = true;
      this.connection.socketURL = 'http://localhost:5000/';
      
      this.connection.socketMessageEvent = 'scalable-media-broadcast-demo';
      
      this.connection.iceServers = [{
        'urls': [
          'stun:stun.l.google.com:19302',
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
          'stun:stun.l.google.com:19302?transport=udp',
        ]
      }];
    
      this.connection.connectSocket((socket) => {
        this.socket = socket;
    
        // Event listener setup inside the socket connection callback
        this.socket.on('logs', (log) => {
        //   document.querySelector('h1').innerHTML = log.replace(/</g, '----').replace(/>/g, '___').replace(/----/g, '(<span style="color:red;">').replace(/___/g, '</span>)');
        });
    
        this.socket.on('join-broadcaster', (hintsToJoinBroadcast) => {
          this.connection.session = hintsToJoinBroadcast.typeOfStreams;
          this.connection.sdpConstraints.mandatory = {
            OfferToReceiveVideo: !!this.connection.session.video,
            OfferToReceiveAudio: !!this.connection.session.audio
          };
          this.connection.broadcastId = hintsToJoinBroadcast.broadcastId;
          this.connection.join(hintsToJoinBroadcast.userid);
        });
    
        this.socket.on('start-broadcasting', (typeOfStreams) => {
          this.connection.sdpConstraints.mandatory = {
            OfferToReceiveVideo: false,
            OfferToReceiveAudio: false
          };
          this.connection.session = typeOfStreams;
          this.connection.open(this.connection.userid);
        });
    
        this.socket.on('broadcast-stopped', (broadcastId) => {
          alert('This broadcast has been stopped.');
          location.reload();
          console.error('broadcast-stopped', broadcastId);
        });
    
        // this.socket.on('chat-message', (message) => {
        //     console.log('all message',message)
        //   this.chatMessages.push(message);
        // });

        this.socket.on('chat-message', (message) => {
            this.appendMessage(message);
        });
    
        // this.socket.on('previous-messages', (messages) => {
        //     console.log('previous-mes',messages)
        //   this.chatMessages = messages;
        // });

        this.socket.on('previous-messages', (messages) => {
  // Clear existing messages before appending previous messages
  var chatMessages = document.getElementById('chat-messages');
  chatMessages.innerHTML = '';

  messages.forEach((message) => {
    this.appendMessage(message);
  });
});

    



      });

      
    
      var videoPreview = document.getElementById('video-preview');
      this.connection.onNumberOfBroadcastViewersUpdated = (event) => {
    if (!this.connection.isInitiator) return;
    this.broadcastViewersCounter = event.numberOfBroadcastViewers;
};



    this.connection.onstream = function(event) {
    if (this.connection.isInitiator && event.type !== 'local') {
        return;
    }
    
    this.connection.isUpperUserLeft = false;
    videoPreview.srcObject = event.stream;
    videoPreview.play();
    
    videoPreview.userid = event.userid;
    
    if (event.type === 'local') {
        videoPreview.muted = true;
    }
    
    if (this.connection.isInitiator == false && event.type === 'remote') {
        // he is merely relaying the media
        this.connection.dontCaptureUserMedia = true;
        this.connection.attachStreams = [event.stream];
        this.connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: false,
            OfferToReceiveVideo: false
        };
    
        this.connection.getSocket(function(socket) {
            socket.emit('can-relay-broadcast');
    
            if (this.connection.DetectRTC.browser.name === 'Chrome') {
                this.connection.getAllParticipants().forEach(function(p) {
                    if (p + '' != event.userid + '') {
                        var peer = connection.peers[p].peer;
                        peer.getLocalStreams().forEach(function(localStream) {
                            peer.removeStream(localStream);
                        });
                        event.stream.getTracks().forEach(function(track) {
                            peer.addTrack(track, event.stream);
                        });
                        connection.dontAttachStream = true;
                        connection.renegotiate(p);
                        connection.dontAttachStream = false;
                    }
                });
            }
    
            if (this.connection.DetectRTC.browser.name === 'Firefox') {
                // Firefox is NOT supporting removeStream method
                // that's why using alternative hack.
                // NOTE: Firefox seems unable to replace-tracks of the remote-media-stream
                // need to ask all deeper nodes to rejoin
                this.connection.getAllParticipants().forEach(function(p) {
                    if (p + '' != event.userid + '') {
                        connection.replaceTrack(event.stream, p);
                    }
                });
            }
    
            // Firefox seems UN_ABLE to record remote MediaStream
            // WebAudio solution merely records audio
            // so recording is skipped for Firefox.
            if (this.connection.DetectRTC.browser.name === 'Chrome') {
                repeatedlyRecordStream(event.stream);
            }
        });
    }
    
    // to keep room-id in cache
    localStorage.setItem(this.connection.socketMessageEvent, this.connection.sessionid);
    };
    },
    appendMessage(message) {
    var chatMessages = document.getElementById('chat-messages');
    var messageElement = document.createElement('div');
    messageElement.innerText = message;
    chatMessages.appendChild(messageElement);
}
            
        },
    
        created() {
            this.user = JSON.parse(localStorage.getItem('user') || null);
            // this.openOrJoin(); // Call the method using 'this'
    
            this.socket = io('http://localhost:5000');
    
            // Example event handlers
            this.socket.on('connect', () => {
            console.log('Connected to Socket.IO server');
            });
    
            this.socket.on('disconnect', () => {
            console.log('Disconnected from Socket.IO server');
            });
            this.setupWebRTC();
        },

        
    
    
    };
 </script>