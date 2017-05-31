<template>
  <div class="thread">
    <div class="thread-item">
      <div class="thread-header">
        <div class="thread-header-avator">
          <router-link to="/index"><img :src="owner.profile_pic_url"/></router-link>
        </div>
        <div class="thread-header-content">
          <router-link to="/index">{{owner.username}}</router-link><br />
          <router-link v-if="!!location" to="/index">{{location.name}}</router-link>
          <i v-if="!!location" class="iconfont iconfontIns-right thread-header-content-arrow"></i>
        </div>
        <div class="thread-header-function">
          <i class="iconfont iconfontIns-more thread-header-function-more"></i>
        </div>
      </div>
      <div class="thread-content">
        <div class="thread-content-img">
          <swiper-list :display-url="displayUrl" :swiper-list="swiperList"></swiper-list>
        </div>
      </div>
      <div class="thread-func">
        <div class="thread-func-icon"><i class="iconfont iconfontIns-iconlove thread-func-icon-like"></i></div>
        <div class="thread-func-icon"><i class="iconfont iconfontIns-msg1 thread-func-icon-comment"></i></div>
        <div class="thread-func-icon"><i class="iconfont iconfontIns-icon_send_plane thread-func-icon-msg"></i></div>
        <div class="thread-func-right">
          <div class="thread-func-icon"><i class="iconfont iconfontIns-shoucang thread-func-icon-msg"></i></div>
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
    location() {
      return !!this.thread.node ? this.thread.node.location : {};
    },
    displayUrl() {
      const item = {};
      item.node = {};
      if (!!this.thread.node) {
        const { node } = this.thread;
        item.node = node;
      }
      return item;
    },
    swiperList() {
      if (this.thread.node &&
        this.thread.node.edge_sidecar_to_children &&
        this.thread.node.edge_sidecar_to_children.edges &&
        this.thread.node.edge_sidecar_to_children.edges.length > 0) {
        return this.thread.node.edge_sidecar_to_children.edges;
      }
      return [];
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
        font-size: 18px;
        color: var(--icon-gray);
      }
    }
    &-function {
      &-more {
        font-size: 36px;
      }
    }
  }
  &-content {

  }
  &-func {
    display: flex;
    align-items: center;
    padding: 10px var(--padding-lr);
    &-icon {
      width: 70px;
      text-align: left;
      &-like {
        font-size: 50px;
      }
      &-comment {
        font-size: 50px;
      }
      &-msg {
        font-size: 54px;
      }
    }
    &-right {
      width: auto;
      flex-grow: 1;
      text-align: right;
      .thread-func-icon {
        display: inline-block;
        text-align: right;
        i {
          font-size: 46px;
        }
      }
    }
  }
}
</style>
