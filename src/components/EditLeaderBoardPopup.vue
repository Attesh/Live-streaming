<template>
 <div  style="    background-color: rgb(20 19 19 / 82%); overflow: scroll;  position:  fixed;top: 0;display: flex;justify-content: center;  width: 100%;height: 100%;z-index: 99999999999999999999999999;left: 0;">
    <div class="edit-leader-sec  edit-leader-popup-main ">
        <div class="edit-grid edit-grid-popup ">
            <div class="edit-athelete-pool-main">
                <div class="edit-leader-closed" >
                    <img  style="width: 30px; height: 30px;cursor: pointer;"   src="@assets/closered.png" alt="" @click="closeNotificationPopup">
                </div>
                <h1>
                    Athlete Pool
                </h1>

                <div class="edit-athelete-pool-back">
                    <div class="edit-athelete">
                        <img src="@assets/cyclingteam.png" alt="">
                        <p>
                            Great Britain Cycling Team
                        </p>
                    </div>
                    <div class="edit-athelete">
                        <img src="@assets/cyclingteam.png" alt="">
                        <p>
                            Great Britain Cycling Team
                        </p>
                    </div>
                    <div class="edit-athelete">
                        <img src="@assets/cyclingteam.png" alt="">
                        <p>
                            Great Britain Cycling Team
                        </p>
                    </div>
                    <div class="edit-athelete">
                        <img src="@assets/cyclingteam.png" alt="">
                        <p>
                            Great Britain Cycling Team
                        </p>
                    </div>
                    <div class="edit-athelete">
                        <img src="@assets/cyclingteam.png" alt="">
                        <p>
                            Great Britain Cycling Team
                        </p>
                    </div>
                    <div class="edit-athelete">
                        <img src="@assets/cyclingteam.png" alt="">
                        <p>
                            Great Britain Cycling Team
                        </p>
                    </div>
                    <div class="edit-athelete">
                        <img src="@assets/cyclingteam.png" alt="">
                        <p>
                            Great Britain Cycling Team
                        </p>
                    </div>
                    <div class="edit-athelete-btn">
                        <button>
                            Import Roster
                        </button>
                        <button @click="leaderBoardFolder">
                            Add Folder
                        </button>
                    </div>
                </div>
            </div>
            <div class="log-main">
                <div class="log">
                    <p>
                        LOG
                    </p>
                </div>

                <div class="log-time">
                    <p>
                        13:52:23
                    </p>
                    <p>
                        13:52:23
                    </p>
                    <p>
                        13:52:23
                    </p>
                    <p>
                        13:52:23
                    </p>
                    <p>
                        13:52:23
                    </p>
                </div>

            </div>
            <div class="edit-athelete-pool-main">

                <h1>
                    Leaderborder
                </h1>

                <div class="edit-athelete-pool-back">
                    <div class="title">
                        Title:
                        <input type="text" name="" id="">
                    </div>
                    <div class="time-stamp">
                        Time Stamp:
                        <input type="text" name="" id="">
                    </div>
                    <div class="pos-name-team">
                        <p>
                            Position
                        </p>
                        <p>
                            Name
                        </p>
                        <p>
                            Team
                        </p>
                    </div>
                    <div class="edit-leaderboarder-main">
                        <div class="edit-leaderboarder">
                            <div>
                                <p>
                                    1st
                                </p>
                            </div>
                            <div>
                                <p>
                                    Jordan
                                </p>
                            </div>
                            <div style="    display: flex;
align-items: center;">
                                <img style="width: 25px;" src="@assets/cyclingteam.png" alt="">
                                <p style="font-size: 11px;">Great Britain Cycling Team</p>
                            </div>
                        </div>
                    </div>
                    <div class="edit-leaderboarder-main">
                        <div class="edit-leaderboarder">
                            <div>
                                <p>
                                    1st
                                </p>
                            </div>
                            <div>
                                <p>
                                    Jordan
                                </p>
                            </div>
                            <div style="    display: flex;
align-items: center;">
                                <img style="width: 25px;" src="@assets/cyclingteam.png" alt="">
                                <p style="font-size: 11px;">Great Britain Cycling Team</p>
                            </div>
                        </div>
                    </div>
                    <div class="edit-leaderboarder-main">
                        <div class="edit-leaderboarder">
                            <div>
                                <p>
                                    1st
                                </p>
                            </div>
                            <div>
                                <p>
                                    Jordan
                                </p>
                            </div>
                            <div style="    display: flex;
align-items: center;">
                                <img style="width: 25px;" src="@assets/cyclingteam.png" alt="">
                                <p style="font-size: 11px;">Great Britain Cycling Team</p>
                            </div>
                        </div>
                    </div>
                    <div class="edit-leaderboarder-main">
                        <div class="edit-leaderboarder">
                            <div>
                                <p>
                                    1st
                                </p>
                            </div>
                            <div>
                                <p>
                                    Jordan
                                </p>
                            </div>
                            <div style="    display: flex;
align-items: center;">
                                <img style="width: 25px;" src="@assets/cyclingteam.png" alt="">
                                <p style="font-size: 11px;">Great Britain Cycling Team</p>
                            </div>
                        </div>
                    </div>



                    <div class="edit-athelete-btn">
                        <button>
                            Clear
                        </button>
                        <button>
                            Publish
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="Duration">
            <p>
                Duration:
            </p>
            <input type="text" name="" id="">sec.
        </div>
    </div>
 </div>
</template>
<script>
   
    export default {
        components: {
        
        },
        methods: {
            async closeNotificationPopup() {
                this.$emit('leaderpopup', false);
            }
        }



    }
</script>