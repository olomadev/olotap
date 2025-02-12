<template>
  <v-form>
    <v-text-field
      density="compact"
      variant="outlined"
      v-model="form.src"
      :label="$t('editor.image.dialog.form.link')"
      autofocus
      prepend-icon="mdi-link-variant"
    >
    </v-text-field>

    <v-text-field 
      density="compact"
      variant="outlined"
      v-model="form.alt" 
      :label="$t('editor.image.dialog.form.alt')" 
      prepend-icon="mdi-text"
      >
    </v-text-field>

    <v-checkbox 
      density="compact"
      variant="outlined"
      v-model="form.lockAspectRatio" 
      :label="$t('editor.image.dialog.form.aspectRatio')"
    >
    </v-checkbox>
  </v-form>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:modelValue'],
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
