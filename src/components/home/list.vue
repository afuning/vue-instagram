<template>
  <div class="thread-list">
    <div class="">
      <thread-cpt></thread-cpt>
    </div>
  </div>
</template>

<script>
import ThreadCpt from './cpt/ThreadCpt';

export default {
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  created() {
    this.$store.dispatch('getListAction');
  },
  components: {
    ThreadCpt,
  },
};
</script>

<style scoped>

</style>
