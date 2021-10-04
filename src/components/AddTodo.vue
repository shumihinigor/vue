<template>
	<form @submit.prevent="submit">
		<input v-model="title" type="text">
		<button :disabled="!title" type="submit">Create</button>
	</form>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from "vue";

export default {
	name: "AddTodo",
	setup() {
		const store = useStore()

		// access a state in computed function
		const title = computed({
			get: () => store.getters['todos/title'],
			set: title => setTitle(title)
		});


		// access a getter in computed function
		// ...

		// access a mutation
		const setTitle = (title) => store.commit('todos/setTitle', title);

		// access an action
		const submit = () => store.dispatch('todos/submit');

		return { title, submit }
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