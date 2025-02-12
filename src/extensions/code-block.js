import { CodeBlock as TiptapCodeBlock } from '@tiptap/extension-code-block';
import ActionButton from '../ActionButton.vue';

export const CodeBlock = TiptapCodeBlock.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().toggleCodeBlock().run(),
          isActive: () => editor.isActive('codeBlock') || false,
          disabled: !editor.can().toggleCodeBlock(),
          icon: 'mdi-code-braces',
          tooltip: t('editor.codeblock.tooltip')
        }
      })
    };
  }
});
export default CodeBlock;