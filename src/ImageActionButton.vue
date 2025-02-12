<template>
  <action-button
    :icon="icon"
    :tooltip="tooltip"
    :disabled="disabled"
    :color="color"
    :is-active="isActive"
    :action="onAction"
  >
    <slot name="dialog" :props="{ editor, value: model, imageTabs, hiddenTabs, upload }"></slot>
  </action-button>
</template>

<script>
import ActionButton from './ActionButton.vue';

export default {
  components: {
    ActionButton,
  },
  props: {
    editor: {
      type: Object,
      required: true,
    },
    upload: {
      type: Function,
      default: undefined,
    },
    imageTabs: {
      type: Array,
      default: () => [],
    },
    hiddenTabs: {
      type: Array,
      default: () => [],
    },
    icon: {
      type: String,
      default: "mdi-image-plus",
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
      model: {
        src: '',
        alt: '',
        title: '',
        width: '',
        height: '',
        display: '',
        lockAspectRatio: true,
      },
    };
  },
  methods: {
    onAction() {
      const selection = this.editor?.view.state.selection;
      const attrs = selection?.node?.attrs || {};

      if (attrs?.src) this.model.src = attrs.src;
      if (attrs?.alt) this.model.alt = attrs.alt;
      if (attrs?.title) this.model.title = attrs.title;
      if (attrs?.width) this.model.width = attrs.width;
      if (attrs?.height) this.model.height = attrs.height;
      if (attrs?.display) this.model.display = attrs.display;
      this.model.lockAspectRatio = attrs.lockAspectRatio ?? true;
    },
  },
};
</script>
