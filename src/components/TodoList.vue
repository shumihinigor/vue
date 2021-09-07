<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-list class="pa-0" rounded>
          <v-list-item-group
              :value="selectedTodos"
              color="primary"
              multiple
          >
            <TodoItem
                v-for="(todo, idx) in filteredTodos"
                :todo="todo"
                :index="idx + 1"
                :key="todo.id"
            />
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-btn
            class="mt-3"
            color="primary"
            block
            :loading="loadingMore"
            :disabled="disabledButton"
            @click="getTodos"
        >
          Ещё
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('todos');

import TodoItem from "./TodoItem";
export default {
  name: "TodoList",

  computed: {
    ...mapGetters([
      'filteredTodos',
      'loadingMore',
      'disabledButton'
    ]),
    selectedTodos() {
      return this.filteredTodos.filter(t => t.completed).map(t => t.id)
    }
  },

  methods: {
    ...mapActions([
        'getTodos'
    ])
  },

  components: {
	TodoItem
  }
}
</script>

<style scoped>

</style>