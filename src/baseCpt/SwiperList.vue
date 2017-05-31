<template>
  <div class="swiper">
    <div class="swiper-container" v-if="list.length > 1">
      <div class="swiper-container-list">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(slide, index) in list" :key="index">
            <img :src="slide.node.display_url" />
          </swiper-slide>
        </swiper>
      </div>
      <div class="swiper-page">
        <span v-for="n in list.length"
          :class="{
            'swiper-page-point': true,
            'active': page === n - 1
          }"></span>
      </div>
    </div>
    <div v-else>
      <img :src="list[0].node.display_url" />
    </div>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper';

  export default {
    props: {
      displayUrl: Object,
      swiperList: Array,
    },
    computed: {
      list() {
        if (!!this.swiperList && this.swiperList.length > 0) {
          return this.swiperList;
        }
        return [this.displayUrl];
      },
      width() {
        return window.innerWidth;
      },
      height() {
        const dimensions = this.list[0].node.dimensions;
        const { width, height } = dimensions;
        return (this.width / width) * height;
      },
    },
    data() {
      return {
        page: 0,
        swiperOption: {
          notNextTick: true,
          setWrapperSize: true,
          pagination: '.swiper-pagination',
          observeParents: true,
          width: this.width,
          height: this.height,
          lazyLoading: true,
          onSlideChangeEnd: (item) => {
            console.log(item);
            this.page = item.activeIndex;
          },
        },
      };
    },
    components: {
      swiper,
      swiperSlide,
    },
  };
</script>
<style scoped>
.swiper-container {
  position: relative;
  overflow: visible;
  &-list {
    width: 100%;
    overflow: hidden;
  }
}
.swiper-page {
  position: absolute;
  bottom: -50px;
  width: 100%;
  text-align: center;
  font-size: 0;
  &-point {
    display: inline-block;
    background-color: #DBDBDB;
    width: 12px;
    height: 12px;
    margin: 4px;
    border-radius: 50%;
    &.active {
      background-color: #3E99ED;
    }
  }
}
</style>
