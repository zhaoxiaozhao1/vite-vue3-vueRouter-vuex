<template>
  <div>
    about
    <router-view></router-view>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted } from "vue";
export default {
  setup() {
    const route = useRoute();
    onMounted(() => {
      console.log(route.query);
      console.log(route.matched[0]); //用于获取路由（父级和自己）之前的parent被删除
    });
    return {};
  },
};
</script>

<style scoped>
</style>