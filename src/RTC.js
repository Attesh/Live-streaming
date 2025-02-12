
'use strict';

// Last time updated: 2020-08-26 8:55:14 AM UTC

// _________________________
// RTCMultiConnection v3.7.0

// Open-Sourced: https://github.com/muaz-khan/RTCMultiConnection

// --------------------------------------------------
// Muaz Khan     - www.MuazKhan.com
// MIT License   - www.WebRTC-Experiment.com/licence
// --------------------------------------------------

"use strict";
var RTCMultiConnection = function(io,roomid, forceOptions) {
    function SocketConnection(connection, connectCallback) {
        function isData(session) {
            return !session.audio && !session.video && !session.screen && session.data
        }

        function updateExtraBackup(remoteUserId, extra) {
            connection.peersBackup[remoteUserId] || (connection.peersBackup[remoteUserId] = {
                userid: remoteUserId,
                extra: {}
            }), connection.peersBackup[remoteUserId].extra = extra
        }

        function onMessageEvent(message) {
            if (message.remoteUserId == connection.userid) {
                if (connection.peers[message.sender] && connection.peers[message.sender].extra != message.message.extra && (connection.peers[message.sender].extra = message.extra, connection.onExtraDataUpdated({
                        userid: message.sender,
                        extra: message.extra
                    }), updateExtraBackup(message.sender, message.extra)), message.message.streamSyncNeeded && connection.peers[message.sender]) {
                    var stream = connection.streamEvents[message.message.streamid];
                    if (!stream || !stream.stream) return;
                    var action = message.message.action;
                    if ("ended" === action || "inactive" === action || "stream-removed" === action) return connection.peersBackup[stream.userid] && (stream.extra = connection.peersBackup[stream.userid].extra), void connection.onstreamended(stream);
                    var type = "both" != message.message.type ? message.message.type : null;
                    return void("function" == typeof stream.stream[action] && stream.stream[action](type))
                }
                if ("dropPeerConnection" === message.message) return void connection.deletePeer(message.sender);
                if (message.message.allParticipants) return message.message.allParticipants.indexOf(message.sender) === -1 && message.message.allParticipants.push(message.sender), void message.message.allParticipants.forEach(function(participant) {
                    mPeer[connection.peers[participant] ? "renegotiatePeer" : "createNewPeer"](participant, {
                        localPeerSdpConstraints: {
                            OfferToReceiveAudio: connection.sdpConstraints.mandatory.OfferToReceiveAudio,
                            OfferToReceiveVideo: connection.sdpConstraints.mandatory.OfferToReceiveVideo
                        },
                        remotePeerSdpConstraints: {
                            OfferToReceiveAudio: connection.session.oneway ? !!connection.session.audio : connection.sdpConstraints.mandatory.OfferToReceiveAudio,
                            OfferToReceiveVideo: connection.session.oneway ? !!connection.session.video || !!connection.session.screen : connection.sdpConstraints.mandatory.OfferToReceiveVideo
                        },
                        isOneWay: !!connection.session.oneway || "one-way" === connection.direction,
                        isDataOnly: isData(connection.session)
                    })
                });
                if (message.message.newParticipant) {
                    if (message.message.newParticipant == connection.userid) return;
                    if (connection.peers[message.message.newParticipant]) return;
                    return void mPeer.createNewPeer(message.message.newParticipant, message.message.userPreferences || {
                        localPeerSdpConstraints: {
                            OfferToReceiveAudio: connection.sdpConstraints.mandatory.OfferToReceiveAudio,
                            OfferToReceiveVideo: connection.sdpConstraints.mandatory.OfferToReceiveVideo
                        },
                        remotePeerSdpConstraints: {
                            OfferToReceiveAudio: connection.session.oneway ? !!connection.session.audio : connection.sdpConstraints.mandatory.OfferToReceiveAudio,
                            OfferToReceiveVideo: connection.session.oneway ? !!connection.session.video || !!connection.session.screen : connection.sdpConstraints.mandatory.OfferToReceiveVideo
                        },
                        isOneWay: !!connection.session.oneway || "one-way" === connection.direction,
                        isDataOnly: isData(connection.session)
                    })
                }
                if (message.message.readyForOffer && (connection.attachStreams.length && (connection.waitingForLocalMedia = !1), connection.waitingForLocalMedia)) return void setTimeout(function() {
                    onMessageEvent(message)
                }, 1);
                if (message.message.newParticipationRequest && message.sender !== connection.userid) {
                    connection.peers[message.sender] && connection.deletePeer(message.sender);
                    var userPreferences = {
                        extra: message.extra || {},
                        localPeerSdpConstraints: message.message.remotePeerSdpConstraints || {
                            OfferToReceiveAudio: connection.sdpConstraints.mandatory.OfferToReceiveAudio,
                            OfferToReceiveVideo: connection.sdpConstraints.mandatory.OfferToReceiveVideo
                        },
                        remotePeerSdpConstraints: message.message.localPeerSdpConstraints || {
                            OfferToReceiveAudio: connection.session.oneway ? !!connection.session.audio : connection.sdpConstraints.mandatory.OfferToReceiveAudio,
                            OfferToReceiveVideo: connection.session.oneway ? !!connection.session.video || !!connection.session.screen : connection.sdpConstraints.mandatory.OfferToReceiveVideo
                        },
                        isOneWay: "undefined" != typeof message.message.isOneWay ? message.message.isOneWay : !!connection.session.oneway || "one-way" === connection.direction,
                        isDataOnly: "undefined" != typeof message.message.isDataOnly ? message.message.isDataOnly : isData(connection.session),
                        dontGetRemoteStream: "undefined" != typeof message.message.isOneWay ? message.message.isOneWay : !!connection.session.oneway || "one-way" === connection.direction,
                        dontAttachLocalStream: !!message.message.dontGetRemoteStream,
                        connectionDescription: message,
                        successCallback: function() {}
                    };
                    return void connection.onNewParticipant(message.sender, userPreferences)
                }
                return message.message.changedUUID && connection.peers[message.message.oldUUID] && (connection.peers[message.message.newUUID] = connection.peers[message.message.oldUUID], delete connection.peers[message.message.oldUUID]), message.message.userLeft ? (mPeer.onUserLeft(message.sender), void(message.message.autoCloseEntireSession && connection.leave())) : void mPeer.addNegotiatedMessage(message.message, message.sender)
            }
        }
        var parameters = "";
        parameters += "?userid=" + connection.userid, parameters += "&sessionid=" + connection.sessionid, parameters += "&msgEvent=" + connection.socketMessageEvent, parameters += "&socketCustomEvent=" + connection.socketCustomEvent, parameters += "&autoCloseEntireSession=" + !!connection.autoCloseEntireSession, connection.session.broadcast === !0 && (parameters += "&oneToMany=true"), parameters += "&maxParticipantsAllowed=" + connection.maxParticipantsAllowed, connection.enableScalableBroadcast && (parameters += "&enableScalableBroadcast=true", parameters += "&maxRelayLimitPerUser=" + (connection.maxRelayLimitPerUser || 2)), parameters += "&extra=" + JSON.stringify(connection.extra || {}), connection.socketCustomParameters && (parameters += connection.socketCustomParameters);
        try {
            io.sockets = {}
        } catch (e) {}
        if (connection.socketURL || (connection.socketURL = "/"), "/" != connection.socketURL.substr(connection.socketURL.length - 1, 1)) throw '"socketURL" MUST end with a slash.';
        connection.enableLogs && ("/" == connection.socketURL ? console.info("socket.io url is: ", location.origin + "/") : console.info("socket.io url is: ", connection.socketURL));
        try {
            connection.socket = io(connection.socketURL + parameters)
        } catch (e) {
            connection.socket = io.connect(connection.socketURL + parameters, connection.socketOptions)
        }
        var mPeer = connection.multiPeersHandler;
        connection.socket.on("extra-data-updated", function(remoteUserId, extra) {
            connection.peers[remoteUserId] && (connection.peers[remoteUserId].extra = extra, connection.onExtraDataUpdated({
                userid: remoteUserId,
                extra: extra
            }), updateExtraBackup(remoteUserId, extra))
        }), connection.socket.on(connection.socketMessageEvent, onMessageEvent);
        var alreadyConnected = !1;
        connection.socket.resetProps = function() {
            alreadyConnected = !1
        }, connection.socket.on("connect", function() {
            alreadyConnected || (alreadyConnected = !0, connection.enableLogs && console.info("socket.io connection is opened."), setTimeout(function() {
                connection.socket.emit("extra-data-updated", connection.extra)
            }, 1e3), connectCallback && connectCallback(connection.socket))
        }), connection.socket.on("disconnect", function(event) {
            connection.onSocketDisconnect(event)
        }), connection.socket.on("error", function(event) {
            connection.onSocketError(event)
        }), connection.socket.on("user-disconnected", function(remoteUserId) {
            remoteUserId !== connection.userid && (connection.onUserStatusChanged({
                userid: remoteUserId,
                status: "offline",
                extra: connection.peers[remoteUserId] ? connection.peers[remoteUserId].extra || {} : {}
            }), connection.deletePeer(remoteUserId))
        }), connection.socket.on("user-connected", function(userid) {
            userid !== connection.userid && connection.onUserStatusChanged({
                userid: userid,
                status: "online",
                extra: connection.peers[userid] ? connection.peers[userid].extra || {} : {}
            })
        }), connection.socket.on("closed-entire-session", function(sessionid, extra) {
            connection.leave(), connection.onEntireSessionClosed({
                sessionid: sessionid,
                userid: sessionid,
                extra: extra
            })
        }), connection.socket.on("userid-already-taken", function(useridAlreadyTaken, yourNewUserId) {
            connection.onUserIdAlreadyTaken(useridAlreadyTaken, yourNewUserId)
        }), connection.socket.on("logs", function(log) {
            connection.enableLogs && console.debug("server-logs", log)
        }), connection.socket.on("number-of-broadcast-viewers-updated", function(data) {
            connection.onNumberOfBroadcastViewersUpdated(data)
        }), connection.socket.on("set-isInitiator-true", function(sessionid) {
            sessionid == connection.sessionid && (connection.isInitiator = !0)
        })
    }

    function MultiPeers(connection) {
        function initFileBufferReader() {
            connection.fbr = new FileBufferReader, connection.fbr.onProgress = function(chunk) {
                connection.onFileProgress(chunk)
            }, connection.fbr.onBegin = function(file) {
                connection.onFileStart(file)
            }, connection.fbr.onEnd = function(file) {
                connection.onFileEnd(file)
            }
        }
        var self = this,
            skipPeers = ["getAllParticipants", "getLength", "selectFirst", "streams", "send", "forEach"];
        connection.peers = {
            getLength: function() {
                var numberOfPeers = 0;
                for (var peer in this) skipPeers.indexOf(peer) == -1 && numberOfPeers++;
                return numberOfPeers
            },
            selectFirst: function() {
                var firstPeer;
                for (var peer in this) skipPeers.indexOf(peer) == -1 && (firstPeer = this[peer]);
                return firstPeer
            },
            getAllParticipants: function(sender) {
                var allPeers = [];
                for (var peer in this) skipPeers.indexOf(peer) == -1 && peer != sender && allPeers.push(peer);
                return allPeers
            },
            forEach: function(callback) {
                this.getAllParticipants().forEach(function(participant) {
                    callback(connection.peers[participant])
                })
            },
            send: function(data, remoteUserId) {
                var that = this;
                if (!isNull(data.size) && !isNull(data.type)) {
                    if (connection.enableFileSharing) return void self.shareFile(data, remoteUserId);
                    "string" != typeof data && (data = JSON.stringify(data))
                }
                if (!("text" === data.type || data instanceof ArrayBuffer || data instanceof DataView)) return void TextSender.send({
                    text: data,
                    channel: this,
                    connection: connection,
                    remoteUserId: remoteUserId
                });
                if ("text" === data.type && (data = JSON.stringify(data)), remoteUserId) {
                    var remoteUser = connection.peers[remoteUserId];
                    if (remoteUser) return remoteUser.channels.length ? void remoteUser.channels.forEach(function(channel) {
                        channel.send(data)
                    }) : (connection.peers[remoteUserId].createDataChannel(), connection.renegotiate(remoteUserId), void setTimeout(function() {
                        that.send(data, remoteUserId)
                    }, 3e3))
                }
                this.getAllParticipants().forEach(function(participant) {
                    return that[participant].channels.length ? void that[participant].channels.forEach(function(channel) {
                        channel.send(data)
                    }) : (connection.peers[participant].createDataChannel(), connection.renegotiate(participant), void setTimeout(function() {
                        that[participant].channels.forEach(function(channel) {
                            channel.send(data)
                        })
                    }, 3e3))
                })
            }
        }, this.uuid = connection.userid, this.getLocalConfig = function(remoteSdp, remoteUserId, userPreferences) {
            return userPreferences || (userPreferences = {}), {
                streamsToShare: userPreferences.streamsToShare || {},
                rtcMultiConnection: connection,
                connectionDescription: userPreferences.connectionDescription,
                userid: remoteUserId,
                localPeerSdpConstraints: userPreferences.localPeerSdpConstraints,
                remotePeerSdpConstraints: userPreferences.remotePeerSdpConstraints,
                dontGetRemoteStream: !!userPreferences.dontGetRemoteStream,
                dontAttachLocalStream: !!userPreferences.dontAttachLocalStream,
                renegotiatingPeer: !!userPreferences.renegotiatingPeer,
                peerRef: userPreferences.peerRef,
                channels: userPreferences.channels || [],
                onLocalSdp: function(localSdp) {
                    self.onNegotiationNeeded(localSdp, remoteUserId)
                },
                onLocalCandidate: function(localCandidate) {
                    localCandidate = OnIceCandidateHandler.processCandidates(connection, localCandidate), localCandidate && self.onNegotiationNeeded(localCandidate, remoteUserId)
                },
                remoteSdp: remoteSdp,
                onDataChannelMessage: function(message) {
                    if (!connection.fbr && connection.enableFileSharing && initFileBufferReader(), "string" == typeof message || !connection.enableFileSharing) return void self.onDataChannelMessage(message, remoteUserId);
                    var that = this;
                    return message instanceof ArrayBuffer || message instanceof DataView ? void connection.fbr.convertToObject(message, function(object) {
                        that.onDataChannelMessage(object)
                    }) : message.readyForNextChunk ? void connection.fbr.getNextChunk(message, function(nextChunk, isLastChunk) {
                        connection.peers[remoteUserId].channels.forEach(function(channel) {
                            channel.send(nextChunk)
                        })
                    }, remoteUserId) : message.chunkMissing ? void connection.fbr.chunkMissing(message) : void connection.fbr.addChunk(message, function(promptNextChunk) {
                        connection.peers[remoteUserId].peer.channel.send(promptNextChunk)
                    })
                },
                onDataChannelError: function(error) {
                    self.onDataChannelError(error, remoteUserId)
                },
                onDataChannelOpened: function(channel) {
                    self.onDataChannelOpened(channel, remoteUserId)
                },
                onDataChannelClosed: function(event) {
                    self.onDataChannelClosed(event, remoteUserId)
                },
                onRemoteStream: function(stream) {
                    connection.peers[remoteUserId] && connection.peers[remoteUserId].streams.push(stream), self.onGettingRemoteMedia(stream, remoteUserId)
                },
                onRemoteStreamRemoved: function(stream) {
                    self.onRemovingRemoteMedia(stream, remoteUserId)
                },
                onPeerStateChanged: function(states) {
                    self.onPeerStateChanged(states), "new" === states.iceConnectionState && self.onNegotiationStarted(remoteUserId, states), "connected" === states.iceConnectionState && self.onNegotiationCompleted(remoteUserId, states), states.iceConnectionState.search(/closed|failed/gi) !== -1 && (self.onUserLeft(remoteUserId), self.disconnectWith(remoteUserId))
                }
            }
        }, this.createNewPeer = function(remoteUserId, userPreferences) {
            if (!(connection.maxParticipantsAllowed <= connection.getAllParticipants().length)) {
                if (userPreferences = userPreferences || {}, connection.isInitiator && connection.session.audio && "two-way" === connection.session.audio && !userPreferences.streamsToShare && (userPreferences.isOneWay = !1, userPreferences.isDataOnly = !1, userPreferences.session = connection.session), !userPreferences.isOneWay && !userPreferences.isDataOnly) return userPreferences.isOneWay = !0, void this.onNegotiationNeeded({
                    enableMedia: !0,
                    userPreferences: userPreferences
                }, remoteUserId);
                userPreferences = connection.setUserPreferences(userPreferences, remoteUserId);
                var localConfig = this.getLocalConfig(null, remoteUserId, userPreferences);
                connection.peers[remoteUserId] = new PeerInitiator(localConfig)
            }
        }, this.createAnsweringPeer = function(remoteSdp, remoteUserId, userPreferences) {
            userPreferences = connection.setUserPreferences(userPreferences || {}, remoteUserId);
            var localConfig = this.getLocalConfig(remoteSdp, remoteUserId, userPreferences);
            connection.peers[remoteUserId] = new PeerInitiator(localConfig)
        }, this.renegotiatePeer = function(remoteUserId, userPreferences, remoteSdp) {
            if (!connection.peers[remoteUserId]) return void(connection.enableLogs && console.error("Peer (" + remoteUserId + ") does not exist. Renegotiation skipped."));
            userPreferences || (userPreferences = {}), userPreferences.renegotiatingPeer = !0, userPreferences.peerRef = connection.peers[remoteUserId].peer, userPreferences.channels = connection.peers[remoteUserId].channels;
            var localConfig = this.getLocalConfig(remoteSdp, remoteUserId, userPreferences);
            connection.peers[remoteUserId] = new PeerInitiator(localConfig)
        }, this.replaceTrack = function(track, remoteUserId, isVideoTrack) {
            if (!connection.peers[remoteUserId]) throw "This peer (" + remoteUserId + ") does not exist.";
            var peer = connection.peers[remoteUserId].peer;
            return peer.getSenders && "function" == typeof peer.getSenders && peer.getSenders().length ? void peer.getSenders().forEach(function(rtpSender) {
                isVideoTrack && "video" === rtpSender.track.kind && (connection.peers[remoteUserId].peer.lastVideoTrack = rtpSender.track, rtpSender.replaceTrack(track)), isVideoTrack || "audio" !== rtpSender.track.kind || (connection.peers[remoteUserId].peer.lastAudioTrack = rtpSender.track, rtpSender.replaceTrack(track))
            }) : (console.warn("RTPSender.replaceTrack is NOT supported."), void this.renegotiatePeer(remoteUserId))
        }, this.onNegotiationNeeded = function(message, remoteUserId) {}, this.addNegotiatedMessage = function(message, remoteUserId) {
            if (message.type && message.sdp) return "answer" == message.type && connection.peers[remoteUserId] && connection.peers[remoteUserId].addRemoteSdp(message), "offer" == message.type && (message.renegotiatingPeer ? this.renegotiatePeer(remoteUserId, null, message) : this.createAnsweringPeer(message, remoteUserId)), void(connection.enableLogs && console.log("Remote peer's sdp:", message.sdp));
            if (message.candidate) return connection.peers[remoteUserId] && connection.peers[remoteUserId].addRemoteCandidate(message), void(connection.enableLogs && console.log("Remote peer's candidate pairs:", message.candidate));
            if (message.enableMedia) {
                connection.session = message.userPreferences.session || connection.session, connection.session.oneway && connection.attachStreams.length && (connection.attachStreams = []), message.userPreferences.isDataOnly && connection.attachStreams.length && (connection.attachStreams.length = []);
                var streamsToShare = {};
                connection.attachStreams.forEach(function(stream) {
                    streamsToShare[stream.streamid] = {
                        isAudio: !!stream.isAudio,
                        isVideo: !!stream.isVideo,
                        isScreen: !!stream.isScreen
                    }
                }), message.userPreferences.streamsToShare = streamsToShare, self.onNegotiationNeeded({
                    readyForOffer: !0,
                    userPreferences: message.userPreferences
                }, remoteUserId)
            }
            message.readyForOffer && connection.onReadyForOffer(remoteUserId, message.userPreferences)
        }, this.onGettingRemoteMedia = function(stream, remoteUserId) {}, this.onRemovingRemoteMedia = function(stream, remoteUserId) {}, this.onGettingLocalMedia = function(localStream) {}, this.onLocalMediaError = function(error, constraints) {
            connection.onMediaError(error, constraints)
        }, this.shareFile = function(file, remoteUserId) {
            initFileBufferReader(), connection.fbr.readAsArrayBuffer(file, function(uuid) {
                var arrayOfUsers = connection.getAllParticipants();
                remoteUserId && (arrayOfUsers = [remoteUserId]), arrayOfUsers.forEach(function(participant) {
                    connection.fbr.getNextChunk(uuid, function(nextChunk) {
                        connection.peers[participant].channels.forEach(function(channel) {
                            channel.send(nextChunk)
                        })
                    }, participant)
                })
            }, {
                userid: connection.userid,
                chunkSize: "Firefox" === DetectRTC.browser.name ? 15e3 : connection.chunkSize || 0
            })
        };
        var textReceiver = new TextReceiver(connection);
        this.onDataChannelMessage = function(message, remoteUserId) {
            textReceiver.receive(JSON.parse(message), remoteUserId, connection.peers[remoteUserId] ? connection.peers[remoteUserId].extra : {})
        }, this.onDataChannelClosed = function(event, remoteUserId) {
            event.userid = remoteUserId, event.extra = connection.peers[remoteUserId] ? connection.peers[remoteUserId].extra : {}, connection.onclose(event)
        }, this.onDataChannelError = function(error, remoteUserId) {
            error.userid = remoteUserId, event.extra = connection.peers[remoteUserId] ? connection.peers[remoteUserId].extra : {}, connection.onerror(error)
        }, this.onDataChannelOpened = function(channel, remoteUserId) {
            return connection.peers[remoteUserId].channels.length ? void(connection.peers[remoteUserId].channels = [channel]) : (connection.peers[remoteUserId].channels.push(channel), void connection.onopen({
                userid: remoteUserId,
                extra: connection.peers[remoteUserId] ? connection.peers[remoteUserId].extra : {},
                channel: channel
            }))
        }, this.onPeerStateChanged = function(state) {
            connection.onPeerStateChanged(state)
        }, this.onNegotiationStarted = function(remoteUserId, states) {}, this.onNegotiationCompleted = function(remoteUserId, states) {}, this.getRemoteStreams = function(remoteUserId) {
            return remoteUserId = remoteUserId || connection.peers.getAllParticipants()[0], connection.peers[remoteUserId] ? connection.peers[remoteUserId].streams : []
        }
    }

    function fireEvent(obj, eventName, args) {
        if ("undefined" != typeof CustomEvent) {
            var eventDetail = {
                    arguments: args,
                    __exposedProps__: args
                },
                event = new CustomEvent(eventName, eventDetail);
            obj.dispatchEvent(event)
        }
    }

    function setHarkEvents(connection, streamEvent) {
        if (streamEvent.stream && getTracks(streamEvent.stream, "audio").length) {
            if (!connection || !streamEvent) throw "Both arguments are required.";
            if (connection.onspeaking && connection.onsilence) {
                if ("undefined" == typeof hark) throw "hark.js not found.";
                hark(streamEvent.stream, {
                    onspeaking: function() {
                        connection.onspeaking(streamEvent)
                    },
                    onsilence: function() {
                        connection.onsilence(streamEvent)
                    },
                    onvolumechange: function(volume, threshold) {
                        connection.onvolumechange && connection.onvolumechange(merge({
                            volume: volume,
                            threshold: threshold
                        }, streamEvent))
                    }
                })
            }
        }
    }

    function setMuteHandlers(connection, streamEvent) {
        streamEvent.stream && streamEvent.stream && streamEvent.stream.addEventListener && (streamEvent.stream.addEventListener("mute", function(event) {
            event = connection.streamEvents[streamEvent.streamid], event.session = {
                audio: "audio" === event.muteType,
                video: "video" === event.muteType
            }, connection.onmute(event)
        }, !1), streamEvent.stream.addEventListener("unmute", function(event) {
            event = connection.streamEvents[streamEvent.streamid], event.session = {
                audio: "audio" === event.unmuteType,
                video: "video" === event.unmuteType
            }, connection.onunmute(event)
        }, !1))
    }

    function getRandomString() {
        if (window.crypto && window.crypto.getRandomValues && navigator.userAgent.indexOf("Safari") === -1) {
            for (var a = window.crypto.getRandomValues(new Uint32Array(3)), token = "", i = 0, l = a.length; i < l; i++) token += a[i].toString(36);
            return token
        }
        return (Math.random() * (new Date).getTime()).toString(36).replace(/\./g, "")
    }

    function getRMCMediaElement(stream, callback, connection) {
        if (!connection.autoCreateMediaElement) return void callback({});
        var isAudioOnly = !1;
        getTracks(stream, "video").length || stream.isVideo || stream.isScreen || (isAudioOnly = !0), "Firefox" === DetectRTC.browser.name && (connection.session.video || connection.session.screen) && (isAudioOnly = !1);
        var mediaElement = document.createElement(isAudioOnly ? "audio" : "video");
        if (mediaElement.srcObject = stream, mediaElement.setAttribute("autoplay", !0), mediaElement.setAttribute("playsinline", !0), mediaElement.setAttribute("controls", !0), mediaElement.setAttribute("muted", !1), mediaElement.setAttribute("volume", 1), "Firefox" === DetectRTC.browser.name) {
            var streamEndedEvent = "ended";
            "oninactive" in mediaElement && (streamEndedEvent = "inactive"), mediaElement.addEventListener(streamEndedEvent, function() {
                if (currentUserMediaRequest.remove(stream.idInstance), "local" === stream.type) {
                    streamEndedEvent = "ended", "oninactive" in stream && (streamEndedEvent = "inactive"), StreamsHandler.onSyncNeeded(stream.streamid, streamEndedEvent), connection.attachStreams.forEach(function(aStream, idx) {
                        stream.streamid === aStream.streamid && delete connection.attachStreams[idx]
                    });
                    var newStreamsArray = [];
                    connection.attachStreams.forEach(function(aStream) {
                        aStream && newStreamsArray.push(aStream)
                    }), connection.attachStreams = newStreamsArray;
                    var streamEvent = connection.streamEvents[stream.streamid];
                    if (streamEvent) return void connection.onstreamended(streamEvent);
                    this.parentNode && this.parentNode.removeChild(this)
                }
            }, !1)
        }
        var played = mediaElement.play();
        if ("undefined" != typeof played) {
            var cbFired = !1;
            setTimeout(function() {
                cbFired || (cbFired = !0, callback(mediaElement))
            }, 1e3), played.then(function() {
                cbFired || (cbFired = !0, callback(mediaElement))
            })["catch"](function(error) {
                cbFired || (cbFired = !0, callback(mediaElement))
            })
        } else callback(mediaElement)
    }

    function listenEventHandler(eventName, eventHandler) {
        window.removeEventListener(eventName, eventHandler), window.addEventListener(eventName, eventHandler, !1)
    }

    function removeNullEntries(array) {
        var newArray = [];
        return array.forEach(function(item) {
            item && newArray.push(item)
        }), newArray
    }

    function isData(session) {
        return !session.audio && !session.video && !session.screen && session.data
    }

    function isNull(obj) {
        return "undefined" == typeof obj
    }

    function isString(obj) {
        return "string" == typeof obj
    }

    function isAudioPlusTab(connection, audioPlusTab) {
        return (!connection.session.audio || "two-way" !== connection.session.audio) && ("Firefox" === DetectRTC.browser.name && audioPlusTab !== !1 || !("Chrome" !== DetectRTC.browser.name || DetectRTC.browser.version < 50) && (typeof audioPlusTab === !0 || !("undefined" != typeof audioPlusTab || !connection.session.audio || !connection.session.screen || connection.session.video) && (audioPlusTab = !0, !0)))
    }

    function getTracks(stream, kind) {
        return stream && stream.getTracks ? stream.getTracks().filter(function(t) {
            return t.kind === (kind || "audio")
        }) : []
    }

    function isUnifiedPlanSupportedDefault() {
        var canAddTransceiver = !1;
        try {
            if ("undefined" == typeof RTCRtpTransceiver) return !1;
            if (!("currentDirection" in RTCRtpTransceiver.prototype)) return !1;
            var tempPc = new RTCPeerConnection;
            try {
                tempPc.addTransceiver("audio"), canAddTransceiver = !0
            } catch (e) {}
            tempPc.close()
        } catch (e) {
            canAddTransceiver = !1
        }
        return canAddTransceiver && isUnifiedPlanSuppored()
    }

    function isUnifiedPlanSuppored() {
        var isUnifiedPlanSupported = !1;
        try {
            var pc = new RTCPeerConnection({
                sdpSemantics: "unified-plan"
            });
            try {
                var config = pc.getConfiguration();
                isUnifiedPlanSupported = "unified-plan" == config.sdpSemantics || ("plan-b" == config.sdpSemantics, !1)
            } catch (e) {
                isUnifiedPlanSupported = !1
            }
        } catch (e) {
            isUnifiedPlanSupported = !1
        }
        return isUnifiedPlanSupported
    }

    function setCordovaAPIs() {
        if ("undefined" != typeof cordova && "undefined" != typeof cordova.plugins && "undefined" != typeof cordova.plugins.iosrtc) {
            var iosrtc = cordova.plugins.iosrtc;
            window.webkitRTCPeerConnection = iosrtc.RTCPeerConnection, window.RTCSessionDescription = iosrtc.RTCSessionDescription, window.RTCIceCandidate = iosrtc.RTCIceCandidate, window.MediaStream = iosrtc.MediaStream, window.MediaStreamTrack = iosrtc.MediaStreamTrack, navigator.getUserMedia = navigator.webkitGetUserMedia = iosrtc.getUserMedia, iosrtc.debug.enable("iosrtc*"), "function" == typeof iosrtc.selectAudioOutput && iosrtc.selectAudioOutput(window.iOSDefaultAudioOutputDevice || "speaker"), iosrtc.registerGlobals()
        }
    }

    function setSdpConstraints(config) {
        var sdpConstraints = {
            OfferToReceiveAudio: !!config.OfferToReceiveAudio,
            OfferToReceiveVideo: !!config.OfferToReceiveVideo
        };
        return sdpConstraints
    }

    function PeerInitiator(config) {
        function setChannelEvents(channel) {
            channel.binaryType = "arraybuffer", channel.onmessage = function(event) {
                config.onDataChannelMessage(event.data)
            }, channel.onopen = function() {
                config.onDataChannelOpened(channel)
            }, channel.onerror = function(error) {
                config.onDataChannelError(error)
            }, channel.onclose = function(event) {
                config.onDataChannelClosed(event)
            }, channel.internalSend = channel.send, channel.send = function(data) {
                "open" === channel.readyState && channel.internalSend(data)
            }, peer.channel = channel
        }

        function createOfferOrAnswer(_method) {
            peer[_method](defaults.sdpConstraints).then(function(localSdp) {
                "Safari" !== DetectRTC.browser.name && (localSdp.sdp = connection.processSdp(localSdp.sdp)), peer.setLocalDescription(localSdp).then(function() {
                    connection.trickleIce && (config.onLocalSdp({
                        type: localSdp.type,
                        sdp: localSdp.sdp,
                        remotePeerSdpConstraints: config.remotePeerSdpConstraints || !1,
                        renegotiatingPeer: !!config.renegotiatingPeer || !1,
                        connectionDescription: self.connectionDescription,
                        dontGetRemoteStream: !!config.dontGetRemoteStream,
                        extra: connection ? connection.extra : {},
                        streamsToShare: streamsToShare
                    }), connection.onSettingLocalDescription(self))
                }, function(error) {
                    connection.enableLogs && console.error("setLocalDescription error", error)
                })
            }, function(error) {
                connection.enableLogs && console.error("sdp-error", error)
            })
        }
        if ("undefined" != typeof window.RTCPeerConnection ? RTCPeerConnection = window.RTCPeerConnection : "undefined" != typeof mozRTCPeerConnection ? RTCPeerConnection = mozRTCPeerConnection : "undefined" != typeof webkitRTCPeerConnection && (RTCPeerConnection = webkitRTCPeerConnection), RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription, RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate, MediaStreamTrack = window.MediaStreamTrack, !RTCPeerConnection) throw "WebRTC 1.0 (RTCPeerConnection) API are NOT available in this browser.";
        var connection = config.rtcMultiConnection;
        this.extra = config.remoteSdp ? config.remoteSdp.extra : connection.extra, this.userid = config.userid, this.streams = [], this.channels = config.channels || [], this.connectionDescription = config.connectionDescription, this.addStream = function(session) {
            connection.addStream(session, self.userid)
        }, this.removeStream = function(streamid) {
            connection.removeStream(streamid, self.userid)
        };
        var self = this;
        config.remoteSdp && (this.connectionDescription = config.remoteSdp.connectionDescription);
        var allRemoteStreams = {};
        defaults.sdpConstraints = setSdpConstraints({
            OfferToReceiveAudio: !0,
            OfferToReceiveVideo: !0
        });
        var peer, renegotiatingPeer = !!config.renegotiatingPeer;
        config.remoteSdp && (renegotiatingPeer = !!config.remoteSdp.renegotiatingPeer);
        var localStreams = [];
        if (connection.attachStreams.forEach(function(stream) {
                stream && localStreams.push(stream)
            }), renegotiatingPeer) peer = config.peerRef;
        else {
            var iceTransports = "all";
            (connection.candidates.turn || connection.candidates.relay) && (connection.candidates.stun || connection.candidates.reflexive || connection.candidates.host || (iceTransports = "relay"));
            try {
                var params = {
                    iceServers: connection.iceServers,
                    iceTransportPolicy: connection.iceTransportPolicy || iceTransports
                };
                "undefined" != typeof connection.iceCandidatePoolSize && (params.iceCandidatePoolSize = connection.iceCandidatePoolSize), "undefined" != typeof connection.bundlePolicy && (params.bundlePolicy = connection.bundlePolicy), "undefined" != typeof connection.rtcpMuxPolicy && (params.rtcpMuxPolicy = connection.rtcpMuxPolicy), connection.sdpSemantics && (params.sdpSemantics = connection.sdpSemantics || "unified-plan"), connection.iceServers && connection.iceServers.length || (params = null, connection.optionalArgument = null), peer = new RTCPeerConnection(params, connection.optionalArgument)
            } catch (e) {
                try {
                    var params = {
                        iceServers: connection.iceServers
                    };
                    peer = new RTCPeerConnection(params)
                } catch (e) {
                    peer = new RTCPeerConnection
                }
            }
        }!peer.getRemoteStreams && peer.getReceivers && (peer.getRemoteStreams = function() {
            var stream = new MediaStream;
            return peer.getReceivers().forEach(function(receiver) {
                stream.addTrack(receiver.track)
            }), [stream]
        }), !peer.getLocalStreams && peer.getSenders && (peer.getLocalStreams = function() {
            var stream = new MediaStream;
            return peer.getSenders().forEach(function(sender) {
                stream.addTrack(sender.track)
            }), [stream]
        }), peer.onicecandidate = function(event) {
            if (event.candidate) connection.trickleIce && config.onLocalCandidate({
                candidate: event.candidate.candidate,
                sdpMid: event.candidate.sdpMid,
                sdpMLineIndex: event.candidate.sdpMLineIndex
            });
            else if (!connection.trickleIce) {
                var localSdp = peer.localDescription;
                config.onLocalSdp({
                    type: localSdp.type,
                    sdp: localSdp.sdp,
                    remotePeerSdpConstraints: config.remotePeerSdpConstraints || !1,
                    renegotiatingPeer: !!config.renegotiatingPeer || !1,
                    connectionDescription: self.connectionDescription,
                    dontGetRemoteStream: !!config.dontGetRemoteStream,
                    extra: connection ? connection.extra : {},
                    streamsToShare: streamsToShare
                })
            }
        }, localStreams.forEach(function(localStream) {
            config.remoteSdp && config.remoteSdp.remotePeerSdpConstraints && config.remoteSdp.remotePeerSdpConstraints.dontGetRemoteStream || config.dontAttachLocalStream || (localStream = connection.beforeAddingStream(localStream, self), localStream && (peer.getLocalStreams().forEach(function(stream) {
                localStream && stream.id == localStream.id && (localStream = null)
            }), localStream && localStream.getTracks && localStream.getTracks().forEach(function(track) {
                try {
                    peer.addTrack(track, localStream)
                } catch (e) {}
            })))
        }), peer.oniceconnectionstatechange = peer.onsignalingstatechange = function() {
            var extra = self.extra;
            connection.peers[self.userid] && (extra = connection.peers[self.userid].extra || extra), peer && (config.onPeerStateChanged({
                iceConnectionState: peer.iceConnectionState,
                iceGatheringState: peer.iceGatheringState,
                signalingState: peer.signalingState,
                extra: extra,
                userid: self.userid
            }), peer && peer.iceConnectionState && peer.iceConnectionState.search(/closed|failed/gi) !== -1 && self.streams instanceof Array && self.streams.forEach(function(stream) {
                var streamEvent = connection.streamEvents[stream.id] || {
                    streamid: stream.id,
                    stream: stream,
                    type: "remote"
                };
                connection.onstreamended(streamEvent)
            }))
        };
        var sdpConstraints = {
            OfferToReceiveAudio: !!localStreams.length,
            OfferToReceiveVideo: !!localStreams.length
        };
        config.localPeerSdpConstraints && (sdpConstraints = config.localPeerSdpConstraints), defaults.sdpConstraints = setSdpConstraints(sdpConstraints);
        var dontDuplicate = {};
        peer.ontrack = function(event) {
            if (event && "track" === event.type) {
                if (event.stream = event.streams[event.streams.length - 1], event.stream.id || (event.stream.id = event.track.id), dontDuplicate[event.stream.id] && "Safari" !== DetectRTC.browser.name) return void(event.track && (event.track.onended = function() {
                    peer && peer.onremovestream(event)
                }));
                dontDuplicate[event.stream.id] = event.stream.id;
                var streamsToShare = {};
                config.remoteSdp && config.remoteSdp.streamsToShare ? streamsToShare = config.remoteSdp.streamsToShare : config.streamsToShare && (streamsToShare = config.streamsToShare);
                var streamToShare = streamsToShare[event.stream.id];
                streamToShare ? (event.stream.isAudio = streamToShare.isAudio, event.stream.isVideo = streamToShare.isVideo, event.stream.isScreen = streamToShare.isScreen) : (event.stream.isVideo = !!getTracks(event.stream, "video").length, event.stream.isAudio = !event.stream.isVideo, event.stream.isScreen = !1), event.stream.streamid = event.stream.id, allRemoteStreams[event.stream.id] = event.stream, config.onRemoteStream(event.stream), event.stream.getTracks().forEach(function(track) {
                    track.onended = function() {
                        peer && peer.onremovestream(event)
                    }
                }), event.stream.onremovetrack = function() {
                    peer && peer.onremovestream(event)
                }
            }
        }, peer.onremovestream = function(event) {
            event.stream.streamid = event.stream.id, allRemoteStreams[event.stream.id] && delete allRemoteStreams[event.stream.id], config.onRemoteStreamRemoved(event.stream)
        }, "function" != typeof peer.removeStream && (peer.removeStream = function(stream) {
            stream.getTracks().forEach(function(track) {
                peer.removeTrack(track, stream)
            })
        }), this.addRemoteCandidate = function(remoteCandidate) {
            peer.addIceCandidate(new RTCIceCandidate(remoteCandidate))
        }, this.addRemoteSdp = function(remoteSdp, cb) {
            cb = cb || function() {}, "Safari" !== DetectRTC.browser.name && (remoteSdp.sdp = connection.processSdp(remoteSdp.sdp)), peer.setRemoteDescription(new RTCSessionDescription(remoteSdp)).then(cb, function(error) {
                connection.enableLogs && console.error("setRemoteDescription failed", "\n", error, "\n", remoteSdp.sdp), cb()
            })["catch"](function(error) {
                connection.enableLogs && console.error("setRemoteDescription failed", "\n", error, "\n", remoteSdp.sdp), cb()
            })
        };
        var isOfferer = !0;
        config.remoteSdp && (isOfferer = !1), this.createDataChannel = function() {
            var channel = peer.createDataChannel("sctp", {});
            setChannelEvents(channel)
        }, connection.session.data !== !0 || renegotiatingPeer || (isOfferer ? this.createDataChannel() : peer.ondatachannel = function(event) {
            var channel = event.channel;
            setChannelEvents(channel)
        }), this.enableDisableVideoEncoding = function(enable) {
            var rtcp;
            if (peer.getSenders().forEach(function(sender) {
                    rtcp || "video" !== sender.track.kind || (rtcp = sender)
                }), rtcp && rtcp.getParameters) {
                var parameters = rtcp.getParameters();
                parameters.encodings[1] && (parameters.encodings[1].active = !!enable), parameters.encodings[2] && (parameters.encodings[2].active = !!enable), rtcp.setParameters(parameters)
            }
        }, config.remoteSdp && (config.remoteSdp.remotePeerSdpConstraints && (sdpConstraints = config.remoteSdp.remotePeerSdpConstraints), defaults.sdpConstraints = setSdpConstraints(sdpConstraints), this.addRemoteSdp(config.remoteSdp, function() {
            createOfferOrAnswer("createAnswer")
        })), "two-way" != connection.session.audio && "two-way" != connection.session.video && "two-way" != connection.session.screen || (defaults.sdpConstraints = setSdpConstraints({
            OfferToReceiveAudio: "two-way" == connection.session.audio || config.remoteSdp && config.remoteSdp.remotePeerSdpConstraints && config.remoteSdp.remotePeerSdpConstraints.OfferToReceiveAudio,
            OfferToReceiveVideo: "two-way" == connection.session.video || "two-way" == connection.session.screen || config.remoteSdp && config.remoteSdp.remotePeerSdpConstraints && config.remoteSdp.remotePeerSdpConstraints.OfferToReceiveAudio
        }));
        var streamsToShare = {};
        peer.getLocalStreams().forEach(function(stream) {
            streamsToShare[stream.streamid] = {
                isAudio: !!stream.isAudio,
                isVideo: !!stream.isVideo,
                isScreen: !!stream.isScreen
            }
        }), isOfferer && createOfferOrAnswer("createOffer"), peer.nativeClose = peer.close, peer.close = function() {
            if (peer) {
                try {
                    peer.nativeClose !== peer.close && peer.nativeClose()
                } catch (e) {}
                peer = null, self.peer = null
            }
        }, this.peer = peer
    }

    function setStreamType(constraints, stream) {
        constraints.mandatory && constraints.mandatory.chromeMediaSource ? stream.isScreen = !0 : constraints.mozMediaSource || constraints.mediaSource ? stream.isScreen = !0 : constraints.video ? stream.isVideo = !0 : constraints.audio && (stream.isAudio = !0)
    }

    function getUserMediaHandler(options) {
        function streaming(stream, returnBack) {
            setStreamType(options.localMediaConstraints, stream);
            var streamEndedEvent = "ended";
            "oninactive" in stream && (streamEndedEvent = "inactive"), stream.addEventListener(streamEndedEvent, function() {
                delete currentUserMediaRequest.streams[idInstance], currentUserMediaRequest.mutex = !1, currentUserMediaRequest.queueRequests.indexOf(options) && (delete currentUserMediaRequest.queueRequests[currentUserMediaRequest.queueRequests.indexOf(options)], currentUserMediaRequest.queueRequests = removeNullEntries(currentUserMediaRequest.queueRequests))
            }, !1), currentUserMediaRequest.streams[idInstance] = {
                stream: stream
            }, currentUserMediaRequest.mutex = !1, currentUserMediaRequest.queueRequests.length && getUserMediaHandler(currentUserMediaRequest.queueRequests.shift()), options.onGettingLocalMedia(stream, returnBack)
        }
        if (currentUserMediaRequest.mutex === !0) return void currentUserMediaRequest.queueRequests.push(options);
        currentUserMediaRequest.mutex = !0;
        var idInstance = JSON.stringify(options.localMediaConstraints);
        if (currentUserMediaRequest.streams[idInstance]) streaming(currentUserMediaRequest.streams[idInstance].stream, !0);
        else {
            var isBlackBerry = !!/BB10|BlackBerry/i.test(navigator.userAgent || "");
            if (isBlackBerry || "undefined" == typeof navigator.mediaDevices || "function" != typeof navigator.mediaDevices.getUserMedia) return navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia, void navigator.getUserMedia(options.localMediaConstraints, function(stream) {
                stream.streamid = stream.streamid || stream.id || getRandomString(), stream.idInstance = idInstance, streaming(stream)
            }, function(error) {
                options.onLocalMediaError(error, options.localMediaConstraints)
            });
            if ("undefined" == typeof navigator.mediaDevices) {
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                var getUserMediaStream, getUserMediaError, getUserMediaSuccess = function() {},
                    getUserMediaFailure = function() {};
                navigator.mediaDevices = {
                    getUserMedia: function(hints) {
                        return navigator.getUserMedia(hints, function(getUserMediaSuccess) {
                            getUserMediaSuccess(stream), getUserMediaStream = stream
                        }, function(error) {
                            getUserMediaFailure(error), getUserMediaError = error
                        }), {
                            then: function(successCB) {
                                return getUserMediaStream ? void successCB(getUserMediaStream) : (getUserMediaSuccess = successCB, {
                                    then: function(failureCB) {
                                        return getUserMediaError ? void failureCB(getUserMediaError) : void(getUserMediaFailure = failureCB)
                                    }
                                })
                            }
                        }
                    }
                }
            }
            if (options.localMediaConstraints.isScreen === !0) {
                if (navigator.mediaDevices.getDisplayMedia) navigator.mediaDevices.getDisplayMedia(options.localMediaConstraints).then(function(stream) {
                    stream.streamid = stream.streamid || stream.id || getRandomString(), stream.idInstance = idInstance, streaming(stream)
                })["catch"](function(error) {
                    options.onLocalMediaError(error, options.localMediaConstraints)
                });
                else {
                    if (!navigator.getDisplayMedia) throw new Error("getDisplayMedia API is not availabe in this browser.");
                    navigator.getDisplayMedia(options.localMediaConstraints).then(function(stream) {
                        stream.streamid = stream.streamid || stream.id || getRandomString(), stream.idInstance = idInstance, streaming(stream)
                    })["catch"](function(error) {
                        options.onLocalMediaError(error, options.localMediaConstraints)
                    })
                }
                return
            }
            navigator.mediaDevices.getUserMedia(options.localMediaConstraints).then(function(stream) {
                stream.streamid = stream.streamid || stream.id || getRandomString(), stream.idInstance = idInstance, streaming(stream)
            })["catch"](function(error) {
                options.onLocalMediaError(error, options.localMediaConstraints)
            })
        }
    }

    function TextReceiver(connection) {
        function receive(data, userid, extra) {
            var uuid = data.uuid;
            if (content[uuid] || (content[uuid] = []), content[uuid].push(data.message), data.last) {
                var message = content[uuid].join("");
                data.isobject && (message = JSON.parse(message));
                var receivingTime = (new Date).getTime(),
                    latency = receivingTime - data.sendingTime,
                    e = {
                        data: message,
                        userid: userid,
                        extra: extra,
                        latency: latency
                    };
                connection.autoTranslateText ? (e.original = e.data, connection.Translator.TranslateText(e.data, function(translatedText) {
                    e.data = translatedText, connection.onmessage(e)
                })) : connection.onmessage(e), delete content[uuid]
            }
        }
        var content = {};
        return {
            receive: receive
        }
    }
    var browserFakeUserAgent = "Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45";
    ! function(that) {
        that && "undefined" == typeof window && "undefined" != typeof global && (global.navigator = {
            userAgent: browserFakeUserAgent,
            getUserMedia: function() {}
        }, global.console || (global.console = {}), "undefined" == typeof global.console.debug && (global.console.debug = global.console.info = global.console.error = global.console.log = global.console.log || function() {
            console.log(arguments)
        }), "undefined" == typeof document && (that.document = {}, document.createElement = document.captureStream = document.mozCaptureStream = function() {
            var obj = {
                getContext: function() {
                    return obj
                },
                play: function() {},
                pause: function() {},
                drawImage: function() {},
                toDataURL: function() {
                    return ""
                }
            };
            return obj
        }, document.addEventListener = document.removeEventListener = that.addEventListener = that.removeEventListener = function() {}, that.HTMLVideoElement = that.HTMLMediaElement = function() {}), "undefined" == typeof io && (that.io = function() {
            return {
                on: function(eventName, callback) {
                    callback = callback || function() {}, "connect" === eventName && callback()
                },
                emit: function(eventName, data, callback) {
                    callback = callback || function() {}, "open-room" !== eventName && "join-room" !== eventName || callback(!0, data.sessionid, null)
                }
            }
        }), "undefined" == typeof location && (that.location = {
            protocol: "file:",
            href: "",
            hash: "",
            origin: "self"
        }), "undefined" == typeof screen && (that.screen = {
            width: 0,
            height: 0
        }), "undefined" == typeof URL && (that.URL = {
            createObjectURL: function() {
                return ""
            },
            revokeObjectURL: function() {
                return ""
            }
        }), that.window = global)
    }("undefined" != typeof global ? global : null),
    function() {
        function getBrowserInfo() {
            var nameOffset, verOffset, ix, nAgt = (navigator.appVersion, navigator.userAgent),
                browserName = navigator.appName,
                fullVersion = "" + parseFloat(navigator.appVersion),
                majorVersion = parseInt(navigator.appVersion, 10);
            if (isSafari && !isChrome && nAgt.indexOf("CriOS") !== -1 && (isSafari = !1, isChrome = !0), isOpera) {
                browserName = "Opera";
                try {
                    fullVersion = navigator.userAgent.split("OPR/")[1].split(" ")[0], majorVersion = fullVersion.split(".")[0]
                } catch (e) {
                    fullVersion = "0.0.0.0", majorVersion = 0
                }
            } else isIE ? (verOffset = nAgt.indexOf("rv:"), verOffset > 0 ? fullVersion = nAgt.substring(verOffset + 3) : (verOffset = nAgt.indexOf("MSIE"), fullVersion = nAgt.substring(verOffset + 5)), browserName = "IE") : isChrome ? (verOffset = nAgt.indexOf("Chrome"), browserName = "Chrome", fullVersion = nAgt.substring(verOffset + 7)) : isSafari ? (verOffset = nAgt.indexOf("Safari"), browserName = "Safari", fullVersion = nAgt.substring(verOffset + 7), (verOffset = nAgt.indexOf("Version")) !== -1 && (fullVersion = nAgt.substring(verOffset + 8)), navigator.userAgent.indexOf("Version/") !== -1 && (fullVersion = navigator.userAgent.split("Version/")[1].split(" ")[0])) : isFirefox ? (verOffset = nAgt.indexOf("Firefox"), browserName = "Firefox", fullVersion = nAgt.substring(verOffset + 8)) : (nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/")) && (browserName = nAgt.substring(nameOffset, verOffset), fullVersion = nAgt.substring(verOffset + 1), browserName.toLowerCase() === browserName.toUpperCase() && (browserName = navigator.appName));
            return isEdge && (browserName = "Edge", fullVersion = navigator.userAgent.split("Edge/")[1]), (ix = fullVersion.search(/[; \)]/)) !== -1 && (fullVersion = fullVersion.substring(0, ix)), majorVersion = parseInt("" + fullVersion, 10), isNaN(majorVersion) && (fullVersion = "" + parseFloat(navigator.appVersion), majorVersion = parseInt(navigator.appVersion, 10)), {
                fullVersion: fullVersion,
                version: majorVersion,
                name: browserName,
                isPrivateBrowsing: !1
            }
        }

        function retry(isDone, next) {
            var currentTrial = 0,
                maxRetry = 50,
                isTimeout = !1,
                id = window.setInterval(function() {
                    isDone() && (window.clearInterval(id), next(isTimeout)), currentTrial++ > maxRetry && (window.clearInterval(id), isTimeout = !0, next(isTimeout))
                }, 10)
        }

        function isIE10OrLater(userAgent) {
            var ua = userAgent.toLowerCase();
            if (0 === ua.indexOf("msie") && 0 === ua.indexOf("trident")) return !1;
            var match = /(?:msie|rv:)\s?([\d\.]+)/.exec(ua);
            return !!(match && parseInt(match[1], 10) >= 10)
        }

        function detectPrivateMode(callback) {
            var isPrivate;
            try {
                if (window.webkitRequestFileSystem) window.webkitRequestFileSystem(window.TEMPORARY, 1, function() {
                    isPrivate = !1
                }, function(e) {
                    isPrivate = !0
                });
                else if (window.indexedDB && /Firefox/.test(window.navigator.userAgent)) {
                    var db;
                    try {
                        db = window.indexedDB.open("test"), db.onerror = function() {
                            return !0
                        }
                    } catch (e) {
                        isPrivate = !0
                    }
                    "undefined" == typeof isPrivate && retry(function() {
                        return "done" === db.readyState
                    }, function(isTimeout) {
                        isTimeout || (isPrivate = !db.result)
                    })
                } else if (isIE10OrLater(window.navigator.userAgent)) {
                    isPrivate = !1;
                    try {
                        window.indexedDB || (isPrivate = !0)
                    } catch (e) {
                        isPrivate = !0
                    }
                } else if (window.localStorage && /Safari/.test(window.navigator.userAgent)) {
                    try {
                        window.localStorage.setItem("test", 1)
                    } catch (e) {
                        isPrivate = !0
                    }
                    "undefined" == typeof isPrivate && (isPrivate = !1, window.localStorage.removeItem("test"))
                }
            } catch (e) {
                isPrivate = !1
            }
            retry(function() {
                return "undefined" != typeof isPrivate
            }, function(isTimeout) {
                callback(isPrivate)
            })
        }

        function detectDesktopOS() {
            for (var cs, unknown = "-", nVer = navigator.appVersion, nAgt = navigator.userAgent, os = unknown, clientStrings = [{
                    s: "Windows 10",
                    r: /(Windows 10.0|Windows NT 10.0)/
                }, {
                    s: "Windows 8.1",
                    r: /(Windows 8.1|Windows NT 6.3)/
                }, {
                    s: "Windows 8",
                    r: /(Windows 8|Windows NT 6.2)/
                }, {
                    s: "Windows 7",
                    r: /(Windows 7|Windows NT 6.1)/
                }, {
                    s: "Windows Vista",
                    r: /Windows NT 6.0/
                }, {
                    s: "Windows Server 2003",
                    r: /Windows NT 5.2/
                }, {
                    s: "Windows XP",
                    r: /(Windows NT 5.1|Windows XP)/
                }, {
                    s: "Windows 2000",
                    r: /(Windows NT 5.0|Windows 2000)/
                }, {
                    s: "Windows ME",
                    r: /(Win 9x 4.90|Windows ME)/
                }, {
                    s: "Windows 98",
                    r: /(Windows 98|Win98)/
                }, {
                    s: "Windows 95",
                    r: /(Windows 95|Win95|Windows_95)/
                }, {
                    s: "Windows NT 4.0",
                    r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
                }, {
                    s: "Windows CE",
                    r: /Windows CE/
                }, {
                    s: "Windows 3.11",
                    r: /Win16/
                }, {
                    s: "Android",
                    r: /Android/
                }, {
                    s: "Open BSD",
                    r: /OpenBSD/
                }, {
                    s: "Sun OS",
                    r: /SunOS/
                }, {
                    s: "Linux",
                    r: /(Linux|X11)/
                }, {
                    s: "iOS",
                    r: /(iPhone|iPad|iPod)/
                }, {
                    s: "Mac OS X",
                    r: /Mac OS X/
                }, {
                    s: "Mac OS",
                    r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
                }, {
                    s: "QNX",
                    r: /QNX/
                }, {
                    s: "UNIX",
                    r: /UNIX/
                }, {
                    s: "BeOS",
                    r: /BeOS/
                }, {
                    s: "OS/2",
                    r: /OS\/2/
                }, {
                    s: "Search Bot",
                    r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
                }], i = 0; cs = clientStrings[i]; i++)
                if (cs.r.test(nAgt)) {
                    os = cs.s;
                    break
                } var osVersion = unknown;
            switch (/Windows/.test(os) && (/Windows (.*)/.test(os) && (osVersion = /Windows (.*)/.exec(os)[1]), os = "Windows"), os) {
                case "Mac OS X":
                    /Mac OS X (10[\.\_\d]+)/.test(nAgt) && (osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1]);
                    break;
                case "Android":
                    /Android ([\.\_\d]+)/.test(nAgt) && (osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1]);
                    break;
                case "iOS":
                    /OS (\d+)_(\d+)_?(\d+)?/.test(nAgt) && (osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer), osVersion = osVersion[1] + "." + osVersion[2] + "." + (0 | osVersion[3]))
            }
            return {
                osName: os,
                osVersion: osVersion
            }
        }

        function getAndroidVersion(ua) {
            ua = (ua || navigator.userAgent).toLowerCase();
            var match = ua.match(/android\s([0-9\.]*)/);
            return !!match && match[1]
        }

        function DetectLocalIPAddress(callback, stream) {
            if (DetectRTC.isWebRTCSupported) {
                var isPublic = !0,
                    isIpv4 = !0;
                getIPs(function(ip) {
                    ip ? ip.match(regexIpv4Local) ? (isPublic = !1, callback("Local: " + ip, isPublic, isIpv4)) : ip.match(regexIpv6) ? (isIpv4 = !1, callback("Public: " + ip, isPublic, isIpv4)) : callback("Public: " + ip, isPublic, isIpv4) : callback()
                }, stream)
            }
        }

        function getIPs(callback, stream) {
            function handleCandidate(candidate) {
                if (!candidate) return void callback();
                var match = regexIpv4.exec(candidate);
                if (match) {
                    var ipAddress = match[1],
                        isPublic = candidate.match(regexIpv4Local),
                        isIpv4 = !0;
                    void 0 === ipDuplicates[ipAddress] && callback(ipAddress, isPublic, isIpv4), ipDuplicates[ipAddress] = !0
                }
            }

            function afterCreateOffer() {
                var lines = pc.localDescription.sdp.split("\n");
                lines.forEach(function(line) {
                    line && 0 === line.indexOf("a=candidate:") && handleCandidate(line)
                })
            }
            if ("undefined" != typeof document && "function" == typeof document.getElementById) {
                var ipDuplicates = {},
                    RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
                if (!RTCPeerConnection) {
                    var iframe = document.getElementById("iframe");
                    if (!iframe) return;
                    var win = iframe.contentWindow;
                    RTCPeerConnection = win.RTCPeerConnection || win.mozRTCPeerConnection || win.webkitRTCPeerConnection
                }
                if (RTCPeerConnection) {
                    var peerConfig = null;
                    "Chrome" === DetectRTC.browser && DetectRTC.browser.version < 58 && (peerConfig = {
                        optional: [{
                            RtpDataChannels: !0
                        }]
                    });
                    var servers = {
                            iceServers: [{
                                urls: "stun:stun.l.google.com:19302"
                            }]
                        },
                        pc = new RTCPeerConnection(servers, peerConfig);
                    if (stream && (pc.addStream ? pc.addStream(stream) : pc.addTrack && stream.getTracks()[0] && pc.addTrack(stream.getTracks()[0], stream)), pc.onicecandidate = function(event) {
                            event.candidate && event.candidate.candidate ? handleCandidate(event.candidate.candidate) : handleCandidate()
                        }, !stream) try {
                        pc.createDataChannel("sctp", {})
                    } catch (e) {}
                    DetectRTC.isPromisesSupported ? pc.createOffer().then(function(result) {
                        pc.setLocalDescription(result).then(afterCreateOffer)
                    }) : pc.createOffer(function(result) {
                        pc.setLocalDescription(result, afterCreateOffer, function() {})
                    }, function() {})
                }
            }
        }

        function checkDeviceSupport(callback) {
            if (!canEnumerate) return void(callback && callback());
            if (!navigator.enumerateDevices && window.MediaStreamTrack && window.MediaStreamTrack.getSources && (navigator.enumerateDevices = window.MediaStreamTrack.getSources.bind(window.MediaStreamTrack)), !navigator.enumerateDevices && navigator.enumerateDevices && (navigator.enumerateDevices = navigator.enumerateDevices.bind(navigator)), !navigator.enumerateDevices) return void(callback && callback());
            MediaDevices = [], audioInputDevices = [], audioOutputDevices = [], videoInputDevices = [], hasMicrophone = !1, hasSpeakers = !1, hasWebcam = !1, isWebsiteHasMicrophonePermissions = !1, isWebsiteHasWebcamPermissions = !1;
            var alreadyUsedDevices = {};
            navigator.enumerateDevices(function(devices) {
                devices.forEach(function(_device) {
                    var device = {};
                    for (var d in _device) try {
                        "function" != typeof _device[d] && (device[d] = _device[d])
                    } catch (e) {}
                    alreadyUsedDevices[device.deviceId + device.label + device.kind] || ("audio" === device.kind && (device.kind = "audioinput"), "video" === device.kind && (device.kind = "videoinput"), device.deviceId || (device.deviceId = device.id), device.id || (device.id = device.deviceId), device.label ? ("videoinput" !== device.kind || isWebsiteHasWebcamPermissions || (isWebsiteHasWebcamPermissions = !0), "audioinput" !== device.kind || isWebsiteHasMicrophonePermissions || (isWebsiteHasMicrophonePermissions = !0)) : (device.isCustomLabel = !0, "videoinput" === device.kind ? device.label = "Camera " + (videoInputDevices.length + 1) : "audioinput" === device.kind ? device.label = "Microphone " + (audioInputDevices.length + 1) : "audiooutput" === device.kind ? device.label = "Speaker " + (audioOutputDevices.length + 1) : device.label = "Please invoke getUserMedia once.", "undefined" != typeof DetectRTC && DetectRTC.browser.isChrome && DetectRTC.browser.version >= 46 && !/^(https:|chrome-extension:)$/g.test(location.protocol || "") && "undefined" != typeof document && "string" == typeof document.domain && document.domain.search && document.domain.search(/localhost|127.0./g) === -1 && (device.label = "HTTPs is required to get label of this " + device.kind + " device.")), "audioinput" === device.kind && (hasMicrophone = !0, audioInputDevices.indexOf(device) === -1 && audioInputDevices.push(device)), "audiooutput" === device.kind && (hasSpeakers = !0, audioOutputDevices.indexOf(device) === -1 && audioOutputDevices.push(device)), "videoinput" === device.kind && (hasWebcam = !0, videoInputDevices.indexOf(device) === -1 && videoInputDevices.push(device)), MediaDevices.push(device), alreadyUsedDevices[device.deviceId + device.label + device.kind] = device)
                }), "undefined" != typeof DetectRTC && (DetectRTC.MediaDevices = MediaDevices, DetectRTC.hasMicrophone = hasMicrophone, DetectRTC.hasSpeakers = hasSpeakers, DetectRTC.hasWebcam = hasWebcam, DetectRTC.isWebsiteHasWebcamPermissions = isWebsiteHasWebcamPermissions, DetectRTC.isWebsiteHasMicrophonePermissions = isWebsiteHasMicrophonePermissions, DetectRTC.audioInputDevices = audioInputDevices, DetectRTC.audioOutputDevices = audioOutputDevices, DetectRTC.videoInputDevices = videoInputDevices), callback && callback()
            })
        }

        function getAspectRatio(w, h) {
            function gcd(a, b) {
                return 0 == b ? a : gcd(b, a % b)
            }
            var r = gcd(w, h);
            return w / r / (h / r)
        }
        var browserFakeUserAgent = "Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45",
            isNodejs = "object" == typeof process && "object" == typeof process.versions && process.versions.node && !process.browser;
        if (isNodejs) {
            var version = process.versions.node.toString().replace("v", "");
            browserFakeUserAgent = "Nodejs/" + version + " (NodeOS) AppleWebKit/" + version + " (KHTML, like Gecko) Nodejs/" + version + " Nodejs/" + version
        }! function(that) {
            "undefined" == typeof window && ("undefined" == typeof window && "undefined" != typeof global ? (global.navigator = {
                userAgent: browserFakeUserAgent,
                getUserMedia: function() {}
            }, that.window = global) : "undefined" == typeof window, "undefined" == typeof location && (that.location = {
                protocol: "file:",
                href: "",
                hash: ""
            }), "undefined" == typeof screen && (that.screen = {
                width: 0,
                height: 0
            }))
        }("undefined" != typeof global ? global : window);
        var navigator = window.navigator;
        "undefined" != typeof navigator ? ("undefined" != typeof navigator.webkitGetUserMedia && (navigator.getUserMedia = navigator.webkitGetUserMedia), "undefined" != typeof navigator.mozGetUserMedia && (navigator.getUserMedia = navigator.mozGetUserMedia)) : navigator = {
            getUserMedia: function() {},
            userAgent: browserFakeUserAgent
        };
        var isMobileDevice = !!/Android|webOS|iPhone|iPad|iPod|BB10|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(navigator.userAgent || ""),
            isEdge = !(navigator.userAgent.indexOf("Edge") === -1 || !navigator.msSaveOrOpenBlob && !navigator.msSaveBlob),
            isOpera = !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0,
            isFirefox = "undefined" != typeof window.InstallTrigger,
            isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
            isChrome = !!window.chrome && !isOpera,
            isIE = "undefined" != typeof document && !!document.documentMode && !isEdge,
            isMobile = {
                Android: function() {
                    return navigator.userAgent.match(/Android/i)
                },
                BlackBerry: function() {
                    return navigator.userAgent.match(/BlackBerry|BB10/i)
                },
                iOS: function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i)
                },
                Opera: function() {
                    return navigator.userAgent.match(/Opera Mini/i)
                },
                Windows: function() {
                    return navigator.userAgent.match(/IEMobile/i)
                },
                any: function() {
                    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()
                },
                getOsName: function() {
                    var osName = "Unknown OS";
                    return isMobile.Android() && (osName = "Android"), isMobile.BlackBerry() && (osName = "BlackBerry"), isMobile.iOS() && (osName = "iOS"), isMobile.Opera() && (osName = "Opera Mini"), isMobile.Windows() && (osName = "Windows"), osName
                }
            },
            osName = "Unknown OS",
            osVersion = "Unknown OS Version",
            osInfo = detectDesktopOS();
        osInfo && osInfo.osName && "-" != osInfo.osName ? (osName = osInfo.osName, osVersion = osInfo.osVersion) : isMobile.any() && (osName = isMobile.getOsName(), "Android" == osName && (osVersion = getAndroidVersion()));
        var isNodejs = "object" == typeof process && "object" == typeof process.versions && process.versions.node;
        "Unknown OS" === osName && isNodejs && (osName = "Nodejs", osVersion = process.versions.node.toString().replace("v", ""));
        var isCanvasSupportsStreamCapturing = !1,
            isVideoSupportsStreamCapturing = !1;
        ["captureStream", "mozCaptureStream", "webkitCaptureStream"].forEach(function(item) {
            "undefined" != typeof document && "function" == typeof document.createElement && (!isCanvasSupportsStreamCapturing && item in document.createElement("canvas") && (isCanvasSupportsStreamCapturing = !0), !isVideoSupportsStreamCapturing && item in document.createElement("video") && (isVideoSupportsStreamCapturing = !0))
        });
        var regexIpv4Local = /^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/,
            regexIpv4 = /([0-9]{1,3}(\.[0-9]{1,3}){3})/,
            regexIpv6 = /[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7}/,
            MediaDevices = [],
            audioInputDevices = [],
            audioOutputDevices = [],
            videoInputDevices = [];
        navigator.mediaDevices && navigator.mediaDevices.enumerateDevices && (navigator.enumerateDevices = function(callback) {
            var enumerateDevices = navigator.mediaDevices.enumerateDevices();
            enumerateDevices && enumerateDevices.then ? navigator.mediaDevices.enumerateDevices().then(callback)["catch"](function() {
                callback([])
            }) : callback([])
        });
        var canEnumerate = !1;
        "undefined" != typeof MediaStreamTrack && "getSources" in MediaStreamTrack ? canEnumerate = !0 : navigator.mediaDevices && navigator.mediaDevices.enumerateDevices && (canEnumerate = !0);
        var hasMicrophone = !1,
            hasSpeakers = !1,
            hasWebcam = !1,
            isWebsiteHasMicrophonePermissions = !1,
            isWebsiteHasWebcamPermissions = !1,
            DetectRTC = window.DetectRTC || {};
        DetectRTC.browser = getBrowserInfo(), detectPrivateMode(function(isPrivateBrowsing) {
            DetectRTC.browser.isPrivateBrowsing = !!isPrivateBrowsing
        }), DetectRTC.browser["is" + DetectRTC.browser.name] = !0, DetectRTC.osName = osName, DetectRTC.osVersion = osVersion;
        var isWebRTCSupported = ("object" == typeof process && "object" == typeof process.versions && process.versions["node-webkit"], !1);
        ["RTCPeerConnection", "webkitRTCPeerConnection", "mozRTCPeerConnection", "RTCIceGatherer"].forEach(function(item) {
            isWebRTCSupported || item in window && (isWebRTCSupported = !0)
        }), DetectRTC.isWebRTCSupported = isWebRTCSupported, DetectRTC.isORTCSupported = "undefined" != typeof RTCIceGatherer;
        var isScreenCapturingSupported = !1;
        if (DetectRTC.browser.isChrome && DetectRTC.browser.version >= 35 ? isScreenCapturingSupported = !0 : DetectRTC.browser.isFirefox && DetectRTC.browser.version >= 34 ? isScreenCapturingSupported = !0 : DetectRTC.browser.isEdge && DetectRTC.browser.version >= 17 ? isScreenCapturingSupported = !0 : "Android" === DetectRTC.osName && DetectRTC.browser.isChrome && (isScreenCapturingSupported = !0), !/^(https:|chrome-extension:)$/g.test(location.protocol || "")) {
            var isNonLocalHost = "undefined" != typeof document && "string" == typeof document.domain && document.domain.search && document.domain.search(/localhost|127.0./g) === -1;
            isNonLocalHost && (DetectRTC.browser.isChrome || DetectRTC.browser.isEdge || DetectRTC.browser.isOpera) ? isScreenCapturingSupported = !1 : DetectRTC.browser.isFirefox && (isScreenCapturingSupported = !1)
        }
        DetectRTC.isScreenCapturingSupported = isScreenCapturingSupported;
        var webAudio = {
            isSupported: !1,
            isCreateMediaStreamSourceSupported: !1
        };
        ["AudioContext", "webkitAudioContext", "mozAudioContext", "msAudioContext"].forEach(function(item) {
            webAudio.isSupported || item in window && (webAudio.isSupported = !0, window[item] && "createMediaStreamSource" in window[item].prototype && (webAudio.isCreateMediaStreamSourceSupported = !0))
        }), DetectRTC.isAudioContextSupported = webAudio.isSupported, DetectRTC.isCreateMediaStreamSourceSupported = webAudio.isCreateMediaStreamSourceSupported;
        var isRtpDataChannelsSupported = !1;
        DetectRTC.browser.isChrome && DetectRTC.browser.version > 31 && (isRtpDataChannelsSupported = !0), DetectRTC.isRtpDataChannelsSupported = isRtpDataChannelsSupported;
        var isSCTPSupportd = !1;
        DetectRTC.browser.isFirefox && DetectRTC.browser.version > 28 ? isSCTPSupportd = !0 : DetectRTC.browser.isChrome && DetectRTC.browser.version > 25 ? isSCTPSupportd = !0 : DetectRTC.browser.isOpera && DetectRTC.browser.version >= 11 && (isSCTPSupportd = !0), DetectRTC.isSctpDataChannelsSupported = isSCTPSupportd, DetectRTC.isMobileDevice = isMobileDevice;
        var isGetUserMediaSupported = !1;
        navigator.getUserMedia ? isGetUserMediaSupported = !0 : navigator.mediaDevices && navigator.mediaDevices.getUserMedia && (isGetUserMediaSupported = !0), DetectRTC.browser.isChrome && DetectRTC.browser.version >= 46 && !/^(https:|chrome-extension:)$/g.test(location.protocol || "") && "undefined" != typeof document && "string" == typeof document.domain && document.domain.search && document.domain.search(/localhost|127.0./g) === -1 && (isGetUserMediaSupported = "Requires HTTPs"), "Nodejs" === DetectRTC.osName && (isGetUserMediaSupported = !1), DetectRTC.isGetUserMediaSupported = isGetUserMediaSupported;
        var displayResolution = "";
        if (screen.width) {
            var width = screen.width ? screen.width : "",
                height = screen.height ? screen.height : "";
            displayResolution += "" + width + " x " + height
        }
        DetectRTC.displayResolution = displayResolution, DetectRTC.displayAspectRatio = getAspectRatio(screen.width, screen.height).toFixed(2), DetectRTC.isCanvasSupportsStreamCapturing = isCanvasSupportsStreamCapturing, DetectRTC.isVideoSupportsStreamCapturing = isVideoSupportsStreamCapturing, "Chrome" == DetectRTC.browser.name && DetectRTC.browser.version >= 53 && (DetectRTC.isCanvasSupportsStreamCapturing || (DetectRTC.isCanvasSupportsStreamCapturing = "Requires chrome flag: enable-experimental-web-platform-features"), DetectRTC.isVideoSupportsStreamCapturing || (DetectRTC.isVideoSupportsStreamCapturing = "Requires chrome flag: enable-experimental-web-platform-features")), DetectRTC.DetectLocalIPAddress = DetectLocalIPAddress, DetectRTC.isWebSocketsSupported = "WebSocket" in window && 2 === window.WebSocket.CLOSING, DetectRTC.isWebSocketsBlocked = !DetectRTC.isWebSocketsSupported, "Nodejs" === DetectRTC.osName && (DetectRTC.isWebSocketsSupported = !0, DetectRTC.isWebSocketsBlocked = !1), DetectRTC.checkWebSocketsSupport = function(callback) {
            callback = callback || function() {};
            try {
                var starttime, websocket = new WebSocket("wss://echo.websocket.org:443/");
                websocket.onopen = function() {
                    DetectRTC.isWebSocketsBlocked = !1, starttime = (new Date).getTime(), websocket.send("ping")
                }, websocket.onmessage = function() {
                    DetectRTC.WebsocketLatency = (new Date).getTime() - starttime + "ms", callback(), websocket.close(), websocket = null
                }, websocket.onerror = function() {
                    DetectRTC.isWebSocketsBlocked = !0, callback()
                }
            } catch (e) {
                DetectRTC.isWebSocketsBlocked = !0, callback()
            }
        }, DetectRTC.load = function(callback) {
            callback = callback || function() {}, checkDeviceSupport(callback)
        }, "undefined" != typeof MediaDevices ? DetectRTC.MediaDevices = MediaDevices : DetectRTC.MediaDevices = [], DetectRTC.hasMicrophone = hasMicrophone, DetectRTC.hasSpeakers = hasSpeakers, DetectRTC.hasWebcam = hasWebcam, DetectRTC.isWebsiteHasWebcamPermissions = isWebsiteHasWebcamPermissions, DetectRTC.isWebsiteHasMicrophonePermissions = isWebsiteHasMicrophonePermissions, DetectRTC.audioInputDevices = audioInputDevices, DetectRTC.audioOutputDevices = audioOutputDevices, DetectRTC.videoInputDevices = videoInputDevices;
        var isSetSinkIdSupported = !1;
        "undefined" != typeof document && "function" == typeof document.createElement && "setSinkId" in document.createElement("video") && (isSetSinkIdSupported = !0), DetectRTC.isSetSinkIdSupported = isSetSinkIdSupported;
        var isRTPSenderReplaceTracksSupported = !1;
        DetectRTC.browser.isFirefox && "undefined" != typeof mozRTCPeerConnection ? "getSenders" in mozRTCPeerConnection.prototype && (isRTPSenderReplaceTracksSupported = !0) : DetectRTC.browser.isChrome && "undefined" != typeof webkitRTCPeerConnection && "getSenders" in webkitRTCPeerConnection.prototype && (isRTPSenderReplaceTracksSupported = !0), DetectRTC.isRTPSenderReplaceTracksSupported = isRTPSenderReplaceTracksSupported;
        var isRemoteStreamProcessingSupported = !1;
        DetectRTC.browser.isFirefox && DetectRTC.browser.version > 38 && (isRemoteStreamProcessingSupported = !0), DetectRTC.isRemoteStreamProcessingSupported = isRemoteStreamProcessingSupported;
        var isApplyConstraintsSupported = !1;
        "undefined" != typeof MediaStreamTrack && "applyConstraints" in MediaStreamTrack.prototype && (isApplyConstraintsSupported = !0), DetectRTC.isApplyConstraintsSupported = isApplyConstraintsSupported;
        var isMultiMonitorScreenCapturingSupported = !1;
        DetectRTC.browser.isFirefox && DetectRTC.browser.version >= 43 && (isMultiMonitorScreenCapturingSupported = !0), DetectRTC.isMultiMonitorScreenCapturingSupported = isMultiMonitorScreenCapturingSupported, DetectRTC.isPromisesSupported = !!("Promise" in window), DetectRTC.version = "1.3.9", "undefined" == typeof DetectRTC && (window.DetectRTC = {});
        var MediaStream = window.MediaStream;
        "undefined" == typeof MediaStream && "undefined" != typeof webkitMediaStream && (MediaStream = webkitMediaStream), "undefined" != typeof MediaStream && "function" == typeof MediaStream ? DetectRTC.MediaStream = Object.keys(MediaStream.prototype) : DetectRTC.MediaStream = !1, "undefined" != typeof MediaStreamTrack ? DetectRTC.MediaStreamTrack = Object.keys(MediaStreamTrack.prototype) : DetectRTC.MediaStreamTrack = !1;
        var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        "undefined" != typeof RTCPeerConnection ? DetectRTC.RTCPeerConnection = Object.keys(RTCPeerConnection.prototype) : DetectRTC.RTCPeerConnection = !1, window.DetectRTC = DetectRTC, "undefined" != typeof module && (module.exports = DetectRTC), "function" == typeof define && define.amd && define("DetectRTC", [], function() {
            return DetectRTC
        })
    }(), "undefined" != typeof cordova && (DetectRTC.isMobileDevice = !0, DetectRTC.browser.name = "Chrome"), navigator && navigator.userAgent && navigator.userAgent.indexOf("Crosswalk") !== -1 && (DetectRTC.isMobileDevice = !0, DetectRTC.browser.name = "Chrome"), window.addEventListener || (window.addEventListener = function(el, eventName, eventHandler) {
        el.attachEvent && el.attachEvent("on" + eventName, eventHandler)
    }), window.attachEventListener = function(video, type, listener, useCapture) {
        video.addEventListener(type, listener, useCapture)
    };
    var MediaStream = window.MediaStream;
    "undefined" == typeof MediaStream && "undefined" != typeof webkitMediaStream && (MediaStream = webkitMediaStream), "undefined" != typeof MediaStream && ("stop" in MediaStream.prototype || (MediaStream.prototype.stop = function() {
        this.getTracks().forEach(function(track) {
            track.stop()
        })
    })), window.iOSDefaultAudioOutputDevice = window.iOSDefaultAudioOutputDevice || "speaker", document.addEventListener("deviceready", setCordovaAPIs, !1), setCordovaAPIs();
    var RTCPeerConnection, defaults = {};
    "undefined" != typeof window.RTCPeerConnection ? RTCPeerConnection = window.RTCPeerConnection : "undefined" != typeof mozRTCPeerConnection ? RTCPeerConnection = mozRTCPeerConnection : "undefined" != typeof webkitRTCPeerConnection && (RTCPeerConnection = webkitRTCPeerConnection);
    var RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription,
        RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate,
        MediaStreamTrack = window.MediaStreamTrack,
        CodecsHandler = function() {
            function preferCodec(sdp, codecName) {
                var info = splitLines(sdp);
                return info.videoCodecNumbers ? "vp8" === codecName && info.vp8LineNumber === info.videoCodecNumbers[0] ? sdp : "vp9" === codecName && info.vp9LineNumber === info.videoCodecNumbers[0] ? sdp : "h264" === codecName && info.h264LineNumber === info.videoCodecNumbers[0] ? sdp : sdp = preferCodecHelper(sdp, codecName, info) : sdp
            }

            function preferCodecHelper(sdp, codec, info, ignore) {
                var preferCodecNumber = "";
                if ("vp8" === codec) {
                    if (!info.vp8LineNumber) return sdp;
                    preferCodecNumber = info.vp8LineNumber
                }
                if ("vp9" === codec) {
                    if (!info.vp9LineNumber) return sdp;
                    preferCodecNumber = info.vp9LineNumber
                }
                if ("h264" === codec) {
                    if (!info.h264LineNumber) return sdp;
                    preferCodecNumber = info.h264LineNumber
                }
                var newLine = info.videoCodecNumbersOriginal.split("SAVPF")[0] + "SAVPF ",
                    newOrder = [preferCodecNumber];
                return ignore && (newOrder = []), info.videoCodecNumbers.forEach(function(codecNumber) {
                    codecNumber !== preferCodecNumber && newOrder.push(codecNumber)
                }), newLine += newOrder.join(" "), sdp = sdp.replace(info.videoCodecNumbersOriginal, newLine)
            }

            function splitLines(sdp) {
                var info = {};
                return sdp.split("\n").forEach(function(line) {
                    0 === line.indexOf("m=video") && (info.videoCodecNumbers = [], line.split("SAVPF")[1].split(" ").forEach(function(codecNumber) {
                        codecNumber = codecNumber.trim(), codecNumber && codecNumber.length && (info.videoCodecNumbers.push(codecNumber), info.videoCodecNumbersOriginal = line)
                    })), line.indexOf("VP8/90000") === -1 || info.vp8LineNumber || (info.vp8LineNumber = line.replace("a=rtpmap:", "").split(" ")[0]), line.indexOf("VP9/90000") === -1 || info.vp9LineNumber || (info.vp9LineNumber = line.replace("a=rtpmap:", "").split(" ")[0]), line.indexOf("H264/90000") === -1 || info.h264LineNumber || (info.h264LineNumber = line.replace("a=rtpmap:", "").split(" ")[0])
                }), info
            }

            function removeVPX(sdp) {
                var info = splitLines(sdp);
                return sdp = preferCodecHelper(sdp, "vp9", info, !0), sdp = preferCodecHelper(sdp, "vp8", info, !0)
            }

            function disableNACK(sdp) {
                if (!sdp || "string" != typeof sdp) throw "Invalid arguments.";
                return sdp = sdp.replace("a=rtcp-fb:126 nack\r\n", ""), sdp = sdp.replace("a=rtcp-fb:126 nack pli\r\n", "a=rtcp-fb:126 pli\r\n"), sdp = sdp.replace("a=rtcp-fb:97 nack\r\n", ""), sdp = sdp.replace("a=rtcp-fb:97 nack pli\r\n", "a=rtcp-fb:97 pli\r\n")
            }

            function prioritize(codecMimeType, peer) {
                if (peer && peer.getSenders && peer.getSenders().length) {
                    if (!codecMimeType || "string" != typeof codecMimeType) throw "Invalid arguments.";
                    peer.getSenders().forEach(function(sender) {
                        for (var params = sender.getParameters(), i = 0; i < params.codecs.length; i++)
                            if (params.codecs[i].mimeType == codecMimeType) {
                                params.codecs.unshift(params.codecs.splice(i, 1));
                                break
                            } sender.setParameters(params)
                    })
                }
            }

            function removeNonG722(sdp) {
                return sdp.replace(/m=audio ([0-9]+) RTP\/SAVPF ([0-9 ]*)/g, "m=audio $1 RTP/SAVPF 9")
            }

            function setBAS(sdp, bandwidth, isScreen) {
                return bandwidth ? "undefined" != typeof isFirefox && isFirefox ? sdp : (isScreen && (bandwidth.screen ? bandwidth.screen < 300 && console.warn("It seems that you are using wrong bandwidth value for screen. Screen sharing is expected to fail.") : console.warn("It seems that you are not using bandwidth for screen. Screen sharing is expected to fail.")), bandwidth.screen && isScreen && (sdp = sdp.replace(/b=AS([^\r\n]+\r\n)/g, ""), sdp = sdp.replace(/a=mid:video\r\n/g, "a=mid:video\r\nb=AS:" + bandwidth.screen + "\r\n")), (bandwidth.audio || bandwidth.video) && (sdp = sdp.replace(/b=AS([^\r\n]+\r\n)/g, "")), bandwidth.audio && (sdp = sdp.replace(/a=mid:audio\r\n/g, "a=mid:audio\r\nb=AS:" + bandwidth.audio + "\r\n")), bandwidth.screen ? sdp = sdp.replace(/a=mid:video\r\n/g, "a=mid:video\r\nb=AS:" + bandwidth.screen + "\r\n") : bandwidth.video && (sdp = sdp.replace(/a=mid:video\r\n/g, "a=mid:video\r\nb=AS:" + bandwidth.video + "\r\n")), sdp) : sdp
            }

            function findLine(sdpLines, prefix, substr) {
                return findLineInRange(sdpLines, 0, -1, prefix, substr)
            }

            function findLineInRange(sdpLines, startLine, endLine, prefix, substr) {
                for (var realEndLine = endLine !== -1 ? endLine : sdpLines.length, i = startLine; i < realEndLine; ++i)
                    if (0 === sdpLines[i].indexOf(prefix) && (!substr || sdpLines[i].toLowerCase().indexOf(substr.toLowerCase()) !== -1)) return i;
                return null
            }

            function getCodecPayloadType(sdpLine) {
                var pattern = new RegExp("a=rtpmap:(\\d+) \\w+\\/\\d+"),
                    result = sdpLine.match(pattern);
                return result && 2 === result.length ? result[1] : null
            }

            function setVideoBitrates(sdp, params) {
                params = params || {};
                var vp8Payload, xgoogle_min_bitrate = params.min,
                    xgoogle_max_bitrate = params.max,
                    sdpLines = sdp.split("\r\n"),
                    vp8Index = findLine(sdpLines, "a=rtpmap", "VP8/90000");
                if (vp8Index && (vp8Payload = getCodecPayloadType(sdpLines[vp8Index])), !vp8Payload) return sdp;
                var rtxPayload, rtxIndex = findLine(sdpLines, "a=rtpmap", "rtx/90000");
                if (rtxIndex && (rtxPayload = getCodecPayloadType(sdpLines[rtxIndex])), !rtxIndex) return sdp;
                var rtxFmtpLineIndex = findLine(sdpLines, "a=fmtp:" + rtxPayload.toString());
                if (null !== rtxFmtpLineIndex) {
                    var appendrtxNext = "\r\n";
                    appendrtxNext += "a=fmtp:" + vp8Payload + " x-google-min-bitrate=" + (xgoogle_min_bitrate || "228") + "; x-google-max-bitrate=" + (xgoogle_max_bitrate || "228"), sdpLines[rtxFmtpLineIndex] = sdpLines[rtxFmtpLineIndex].concat(appendrtxNext), sdp = sdpLines.join("\r\n")
                }
                return sdp
            }

            function setOpusAttributes(sdp, params) {
                params = params || {};
                var opusPayload, sdpLines = sdp.split("\r\n"),
                    opusIndex = findLine(sdpLines, "a=rtpmap", "opus/48000");
                if (opusIndex && (opusPayload = getCodecPayloadType(sdpLines[opusIndex])), !opusPayload) return sdp;
                var opusFmtpLineIndex = findLine(sdpLines, "a=fmtp:" + opusPayload.toString());
                if (null === opusFmtpLineIndex) return sdp;
                var appendOpusNext = "";
                return appendOpusNext += "; stereo=" + ("undefined" != typeof params.stereo ? params.stereo : "1"), appendOpusNext += "; sprop-stereo=" + ("undefined" != typeof params["sprop-stereo"] ? params["sprop-stereo"] : "1"), "undefined" != typeof params.maxaveragebitrate && (appendOpusNext += "; maxaveragebitrate=" + (params.maxaveragebitrate || 1048576)), "undefined" != typeof params.maxplaybackrate && (appendOpusNext += "; maxplaybackrate=" + (params.maxplaybackrate || 1048576)), "undefined" != typeof params.cbr && (appendOpusNext += "; cbr=" + ("undefined" != typeof params.cbr ? params.cbr : "1")), "undefined" != typeof params.useinbandfec && (appendOpusNext += "; useinbandfec=" + params.useinbandfec), "undefined" != typeof params.usedtx && (appendOpusNext += "; usedtx=" + params.usedtx), "undefined" != typeof params.maxptime && (appendOpusNext += "\r\na=maxptime:" + params.maxptime), sdpLines[opusFmtpLineIndex] = sdpLines[opusFmtpLineIndex].concat(appendOpusNext), sdp = sdpLines.join("\r\n")
            }

            function forceStereoAudio(sdp) {
                for (var sdpLines = sdp.split("\r\n"), fmtpLineIndex = null, i = 0; i < sdpLines.length; i++)
                    if (sdpLines[i].search("opus/48000") !== -1) {
                        var opusPayload = extractSdp(sdpLines[i], /:(\d+) opus\/48000/i);
                        break
                    } for (var i = 0; i < sdpLines.length; i++)
                    if (sdpLines[i].search("a=fmtp") !== -1) {
                        var payload = extractSdp(sdpLines[i], /a=fmtp:(\d+)/);
                        if (payload === opusPayload) {
                            fmtpLineIndex = i;
                            break
                        }
                    } return null === fmtpLineIndex ? sdp : (sdpLines[fmtpLineIndex] = sdpLines[fmtpLineIndex].concat("; stereo=1; sprop-stereo=1"), sdp = sdpLines.join("\r\n"))
            }
            return {
                removeVPX: removeVPX,
                disableNACK: disableNACK,
                prioritize: prioritize,
                removeNonG722: removeNonG722,
                setApplicationSpecificBandwidth: function(sdp, bandwidth, isScreen) {
                    return setBAS(sdp, bandwidth, isScreen)
                },
                setVideoBitrates: function(sdp, params) {
                    return setVideoBitrates(sdp, params)
                },
                setOpusAttributes: function(sdp, params) {
                    return setOpusAttributes(sdp, params)
                },
                preferVP9: function(sdp) {
                    return preferCodec(sdp, "vp9")
                },
                preferCodec: preferCodec,
                forceStereoAudio: forceStereoAudio
            }
        }();
    window.BandwidthHandler = CodecsHandler;
    var OnIceCandidateHandler = function() {
            function processCandidates(connection, icePair) {
                var candidate = icePair.candidate,
                    iceRestrictions = connection.candidates,
                    stun = iceRestrictions.stun,
                    turn = iceRestrictions.turn;
                if (isNull(iceRestrictions.reflexive) || (stun = iceRestrictions.reflexive), isNull(iceRestrictions.relay) || (turn = iceRestrictions.relay), (iceRestrictions.host || !candidate.match(/typ host/g)) && (turn || !candidate.match(/typ relay/g)) && (stun || !candidate.match(/typ srflx/g))) {
                    var protocol = connection.iceProtocols;
                    if ((protocol.udp || !candidate.match(/ udp /g)) && (protocol.tcp || !candidate.match(/ tcp /g))) return connection.enableLogs && console.debug("Your candidate pairs:", candidate), {
                        candidate: candidate,
                        sdpMid: icePair.sdpMid,
                        sdpMLineIndex: icePair.sdpMLineIndex
                    }
                }
            }
            return {
                processCandidates: processCandidates
            }
        }(),
        IceServersHandler = function() {
            function getIceServers(connection) {
                var iceServers = [{
                    urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302", "stun:stun.l.google.com:19302?transport=udp"]
                }];
                return iceServers
            }
            return {
                getIceServers: getIceServers
            }
        }();
    window.currentUserMediaRequest = {
        streams: [],
        mutex: !1,
        queueRequests: [],
        remove: function(idInstance) {
            this.mutex = !1;
            var stream = this.streams[idInstance];
            if (stream) {
                stream = stream.stream;
                var options = stream.currentUserMediaRequestOptions;
                this.queueRequests.indexOf(options) && (delete this.queueRequests[this.queueRequests.indexOf(options)], this.queueRequests = removeNullEntries(this.queueRequests)), this.streams[idInstance].stream = null, delete this.streams[idInstance]
            }
        }
    };
    var StreamsHandler = function() {
            function handleType(type) {
                if (type) return "string" == typeof type || "undefined" == typeof type ? type : type.audio && type.video ? null : type.audio ? "audio" : type.video ? "video" : void 0
            }

            function setHandlers(stream, syncAction, connection) {
                function graduallyIncreaseVolume() {
                    if (connection.streamEvents[stream.streamid].mediaElement) {
                        var mediaElement = connection.streamEvents[stream.streamid].mediaElement;
                        mediaElement.volume = 0, afterEach(200, 5, function() {
                            try {
                                mediaElement.volume += .2
                            } catch (e) {
                                mediaElement.volume = 1
                            }
                        })
                    }
                }
                if (stream && stream.addEventListener) {
                    if ("undefined" == typeof syncAction || 1 == syncAction) {
                        var streamEndedEvent = "ended";
                        "oninactive" in stream && (streamEndedEvent = "inactive"), stream.addEventListener(streamEndedEvent, function() {
                            StreamsHandler.onSyncNeeded(this.streamid, streamEndedEvent)
                        }, !1)
                    }
                    stream.mute = function(type, isSyncAction) {
                        type = handleType(type), "undefined" != typeof isSyncAction && (syncAction = isSyncAction), "undefined" != typeof type && "audio" != type || getTracks(stream, "audio").forEach(function(track) {
                            track.enabled = !1, connection.streamEvents[stream.streamid].isAudioMuted = !0
                        }), "undefined" != typeof type && "video" != type || getTracks(stream, "video").forEach(function(track) {
                            track.enabled = !1
                        }), "undefined" != typeof syncAction && 1 != syncAction || StreamsHandler.onSyncNeeded(stream.streamid, "mute", type), connection.streamEvents[stream.streamid].muteType = type || "both", fireEvent(stream, "mute", type)
                    }, stream.unmute = function(type, isSyncAction) {
                        type = handleType(type), "undefined" != typeof isSyncAction && (syncAction = isSyncAction), graduallyIncreaseVolume(), "undefined" != typeof type && "audio" != type || getTracks(stream, "audio").forEach(function(track) {
                            track.enabled = !0, connection.streamEvents[stream.streamid].isAudioMuted = !1
                        }), "undefined" != typeof type && "video" != type || (getTracks(stream, "video").forEach(function(track) {
                            track.enabled = !0
                        }), "undefined" != typeof type && "video" == type && connection.streamEvents[stream.streamid].isAudioMuted && ! function looper(times) {
                            times || (times = 0), times++, times < 100 && connection.streamEvents[stream.streamid].isAudioMuted && (stream.mute("audio"), setTimeout(function() {
                                looper(times)
                            }, 50))
                        }()), "undefined" != typeof syncAction && 1 != syncAction || StreamsHandler.onSyncNeeded(stream.streamid, "unmute", type), connection.streamEvents[stream.streamid].unmuteType = type || "both", fireEvent(stream, "unmute", type)
                    }
                }
            }

            function afterEach(setTimeoutInteval, numberOfTimes, callback, startedTimes) {
                startedTimes = (startedTimes || 0) + 1, startedTimes >= numberOfTimes || setTimeout(function() {
                    callback(), afterEach(setTimeoutInteval, numberOfTimes, callback, startedTimes)
                }, setTimeoutInteval)
            }
            return {
                setHandlers: setHandlers,
                onSyncNeeded: function(streamid, action, type) {}
            }
        }(),
        TextSender = {
            send: function(config) {
                function sendText(textMessage, text) {
                    var data = {
                        type: "text",
                        uuid: uuid,
                        sendingTime: sendingTime
                    };
                    textMessage && (text = textMessage, data.packets = parseInt(text.length / packetSize)), text.length > packetSize ? data.message = text.slice(0, packetSize) : (data.message = text, data.last = !0, data.isobject = isobject), channel.send(data, remoteUserId), textToTransfer = text.slice(data.message.length), textToTransfer.length && setTimeout(function() {
                        sendText(null, textToTransfer)
                    }, connection.chunkInterval || 100)
                }
                var connection = config.connection,
                    channel = config.channel,
                    remoteUserId = config.remoteUserId,
                    initialText = config.text,
                    packetSize = connection.chunkSize || 1e3,
                    textToTransfer = "",
                    isobject = !1;
                isString(initialText) || (isobject = !0, initialText = JSON.stringify(initialText));
                var uuid = getRandomString(),
                    sendingTime = (new Date).getTime();
                sendText(initialText)
            }
        },
        FileProgressBarHandler = function() {
            function handle(connection) {
                function updateLabel(progress, label) {
                    if (progress.position !== -1) {
                        var position = +progress.position.toFixed(2).split(".")[1] || 100;
                        label.innerHTML = position + "%"
                    }
                }
                var progressHelper = {};
                connection.onFileStart = function(file) {
                    var div = document.createElement("div");
                    return div.title = file.name, div.innerHTML = "<label>0%</label> <progress></progress>", file.remoteUserId && (div.innerHTML += " (Sharing with:" + file.remoteUserId + ")"), connection.filesContainer || (connection.filesContainer = document.body || document.documentElement), connection.filesContainer.insertBefore(div, connection.filesContainer.firstChild), file.remoteUserId ? (progressHelper[file.uuid] || (progressHelper[file.uuid] = {}), progressHelper[file.uuid][file.remoteUserId] = {
                        div: div,
                        progress: div.querySelector("progress"),
                        label: div.querySelector("label")
                    }, void(progressHelper[file.uuid][file.remoteUserId].progress.max = file.maxChunks)) : (progressHelper[file.uuid] = {
                        div: div,
                        progress: div.querySelector("progress"),
                        label: div.querySelector("label")
                    }, void(progressHelper[file.uuid].progress.max = file.maxChunks))
                }, connection.onFileProgress = function(chunk) {
                    var helper = progressHelper[chunk.uuid];
                    helper && (chunk.remoteUserId && !(helper = progressHelper[chunk.uuid][chunk.remoteUserId]) || (helper.progress.value = chunk.currentPosition || chunk.maxChunks || helper.progress.max, updateLabel(helper.progress, helper.label)))
                }, connection.onFileEnd = function(file) {
                    var helper = progressHelper[file.uuid];
                    if (!helper) return void console.error("No such progress-helper element exist.", file);
                    if (!file.remoteUserId || (helper = progressHelper[file.uuid][file.remoteUserId])) {
                        var div = helper.div;
                        file.type.indexOf("image") != -1 ? div.innerHTML = '<a href="' + file.url + '" download="' + file.name + '">Download <strong style="color:red;">' + file.name + '</strong> </a><br /><img src="' + file.url + '" title="' + file.name + '" style="max-width: 80%;">' : div.innerHTML = '<a href="' + file.url + '" download="' + file.name + '">Download <strong style="color:red;">' + file.name + '</strong> </a><br /><iframe src="' + file.url + '" title="' + file.name + '" style="width: 80%;border: 0;height: inherit;margin-top:1em;"></iframe>'
                    }
                }
            }
            return {
                handle: handle
            }
        }(),
        TranslationHandler = function() {
            function handle(connection) {
                connection.autoTranslateText = !1, connection.language = "en", connection.googKey = "AIzaSyCgB5hmFY74WYB-EoWkhr9cAGr6TiTHrEE", connection.Translator = {
                    TranslateText: function(text, callback) {
                        var newScript = document.createElement("script");
                        newScript.type = "text/javascript";
                        var sourceText = encodeURIComponent(text),
                            randomNumber = "method" + connection.token();
                        window[randomNumber] = function(response) {
                            return response.data && response.data.translations[0] && callback ? void callback(response.data.translations[0].translatedText) : response.error && "Daily Limit Exceeded" === response.error.message ? void console.error('Text translation failed. Error message: "Daily Limit Exceeded."') : response.error ? void console.error(response.error.message) : void console.error(response)
                        };
                        var source = "https://www.googleapis.com/language/translate/v2?key=" + connection.googKey + "&target=" + (connection.language || "en-US") + "&callback=window." + randomNumber + "&q=" + sourceText;
                        newScript.src = source, document.getElementsByTagName("head")[0].appendChild(newScript)
                    },
                    getListOfLanguages: function(callback) {
                        var xhr = new XMLHttpRequest;
                        xhr.onreadystatechange = function() {
                            if (xhr.readyState == XMLHttpRequest.DONE) {
                                var response = JSON.parse(xhr.responseText);
                                if (response && response.data && response.data.languages) return void callback(response.data.languages);
                                if (response.error && "Daily Limit Exceeded" === response.error.message) return void console.error('Text translation failed. Error message: "Daily Limit Exceeded."');
                                if (response.error) return void console.error(response.error.message);
                                console.error(response)
                            }
                        };
                        var url = "https://www.googleapis.com/language/translate/v2/languages?key=" + connection.googKey + "&target=en";
                        xhr.open("GET", url, !0), xhr.send(null)
                    }
                }
            }
            return {
                handle: handle
            }
        }();
    ! function(connection) {
        function onUserLeft(remoteUserId) {
            connection.deletePeer(remoteUserId)
        }

        function connectSocket(connectCallback) {
            if (connection.socketAutoReConnect = !0, connection.socket) return void(connectCallback && connectCallback(connection.socket));
            if ("undefined" == typeof SocketConnection)
                if ("undefined" != typeof FirebaseConnection) window.SocketConnection = FirebaseConnection;
                else {
                    if ("undefined" == typeof PubNubConnection) throw "SocketConnection.js seems missed.";
                    window.SocketConnection = PubNubConnection
                } new SocketConnection(connection, function(s) {
                connectCallback && connectCallback(connection.socket)
            })
        }

        function joinRoom(connectionDescription, cb) {
            connection.socket.emit("join-room", {
                sessionid: connection.sessionid,
                session: connection.session,
                mediaConstraints: connection.mediaConstraints,
                sdpConstraints: connection.sdpConstraints,
                streams: getStreamInfoForAdmin(),
                extra: connection.extra,
                password: "undefined" != typeof connection.password && "object" != typeof connection.password ? connection.password : ""
            }, function(isRoomJoined, error) {
                if (isRoomJoined === !0) {
                    if (connection.enableLogs && console.log("isRoomJoined: ", isRoomJoined, " roomid: ", connection.sessionid), connection.peers[connection.sessionid]) return;
                    mPeer.onNegotiationNeeded(connectionDescription)
                }
                isRoomJoined === !1 && connection.enableLogs && console.warn("isRoomJoined: ", error, " roomid: ", connection.sessionid), cb(isRoomJoined, connection.sessionid, error)
            })
        }

        function openRoom(callback) {
            connection.enableLogs && console.log("Sending open-room signal to socket.io"), connection.waitingForLocalMedia = !1, connection.socket.emit("open-room", {
                sessionid: connection.sessionid,
                session: connection.session,
                mediaConstraints: connection.mediaConstraints,
                sdpConstraints: connection.sdpConstraints,
                streams: getStreamInfoForAdmin(),
                extra: connection.extra,
                identifier: connection.publicRoomIdentifier,
                password: "undefined" != typeof connection.password && "object" != typeof connection.password ? connection.password : ""
            }, function(isRoomOpened, error) {
                isRoomOpened === !0 && (connection.enableLogs && console.log("isRoomOpened: ", isRoomOpened, " roomid: ", connection.sessionid), callback(isRoomOpened, connection.sessionid)), isRoomOpened === !1 && (connection.enableLogs && console.warn("isRoomOpened: ", error, " roomid: ", connection.sessionid), callback(isRoomOpened, connection.sessionid, error))
            })
        }

        function getStreamInfoForAdmin() {
            try {
                return connection.streamEvents.selectAll("local").map(function(event) {
                    return {
                        streamid: event.streamid,
                        tracks: event.stream.getTracks().length
                    }
                })
            } catch (e) {
                return []
            }
        }

        function beforeJoin(userPreferences, callback) {
            if (connection.dontCaptureUserMedia || userPreferences.isDataOnly) return void callback();
            var localMediaConstraints = {};
            userPreferences.localPeerSdpConstraints.OfferToReceiveAudio && (localMediaConstraints.audio = connection.mediaConstraints.audio), userPreferences.localPeerSdpConstraints.OfferToReceiveVideo && (localMediaConstraints.video = connection.mediaConstraints.video);
            var session = userPreferences.session || connection.session;
            return session.oneway && "two-way" !== session.audio && "two-way" !== session.video && "two-way" !== session.screen ? void callback() : (session.oneway && session.audio && "two-way" === session.audio && (session = {
                audio: !0
            }), void((session.audio || session.video || session.screen) && (session.screen ? "Edge" === DetectRTC.browser.name ? navigator.getDisplayMedia({
                video: !0,
                audio: isAudioPlusTab(connection)
            }).then(function(screen) {
                screen.isScreen = !0, mPeer.onGettingLocalMedia(screen), !session.audio && !session.video || isAudioPlusTab(connection) ? callback(screen) : connection.invokeGetUserMedia(null, callback)
            }, function(error) {
                console.error("Unable to capture screen on Edge. HTTPs and version 17+ is required.")
            }) : connection.invokeGetUserMedia({
                audio: isAudioPlusTab(connection),
                video: !0,
                isScreen: !0
            }, !session.audio && !session.video || isAudioPlusTab(connection) ? callback : connection.invokeGetUserMedia(null, callback)) : (session.audio || session.video) && connection.invokeGetUserMedia(null, callback, session))))
        }

        function applyConstraints(stream, mediaConstraints) {
            return stream ? (mediaConstraints.audio && getTracks(stream, "audio").forEach(function(track) {
                track.applyConstraints(mediaConstraints.audio)
            }), void(mediaConstraints.video && getTracks(stream, "video").forEach(function(track) {
                track.applyConstraints(mediaConstraints.video)
            }))) : void(connection.enableLogs && console.error("No stream to applyConstraints."))
        }

        function replaceTrack(track, remoteUserId, isVideoTrack) {
            return remoteUserId ? void mPeer.replaceTrack(track, remoteUserId, isVideoTrack) : void connection.peers.getAllParticipants().forEach(function(participant) {
                mPeer.replaceTrack(track, participant, isVideoTrack)
            })
        }
        forceOptions = forceOptions || {
            useDefaultDevices: !0
        }, connection.channel = connection.sessionid = (roomid || location.href.replace(/\/|:|#|\?|\$|\^|%|\.|`|~|!|\+|@|\[|\||]|\|*. /g, "").split("\n").join("").split("\r").join("")) + "";
        var mPeer = new MultiPeers(connection),
            preventDuplicateOnStreamEvents = {};
        mPeer.onGettingLocalMedia = function(stream, callback) {
            if (callback = callback || function() {}, preventDuplicateOnStreamEvents[stream.streamid]) return void callback();
            preventDuplicateOnStreamEvents[stream.streamid] = !0;
            try {
                stream.type = "local"
            } catch (e) {}
            connection.setStreamEndHandler(stream), getRMCMediaElement(stream, function(mediaElement) {
                mediaElement.id = stream.streamid, mediaElement.muted = !0, mediaElement.volume = 0, connection.attachStreams.indexOf(stream) === -1 && connection.attachStreams.push(stream), "undefined" != typeof StreamsHandler && StreamsHandler.setHandlers(stream, !0, connection);
                var isAudioMuted = 0 === stream.getAudioTracks().filter(function(track) {
                    return track.enabled
                }).length;
                connection.streamEvents[stream.streamid] = {
                    stream: stream,
                    type: "local",
                    mediaElement: mediaElement,
                    userid: connection.userid,
                    extra: connection.extra,
                    streamid: stream.streamid,
                    isAudioMuted: isAudioMuted
                };
                try {
                    setHarkEvents(connection, connection.streamEvents[stream.streamid]), setMuteHandlers(connection, connection.streamEvents[stream.streamid]), connection.onstream(connection.streamEvents[stream.streamid])
                } catch (e) {}
                callback()
            }, connection)
        }, mPeer.onGettingRemoteMedia = function(stream, remoteUserId) {
            try {
                stream.type = "remote"
            } catch (e) {}
            connection.setStreamEndHandler(stream, "remote-stream"), getRMCMediaElement(stream, function(mediaElement) {
                mediaElement.id = stream.streamid, "undefined" != typeof StreamsHandler && StreamsHandler.setHandlers(stream, !1, connection), connection.streamEvents[stream.streamid] = {
                    stream: stream,
                    type: "remote",
                    userid: remoteUserId,
                    extra: connection.peers[remoteUserId] ? connection.peers[remoteUserId].extra : {},
                    mediaElement: mediaElement,
                    streamid: stream.streamid
                }, setMuteHandlers(connection, connection.streamEvents[stream.streamid]), connection.onstream(connection.streamEvents[stream.streamid])
            }, connection)
        }, mPeer.onRemovingRemoteMedia = function(stream, remoteUserId) {
            var streamEvent = connection.streamEvents[stream.streamid];
            streamEvent || (streamEvent = {
                stream: stream,
                type: "remote",
                userid: remoteUserId,
                extra: connection.peers[remoteUserId] ? connection.peers[remoteUserId].extra : {},
                streamid: stream.streamid,
                mediaElement: connection.streamEvents[stream.streamid] ? connection.streamEvents[stream.streamid].mediaElement : null
            }), connection.peersBackup[streamEvent.userid] && (streamEvent.extra = connection.peersBackup[streamEvent.userid].extra), connection.onstreamended(streamEvent), delete connection.streamEvents[stream.streamid]
        }, mPeer.onNegotiationNeeded = function(message, remoteUserId, callback) {
            callback = callback || function() {}, remoteUserId = remoteUserId || message.remoteUserId, message = message || "";
            var messageToDeliver = {
                remoteUserId: remoteUserId,
                message: message,
                sender: connection.userid
            };
            message.remoteUserId && message.message && message.sender && (messageToDeliver = message), connectSocket(function() {
                connection.socket.emit(connection.socketMessageEvent, messageToDeliver, callback)
            })
        }, mPeer.onUserLeft = onUserLeft, mPeer.disconnectWith = function(remoteUserId, callback) {
            connection.socket && connection.socket.emit("disconnect-with", remoteUserId, callback || function() {}), connection.deletePeer(remoteUserId)
        }, connection.socketOptions = {
            transport: "polling"
        }, connection.openOrJoin = function(roomid, callback) {
            callback = callback || function() {}, connection.checkPresence(roomid, function(isRoomExist, roomid) {
                if (isRoomExist) {
                    connection.sessionid = roomid;
                    var localPeerSdpConstraints = !1,
                        remotePeerSdpConstraints = !1,
                        isOneWay = !!connection.session.oneway,
                        isDataOnly = isData(connection.session);
                    remotePeerSdpConstraints = {
                        OfferToReceiveAudio: connection.sdpConstraints.mandatory.OfferToReceiveAudio,
                        OfferToReceiveVideo: connection.sdpConstraints.mandatory.OfferToReceiveVideo
                    }, localPeerSdpConstraints = {
                        OfferToReceiveAudio: isOneWay ? !!connection.session.audio : connection.sdpConstraints.mandatory.OfferToReceiveAudio,
                        OfferToReceiveVideo: isOneWay ? !!connection.session.video || !!connection.session.screen : connection.sdpConstraints.mandatory.OfferToReceiveVideo
                    };
                    var connectionDescription = {
                        remoteUserId: connection.sessionid,
                        message: {
                            newParticipationRequest: !0,
                            isOneWay: isOneWay,
                            isDataOnly: isDataOnly,
                            localPeerSdpConstraints: localPeerSdpConstraints,
                            remotePeerSdpConstraints: remotePeerSdpConstraints
                        },
                        sender: connection.userid
                    };
                    return void beforeJoin(connectionDescription.message, function() {
                        joinRoom(connectionDescription, callback)
                    })
                }
                return connection.waitingForLocalMedia = !0, connection.isInitiator = !0, connection.sessionid = roomid || connection.sessionid, isData(connection.session) ? void openRoom(callback) : void connection.captureUserMedia(function() {
                    openRoom(callback)
                })
            })
        }, connection.waitingForLocalMedia = !1, connection.open = function(roomid, callback) {
            callback = callback || function() {}, connection.waitingForLocalMedia = !0, connection.isInitiator = !0, connection.sessionid = roomid || connection.sessionid, connectSocket(function() {
                return isData(connection.session) ? void openRoom(callback) : void connection.captureUserMedia(function() {
                    openRoom(callback)
                })
            })
        }, connection.peersBackup = {}, connection.deletePeer = function(remoteUserId) {
            if (remoteUserId && connection.peers[remoteUserId]) {
                var eventObject = {
                    userid: remoteUserId,
                    extra: connection.peers[remoteUserId] ? connection.peers[remoteUserId].extra : {}
                };
                if (connection.peersBackup[eventObject.userid] && (eventObject.extra = connection.peersBackup[eventObject.userid].extra), connection.onleave(eventObject), connection.peers[remoteUserId]) {
                    connection.peers[remoteUserId].streams.forEach(function(stream) {
                        stream.stop()
                    });
                    var peer = connection.peers[remoteUserId].peer;
                    if (peer && "closed" !== peer.iceConnectionState) try {
                        peer.close()
                    } catch (e) {}
                    connection.peers[remoteUserId] && (connection.peers[remoteUserId].peer = null, delete connection.peers[remoteUserId])
                }
            }
        }, connection.rejoin = function(connectionDescription) {
            if (!connection.isInitiator && connectionDescription && Object.keys(connectionDescription).length) {
                var extra = {};
                connection.peers[connectionDescription.remoteUserId] && (extra = connection.peers[connectionDescription.remoteUserId].extra, connection.deletePeer(connectionDescription.remoteUserId)), connectionDescription && connectionDescription.remoteUserId && (connection.join(connectionDescription.remoteUserId), connection.onReConnecting({
                    userid: connectionDescription.remoteUserId,
                    extra: extra
                }))
            }
        }, connection.join = function(remoteUserId, options) {
            connection.sessionid = !!remoteUserId && (remoteUserId.sessionid || remoteUserId.remoteUserId || remoteUserId) || connection.sessionid, connection.sessionid += "";
            var localPeerSdpConstraints = !1,
                remotePeerSdpConstraints = !1,
                isOneWay = !1,
                isDataOnly = !1;
            if (remoteUserId && remoteUserId.session || !remoteUserId || "string" == typeof remoteUserId) {
                var session = remoteUserId ? remoteUserId.session || connection.session : connection.session;
                isOneWay = !!session.oneway, isDataOnly = isData(session), remotePeerSdpConstraints = {
                    OfferToReceiveAudio: connection.sdpConstraints.mandatory.OfferToReceiveAudio,
                    OfferToReceiveVideo: connection.sdpConstraints.mandatory.OfferToReceiveVideo
                }, localPeerSdpConstraints = {
                    OfferToReceiveAudio: isOneWay ? !!connection.session.audio : connection.sdpConstraints.mandatory.OfferToReceiveAudio,
                    OfferToReceiveVideo: isOneWay ? !!connection.session.video || !!connection.session.screen : connection.sdpConstraints.mandatory.OfferToReceiveVideo
                }
            }
            options = options || {};
            var cb = function() {};
            "function" == typeof options && (cb = options, options = {}), "undefined" != typeof options.localPeerSdpConstraints && (localPeerSdpConstraints = options.localPeerSdpConstraints), "undefined" != typeof options.remotePeerSdpConstraints && (remotePeerSdpConstraints = options.remotePeerSdpConstraints), "undefined" != typeof options.isOneWay && (isOneWay = options.isOneWay), "undefined" != typeof options.isDataOnly && (isDataOnly = options.isDataOnly);
            var connectionDescription = {
                remoteUserId: connection.sessionid,
                message: {
                    newParticipationRequest: !0,
                    isOneWay: isOneWay,
                    isDataOnly: isDataOnly,
                    localPeerSdpConstraints: localPeerSdpConstraints,
                    remotePeerSdpConstraints: remotePeerSdpConstraints
                },
                sender: connection.userid
            };
            return beforeJoin(connectionDescription.message, function() {
                connectSocket(function() {
                    joinRoom(connectionDescription, cb)
                })
            }), connectionDescription
        }, connection.publicRoomIdentifier = "", connection.getUserMedia = connection.captureUserMedia = function(callback, sessionForced) {
            callback = callback || function() {};
            var session = sessionForced || connection.session;
            return connection.dontCaptureUserMedia || isData(session) ? void callback() : void((session.audio || session.video || session.screen) && (session.screen ? "Edge" === DetectRTC.browser.name ? navigator.getDisplayMedia({
                video: !0,
                audio: isAudioPlusTab(connection)
            }).then(function(screen) {
                if (screen.isScreen = !0, mPeer.onGettingLocalMedia(screen), (session.audio || session.video) && !isAudioPlusTab(connection)) {
                    var nonScreenSession = {};
                    for (var s in session) "screen" !== s && (nonScreenSession[s] = session[s]);
                    return void connection.invokeGetUserMedia(sessionForced, callback, nonScreenSession)
                }
                callback(screen)
            }, function(error) {
                console.error("Unable to capture screen on Edge. HTTPs and version 17+ is required.")
            }) : connection.invokeGetUserMedia({
                audio: isAudioPlusTab(connection),
                video: !0,
                isScreen: !0
            }, function(stream) {
                if ((session.audio || session.video) && !isAudioPlusTab(connection)) {
                    var nonScreenSession = {};
                    for (var s in session) "screen" !== s && (nonScreenSession[s] = session[s]);
                    return void connection.invokeGetUserMedia(sessionForced, callback, nonScreenSession)
                }
                callback(stream)
            }) : (session.audio || session.video) && connection.invokeGetUserMedia(sessionForced, callback, session)))
        }, connection.onbeforeunload = function(arg1, dontCloseSocket) {
            connection.closeBeforeUnload && (connection.peers.getAllParticipants().forEach(function(participant) {
                    mPeer.onNegotiationNeeded({
                        userLeft: !0
                    }, participant), connection.peers[participant] && connection.peers[participant].peer && connection.peers[participant].peer.close(), delete connection.peers[participant]
                }), dontCloseSocket || connection.closeSocket(),
                connection.isInitiator = !1)
        }, window.ignoreBeforeUnload ? connection.closeBeforeUnload = !1 : (connection.closeBeforeUnload = !0, window.addEventListener("beforeunload", connection.onbeforeunload, !1)), connection.userid = getRandomString(), connection.changeUserId = function(newUserId, callback) {
            callback = callback || function() {}, connection.userid = newUserId || getRandomString(), connection.socket.emit("changed-uuid", connection.userid, callback)
        }, connection.extra = {}, connection.attachStreams = [], connection.session = {
            audio: !0,
            video: !0
        }, connection.enableFileSharing = !1, connection.bandwidth = {
            screen: !1,
            audio: !1,
            video: !1
        }, connection.codecs = {
            audio: "opus",
            video: "VP9"
        }, connection.processSdp = function(sdp) {
            return isUnifiedPlanSupportedDefault() ? sdp : "Safari" === DetectRTC.browser.name ? sdp : ("VP8" === connection.codecs.video.toUpperCase() && (sdp = CodecsHandler.preferCodec(sdp, "vp8")), "VP9" === connection.codecs.video.toUpperCase() && (sdp = CodecsHandler.preferCodec(sdp, "vp9")), "H264" === connection.codecs.video.toUpperCase() && (sdp = CodecsHandler.preferCodec(sdp, "h264")), "G722" === connection.codecs.audio && (sdp = CodecsHandler.removeNonG722(sdp)), "Firefox" === DetectRTC.browser.name ? sdp : ((connection.bandwidth.video || connection.bandwidth.screen) && (sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, connection.bandwidth, !!connection.session.screen)), connection.bandwidth.video && (sdp = CodecsHandler.setVideoBitrates(sdp, {
                min: 8 * connection.bandwidth.video * 1024,
                max: 8 * connection.bandwidth.video * 1024
            })), connection.bandwidth.audio && (sdp = CodecsHandler.setOpusAttributes(sdp, {
                maxaveragebitrate: 8 * connection.bandwidth.audio * 1024,
                maxplaybackrate: 8 * connection.bandwidth.audio * 1024,
                stereo: 1,
                maxptime: 3
            })), sdp))
        }, "undefined" != typeof CodecsHandler && (connection.BandwidthHandler = connection.CodecsHandler = CodecsHandler), connection.mediaConstraints = {
            audio: {
                mandatory: {},
                optional: connection.bandwidth.audio ? [{
                    bandwidth: 8 * connection.bandwidth.audio * 1024 || 1048576
                }] : []
            },
            video: {
                mandatory: {},
                optional: connection.bandwidth.video ? [{
                    bandwidth: 8 * connection.bandwidth.video * 1024 || 1048576
                }, {
                    facingMode: "user"
                }] : [{
                    facingMode: "user"
                }]
            }
        }, "Firefox" === DetectRTC.browser.name && (connection.mediaConstraints = {
            audio: !0,
            video: !0
        }), forceOptions.useDefaultDevices || DetectRTC.isMobileDevice || DetectRTC.load(function() {
            var lastAudioDevice, lastVideoDevice;
            if (DetectRTC.MediaDevices.forEach(function(device) {
                    "audioinput" === device.kind && connection.mediaConstraints.audio !== !1 && (lastAudioDevice = device), "videoinput" === device.kind && connection.mediaConstraints.video !== !1 && (lastVideoDevice = device)
                }), lastAudioDevice) {
                if ("Firefox" === DetectRTC.browser.name) return void(connection.mediaConstraints.audio !== !0 ? connection.mediaConstraints.audio.deviceId = lastAudioDevice.id : connection.mediaConstraints.audio = {
                    deviceId: lastAudioDevice.id
                });
                1 == connection.mediaConstraints.audio && (connection.mediaConstraints.audio = {
                    mandatory: {},
                    optional: []
                }), connection.mediaConstraints.audio.optional || (connection.mediaConstraints.audio.optional = []);
                var optional = [{
                    sourceId: lastAudioDevice.id
                }];
                connection.mediaConstraints.audio.optional = optional.concat(connection.mediaConstraints.audio.optional)
            }
            if (lastVideoDevice) {
                if ("Firefox" === DetectRTC.browser.name) return void(connection.mediaConstraints.video !== !0 ? connection.mediaConstraints.video.deviceId = lastVideoDevice.id : connection.mediaConstraints.video = {
                    deviceId: lastVideoDevice.id
                });
                1 == connection.mediaConstraints.video && (connection.mediaConstraints.video = {
                    mandatory: {},
                    optional: []
                }), connection.mediaConstraints.video.optional || (connection.mediaConstraints.video.optional = []);
                var optional = [{
                    sourceId: lastVideoDevice.id
                }];
                connection.mediaConstraints.video.optional = optional.concat(connection.mediaConstraints.video.optional)
            }
        }), connection.sdpConstraints = {
            mandatory: {
                OfferToReceiveAudio: !0,
                OfferToReceiveVideo: !0
            },
            optional: [{
                VoiceActivityDetection: !1
            }]
        }, connection.sdpSemantics = null, connection.iceCandidatePoolSize = null, connection.bundlePolicy = null, connection.rtcpMuxPolicy = null, connection.iceTransportPolicy = null, connection.optionalArgument = {
            optional: [{
                DtlsSrtpKeyAgreement: !0
            }, {
                googImprovedWifiBwe: !0
            }, {
                googScreencastMinBitrate: 300
            }, {
                googIPv6: !0
            }, {
                googDscp: !0
            }, {
                googCpuUnderuseThreshold: 55
            }, {
                googCpuOveruseThreshold: 85
            }, {
                googSuspendBelowMinBitrate: !0
            }, {
                googCpuOveruseDetection: !0
            }],
            mandatory: {}
        }, connection.iceServers = IceServersHandler.getIceServers(connection), connection.candidates = {
            host: !0,
            stun: !0,
            turn: !0
        }, connection.iceProtocols = {
            tcp: !0,
            udp: !0
        }, connection.onopen = function(event) {
            connection.enableLogs && console.info("Data connection has been opened between you & ", event.userid)
        }, connection.onclose = function(event) {
            connection.enableLogs && console.warn("Data connection has been closed between you & ", event.userid)
        }, connection.onerror = function(error) {
            connection.enableLogs && console.error(error.userid, "data-error", error)
        }, connection.onmessage = function(event) {
            connection.enableLogs && console.debug("data-message", event.userid, event.data)
        }, connection.send = function(data, remoteUserId) {
            connection.peers.send(data, remoteUserId)
        }, connection.close = connection.disconnect = connection.leave = function() {
            connection.onbeforeunload(!1, !0)
        }, connection.closeEntireSession = function(callback) {
            callback = callback || function() {}, connection.socket.emit("close-entire-session", function looper() {
                return connection.getAllParticipants().length ? void setTimeout(looper, 100) : (connection.onEntireSessionClosed({
                    sessionid: connection.sessionid,
                    userid: connection.userid,
                    extra: connection.extra
                }), void connection.changeUserId(null, function() {
                    connection.close(), callback()
                }))
            })
        }, connection.onEntireSessionClosed = function(event) {
            connection.enableLogs && console.info("Entire session is closed: ", event.sessionid, event.extra)
        }, connection.onstream = function(e) {
            var parentNode = connection.videosContainer;
            parentNode.insertBefore(e.mediaElement, parentNode.firstChild);
            var played = e.mediaElement.play();
            return "undefined" != typeof played ? void played["catch"](function() {}).then(function() {
                setTimeout(function() {
                    e.mediaElement.play()
                }, 2e3)
            }) : void setTimeout(function() {
                e.mediaElement.play()
            }, 2e3)
        }, connection.onstreamended = function(e) {
            e.mediaElement || (e.mediaElement = document.getElementById(e.streamid)), e.mediaElement && e.mediaElement.parentNode && e.mediaElement.parentNode.removeChild(e.mediaElement)
        }, connection.direction = "many-to-many", connection.removeStream = function(streamid, remoteUserId) {
            var stream;
            return connection.attachStreams.forEach(function(localStream) {
                localStream.id === streamid && (stream = localStream)
            }), stream ? (connection.peers.getAllParticipants().forEach(function(participant) {
                if (!remoteUserId || participant === remoteUserId) {
                    var user = connection.peers[participant];
                    try {
                        user.peer.removeStream(stream)
                    } catch (e) {}
                }
            }), void connection.renegotiate()) : void console.warn("No such stream exist.", streamid)
        }, connection.addStream = function(session, remoteUserId) {
            function gumCallback(stream) {
                session.streamCallback && session.streamCallback(stream), connection.renegotiate(remoteUserId)
            }
            return session.getTracks ? (connection.attachStreams.indexOf(session) === -1 && (session.streamid || (session.streamid = session.id), connection.attachStreams.push(session)), void connection.renegotiate(remoteUserId)) : isData(session) ? void connection.renegotiate(remoteUserId) : void((session.audio || session.video || session.screen) && (session.screen ? "Edge" === DetectRTC.browser.name ? navigator.getDisplayMedia({
                video: !0,
                audio: isAudioPlusTab(connection)
            }).then(function(screen) {
                screen.isScreen = !0, mPeer.onGettingLocalMedia(screen), !session.audio && !session.video || isAudioPlusTab(connection) ? gumCallback(screen) : connection.invokeGetUserMedia(null, function(stream) {
                    gumCallback(stream)
                })
            }, function(error) {
                console.error("Unable to capture screen on Edge. HTTPs and version 17+ is required.")
            }) : connection.invokeGetUserMedia({
                audio: isAudioPlusTab(connection),
                video: !0,
                isScreen: !0
            }, function(stream) {
                !session.audio && !session.video || isAudioPlusTab(connection) ? gumCallback(stream) : connection.invokeGetUserMedia(null, function(stream) {
                    gumCallback(stream)
                })
            }) : (session.audio || session.video) && connection.invokeGetUserMedia(null, gumCallback)))
        }, connection.invokeGetUserMedia = function(localMediaConstraints, callback, session) {
            session || (session = connection.session), localMediaConstraints || (localMediaConstraints = connection.mediaConstraints), getUserMediaHandler({
                onGettingLocalMedia: function(stream) {
                    var videoConstraints = localMediaConstraints.video;
                    videoConstraints && (videoConstraints.mediaSource || videoConstraints.mozMediaSource ? stream.isScreen = !0 : videoConstraints.mandatory && videoConstraints.mandatory.chromeMediaSource && (stream.isScreen = !0)), stream.isScreen || (stream.isVideo = !!getTracks(stream, "video").length, stream.isAudio = !stream.isVideo && getTracks(stream, "audio").length), mPeer.onGettingLocalMedia(stream, function() {
                        "function" == typeof callback && callback(stream)
                    })
                },
                onLocalMediaError: function(error, constraints) {
                    mPeer.onLocalMediaError(error, constraints)
                },
                localMediaConstraints: localMediaConstraints || {
                    audio: !!session.audio && localMediaConstraints.audio,
                    video: !!session.video && localMediaConstraints.video
                }
            })
        }, connection.applyConstraints = function(mediaConstraints, streamid) {
            if (!MediaStreamTrack || !MediaStreamTrack.prototype.applyConstraints) return void alert("track.applyConstraints is NOT supported in your browser.");
            if (streamid) {
                var stream;
                return connection.streamEvents[streamid] && (stream = connection.streamEvents[streamid].stream), void applyConstraints(stream, mediaConstraints)
            }
            connection.attachStreams.forEach(function(stream) {
                applyConstraints(stream, mediaConstraints)
            })
        }, connection.replaceTrack = function(session, remoteUserId, isVideoTrack) {
            function gumCallback(stream) {
                connection.replaceTrack(stream, remoteUserId, isVideoTrack || session.video || session.screen)
            }
            if (session = session || {}, !RTCPeerConnection.prototype.getSenders) return void connection.addStream(session);
            if (session instanceof MediaStreamTrack) return void replaceTrack(session, remoteUserId, isVideoTrack);
            if (session instanceof MediaStream) return getTracks(session, "video").length && replaceTrack(getTracks(session, "video")[0], remoteUserId, !0), void(getTracks(session, "audio").length && replaceTrack(getTracks(session, "audio")[0], remoteUserId, !1));
            if (isData(session)) throw "connection.replaceTrack requires audio and/or video and/or screen.";
            (session.audio || session.video || session.screen) && (session.screen ? "Edge" === DetectRTC.browser.name ? navigator.getDisplayMedia({
                video: !0,
                audio: isAudioPlusTab(connection)
            }).then(function(screen) {
                screen.isScreen = !0, mPeer.onGettingLocalMedia(screen), !session.audio && !session.video || isAudioPlusTab(connection) ? gumCallback(screen) : connection.invokeGetUserMedia(null, gumCallback)
            }, function(error) {
                console.error("Unable to capture screen on Edge. HTTPs and version 17+ is required.")
            }) : connection.invokeGetUserMedia({
                audio: isAudioPlusTab(connection),
                video: !0,
                isScreen: !0
            }, !session.audio && !session.video || isAudioPlusTab(connection) ? gumCallback : connection.invokeGetUserMedia(null, gumCallback)) : (session.audio || session.video) && connection.invokeGetUserMedia(null, gumCallback))
        }, connection.resetTrack = function(remoteUsersIds, isVideoTrack) {
            remoteUsersIds || (remoteUsersIds = connection.getAllParticipants()), "string" == typeof remoteUsersIds && (remoteUsersIds = [remoteUsersIds]), remoteUsersIds.forEach(function(participant) {
                var peer = connection.peers[participant].peer;
                "undefined" != typeof isVideoTrack && isVideoTrack !== !0 || !peer.lastVideoTrack || connection.replaceTrack(peer.lastVideoTrack, participant, !0), "undefined" != typeof isVideoTrack && isVideoTrack !== !1 || !peer.lastAudioTrack || connection.replaceTrack(peer.lastAudioTrack, participant, !1)
            })
        }, connection.renegotiate = function(remoteUserId) {
            return remoteUserId ? void mPeer.renegotiatePeer(remoteUserId) : void connection.peers.getAllParticipants().forEach(function(participant) {
                mPeer.renegotiatePeer(participant)
            })
        }, connection.setStreamEndHandler = function(stream, isRemote) {
            if (stream && stream.addEventListener && (isRemote = !!isRemote, !stream.alreadySetEndHandler)) {
                stream.alreadySetEndHandler = !0;
                var streamEndedEvent = "ended";
                "oninactive" in stream && (streamEndedEvent = "inactive"), stream.addEventListener(streamEndedEvent, function() {
                    if (stream.idInstance && currentUserMediaRequest.remove(stream.idInstance), !isRemote) {
                        var streams = [];
                        connection.attachStreams.forEach(function(s) {
                            s.id != stream.id && streams.push(s)
                        }), connection.attachStreams = streams
                    }
                    var streamEvent = connection.streamEvents[stream.streamid];
                    if (streamEvent || (streamEvent = {
                            stream: stream,
                            streamid: stream.streamid,
                            type: isRemote ? "remote" : "local",
                            userid: connection.userid,
                            extra: connection.extra,
                            mediaElement: connection.streamEvents[stream.streamid] ? connection.streamEvents[stream.streamid].mediaElement : null
                        }), isRemote && connection.peers[streamEvent.userid]) {
                        var peer = connection.peers[streamEvent.userid].peer,
                            streams = [];
                        peer.getRemoteStreams().forEach(function(s) {
                            s.id != stream.id && streams.push(s)
                        }), connection.peers[streamEvent.userid].streams = streams
                    }
                    streamEvent.userid === connection.userid && "remote" === streamEvent.type || (connection.peersBackup[streamEvent.userid] && (streamEvent.extra = connection.peersBackup[streamEvent.userid].extra), connection.onstreamended(streamEvent), delete connection.streamEvents[stream.streamid])
                }, !1)
            }
        }, connection.onMediaError = function(error, constraints) {
            connection.enableLogs && console.error(error, constraints)
        }, connection.autoCloseEntireSession = !1, connection.filesContainer = connection.videosContainer = document.body || document.documentElement, connection.isInitiator = !1, connection.shareFile = mPeer.shareFile, "undefined" != typeof FileProgressBarHandler && FileProgressBarHandler.handle(connection), "undefined" != typeof TranslationHandler && TranslationHandler.handle(connection), connection.token = getRandomString, connection.onNewParticipant = function(participantId, userPreferences) {
            connection.acceptParticipationRequest(participantId, userPreferences)
        }, connection.acceptParticipationRequest = function(participantId, userPreferences) {
            userPreferences.successCallback && (userPreferences.successCallback(), delete userPreferences.successCallback), mPeer.createNewPeer(participantId, userPreferences)
        }, "undefined" != typeof StreamsHandler && (connection.StreamsHandler = StreamsHandler), connection.onleave = function(userid) {}, connection.invokeSelectFileDialog = function(callback) {
            var selector = new FileSelector;
            selector.accept = "*.*", selector.selectSingleFile(callback)
        }, connection.onmute = function(e) {
            if (e && e.mediaElement)
                if ("both" === e.muteType || "video" === e.muteType) {
                    e.mediaElement.src = null;
                    var paused = e.mediaElement.pause();
                    "undefined" != typeof paused ? paused.then(function() {
                        e.mediaElement.poster = e.snapshot || "https://cdn.webrtc-experiment.com/images/muted.png"
                    }) : e.mediaElement.poster = e.snapshot || "https://cdn.webrtc-experiment.com/images/muted.png"
                } else "audio" === e.muteType && (e.mediaElement.muted = !0)
        }, connection.onunmute = function(e) {
            e && e.mediaElement && e.stream && ("both" === e.unmuteType || "video" === e.unmuteType ? (e.mediaElement.poster = null, e.mediaElement.srcObject = e.stream, e.mediaElement.play()) : "audio" === e.unmuteType && (e.mediaElement.muted = !1))
        }, connection.onExtraDataUpdated = function(event) {
            event.status = "online", connection.onUserStatusChanged(event, !0)
        }, connection.getAllParticipants = function(sender) {
            return connection.peers.getAllParticipants(sender)
        }, "undefined" != typeof StreamsHandler && (StreamsHandler.onSyncNeeded = function(streamid, action, type) {
            connection.peers.getAllParticipants().forEach(function(participant) {
                mPeer.onNegotiationNeeded({
                    streamid: streamid,
                    action: action,
                    streamSyncNeeded: !0,
                    type: type || "both"
                }, participant)
            })
        }), connection.connectSocket = function(callback) {
            connectSocket(callback)
        }, connection.closeSocket = function() {
            try {
                io.sockets = {}
            } catch (e) {}
            connection.socket && ("function" == typeof connection.socket.disconnect && connection.socket.disconnect(), "function" == typeof connection.socket.resetProps && connection.socket.resetProps(), connection.socket = null)
        }, connection.getSocket = function(callback) {
            return !callback && connection.enableLogs && console.warn("getSocket.callback paramter is required."), callback = callback || function() {}, connection.socket ? callback(connection.socket) : connectSocket(function() {
                callback(connection.socket)
            }), connection.socket
        }, connection.getRemoteStreams = mPeer.getRemoteStreams;
        var skipStreams = ["selectFirst", "selectAll", "forEach"];
        if (connection.streamEvents = {
                selectFirst: function(options) {
                    return connection.streamEvents.selectAll(options)[0]
                },
                selectAll: function(options) {
                    options || (options = {
                        local: !0,
                        remote: !0,
                        isScreen: !0,
                        isAudio: !0,
                        isVideo: !0
                    }), "local" == options && (options = {
                        local: !0
                    }), "remote" == options && (options = {
                        remote: !0
                    }), "screen" == options && (options = {
                        isScreen: !0
                    }), "audio" == options && (options = {
                        isAudio: !0
                    }), "video" == options && (options = {
                        isVideo: !0
                    });
                    var streams = [];
                    return Object.keys(connection.streamEvents).forEach(function(key) {
                        var event = connection.streamEvents[key];
                        if (skipStreams.indexOf(key) === -1) {
                            var ignore = !0;
                            options.local && "local" === event.type && (ignore = !1), options.remote && "remote" === event.type && (ignore = !1), options.isScreen && event.stream.isScreen && (ignore = !1), options.isVideo && event.stream.isVideo && (ignore = !1), options.isAudio && event.stream.isAudio && (ignore = !1), options.userid && event.userid === options.userid && (ignore = !1), ignore === !1 && streams.push(event)
                        }
                    }), streams
                }
            }, connection.socketURL = "/", connection.socketMessageEvent = "RTCMultiConnection-Message", connection.socketCustomEvent = "RTCMultiConnection-Custom-Message", connection.DetectRTC = DetectRTC, connection.setCustomSocketEvent = function(customEvent) {
                customEvent && (connection.socketCustomEvent = customEvent), connection.socket && connection.socket.emit("set-custom-socket-event-listener", connection.socketCustomEvent)
            }, connection.getNumberOfBroadcastViewers = function(broadcastId, callback) {
                connection.socket && broadcastId && callback && connection.socket.emit("get-number-of-users-in-specific-broadcast", broadcastId, callback)
            }, connection.onNumberOfBroadcastViewersUpdated = function(event) {
                connection.enableLogs && connection.isInitiator && console.info("Number of broadcast (", event.broadcastId, ") viewers", event.numberOfBroadcastViewers)
            }, connection.onUserStatusChanged = function(event, dontWriteLogs) {
                connection.enableLogs && !dontWriteLogs && console.info(event.userid, event.status)
            }, connection.getUserMediaHandler = getUserMediaHandler, connection.multiPeersHandler = mPeer, connection.enableLogs = !0, connection.setCustomSocketHandler = function(customSocketHandler) {
                "undefined" != typeof SocketConnection && (SocketConnection = customSocketHandler)
            }, connection.chunkSize = 4e4, connection.maxParticipantsAllowed = 1e3, connection.disconnectWith = mPeer.disconnectWith, connection.checkPresence = function(roomid, callback) {
                return roomid = roomid || connection.sessionid, "SSEConnection" === SocketConnection.name ? void SSEConnection.checkPresence(roomid, function(isRoomExist, _roomid, extra) {
                    return connection.socket ? void callback(isRoomExist, _roomid) : (isRoomExist || (connection.userid = _roomid), void connection.connectSocket(function() {
                        callback(isRoomExist, _roomid, extra)
                    }))
                }) : connection.socket ? void connection.socket.emit("check-presence", roomid + "", function(isRoomExist, _roomid, extra) {
                    connection.enableLogs && console.log("checkPresence.isRoomExist: ", isRoomExist, " roomid: ", _roomid), callback(isRoomExist, _roomid, extra)
                }) : void connection.connectSocket(function() {
                    connection.checkPresence(roomid, callback)
                })
            }, connection.onReadyForOffer = function(remoteUserId, userPreferences) {
                connection.multiPeersHandler.createNewPeer(remoteUserId, userPreferences)
            }, connection.setUserPreferences = function(userPreferences) {
                return connection.dontAttachStream && (userPreferences.dontAttachLocalStream = !0), connection.dontGetRemoteStream && (userPreferences.dontGetRemoteStream = !0), userPreferences
            }, connection.updateExtraData = function() {
                connection.socket.emit("extra-data-updated", connection.extra)
            }, connection.enableScalableBroadcast = !1, connection.maxRelayLimitPerUser = 3, connection.dontCaptureUserMedia = !1, connection.dontAttachStream = !1, connection.dontGetRemoteStream = !1, connection.onReConnecting = function(event) {
                connection.enableLogs && console.info("ReConnecting with", event.userid, "...")
            }, connection.beforeAddingStream = function(stream) {
                return stream
            }, connection.beforeRemovingStream = function(stream) {
                return stream
            }, "undefined" != typeof isChromeExtensionAvailable && (connection.checkIfChromeExtensionAvailable = isChromeExtensionAvailable), "undefined" != typeof isFirefoxExtensionAvailable && (connection.checkIfChromeExtensionAvailable = isFirefoxExtensionAvailable), "undefined" != typeof getChromeExtensionStatus && (connection.getChromeExtensionStatus = getChromeExtensionStatus), connection.modifyScreenConstraints = function(screen_constraints) {
                return screen_constraints
            }, connection.onPeerStateChanged = function(state) {
                connection.enableLogs && state.iceConnectionState.search(/closed|failed/gi) !== -1 && console.error("Peer connection is closed between you & ", state.userid, state.extra, "state:", state.iceConnectionState)
            }, connection.isOnline = !0, listenEventHandler("online", function() {
                connection.isOnline = !0
            }), listenEventHandler("offline", function() {
                connection.isOnline = !1
            }), connection.isLowBandwidth = !1, navigator && navigator.connection && navigator.connection.type && (connection.isLowBandwidth = navigator.connection.type.toString().toLowerCase().search(/wifi|cell/g) !== -1, connection.isLowBandwidth)) {
            if (connection.bandwidth = {
                    audio: !1,
                    video: !1,
                    screen: !1
                }, connection.mediaConstraints.audio && connection.mediaConstraints.audio.optional && connection.mediaConstraints.audio.optional.length) {
                var newArray = [];
                connection.mediaConstraints.audio.optional.forEach(function(opt) {
                    "undefined" == typeof opt.bandwidth && newArray.push(opt)
                }), connection.mediaConstraints.audio.optional = newArray
            }
            if (connection.mediaConstraints.video && connection.mediaConstraints.video.optional && connection.mediaConstraints.video.optional.length) {
                var newArray = [];
                connection.mediaConstraints.video.optional.forEach(function(opt) {
                    "undefined" == typeof opt.bandwidth && newArray.push(opt)
                }), connection.mediaConstraints.video.optional = newArray
            }
        }
        connection.getExtraData = function(remoteUserId, callback) {
            if (!remoteUserId) throw "remoteUserId is required.";
            return "function" == typeof callback ? void connection.socket.emit("get-remote-user-extra-data", remoteUserId, function(extra, remoteUserId, error) {
                callback(extra, remoteUserId, error)
            }) : connection.peers[remoteUserId] ? connection.peers[remoteUserId].extra : connection.peersBackup[remoteUserId] ? connection.peersBackup[remoteUserId].extra : {}
        }, forceOptions.autoOpenOrJoin && connection.openOrJoin(connection.sessionid), connection.onUserIdAlreadyTaken = function(useridAlreadyTaken, yourNewUserId) {
            connection.close(), connection.closeSocket(), connection.isInitiator = !1, connection.userid = connection.token(), connection.join(connection.sessionid), connection.enableLogs && console.warn("Userid already taken.", useridAlreadyTaken, "Your new userid:", connection.userid)
        }, connection.trickleIce = !0, connection.version = "3.7.0", connection.onSettingLocalDescription = function(event) {
            connection.enableLogs && console.info("Set local description for remote user", event.userid)
        }, connection.resetScreen = function() {
            sourceId = null, DetectRTC && DetectRTC.screen && delete DetectRTC.screen.sourceId, currentUserMediaRequest = {
                streams: [],
                mutex: !1,
                queueRequests: []
            }
        }, connection.autoCreateMediaElement = !0, connection.password = null, connection.setPassword = function(password, callback) {
            callback = callback || function() {}, connection.socket ? connection.socket.emit("set-password", password, callback) : (connection.password = password, callback(!0, connection.sessionid, null))
        }, connection.onSocketDisconnect = function(event) {
            connection.enableLogs && console.warn("socket.io connection is closed")
        }, connection.onSocketError = function(event) {
            connection.enableLogs && console.warn("socket.io connection is failed")
        }, connection.errors = {
            ROOM_NOT_AVAILABLE: "Room not available",
            INVALID_PASSWORD: "Invalid password",
            USERID_NOT_AVAILABLE: "User ID does not exist",
            ROOM_PERMISSION_DENIED: "Room permission denied",
            ROOM_FULL: "Room full",
            DID_NOT_JOIN_ANY_ROOM: "Did not join any room yet",
            INVALID_SOCKET: "Invalid socket",
            PUBLIC_IDENTIFIER_MISSING: "publicRoomIdentifier is required",
            INVALID_ADMIN_CREDENTIAL: "Invalid username or password attempted"
        }
    }(this)
};
"undefined" != typeof module && (module.exports = exports = RTCMultiConnection), "function" == typeof define && define.amd && define("RTCMultiConnection", [], function() {
    return RTCMultiConnection
});