<template>
  <div>
    <h1>{{ msg }}</h1>
    <input type="text" v-on:keyup.esc="alertFn" />
    <!-- <button @click="count++">count is: {{ count }}</button> -->
    <p>
      Edit <code>components/HelloWorld.vue</code> to test hot module
      replacement.
    </p>
    <h1>{{ msg2 }}</h1>
    <h1>{{ counter }}</h1>
    <h2>{{ dobuleCounter }}</h2>
    <p ref="desc1"></p>
    <!-- 模态窗口 -->
    <ModelButton></ModelButton>
    <Emits @click="onClick"></Emits>
    <!-- 函数式组建 -->
    <Functional class="h11" @click="alertFn" data-cl="3333" level="3"
      >动态h元素</Functional
    >
    <!-- 异步组建 -->
    <AsynComp></AsynComp>
    <!-- 自定义指令 -->
    <p v-highlight="'green'">highlight this text!</p>
    <!-- 动画 -->
    <TransitionTest></TransitionTest>
    <!-- 编程方式发送和监听事件 -->
    <button @click="sendMessage">emit event</button>
  </div>
</template>

<script>
import {
  reactive,
  computed,
  onMounted,
  onUnmounted,
  ref,
  toRefs,
  watch,
  defineAsyncComponent,
} from "vue";
import ModelButton from "./ModalButton.vue";
import Emits from "./Emits.vue";
import Functional from "./Functional.vue";
import TransitionTest from "./TransitionTest.vue";

//事件派发
import mitt from "mitt";

export const emitter = mitt();

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    ModelButton,
    Emits,
    Functional,
    // AsynComp: defineAsyncComponent(() => import("./NextPage.vue")),
    AsynComp: defineAsyncComponent({
      loader: () => import("./NextPage.vue"),
      delay: 2000,
      timeout: 5000,
    }),
    TransitionTest,
  },
  setup() {
    const { counter, dobuleCounter } = useCounter();

    const msg2 = ref("some message");

    //使用元素
    const desc1 = ref(null);

    //监听器
    watch(counter, (val, oldVal) => {
      const p = desc1.value;
      p.textContent = `counter change from ${oldVal} to ${val}`;
    });

    return { counter, dobuleCounter, msg2, desc1 };
  },
  methods: {
    onClick() {
      console.log("click me!");
    },
    alertFn() {
      alert("12323");
    },
    sendMessage() {
      emitter.emit("someEvent", "foooooooo");
    },
  },
};
function useCounter() {
  const data = reactive({
    counter: 1,
    dobuleCounter: computed(() => data.counter * 2),
  });
  let timer;

  onMounted(() => {
    // timer = setInterval(() => {
    //   data.counter++;
    // }, 1000);
  });
  onUnmounted(() => {
    clearInterval(timer);
  });

  return toRefs(data);
}
</script>
