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
import io from 'socket.io-client';

import RTCMultiConnection from '@/RTC'; 

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
      broadcastId: '', // Assuming you have broadcastId in your data
      chatInput: '',
      chatMessages: [],
      broadcastViewersCounter: 0,
      connection: null,
      socket: null
    }
  },
  created() {
    // Initialize Socket.IO client when the component is created
    this.socket = io('http://localhost:5000');

    // Example event handlers
    this.socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });
    
    this.setupWebRTC();

    setTimeout(() => {
        this.openOrJoin();
                    }, 1000); // Adjust the delay time as needed
       
                   
  },
  methods: {
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

                const url = window.location.href; // Get the current URL
                const segments = url.split('/'); // Split the URL by '/'
                const broadcastId = segments[segments.length - 1]; // Get the last segment
                if (broadcastId!== '') {
                    
                    // Add a delay of 500 milliseconds (for example)
                    setTimeout(() => {
                        if (this.$el) {
                            // Check if the component is still mounted
                            this.socket.emit('request-previous-messages', broadcastId);
                        }
                    }, 500); // Adjust the delay time as needed
                }
            },

            showShareComponent() {
                this.SharePopup = !this.SharePopup;
            },
    openOrJoin() {
        const url = window.location.href; // Get the current URL
        const segments = url.split('/'); // Split the URL by '/'
        const broadcastId = segments[segments.length - 1]; // Get the last segment
        console.log(broadcastId,'broadcastId')
      if (broadcastId !== '') {
        this.connection.extra.broadcastId = broadcastId;
        this.connection.session = {
          audio: true,
          video: true,
          oneway: true
        };
        this.socket.emit('check-broadcast-presence', broadcastId, (isBroadcastExists) => {
          if (!isBroadcastExists) {
            alert('No broadcast found');
            return false;
            // this.connection.userid = broadcastId;
          }
          this.socket.emit('join-broadcast', {
            broadcastId: broadcastId,
            userid: this.connection.userid,
            typeOfStreams: this.connection.session
          });
        });
      } else {
        alert('Please enter broadcast ID');
      }
    },
    sendChatMessage(message) {
        // Your existing sendChatMessage logic here
        console.log("Received message:", message); // Check if message content is received correctly
      
        const url = window.location.href; // Get the current URL
  const segments = url.split('/'); // Split the URL by '/'
  const broadcastId = segments[segments.length - 1]; // Get the last segment
  console.log("broadcastId id:", broadcastId); // Check if message content is received correctly

        const trimmedMessage = message.trim();
        if (trimmedMessage !== '' && broadcastId !== '') {
          
            this.socket.emit('chat-message', {
                broadcastId: broadcastId,
                userid: this.connection.userid,
                message: trimmedMessage
            });
        }
    },
    appendMessage(message) {
    var chatMessages = document.getElementById('chat-messages');
    
    var messageElement = document.createElement('div');
    const userData = localStorage.getItem('userData');
    // Add static dummy user name
    var userName ;
    if(userData){

    }else{
        userName = 'DummyUser';
    }
    

    // Prepend the user name to the message content
    messageElement.innerHTML = `<strong>${userName}:</strong> ${message}`;
    
    chatMessages.appendChild(messageElement);
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
      // document.querySelector('h1').innerHTML = log.replace(/</g, '----').replace(/>/g, '___').replace(/----/g, '(<span style="color:red;">').replace(/___/g, '</span>)');
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

    this.socket.on('chat-message', (message) => {
      this.appendMessage(message);
    });

    // this.socket.on('previous-messages', (messages) => {
    //   messages.forEach((message) => {
    //     this.appendMessage(message);
    //   });
    // });

    this.socket.on('previous-messages', (messages) => {
        console.log(messages,'message');
  // Clear existing messages before appending previous messages
  var chatMessages = document.getElementById('chat-messages');
  chatMessages.innerHTML = '';

    messages.forEach((message) => {
        this.appendMessage(message);
    });
    });

    

    this.connection.onNumberOfBroadcastViewersUpdated = (event) => {
      if (!this.connection.isInitiator) return;
      this.broadcastViewersCounter = event.numberOfBroadcastViewers;
    };

    this.connection.onstream = (event) => {
      const videoPreview = document.getElementById('video-preview');
      if (videoPreview) {
        videoPreview.srcObject = event.stream;
      } else {
        console.error('#video-preview element not found');
      }
      localStorage.setItem(this.connection.socketMessageEvent, this.connection.sessionid);
    };
  });
}

  }
}
</script>


  
  <style scoped>
  /* Add your CSS styles here */
  </style>

  
  