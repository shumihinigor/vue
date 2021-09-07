<template>
  <v-list-item :value="todo.id">
    <template v-slot:default>
      <v-row justify="space-between" align="center">
        <v-col
            cols="9"
            lg="10"
        >
          <v-checkbox
              class="my-0 py-0 mr-4"
              v-model="todo.completed"
              hide-details
              @click.stop
          >
            <template v-slot:label>
              <v-list-item-content :class="{ 'text-decoration-line-through': todo.completed }">
                <v-list-item-title>
                  <strong class="mr-2" v-text="index"></strong>
                  <span class="text-wrap">
                    {{ todo.title | capitalFirstLetter }}
                  </span>
                </v-list-item-title>
              </v-list-item-content>
            </template>
          </v-checkbox>
        </v-col>

        <v-col
            cols="3"
            lg="2"
            class="text-right"
        >
          <v-list-item-action class="mr-0">
            <v-btn elevation="1" icon @click.stop="deleteTodo(index - 1)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-col>
      </v-row>
    </template>

  </v-list-item>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const {  mapActions } = createNamespacedHelpers('todos');

export default {
	name: "TodoItem",
  props: {
    todo: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: () => 0
    }
  },

  filters: {
    capitalFirstLetter(value) {
      return value[0].toUpperCase() + value.slice(1, value.length)
    }
  },

  methods: {
    ...mapActions([
      'deleteTodo'
    ])
  },
}
</script>

<style scoped>

</style>