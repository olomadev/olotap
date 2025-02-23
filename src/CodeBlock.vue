<template>
  <NodeViewWrapper as="span" 
    class="code-block-wrapper"
    :data-block-width="node.attrs.blockWidth"
  >
    <div
      :class="{ 'code-block-wrapper--focused': selected }"
      @click="selectCodeBlock"
    >
      <pre class="code-block-content" ref="codeBlock" data-node-view-content></pre>
    </div>
  </NodeViewWrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import { all, createLowlight } from 'lowlight'
const lowlight = createLowlight(all)

export default {
  props: nodeViewProps,
  components: {
    NodeViewWrapper
  },
  data() {
    return {
      copied: false,
    };
  },
  watch: {
    node: {
      handler() {
        this.renderCode();
      },
      deep: true,
    },
  },
  mounted() {
    this.renderCode();
  },
  methods: {
    selectCodeBlock() {
      const { editor, getPos } = this;
      editor.commands.setNodeSelection(getPos());
    },
    renderCode() {
      const codeBlock = this.$refs.codeBlock;
      if (!codeBlock) {
        console.warn('Code block element is not available');
        return;
      }
      const content = this.node.textContent || '';
      let { language } = this.node.attrs;
      //
      // Ensure the language is a valid string
      if (typeof language !== 'string' || language.trim() === '') {
        console.warn('Invalid or missing language. Defaulting to "plaintext".');
        language = 'plaintext';
      }
      if (content.trim() === '') {
        console.warn('No content to highlight');
        return;
      }
      try {
        // Perform syntax highlighting only if there is content and valid language
        codeBlock.innerHTML = lowlight.highlight(language, content).value;
      } catch (error) {
        console.error('Error highlighting code:', error);
      }
    }
  },
  components: {
    NodeViewWrapper,
  },
};
</script>
