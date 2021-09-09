import axios from 'axios';

// initial state
const state = () => ({
    disabledButton: false,
    filterItems: [
        {
            id: 'all',
            text: 'Все'
        },
        {
            id: 'completed',
            text: 'Завершенные'
        },
        {
            id: 'not_completed',
            text: 'Не завершенные'
        },
    ],
    loadingMore: false,
    loading: true,
    filter: '',
    todos: [],
    title: '',
    limit: 0
})

// getters
const getters = {
    todos(state) { return state.todos },
    filter(state) { return state.filter },
    loading(state) { return state.loading },
    loadingMore(state) { return state.loadingMore },
    filterItems(state) { return state.filterItems },
    disabledButton(state) { return state.disabledButton },
    filteredTodos(state) {
        if (state.filter === 'all') return state.todos
        if (state.filter === 'completed') return state.todos.filter(todo => todo.completed)
        if (state.filter === 'not_completed') return state.todos.filter(todo => !todo.completed)
        return state.todos
    }
}

// actions
const actions = {
    async getTodos({ state, commit }) {
        commit('setLoadingMore', true)
        commit('setLimit')
        await axios
            .get(`https://jsonplaceholder.typicode.com/todos?_limit=${state.limit}`)
            .then((response) => {
                commit('setTodos', response.data)
            })
            .finally(() => {
                commit('setLoading', false)
                commit('setLoadingMore', false)
                if (state.todos.length < state.limit) commit('setDisabledButton', true)
            })
    },

    changeFilter({ commit }, event) {
        commit('setFilter', event)
    },

    deleteTodo({ commit }, index) {
        commit('spliceTodos', index)
    },

    submit({ state, commit }, observer) {
        observer.validate().then(result => {
            if (!result) return
            const todo = {
                id: Date.now(),
                title: state.title,
                completed: false
            }
            commit('pushTodos', todo)
            commit('setTitle', '')

        })
    }
}

// mutations
const mutations = {
    setDisabledButton(state, value) {
        state.disabledButton = value
    },
    setLoadingMore(state, value) {
        state.loadingMore = value
    },
    spliceTodos(state, index) {
        state.todos.splice(index, 1)
    },
    setLoading(state, value) {
        state.loading = value
    },
    setFilter(state, value) {
        state.filter = value
    },
    pushTodos(state, todo) {
        state.todos.push(todo)
    },
    setTodos(state, todos) {
        state.todos = todos
    },
    setLimit(state) {
        state.limit += 15
    },
    setTitle(state, title) {
        state.title = title
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}