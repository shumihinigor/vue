<template>
  <div class="text-center">
    <AddTodo />
    <v-container>
      <v-row justify="center">
        <v-col
            cols="12"
            md="6"
        >
          <v-select
              :items="filterItems"
              label="Фильтр"
              item-text="text"
              item-value="id"
              @change="changeFilter"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
    <v-divider />
    <v-progress-circular
        v-if="loading"
        :size="70"
        :width="7"
        indeterminate
        class="my-4"
        color="primary"
    ></v-progress-circular>
    <TodoList
        v-else-if="filteredTodos.length"
        class="my-4"
    />
    <div
        v-else
        class="text-h5 my-4"
        v-text="'Ничего не нашлось'"
    />
  </div>
</template>


<script>
import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('todos');

import TodoList from '@/components/TodoList'
import AddTodo from '@/components/AddTodo'

export default {
  name: 'Todos',

  computed: {
    ...mapGetters([
        'todos',
        'loading',
        'filterItems',
        'filteredTodos',
        'filter'
    ])
  },

  methods: {
    ...mapActions([
      'getTodos',
      'deleteTodo',
      'addTodo',
      'changeFilter'
    ])
  },

  mounted() {
    this.getTodos();
  },

  components: {
    TodoList, AddTodo
  },
};
</script>

<style scoped>

</style>