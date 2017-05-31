<template>
  <div class="home-container">
    <topbar></topbar>
    <div class="thread-list">
      <list></list>
    </div>
  </div>
</template>

<script>
import Topbar from '@/baseCpt/Topbar';
import List from './list';

export default {
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  mounted() {
    console.log(1);
  },
  components: {
    Topbar,
    List,
  },
};
</script>

<style scoped>
</style>
