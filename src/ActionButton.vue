<template>
  <v-btn
    class="rounded me-1 ms-0"
    density="comfortable"
    size="small"
    :disabled="disabled"
    :color="color"
    icon
    :class="{
      'v-btn--active': isActive && isActive()
    }"
    @click="action"
  >
    <v-icon :icon="icon"></v-icon>
    <v-tooltip :eager="false" activator="parent" location="top" :text="tooltip"></v-tooltip>
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  props: {
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
};
</script>
