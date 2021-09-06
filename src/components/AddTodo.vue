<template>
  <validation-observer
      ref="observer"
      v-slot="{ invalid }"
  >
    <v-form @submit.prevent="submit" class="mb-4">
      <v-container>
        <v-row justify="center">
          <v-col
              cols="12"
              md="6"
          >
            <validation-provider
                v-slot="{ errors }"
                name="Название"
                rules="required"
            >
              <v-text-field
                  v-model.trim="title"
                  :error-messages="errors"
                  label="Название"
                  required
              ></v-text-field>
            </validation-provider>
            <v-btn
                class="mt-3"
                block
                type="submit"
                :disabled="invalid"
            >
              Добавить
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </validation-observer>
</template>

<script>
import { required } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('aggressive')

extend('required', {
  ...required,
  message: '{_field_} не может быть пустым',
})

export default {
  name: "AddTodo",
  data: () => ({
    valid: false,
    title: ''
  }),
  methods: {
    submit () {
      const todo = {
        id: Date.now(),
        title: this.title,
        completed: false
      }
      this.$emit('add', todo)
      this.$refs.observer.validate()
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
}
</script>

<style scoped>

</style>