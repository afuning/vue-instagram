<template>
  <div class="thread">
    <div class="thread-item">
      <div class="thread-header">
        <div class="thread-header-avator">
          <router-link to="/index"><img src="https://scontent.cdninstagram.com/t51.2885-19/s150x150/17596115_1882149028729672_4150607080039907328_a.jpg"/></router-link>
        </div>
        <div class="thread-header-content">
          <router-link to="/index">{{owner.username}}</router-link><br />
          <router-link to="/index">Cannes Film Festival</router-link>
          <svg class="icon thread-header-content-arrow" aria-hidden="true">
            <use xlink:href="#icon-right"></use>
          </svg>
        </div>
        <div class="thread-header-function">
          <svg class="icon thread-header-function-more" aria-hidden="true">
            <use xlink:href="#icon-more"></use>
          </svg>
        </div>
      </div>
      <div class="thread-content">
        <div class="thread-content-img">
          <swiper-list></swiper-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Swiper from '@/baseCpt/Swiper';
import SwiperList from '@/baseCpt/SwiperList';

export default {
  props: {
    thread: Object,
  },
  computed: {
    owner() {
      return !!this.thread.node ? this.thread.node.owner : {};
    },
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  components: {
    SwiperList,
  },
};
</script>

<style scoped>
.thread {
  &-item {

  }
  &-header {
    padding: 28px 40px;
    display: flex;
    align-items: center;
    &-avator {
      size: var(--head-small);
      a {
        display: inline-block;
        border-radius: 50%;
        border: 1px solid var(--border-gray);
        overflow: hidden;
        size: var(--head-small);
      }
    }
    &-content {
      flex-grow: 1;
      padding-left: 20px;
      a {
        color: var(--color-font);
        &:first-child {
          font-weight: bold;
        }
        &:last-child {
          font-size: 20px;
        }
      }
      &-arrow {
        width: 18px;
        height: 40px;
        color: var(--icon-gray);
      }
    }
    &-function {
      &-more {
        width: 36px;
      }
    }
  }
  &-content {

  }
}
</style>
