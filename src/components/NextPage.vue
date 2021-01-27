<!--  -->
<template>
  <div>nextpage</div>
</template>

<script>
import { emitter } from "./HelloWorld.vue";
export default {
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    emitter.on("someEvent", (msg) => {
      console.log(emitter);
      console.log("nextPage=>", msg);
    });
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>