<template>
  <div class="tabbar">
    <div class="tabbar-container">
      <div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<style scoped>
  .tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4.4rem;
    &-container {
      display: flex;
    }
  }
</style>
