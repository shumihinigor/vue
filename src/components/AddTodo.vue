<template>
  <validation-observer ref="observer">
    <v-form @submit.prevent="submit($refs.observer)" class="mb-4">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="6">
            <validation-provider
                v-slot="{ errors }"
                name="Название"
                rules="required"
            >
              <v-text-field
                  v-model="localTitle"
                  :error-messages="errors"
                  label="Название"
                  required
                  @input="setTitle"
              ></v-text-field>
            </validation-provider>
            <v-btn
                class="mt-3"
                block
                color="primary"
                type="submit"
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
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('todos');

import { required } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('passive')

extend('required', {
  ...required,
  message: '{_field_} не может быть пустым',
})

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
        console.log(title)
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
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
}
</script>

<style scoped>

</style>