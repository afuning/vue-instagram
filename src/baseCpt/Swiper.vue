/* eslint no-underscore-dangle: "error" */
<template>
  <div class="swiper"
    :class="[{'dragging': dragging}]"
    @touchstart="onTouchStart"
    @mousedown="onTouchStart">
    <div class="swiper-wrap"
      ref="swiperWrap"
      :style="{
        'transform' : 'translate3d(' + translateX + 'px, 0, 0)',
        'transition-duration': transitionDuration + 'ms'
      }"
      @transitionend="onTransitionEnd">
      <slot></slot>
    </div>
    <div class="swiper-pagination">
      <span class="swiper-pagination-bullet"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    performanceMode: {
      type: Boolean,
      default: false,
    },
    speed: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      currentPage: 1,
      lastPage: 1,
      slideEls: [],
      startTime: 0,
      startPos: 0,
      translateX: 0,
      dragging: false,
      transitionDuration: 0,
    };
  },
  computed: {
    isHorizontal() {
      return true;
    },
    isPageChanged() {
      return this.lastPage !== this.currentPage;
    },
  },
  mounted() {
    this.slideEls = [].map.call(this.$refs.swiperWrap.children, el => el);
  },
  methods: {
    getTouchPos(e) {
      const key = 'pageX';
      return e.changedTouches ? e.changedTouches[0][key] : e[key];
    },
    getTranslate() {
      const translateName = 'translateX';
      return this[translateName];
    },
    getTranslateOfPage(page) {
      if (page === 0) return 0;
      const propName = 'clientWidth';
      return -[].reduce.call(this.slideEls, (total, el, i) =>
      (i > page - 2 ? total : total + el[propName]), 0);
    },
    next() {
      const page = this.currentPage;
      if (page < this.slideEls.length) {
        this.setPage(page + 1);
      } else {
        this.revert();
      }
    },
    prev() {
      const page = this.currentPage;
      if (page > 1 || this.loop) {
        this.setPage(page - 1);
      } else {
        this.revert();
      }
    },
    revert() {
      this.setPage(this.currentPage);
    },
    setTranslate(value) {
      const translateName = 'translateX';
      this[translateName] = value;
    },
    setPage(page) {
      this.lastPage = this.currentPage;
      if (page === 0) {
        this.currentPage = this.slideEls.length;
      } else if (page === this.slideEls.length + 1) {
        this.currentPage = 1;
      } else {
        this.currentPage = page;
      }
      this.setTranslate(this.getTranslateOfPage(page));
      this.onTransitionStart();
    },
    onTouchStart(e) {  // 触屏开始事件
      this.startPos = this.getTouchPos(e); // 获取当前开始屏幕X位置
      this.delta = 0; // 设置当前移动距离为0
      this.startTranslate = this.getTranslateOfPage(this.currentPage); // 获取当前translateX位置
      this.startTime = new Date().getTime(); // 获取当前触屏时间
      this.dragging = true;
      this.transitionDuration = 0; // 过渡效果需要花费的时间
      document.addEventListener('touchmove', this.onTouchMove, false);
      document.addEventListener('touchend', this.onTouchEnd, false);
      document.addEventListener('mousemove', this.onTouchMove, false);  // 兼容鼠标move事件
      document.addEventListener('mouseup', this.onTouchEnd, false);  // 兼容鼠标up事件
    },
    onTouchMove(e) {
      this.delta = this.getTouchPos(e) - this.startPos; // 获取当前移动距离
      if (!this.performanceMode) {
        this.setTranslate(this.startTranslate + this.delta); // 设置当前translateX位置，即原位置 + 移动位置
        this.$emit('slider-move', this.getTranslate());
      }
      if (this.isHorizontal && Math.abs(this.delta) > 0) {
        e.preventDefault();
      }
    },
    onTouchEnd() {
      this.dragging = false;   // 标记滑动结束
      this.transitionDuration = this.speed; // 设置过度时间
      const isQuickAction = new Date().getTime() - this.startTime < 1000; // 获取动作持续时间
      if (this.delta < -100 || (isQuickAction && this.delta < -50)) {
        this.next();
      } else if (this.delta > 100 || (isQuickAction && this.delta > 50)) {
        this.prev();
      } else {
        this.revert();
      }
      document.removeEventListener('touchmove', this.onTouchMove);
      document.removeEventListener('touchend', this.onTouchEnd);
      document.removeEventListener('mousemove', this.onTouchMove);
      document.removeEventListener('mouseup', this.onTouchEnd);
    },
    onTransitionStart() {  // point
      this.transitioning = true;
      this.transitionDuration = this.speed;
      if (this.isPageChanged) {
        this.$emit('slide-change-start', this.currentPage);
      } else {
        this.$emit('slide-revert-start', this.currentPage);
      }
    },
    onTransitionEnd() {  // point
      this.transitioning = false;
      this.transitionDuration = 0;
      this.delta = 0;
      if (this.isPageChanged) {
        this.$emit('slide-change-end', this.currentPage);
      } else {
        this.$emit('slide-revert-end', this.currentPage);
      }
    },
  },
};
</script>

<style scoped>
.swiper {
  position: relative;
  overflow: hidden;

  .swiper-wrap {
    display: flex;
    width: 100%;
    height: 100%;
    transition: all 0ms ease;

    > div {
      overflow: hidden;
      flex-shrink: 0;
      width: 100%;
      height: 100%;
    }
  }
  &.horizontal .swiper-wrap {
    flex-direction: row;
  }

  &.vertical .swiper-wrap {
    flex-direction: column;
  }

  .swiper-pagination {
    position: absolute;

    .swiper-pagination-bullet {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #000000;
      opacity: .2;
      transition: all .5s ease;
    }

    .swiper-pagination-bullet.active {
      background: #007aff;
      opacity: 1;
    }
  }

  &.vertical .swiper-pagination {
    right: 10px;
    top: 50%;
    transform: translate3d(0, -50%, 0);

    .swiper-pagination-bullet {
      display: block;
      margin: 6px 0;
    }
  }

  &.horizontal .swiper-pagination {
    bottom: 10px;
    width: 100%;
    text-align: center;

    .swiper-pagination-bullet {
      display: inline-block;
      margin: 0 3px;
    }
  }
}
</style>
