<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-list class="pa-0" rounded>
          <v-list-item-group
              v-model="selected"
              color="primary"
              multiple
          >
            <TodoItem
                v-for="(todo, idx) in todos"
                :todo="todo"
                :index="idx + 1"
                :key="todo.id"
                @delete="$emit('delete', todo.id)"
            ></TodoItem>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TodoItem from "./TodoItem";
export default {
  name: "TodoList",
  props: {
    todos: {
      type: Array,
      default: () => []
    }
  },

  watch: {
    todos(todos) {
      this.changeSelectedTodos(todos);
    }
  },

  data: () => ({
    selected: []
  }),

  methods: {
    changeSelectedTodos(todos) {
      this.selected = todos.filter(t => t.completed).map(t => t.id)
    }
  },

  created() {
    this.changeSelectedTodos(this.todos)
  },

  components: {
	TodoItem
  }
}
</script>

<style scoped>

</style>