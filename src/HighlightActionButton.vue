<template>
  <action-button 
    :icon="icon" 
    :tooltip="tooltip" 
    :disabled="disabled" 
    :color="state.highlight" 
    :is-active="isActive"
  >
    <color-picker 
      v-model="state.highlight" 
      :editor="editor" 
      action="highlight" 
      activator="parent" 
      :nudge-top="-4" 
      :nudge-left="8" 
      @change="onChange"
    >
    </color-picker>
  </action-button>
</template>

<script>
import { useContext } from './hooks/use-context';
import ActionButton from './ActionButton.vue';
import ColorPicker from './ColorPicker.vue';

export default {
  components: {
    ActionButton,
    ColorPicker,
  },
  props: {
    editor: { type: Object, required: true },
    icon: { type: String, default: undefined },
    tooltip: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    action: { type: Function, default: undefined },
    isActive: { type: Function, default: undefined }
  },
  data() {
    return {
      state: useContext().state
    };
  },
  methods: {
    onChange(color) {
      if (this.action) this.action(color);
    }
  },
  watch: {
    editor: {
      handler() {
        const { color: highlightValue } = this.editor.getAttributes('highlight');
        this.state.highlight = highlightValue;
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
