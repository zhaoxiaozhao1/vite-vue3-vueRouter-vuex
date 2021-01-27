import { createApp, h } from 'vue'
import App from './App.vue'
import EditTodo from './components/todos/editTodo.vue'
import Todos from './components/todos/Todos.vue'
import NavLink from './components/NavLink.vue'
import Dashboard from './components/Dashboard.vue'
import NotFound from './components/NotFound.vue'
import './index.css'
import {createRouter, createWebHashHistory,createWebHistory} from 'vue-router'
import {createStore} from 'vuex'

//创建vuex store
const store=createStore({
    state(){
        return{
            count:1
        }
    },
    mutations:{
        add(state){
            state.count++;
        }
    }
})

//实例创建方式
const router=createRouter({
    history:createWebHistory('/yippo-web'),
    strict:false,   //：后的参数
    sensitive:false, //大小写
    routes:[
        {path:'/',name:'dashboard',component:Dashboard},
        {path:'/todos',name:'todos',component:Todos},
        {
            path:"/:pathMath(.*)*",
            name:"not-found",
            component:NotFound,
        }
    ],
    scrollBehavior(to,from,savedPosition){  //跳转页面记录之前页面的位置
        if(savedPosition){
            return savedPosition
        }else{
            return {top:0}              //之前是{x:0,y:0} vue-router 4 改为了{x:0,y:0}
        }
    }
})
//使用命名导航至404页面
// router.resolve({
//     name:'not-found',
//     params:{
//         pathMath:['not','found']
//     }
// }).href   

// 特性：动态路由
router.addRoute({
    path:'/about',
    meta:{
        hidden:false,
    },
    name:'about',
    component:()=>import('./components/About.vue')
})
router.addRoute('about',{
    path:'/about/info',
    name:"info",
    component:{
        render(){
            return h('div','info page')
        }
    }
})

createApp(App)
.use(router)
.use(store)
.directive('highlight',{
    beforeMount(el,binding,vnode) {
        el.style.background = binding.value
    },
}).component('EditTodo',EditTodo)
.component('NavLink',NavLink)
.mount('#app')
