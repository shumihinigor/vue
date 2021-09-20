<template>
	<form @submit.prevent="submit">
		<input v-model="localTitle" type="text">
		<button :disabled="!localTitle" type="submit">Create</button>
	</form>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('todos');

export default {
	name: "AddTodo",
	computed: {
		...mapState([
			'title'
		]),
		localTitle: {
			get() {
				return this.title;
			},
			set(title) {
				this.setTitle(title);
			}
		}
	},
	methods: {
		...mapActions([
			'submit'
		]),
		...mapMutations([
			'setTitle'
		]),
	}
}
</script>

<style scoped>
	form {
		padding: 20px;
	}
	form input {
		width: 300px;
		height: 30px;
		max-height: 30px;
		border-radius: 5px;
		border: 1px solid gray;
		padding: 5px;
		box-sizing: border-box;
		margin-right: 10px;
		outline: none;
	}
	form button {
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
	form button:disabled {
		background: gray;
		cursor: default;
	}
</style>