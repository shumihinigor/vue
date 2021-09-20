import { createRouter as _createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/todos',
    name: 'Todos',
    component: () => import(/* webpackChunkName: "about" */ '../views/Todos.vue')
  }
]

export const createRouter = () => {
  return _createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routes
  })
}
