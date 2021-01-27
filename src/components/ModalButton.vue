<template>
  <div>
    <button @click="modelOpen = true">弹出一个模态窗</button>

    <teleport to="body">
      <div v-if="modelOpen" class="modal">
        <p>
          这个是个弹窗
          <button @click="modelOpen = false">关闭</button>
        </p>
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  //   name: "ModalButton",
  data() {
    return {
      modelOpen: false,
    };
  },
  setup() {
    return {};
  },
};
</script>

<style scoped >
.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
}
</style>