<template>
  <div>
    <input
      type="text"
      :value="modelValue"
      @input="onInputChange"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  methods: {
    onInputChange(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>

<style scoped>
</style>