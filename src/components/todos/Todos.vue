<template>
  <div>
    <button @click="backToDash">返回</button>
    <!-- 新增todo -->
    <EditTodo
      type="text"
      v-model="newTodo"
      @keyup.enter="addTodo"
      autofocus
      placeholder="新增今日代办"
      autocomplete="off"
    >
    </EditTodo>
    <!-- todos列表 -->
    <ul>
      <li
        v-for="todo in filterdTodos"
        :key="todo.id"
        :class="{ completed: todo.completed, editing: todo === editedTodo }"
      >
        <!-- 绑定完成状态 -->
        <div class="view">
          <input type="checkbox" v-model="todo.completed" />
          <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
          <button style="margin-left: 20px" @click="removeTodo(todo)">
            删除
          </button>
        </div>
        <!-- 编辑代办 -->
        <!-- <input
          type="text"
          class="edit"
          v-todo-foucus="todo === editedTodo"
          v-model="todo.title"
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          @keyup.escape="cancelEdit(todo)"
        /> -->
        <EditTodo
          type="text"
          class="edit"
          v-model="todo.title"
          v-todo-foucus="todo === editedTodo"
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          @keyup.escape="cancelEdit(todo)"
        >
        </EditTodo>
      </li>
    </ul>

    <!-- 过滤 -->
    <p class="filters">
      <span
        @click="visibility = 'all'"
        :class="{ selected: visibility === 'all' }"
        >All</span
      >
      <span
        @click="visibility = 'active'"
        :class="{ selected: visibility === 'active' }"
        >Active</span
      >
      <span
        @click="visibility = 'completed'"
        :class="{ selected: visibility === 'completed' }"
        >Completed</span
      >
    </p>
  </div>
</template>

<script>
import { computed, reactive, toRefs, watch, watchEffect } from "vue";
import {
  useRouter,
  useRoute,
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
} from "vue-router";

const filters = {
  all(todos) {
    return todos;
  },
  active(todos) {
    return todos.filter((todo) => !todo.completed);
  },
  completed(todos) {
    return todos.filter((todo) => todo.completed);
  },
};

// 缓存操作
const todoStorage = {
  fetch() {
    let todos = JSON.parse(localStorage.getItem("vue3-todos")) || [];
    todos.forEach((todo, index) => {
      todo.id = index + 1;
    });
    return todos;
  },
  save(todos) {
    localStorage.setItem("vue3-todos", JSON.stringify(todos));
  },
};

export default {
  setup() {
    const state = reactive({
      newTodo: "",
      todos: todoStorage.fetch(),
      beforeEditCache: "", //缓存修改前的title
      editedTodo: null, //正在编辑的todo
      visibility: "all",
      filterdTodos: computed(() => {
        return filters[state.visibility](state.todos);
      }),
    });
    function addTodo() {
      state.todos.push({
        id: state.todos.length + 1,
        title: state.newTodo,
        completed: false,
      });
      state.newTodo = "";
    }
    function editTodo(todo) {
      state.beforeEditCache = todo.title;
      state.editedTodo = todo;
    }
    function removeTodo(todo) {
      state.todos.splice(state.todos.indexOf(todo), 1);
    }
    function doneEdit(todo) {
      state.editedTodo = null;
    }
    function cancelEdit(todo) {
      todo.title = state.beforeEditCache;
      state.editTodo = null;
    }

    watchEffect(() => {
      todoStorage.save(state.todos);
    });

    //获取路由实例
    const router = useRouter();

    //route是响应式对象，可监听
    const route = useRoute();
    watch(
      () => route.query,
      (query) => {
        console.log(query, "-------");
      }
    );

    //路由守卫
    onBeforeRouteLeave((to, from) => {
      const answer = window.confirm("确定离开当前页面？");
      if (!answer) {
        return false;
      }
    });
    // onBeforeRouteUpdate()

    return {
      ...toRefs(state),
      addTodo,
      removeTodo,
      editTodo,
      doneEdit,
      cancelEdit,
      backToDash() {
        router.push("/");
      },
    };
  },
  directives: {
    "todo-foucus": (el, { value }) => {
      if (value) {
        el.focus();
      }
    },
  },
};
</script>

<style scoped>
.completed label {
  text-decoration: line-through;
}
.edit,
.editing .view {
  display: none;
}
.view,
.editing .edit {
  display: block;
}
.filters > span {
  padding: 2px 4px;
  margin-right: 4px;
  border: 1px solid transparent;
}
.filters > span.selected {
  border-color: rgba(173, 47, 47, 0.2);
}
</style>