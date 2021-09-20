import { createApp } from 'vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import App from './App.vue'

const store = createStore()
const router = createRouter()

sync(store, router)

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
