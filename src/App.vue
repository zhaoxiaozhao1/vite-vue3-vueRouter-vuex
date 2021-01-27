<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- 传统写法 -->
    <p @click="$store.commit('add')">传统写法{{ $store.state.count }}</p>
    <!-- composition写法 -->
    <p @click="add">setup写法{{ count }}</p>
    <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
    <!-- <Todos></Todos> -->
    <!-- <router-view></router-view> -->

    <!-- keep-alive和之前的版本不一样了，之前在外边，现在放到里边，如下： -->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
import HelloWorld from "/comps/HelloWorld.vue";
import Todos from "./components/todos/Todos.vue";
import { useStore } from "vuex";
import { toRefs } from "vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    Todos,
  },
  setup(props) {
    const store = useStore();
    console.log(import.meta.env.VITE_TOKEN);
    // console.log(store);
    fetch("/api/users")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      });
    return {
      //   state: store.state,
      ...toRefs(store.state),
      add: () => store.state.count++,
    };
  },
};
</script>
