<template>
  <ul>
    <li>
      <!-- <router-link to="/">dashboard</router-link> -->
      <NavLink to="/"></NavLink>
    </li>
    <li>
      <NavLink to="/todos"></NavLink>
      <!-- <router-link to="/todos">todos</router-link> -->
    </li>
    <li>
      <NavLink to="/about"></NavLink>
      <!-- <router-link to="/about">todos</router-link> -->
    </li>
    <li>
      <!-- <router-link to='/about' tag="span" event="dblclick">about</router-link>   先前版本写法 -->
      <router-link to="/about" custom v-slot="{ navigate }">
        <!-- 修改默认a标签    -->
        <span @dblclick="navigate">about-custom dblclick</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
import NavLink from "./NavLink.vue";
export default {
  components: { NavLink },
  setup() {
    return {};
  },
};
</script>

<style scoped>
</style>