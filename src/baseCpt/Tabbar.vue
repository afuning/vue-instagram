<template>
  <div class="tabbar">
    <div class="tabbar-container">
      <div :data-id="0" @click="changeTab" class="tabbar-item">
        <div class="tabbar-item-icon tabbar-item-icon-home" :class="{'active': tabId === 0 }"></div>
      </div>
      <div :data-id="1" @click="changeTab" class="tabbar-item">
        <div class="tabbar-item-icon tabbar-item-icon-search" :class="{'active': tabId === 1 }"></div>
      </div>
      <div :data-id="2" @click="changeTab" class="tabbar-item">
        <!-- <div class="tabbar-item-icon tabbar-item-icon-camera" :class="{'active': oncActive }"></div> -->
        <!-- <i class="tabbar-item-icon iconfontyyy "></i> -->
        <svg class="icon tabbar-item-icon tabbar-item-icon-add" aria-hidden="true">
          <use xlink:href="#icon-addpic"></use>
        </svg>
      </div>
      <div :data-id="3" @click="changeTab" class="tabbar-item">
        <div class="tabbar-item-icon tabbar-item-icon-like" :class="{'active': tabId === 3 }"></div>
      </div>
      <div :data-id="4" @click="changeTab" class="tabbar-item">
        <div class="tabbar-item-icon tabbar-item-icon-user" :class="{'active': tabId === 4 }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabId: 0,
      oncActive: false,
    };
  },
  methods: {
    changeTab(e) {
      const newVal = e.currentTarget.dataset.id * 1;
      if (newVal === 2) {
        this.oncActive = true;
        this.$nextTick(() => {
          setTimeout(() => {
            this.oncActive = false;
          }, 400);
        });
      } else {
        this.tabId = newVal;
      }
    },
  },
};
</script>

<style scoped>
.tabbar {
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 88px;
  background-color: var(--color--white);
  &::before {
    background: rgba(0,0,0,.0975);
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    right: 0;
    top: -1px;
  }
  &-container {
    display: flex;
    height: 100%;
  }
  &-item {
    flex-grow: 1;
    height: 100%;
    text-align: center;
    &-icon {
      display: inline-block;
      size: 49px;
      margin-top: 20px;
      background-image: url(../assets/images/icon-sprite.png);
      background-size: 704px 676px;
      &-home {
        background-position: -400px -584px;
        &.active {
          background-position: -350px -584px;
        }
      }
      &-search {
        background-position: -102px -532px;
        &.active {
          background-position: 0 -584px;
        }
      }
      &-camera {
        background-position: -554px -176px;
        &.active {
          background-position: -504px -176px;
        }
      }
      &-add {
        background: none;
      }
      &-like {
        background-position: -52px -532px;
        &.active {
          background-position: -50px -584px
        }
      }
      &-user {
        background-position: -602px -532px;
        &.active {
          background-position: -152px -532px;
        }
      }
    }
  }
}
</style>
