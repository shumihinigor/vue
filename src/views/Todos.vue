<template>
  <div class="text-center">
    <AddTodo
        @add="addTodo"
    ></AddTodo>
    <v-container>
      <v-row justify="center">
        <v-col
            cols="12"
            md="6"
        >
          <v-select
              :items="items"
              label="Фильтр"
              v-model="filter"
              item-text="text"
              item-value="id"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-progress-circular
        v-if="loading"
        :size="70"
        :width="7"
        indeterminate
        class="my-4"
        color="primary"
    ></v-progress-circular>
    <TodoList
        v-else-if="this.todos.length"
        class="my-4"
        :todos="filteredTodos"
        @delete="deleteTodo"
    ></TodoList>
    <div
        v-else
        class="text-h5 my-4"
        v-text="'Ничего не нашлось'"
    ></div>
  </div>
</template>


<script>
import TodoList from '@/components/TodoList'
import AddTodo from '@/components/AddTodo'

export default {
  name: 'Todos',

  data: () => ({
    todos: [],
    loading: true,
    items: [
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
    filter: ''
  }),

  computed: {
    filteredTodos() {
      if (this.filter === 'all') return this.todos
      if (this.filter === 'completed') return this.todos.filter(todo => todo.completed)
      if (this.filter === 'not_completed') return this.todos.filter(todo => !todo.completed)
      return this.todos
    }
  },

  methods: {
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
    },
    addTodo(todo) {
      this.todos.push(todo)
    },
    getTodos() {
      this.axios
          .get('https://jsonplaceholder.typicode.com/todos?_limit=10')
          .then((response) => {
            this.todos = response.data
          })
          .finally(() => {
            this.loading = false
          })
    }
  },

  mounted() {
    this.getTodos()
  },

  components: {
    TodoList, AddTodo
  },
};
</script>

<style scoped>

</style>