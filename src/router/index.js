import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    meta: {
      group: 0
    }
  },
  {
    path: '/todos',
    name: 'Todos',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Todos.vue'),
    meta: {
      group: 1
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
