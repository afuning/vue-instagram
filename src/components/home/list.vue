<template>
  <div class="thread-list">
    <div class="">
      <thread-cpt v-for="item in threads" :key="item.node.id" :thread="item"></thread-cpt>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ThreadCpt from './cpt/ThreadCpt';

export default {
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  computed: mapState({
    threads: state => state.threads.threads,
  }),
  created() {
    this.$store.dispatch('getThreads');
  },
  components: {
    ThreadCpt,
  },
};
</script>

<style scoped>

</style>
