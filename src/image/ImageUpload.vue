<template>
  <v-form :disabled="loading">
    <v-file-input
      :class="getClass"
      :density="getDensity" 
      :variant="getVariant" 
      v-model="form.file"
      :label="$t('editor.image.dialog.form.file')"
      accept="image/*"
      :loading="loading"
      prepend-icon="mdi-file-plus-outline"
      @update:model-value="onFileSelected"
      @click:clear="form = { ...form, src: undefined }"
    />

    <v-text-field
      :class="getClass"
      :density="getDensity" 
      :variant="getVariant" 
      v-model="form.src"
      :label="$t('editor.image.dialog.form.link')"
      disabled
      autofocus
      prepend-icon="mdi-link-variant"
    />

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
      v-model="form.lockAspectRatio" 
      :label="$t('editor.image.dialog.form.aspectRatio')"
    ></v-checkbox>
  </v-form>
</template>

<script>
import { computed, unref } from 'vue';
import { useContext } from "../hooks/use-context";

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
    }
  },
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
  methods: {
    async onFileSelected(files) {
      const file = files instanceof File ? files : files[0];
      if (!file) {
        console.error('No files to upload');
        return;
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
