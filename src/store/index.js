import { createStore as _createStore } from 'vuex'

// modules
import todos from './modules/todos'

// Create a new store instance.
export const createStore = () => {
  return _createStore({
    state() {
      return {}
    },
    mutations: {
    },
    actions: {
    },
    modules: {
      todos
    }
  })
}