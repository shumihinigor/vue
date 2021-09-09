<template>
	<div class="todos">
		<select
			id="select"
			name="select"
			v-model="localFilter"
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
import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions, mapState, mapMutations} = createNamespacedHelpers('todos');
import TodoList from '@/components/TodoList'
import AddTodo from '@/components/AddTodo'

export default {
	name: 'Todos',
	computed: {
		...mapState([
			'filter'
		]),
		localFilter: {
			get() {
				return this.filter;
			},
			set(filter) {
				this.setFilter(filter);
			}
		},
		...mapGetters([
			'todos',
			'loading',
			'filterItems',
			'filteredTodos'
		])
	},
	methods: {
		...mapActions([
			'getTodos'
		]),
		...mapMutations([
			'setFilter'
		])
	},
	mounted() {
		if (this.todos.length) return
		this.getTodos();
	},
	components: {
		TodoList, AddTodo
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