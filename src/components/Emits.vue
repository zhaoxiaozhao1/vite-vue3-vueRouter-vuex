<template>
  <div @click="$emit('click')">点击我</div>
</template>

<script>
export default {
  emits: ["click"],
  setup() {
    return {};
  },
};
</script>

<style>
</style> 