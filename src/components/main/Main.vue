<template>
  <div id="main">
    <router-view></router-view>
    <tabbar></tabbar>
  </div>
</template>

<script>
import Tabbar from '@/baseCpt/Tabbar';

export default {
  name: 'app',
  components: {
    Tabbar,
  },
};
</script>

<style>
</style>
