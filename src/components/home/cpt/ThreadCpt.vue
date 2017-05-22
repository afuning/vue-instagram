<template>
  <div class="thread">
    <div class="thread-item">
      <div class="thread-header">
        <div class="thread-header-avator">
        </div>
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
.thread {
  &-item {

  }
  &-header {
    &-avator {
      size: var(--head-small);
    }
  }
}
</style>
