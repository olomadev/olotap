<template>
  <action-button
    :icon="icon" 
    :tooltip="tooltip" 
    :disabled="disabled" 
    :color="state.color" 
    :is-active="isActive"
    >
      <color-picker 
        v-model="state.color" 
        :editor="editor" 
        action="color" 
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
const { state } = useContext();
import ActionButton from './ActionButton.vue';
import ColorPicker from './ColorPicker.vue';

export default {
  components: {
    ActionButton,
    ColorPicker
  },
  props: {
    editor: {
      type: Object,
      required: true
    },
    icon: {
      type: String,
      default: undefined
    },
    tooltip: {
      type: String,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    action: {
      type: Function,
      default: undefined
    },
    isActive: {
      type: Function,
      default: undefined
    }
  },
  data() {
    return {
      state
    };
  },
  methods: {
    onChange(color) {
      if (this.action) {
        this.action(color);
      }
    }
  },
  watch: {
    editor: {
      immediate: true,
      handler() {
        const { color: colorValue } = this.editor.getAttributes('textStyle');
        this.state.color = colorValue;
      }
    }
  }
};
</script>