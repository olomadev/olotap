import { CodeBlock as TiptapCodeBlock } from '@tiptap/extension-code-block';
import ActionButton from '../ActionButton.vue';
import { useContext } from "../hooks/use-context";

export const CodeBlock = TiptapCodeBlock.extend({
  addOptions() {
    const { state } = useContext();
    return {
      ...this.parent?.(),
      button: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().toggleCodeBlock().run(),
          isActive: () => editor.isActive('codeBlock') || false,
          disabled: !editor.can().toggleCodeBlock(),
          icon: 'mdi-code-braces',
          tooltip: state.t('editor.codeblock.tooltip')
        }
      })
    };
  }
});
export default CodeBlock;