<template>
  <action-button
    :icon="icon"
    :tooltip="tooltip"
    :disabled="disabled"
    :color="color"
    :is-active="isActive"
    :action="onAction"
  >
    <slot name="dialog" :props="{ editor, value: attrs.href, ...attrs }"></slot>
  </action-button>
</template>

<script>
import ActionButton from './ActionButton.vue';

export default {
  components: {
    ActionButton
  },
  props: {
    editor: {
      type: Object,
      required: true,
    },
    icon: {
      type: String,
      default: undefined,
    },
    tooltip: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: undefined,
    },
    action: {
      type: Function,
      default: undefined,
    },
    isActive: {
      type: Function,
      default: undefined,
    },
  },
  data() {
    return {
      attrs: {
        href: undefined,
        target: undefined,
        rel: undefined,
      },
    };
  },
  methods: {
    onAction() {
      const { href, target, rel } = this.editor.getAttributes('link');
      this.attrs = {
        href,
        target,
        rel,
      };
    },
  },
};
</script>