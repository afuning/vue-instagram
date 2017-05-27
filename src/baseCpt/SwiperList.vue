<template>
  <div class="swiper">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
        <img src="https://scontent.cdninstagram.com/t51.2885-15/sh0.08/e35/p750x750/18646534_1713868108912615_2983483853751975936_n.jpg" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper';

  export default {
    data() {
      return {
        swiperOption: {
          setWrapperSize: true,
          pagination: '.swiper-pagination',
          observeParents: true,
        },
        swiperSlides: [1, 2, 3, 4, 5],
      };
    },
    components: {
      swiper,
      swiperSlide,
    },
  };
</script>
