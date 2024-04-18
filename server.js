const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Define CORS options
const corsOptions = {
  origin: "http://localhost:8080", // Allow requests from localhost:8080
  methods: ["GET", "POST"], // Allow GET and POST requests
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
};

// Set up CORS middleware to allow requests from localhost:8080
app.use(cors(corsOptions));

// Initialize Socket.IO with the server and CORS options
const io = socketIo(server, {
  cors: corsOptions,
  allowEIO3: true // Allow compatibility with EIO 3 protocol
});


const RTCMultiConnectionServer = require('rtcmulticonnection-server');
const BASH_COLORS_HELPER = RTCMultiConnectionServer.BASH_COLORS_HELPER;
const getValuesFromConfigJson = RTCMultiConnectionServer.getValuesFromConfigJson;
const getBashParameters = RTCMultiConnectionServer.getBashParameters;
const resolveURL = RTCMultiConnectionServer.resolveURL;
const jsonPath = {
  config: 'config.json',
  logs: 'logs.json'
};
var config = getValuesFromConfigJson(jsonPath);
config = getBashParameters(config, BASH_COLORS_HELPER);


const httpServer = require('http').Server(app); // Create an HTTP server instance using Express
RTCMultiConnectionServer.beforeHttpListen(httpServer, config);


// Your Socket.IO logic here
const roomSockets = {};
const roomMessages = {};
let roomsData = [];

io.on('connection', (socket) => {
    RTCMultiConnectionServer.addSocket(socket, config);
    // console.log(socket,'socket');

    const params = socket.handshake.query;
    // console.log(params,'params');

    socket.emit('rooms-data', roomsData);

    socket.on('open-room', (room) => {
        console.log('New room created:', room.sessionid);
        updateRoomsData(room.sessionid);
        roomSockets[socket.id] = room.sessionid; // Map socket ID to room ID
        console.log(roomsData,'roomsData');
        io.emit('rooms-data', roomsData);
    });

    
    socket.on('user-disconnected-broadcast', () => {
        console.log('New room created stop:');
        // updateRoomsData();
    });

    // Listen for the 'leave-room' event, which indicates a room is closed
    socket.on('disconnect', () => {
        const roomID = roomSockets[socket.id]; // Get the room ID associated with the socket
        if (roomID) {
            console.log(`Socket disconnected from room: ${roomID}`);
            // Perform any cleanup or handle disconnection related to this room
            // Remove the socket ID from the mapping
            RemoveRoomsData(roomID);
            io.emit('rooms-data', roomsData);
            delete roomSockets[socket.id];
        } else {
            console.log(`Socket disconnected, but no corresponding room found.`);
        }
    });


   

    if (!params.socketCustomEvent) {
        params.socketCustomEvent = 'custom-message';
    }

    socket.on('chat-message', (data) => {
        const { broadcastId, userid, message } = data;
        console.log(data);
        
        // Get the roomID from the broadcastId
        const roomID = broadcastId;

        // Check if the room exists in roomSockets
        if (!roomSockets[roomID]) {
            // If the room doesn't exist, create it and add the sender's socket to it
            roomSockets[roomID] = new Set();
            roomSockets[roomID].add(socket);
            console.log(`Room ${roomID} created.`);
        } else {
            // If the room already exists, add the sender's socket to it if it's not already there
            if (!roomSockets[roomID].has(socket)) {
                roomSockets[roomID].add(socket);
            }
        }

        // Broadcast the message to all sockets in the room
        if (roomSockets[roomID]) {
            roomSockets[roomID].forEach((s) => {
                s.emit('chat-message', message); // Emit the message to each socket in the room
            });
            saveMessage(broadcastId, message); // Save the message only once
        } else {
            console.log(`Room ${roomID} does not exist or has no sockets.`);
        }
    });

    socket.on('request-previous-messages', (broadcastId) => {
        // Retrieve previous messages for the specified broadcastId
        const previousMessages = roomMessages[broadcastId] || [];
        
        // Emit the previous messages back to the client
        socket.emit('previous-messages', previousMessages);
    });

    socket.on(params.socketCustomEvent, function(message) {
        console.log(message,'mess');
        socket.broadcast.emit(params.socketCustomEvent, message);
    });


    // console.log('Active Rooms:', Array.from(io.of('/').adapter.rooms.keys()));
});
io.onclose = () => {
    console.log("datachannel close");
  };
function saveMessage(broadcastId, message) {
    // Check if the room already exists in roomMessages
    if (!roomMessages[broadcastId]) {
        // If the room doesn't exist, initialize an empty array for it
        roomMessages[broadcastId] = [];
    }

    // Push the new message to the array of messages for the room
    roomMessages[broadcastId].push(message);
}


function updateRoomsData(sessionid) {
    roomsData.push(sessionid); // Add the room ID to the roomsData array
    console.log('Updated rooms data:', roomsData);
}
function RemoveRoomsData(sessionid) {
    const index = roomsData.indexOf(sessionid); // Find the index of the room ID
    if (index !== -1) {
        roomsData.splice(index, 1); // Remove the room ID from the array
        console.log('Updated rooms data:', roomsData);
    } else {
        console.log('Room ID not found in roomsData array.');
    }
}


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
