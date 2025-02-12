<template>
  <v-form :disabled="loading">
    <v-file-input
      density="compact" 
      variant="outlined"
      v-model="form.file"
      :label="$t('editor.image.dialog.form.file')"
      accept="image/*"
      :loading="loading"
      prepend-icon="mdi-file-plus-outline"
      @update:model-value="onFileSelected"
      @click:clear="form.src = undefined"
    />

    <v-text-field
      density="compact"
      variant="outlined"
      v-model="form.src"
      :label="$t('editor.image.dialog.form.link')"
      disabled
      autofocus
      prepend-icon="mdi-link-variant"
    />
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
      v-model="form.lockAspectRatio" 
      :label="$t('editor.image.dialog.form.aspectRatio')"
    ></v-checkbox>
  </v-form>
</template>

<script>
import { unref } from 'vue';

export default {
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    upload: {
      type: Function,
      default: undefined,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      loading: false,
    };
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
  methods: {
    async onFileSelected(files) {
      const file = files instanceof File ? files : files[0];
      if (!file) {
        throw new Error('No files to upload');
      }
      try {
        this.loading = true;
        const data = await this.upload?.(file);
        if (!data) {
          throw new Error('No link received after upload');
        }
        this.form = {
          ...unref(this.form),
          src: data,
        };
      } catch (err) {
        console.error(`Failed to execute upload file: ${err}`);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
