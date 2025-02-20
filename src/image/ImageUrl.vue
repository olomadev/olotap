<template>
  <v-form>
    <v-text-field
      :class="getClass"
      :density="getDensity"
      :variant="getVariant"
      v-model="form.src"
      :label="$t('editor.image.dialog.form.link')"
      autofocus
      prepend-icon="mdi-link-variant"
    >
    </v-text-field>

    <v-text-field 
      :class="getClass"
      :density="getDensity"
      :variant="getVariant"
      v-model="form.alt" 
      :label="$t('editor.image.dialog.form.alt')" 
      prepend-icon="mdi-text"
      >
    </v-text-field>

    <v-checkbox 
      :class="getClass"
      :density="getDensity"
      :variant="getVariant"
      v-model="form.lockAspectRatio" 
      :label="$t('editor.image.dialog.form.aspectRatio')"
    >
    </v-checkbox>
  </v-form>
</template>

<script>
import { computed } from 'vue';
import { useContext } from "../hooks/use-context";

export default {
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:modelValue'],
  setup() {
    const context = useContext();
    return {
      getClass: computed(() => context.state.inputClass),
      getDensity: computed(() => context.state.inputDensity),
      getVariant: computed(() => context.state.inputVariant),
    }
  },
  computed: {
    form: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      },
    },
  },
};
</script>
