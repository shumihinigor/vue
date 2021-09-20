<template>
	<li>
		<span :class="{ 'done': todo.completed }">
			<input
				:id="todo.id"
				:checked="todo.completed"
				type="checkbox"
				@change="todo.completed = !todo.completed"
			>
			<label :for="todo.id">
				<strong>{{ index }}</strong>
				{{ capitalFirstLetter(todo.title) }}
			</label>
		</span>
		<button @click="deleteTodo">&times;</button>
	</li>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('todos');

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
	methods: {
		...mapActions([
			'deleteTodo'
		]),
		capitalFirstLetter(value) {
			return value[0].toUpperCase() + value.slice(1, value.length)
		}
	}
}
</script>

<style scoped>
	li {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		border: 1px solid gray;
		padding: 10px;
		margin-bottom: 15px;
		border-radius: 5px;
		font-size: 16px;
		line-height: 20px;
	}
	li input {
		margin: -2px 10px 0 0;
	}
	li label {
		cursor: pointer;
	}
	li button {
		width: 25px;
		height: 25px;
		background: green;
		color: white;
		border-radius: 50%;
		font-weight: bold;
		margin-left: auto;
		border: none;
		padding: 5px;
		transition: all .2s;
		cursor: pointer;
	}
	li button:hover {
		background: darkgreen;
	}
	li button:active {
		background: red;
	}
	.done {
		text-decoration: line-through;
	}
</style>