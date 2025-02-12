<template>
  <action-button
    :icon="icon"
    :tooltip="tooltip"
    :disabled="disabled"
    :color="color"
    :action="action"
    :is-active="isActive"
  >
    <table-menu :editor="editor" activator="parent" />
  </action-button>
</template>

<script>
import ActionButton from './ActionButton.vue';
import TableMenu from './table/TableMenu.vue';

export default {
  components: {
    ActionButton,
    TableMenu
  },
  props: {
    editor: {
      type: Object,
      required: true,
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
    color: {
      type: String,
      default: undefined
    },
    action: {
      type: Function,
      default: undefined
    },
    isActive: {
      type: Function,
      default: undefined
    }
  }
};
</script>
