<template>
	<div class="todos">
		<select
			id="select"
			name="select"
			v-model="filter"
		>
			<option
				v-for="option in filterItems"
				:key="option.id"
				:value="option.id"
			>{{ option.text }}</option>
		</select>
		<AddTodo />
		<div
			v-if="loading"
			v-text="'Loading'"
		/>
		<TodoList v-else-if="filteredTodos.length" />
		<div
			v-else
			v-text="'Ничего не нашлось'"
		/>
	</div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex';

import TodoList from '@/components/TodoList'
import AddTodo from '@/components/AddTodo'

export default {
	name: 'Todos',
	components: { TodoList, AddTodo },
	setup() {
		const store = useStore()

		// access a state in computed function
		const filter = computed({
			get: () => store.getters['todos/filter'],
			set: filter => setFilter(filter)
		});

		// access a getter in computed function
		const todos = computed(() => store.getters['todos/todos']);
		const loading = computed(() => store.getters['todos/loading']);
		const filterItems = computed(() => store.getters['todos/filterItems']);
		const filteredTodos = computed(() => store.getters['todos/filteredTodos']);

		// access a mutation
		const setFilter = (filter) => store.commit('todos/setFilter', filter);

		// access an action
		const getTodos = () => store.dispatch('todos/getTodos');

		// mounted
		onMounted(() => {
			if (todos.value.length) return
			getTodos()
		});

		return {
			filter,
			todos,
			loading,
			filterItems,
			filteredTodos
		}
	}
};
</script>

<style scoped>
	select {
		box-sizing: border-box;
		background-color: transparent;
		padding: 5px 20px 5px 5px;
		margin: 0;
		font-size: 12px;
		line-height: 14px;
		outline: none;
		border: 1px solid gray;
		border-radius: 5px;
		height: 30px;
		width: 300px;
	}
	select::-ms-expand {
		display: none;
	}
</style>