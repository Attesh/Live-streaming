<template>
    <div class="chain-crousal">
        <div class="IT-btn">
            <div>
                <h6>
                    IT Chain
                </h6>
                <p>
                    Add Event Into The Itinerary, Go To Calender
                </p>
            </div>
            <div>
                <button>
                    Add Event 
                </button>
            </div>
        </div>
        <div>
            <div style="margin-top: -120px;" id="slider-chatgpt">
                <div id="container">
                    <div id="slider-container">
                        <span @click="slide('left')" class="btn left" :class="{ inactive: currentPosition === 0 }">
                            <!-- Add left arrow content here -->

                        </span>
                        <div id="slider" :style="{ marginLeft: currentMargin + '%' }">
                            <div class="slide" v-for="(slide, index) in slides" :key="index">
                                <span>{{ slide }}</span>
                            </div>
                        </div>
                        <span @click="slide('right')" class="btn right"
                            :class="{ inactive: currentPosition === slidesCount }">
                            <!-- Add right arrow content here -->

                        </span>
                    </div>
                </div>
                
            </div>
            <div class="share-btn-alignment-flex athelete-social">
                <div class="share-btn-alignment-flex">
                    <img src="@assets/Group.png">
                    <p>discord.gg/shroudc</p>
                </div>
                <div class="share-btn-alignment-flex">
                    <img src="@assets/instagram.png">
                    <p>@shroud</p>
                </div>
                <div class="share-btn-alignment-flex">
                    <img src="@assets/instagram.png">
                    <p>@shroud</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            currentPosition: 0,
            currentMargin: 0,
            slidesPerPage: 1, // Adjust this value based on your needs
            slides: ['CalhounRoadRace 3/22', 'CalhounRoadRace 3/22', 'CalhounRoadRace 3/22', 'CalhounRoadRace 3/22', 'CalhounRoadRace 3/22', 'CalhounRoadRace 3/22', 'CalhounRoadRace 3/22', 'CalhounRoadRace 3/22', 'CalhounRoadRace 3/22', 'CalhounRoadRace 3/22'], // Define your slide content here
        };
    },
    computed: {
        slidesCount() {
            return this.slides.length - this.slidesPerPage;
        },
    },
    methods: {
        setParams() {
            // Your setParams function logic here
            // This function will be called in the created hook and when the window is resized
        },
        slide(direction) {
            if (direction === 'left' && this.currentPosition !== 0) {
                this.currentMargin += 100 / this.slidesPerPage;
                this.currentPosition--;
            } else if (direction === 'right' && this.currentPosition !== this.slidesCount) {
                this.currentMargin -= 100 / this.slidesPerPage;
                this.currentPosition++;
            }
        },
    },
    created() {
        this.setParams();
    },
    mounted() {
        window.addEventListener('resize', this.setParams);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.setParams);
    },
};
</script>

<style scoped>
#container {
    height: auto;
    width: 100%;
    margin: 0;
    padding: 0;
    background: transparent;
    display: grid;
    place-items: center
}

#slider-container {
    height: 335px;
    width: 90%;
    max-width: 1400px;
    background: transparent;
    /* box-shadow: 5px 5px 8px gray inset; */
    position: relative;
    overflow: hidden;
    padding: 20px;
}

#slider-container .btn {
    position: absolute;
    top: calc(50% - 30px);
    height: 35px;
    width: 35px;
    border-left: 8px solid pink;
    border-top: 8px solid pink;
    z-index: 99999;
    border-right: none;
    border-bottom: none;
}

#slider-container .btn.left {
    /* Your left arrow styling here */
    left: 10px;
}

#slider-container .btn.right {
    /* Your right arrow styling here */
    right: 10px;
}

#slider-container .btn:hover {
    transform: scale(1.2);
}

#slider-container .btn.inactive {
    border-color: rgb(153, 121, 126)
}

#slider-container .btn:first-of-type {
    transform: rotate(-45deg);
    left: 10px
}

#slider-container .btn:last-of-type {
    transform: rotate(135deg);
    right: 10px;
}

.chain-crousal {
    border: 1px solid #303046;
    background-color: #0D0D1C;
    margin-top: 0px;
    height: auto;
    border-top: none;
}

#slider-container #slider {
    display: flex;
    width: 1000%;
    height: 100%;
    transition: all .5s;
}

#slider-container #slider .slide {
    height: 35%;
    margin: auto 10px;
    background-color:
        #151522;
    border: 1px solid grey;
    display: grid;
    place-items: center;
    transform: rotate(315deg);
    width: 105px !important;
    text-align: center;
    margin-left: 50px;
    border-radius: 10px;
}

#slider-container #slider .slide:hover {
    background-color: #A3241C;
}

#slider-container #slider .slide span {
    transform: rotate(44deg);
    font-size: 11px;
    color: #fff;
}

@media only screen and (min-width: 1100px) {

    #slider-container #slider .slide {
        width: calc(2.5% - 20px);
    }

}

@media only screen and (max-width: 1100px) {

    #slider-container #slider .slide {
        width: calc(3.3333333% - 20px);
    }

}

@media only screen and (max-width: 900px) {

    #slider-container #slider .slide {
        width: calc(5% - 20px);
    }

}

@media only screen and (max-width: 550px) {

    #slider-container #slider .slide {
        width: calc(10% - 20px);
    }

}
</style>