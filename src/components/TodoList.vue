<template>
	<div>
		<ul>
			<TodoItem
			v-for="(todo, idx) in filteredTodos"
			:todo="todo"
			:index="idx"
			:key="todo.id"
			/>
		</ul>
		<button
			:disabled="disabledButton"
			@click="getTodos"
		>
			<transition name="fade">
				<span v-if="loadingMore">Loading</span>
				<span v-else>More</span>
			</transition>
		</button>
	</div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex';

import TodoItem from '@/components/TodoItem';

export default {
	name: "TodoList",
	components: { TodoItem },
	setup() {
		const store = useStore()

		// access a getter in computed function
		const filteredTodos = computed(() => store.getters['todos/filteredTodos']);
		const loadingMore = computed(() => store.getters['todos/loadingMore']);
		const disabledButton = computed(() => store.getters['todos/disabledButton']);

		// access an action
		const getTodos = () => store.dispatch('todos/getTodos')

		return {
			filteredTodos,
			loadingMore,
			disabledButton,
			getTodos
		}
	}
}
</script>

<style scoped>
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	button {
		width: 100px;
		height: 30px;
		max-height: 30px;
		background: green;
		color: white;
		font-weight: bold;
		border: none;
		padding: 5px;
		transition: all .2s;
		cursor: pointer;
		border-radius: 5px;
	}
	button:disabled {
		background: gray;
		cursor: default;
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
		opacity: 0;
	}
</style>