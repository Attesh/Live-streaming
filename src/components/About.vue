<template>
  <section class="main-guest-section">
    <SideBar  @updateValue="updateValueFromHeader"></SideBar>
    <section :class="valueFromHeader ? 'guest-main-page-shop-header sidebar-section' : 'guest-main-page-shop-header sidebar-section1'">
      <GuestHeader></GuestHeader>
      <div>
        <h1 class="mg-l">About</h1>
        <div class="main-gallery-about">
          <div>
            <p>Corsacaster is an innovative online platform, helmed by its proprietor, William Santana. This platform
              serves as a dynamic hub for corsacasters, enabling them to engage in live streaming activities. It has
              been
              specially
              <br>
              designed to cater to the needs of athletes who can effortlessly upload their compelling content, offering
              their dedicated fan base a unique opportunity to not only consume their content but also explore and
              purchase their exclusive merchandise.
            </p>
            <br>
            <p>
              Corsacaster prides itself on being a seamless and user-friendly platform where athletes and content
              creators
              can showcase their talents and connect with their fanbase on a more profound level. By allowing athletes
              to
              upload a variety of content,
              <br> <br>
              ranging from live streams to pre-recorded videos, Corsacaster fosters a vibrant community where fans can
              engage with their favorite athletes' content and gain access to a curated selection of products associated
              with them.
            </p>
            <br>
            <p>
              This platform, under the guidance of William Santana, strives to provide a comprehensive and enriching
              experience for both corsacasters and their supporters, bridging the gap between content creation and
              consumer engagement.
              <br>
              If you seek further insights or have specific queries regarding Corsacaster, please do not hesitate to
              inquire for more details.
            </p>
          </div>
        </div>
      </div>
    </section>
  </section>
  <Footer></Footer>
</template>
<style>
  .mg-l {
    margin-left: 55px;
    font-size: 20px;
    margin-bottom: 0;
  }

  .main-gallery-about {
    border: solid 1px #fff;
    padding: 10px;
    margin: 27px;
    border-radius: 10px;
    width: 88%;
    margin-left: 5%;
    font-size: 20px;
  }

  .main-gallery-about p {
    font-size: 14px;
    line-height: 2;
  }
</style>
<script>
  import GuestHeader from '@components/globals/guest/GuestHeader.vue';
  import SideBar from '@components/globals/costacaster/SideBar.vue';
  import Footer from '@components/globals/costacaster/Footer.vue';
  import ProductList from '@components/globals/costacaster/ProductList.vue';
  import RatingComponent from '@components/globals/costacaster/Rating.vue';
  import Counter from '@components/globals/costacaster/Counter.vue';
  import { ref } from 'vue';

  export default {
    components: {
      GuestHeader,
      ProductList,
      SideBar,
      RatingComponent,
      Counter,
      Footer
    },
    data() {

      return {
        valueFromHeader: true,
      }
    },
    setup() {
      const valueFromHeader = ref('');

      function sendValueToSidebar(value) {
        valueFromHeader.value = value;
      }

      return {
        valueFromHeader,
        sendValueToSidebar,
       
      };
    },
    method: {
      updateValueFromHeader(value) {
        // Update the value in the parent component
        this.valueFromHeader = value;
      },
    }
  };
</script>