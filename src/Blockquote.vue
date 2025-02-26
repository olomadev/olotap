<template>
  <NodeViewWrapper as="div" class="blockquote-wrapper">
    <div
      class="blockquote-inner-wrapper"
      @click="selectBlockquote"
    >
      <blockquote ref="blockquote" data-node-view-content></blockquote>
    </div>
  </NodeViewWrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'

export default {
  props: nodeViewProps,
  components: {
    NodeViewWrapper,
  },
  methods: {
    selectBlockquote() {
      const { editor, getPos } = this;
      editor.commands.setNodeSelection(getPos());
    },
  },
};
</script>
