<template>
    <section>
        <SideBar @updateValue="updateValueFromHeader"></SideBar>
        <section
            :class="valueFromHeader ? 'guest-main-page-shop-header sidebar-section' : 'guest-main-page-shop-header sidebar-section1'">
            <GuestHeader></GuestHeader>
            <div>
                <CorsacasterBioComponent></CorsacasterBioComponent>
                <!-- <div class="search-event roster-head">
                    <h1>
                        Roster
                    </h1>
                    <h1>Athelete List</h1>
                    <div class="home-search-field roster-search ">
                        <img src="@assets/featured-athlete/search-normal.svg" alt="Search Icon" srcset="" />
                        <input type="text" placeholder="Search..." />
                    </div>
                </div> -->
                <div class="search-result-main roster">
                    <div class="search-result">
                        <div style="position: relative;top: 15px;">
                            <img src="@assets/uploadedprofile.png" alt="">

                        </div>

                    </div>
                    <div class="roster-user-bio-main">
                        <div class="roster-user-bio" >
                            <p style="    font-size: 16px;
                            /* background-color: grey; */
                            width: 120px;
                            /* padding: 10px; */
                            border-radius: 10px;">
                                William Santana
                            </p>
                            <p>
                                <span>
                                    Sanctioning body:

                                </span>
                                <span>
                                    xxxx
                                </span>
                            </p>
                            <p>
                                <span>
                                    Location :
                                </span>
                                <span>
                                    Sampletown
                                </span>
                            </p>
                        </div>
                        <div   class="roster-user-bio-sec" > 
                            <p>
                                <span>
                                    Racing Age
                                </span>
                                <span>
                                    32
                                </span>
                            </p>
                            <p>
                                <span>
                                    Racer ID: 
                                </span>
                                <span>
                                    987646
                                </span>
                            </p>
                            <p>
                                <span>
                                    Racing Category: 
                                </span>
                                <span>
                                    BMX Road
                                </span>
                            </p>
                        </div>
                    </div>


                    <div style="    display: flex;
                  align-items: center;margin-top: 130px;">

                        <div style="margin-left: 10px; " class="Subscribe-btn">
                            <button>Subscribe

                            </button>
                        </div>
                        <div class="roster-plus">
                            <img src="@assets/plus.png" alt="">
                        </div>
                    </div>

                </div>
                <div class="search-result-main roster">
                    <div class="search-result">
                        <div style="position: relative;top: 15px;">
                            <img src="@assets/uploadedprofile.png" alt="">

                        </div>

                    </div>
                    <div class="roster-user-bio-main">
                        <div class="roster-user-bio" >
                            <p style="    font-size: 16px;
                            /* background-color: grey; */
                            width: 120px;
                            /* padding: 10px; */
                            border-radius: 10px;">
                                William Santana
                            </p>
                            <p>
                                <span>
                                    Sanctioning body:

                                </span>
                                <span>
                                    xxxx
                                </span>
                            </p>
                            <p>
                                <span>
                                    Location :
                                </span>
                                <span>
                                    Sampletown
                                </span>
                            </p>
                        </div>
                        <div   class="roster-user-bio-sec" > 
                            <p>
                                <span>
                                    Racing Age
                                </span>
                                <span>
                                    32
                                </span>
                            </p>
                            <p>
                                <span>
                                    Racer ID: 
                                </span>
                                <span>
                                    987646
                                </span>
                            </p>
                            <p>
                                <span>
                                    Racing Category: 
                                </span>
                                <span>
                                    BMX Road
                                </span>
                            </p>
                        </div>
                    </div>


                    <div style="    display: flex;
                  align-items: center;margin-top: 130px;">

                        <div style="margin-left: 10px; " class="Subscribe-btn">
                            <button>Subscribe

                            </button>
                        </div>
                        <div class="roster-plus">
                            <img src="@assets/plus.png" alt="">
                        </div>
                    </div>

                </div>
                <div class="search-result-main roster">
                    <div class="search-result">
                        <div style="position: relative;top: 15px;">
                            <img src="@assets/uploadedprofile.png" alt="">

                        </div>

                    </div>
                    <div class="roster-user-bio-main">
                        <div class="roster-user-bio" >
                            <p style="    font-size: 16px;
                            /* background-color: grey; */
                            width: 120px;
                            /* padding: 10px; */
                            border-radius: 10px;">
                                William Santana
                            </p>
                            <p>
                                <span>
                                    Sanctioning body:

                                </span>
                                <span>
                                    xxxx
                                </span>
                            </p>
                            <p>
                                <span>
                                    Location :
                                </span>
                                <span>
                                    Sampletown
                                </span>
                            </p>
                        </div>
                        <div   class="roster-user-bio-sec" > 
                            <p>
                                <span>
                                    Racing Age
                                </span>
                                <span>
                                    32
                                </span>
                            </p>
                            <p>
                                <span>
                                    Racer ID: 
                                </span>
                                <span>
                                    987646
                                </span>
                            </p>
                            <p>
                                <span>
                                    Racing Category: 
                                </span>
                                <span>
                                    BMX Road
                                </span>
                            </p>
                        </div>
                    </div>


                    <div style="    display: flex;
                  align-items: center;margin-top: 130px;">

                        <div style="margin-left: 10px; " class="Subscribe-btn">
                            <button>Subscribe

                            </button>
                        </div>
                        <div class="roster-plus">
                            <img src="@assets/plus.png" alt="">
                        </div>
                    </div>

                </div>
           
            
            
            
            


                <div class="roster-list">
                    <h1>
                        Roster List
                    </h1>
                    <div class="search-result-main roster">
                        <div class="search-result">
                            <div style="position: relative;top: 15px;">
                                <img src="@assets/uploadedprofile.png" alt="">
    
                            </div>
    
                        </div>
                        <div class="roster-user-bio-main">
                            <div class="roster-user-bio" >
                                <p style="    font-size: 16px;
                                /* background-color: grey; */
                                width: 120px;
                                /* padding: 10px; */
                                border-radius: 10px;">
                                    William Santana
                                </p>
                                <p>
                                    <span>
                                        Sanctioning body:
    
                                    </span>
                                    <span>
                                        xxxx
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        Location :
                                    </span>
                                    <span>
                                        Sampletown
                                    </span>
                                </p>
                            </div>
                            <div   class="roster-user-bio-sec" > 
                                <p>
                                    <span>
                                        Racing Age
                                    </span>
                                    <span>
                                        32
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        Racer ID: 
                                    </span>
                                    <span>
                                        987646
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        Racing Category: 
                                    </span>
                                    <span>
                                        BMX Road
                                    </span>
                                </p>
                            </div>
                        </div>
    
    
                        <div style="    display: flex;
                      align-items: center;margin-top: 130px;">
    
                            <div style="margin-left: 10px; " class="Subscribe-btn">
                                <button>Subscribe
    
                                </button>
                            </div>
                            <div class="roster-plus">
                                <img src="@assets/minus.png" alt="">
                            </div>
                        </div>
    
                    </div>
                    <div class="search-result-main roster">
                        <div class="search-result">
                            <div style="position: relative;top: 15px;">
                                <img src="@assets/uploadedprofile.png" alt="">
    
                            </div>
    
                        </div>
                        <div class="roster-user-bio-main">
                            <div class="roster-user-bio" >
                                <p style="    font-size: 16px;
                                /* background-color: grey; */
                                width: 120px;
                                /* padding: 10px; */
                                border-radius: 10px;">
                                    William Santana
                                </p>
                                <p>
                                    <span>
                                        Sanctioning body:
    
                                    </span>
                                    <span>
                                        xxxx
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        Location :
                                    </span>
                                    <span>
                                        Sampletown
                                    </span>
                                </p>
                            </div>
                            <div   class="roster-user-bio-sec" > 
                                <p>
                                    <span>
                                        Racing Age
                                    </span>
                                    <span>
                                        32
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        Racer ID: 
                                    </span>
                                    <span>
                                        987646
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        Racing Category: 
                                    </span>
                                    <span>
                                        BMX Road
                                    </span>
                                </p>
                            </div>
                        </div>
    
    
                        <div style="    display: flex;
                      align-items: center;margin-top: 130px;">
    
                            <div style="margin-left: 10px; " class="Subscribe-btn">
                                <button>Subscribe
    
                                </button>
                            </div>
                            <div class="roster-plus">
                                <img src="@assets/minus.png" alt="">
                            </div>
                        </div>
    
                    </div>
                    <div class="search-result-main roster">
                        <div class="search-result">
                            <div style="position: relative;top: 15px;">
                                <img src="@assets/uploadedprofile.png" alt="">
    
                            </div>
    
                        </div>
                        <div class="roster-user-bio-main">
                            <div class="roster-user-bio" >
                                <p style="    font-size: 16px;
                                /* background-color: grey; */
                                width: 120px;
                                /* padding: 10px; */
                                border-radius: 10px;">
                                    William Santana
                                </p>
                                <p>
                                    <span>
                                        Sanctioning body:
    
                                    </span>
                                    <span>
                                        xxxx
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        Location :
                                    </span>
                                    <span>
                                        Sampletown
                                    </span>
                                </p>
                            </div>
                            <div   class="roster-user-bio-sec" > 
                                <p>
                                    <span>
                                        Racing Age
                                    </span>
                                    <span>
                                        32
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        Racer ID: 
                                    </span>
                                    <span>
                                        987646
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        Racing Category: 
                                    </span>
                                    <span>
                                        BMX Road
                                    </span>
                                </p>
                            </div>
                        </div>
    
    
                        <div style="    display: flex;
                      align-items: center;margin-top: 130px;">
    
                            <div style="margin-left: 10px; " class="Subscribe-btn">
                                <button>Subscribe
    
                                </button>
                            </div>
                            <div class="roster-plus">
                                <img src="@assets/minus.png" alt="">
                            </div>
                        </div>
    
                    </div>
          

                </div>
            </div>


        </section>
    </section>
</template>