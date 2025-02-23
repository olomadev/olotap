import { all, createLowlight } from 'lowlight'
const lowlight = createLowlight(all)
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import ActionButton from '../ActionButton.vue';
import CodeBlockComponent from '../CodeBlock.vue';
import { useContext } from "../hooks/use-context";

export const CodeBlock = CodeBlockLowlight.extend({
  name: 'codeBlock',
  draggable: true,
  addAttributes() {
    return {
      ...this.parent?.(),
      language: {
        default: 'plaintext',
        parseHTML: element => element.getAttribute('data-language') || 'plaintext',
        renderHTML: attributes => ({
          'data-language': attributes.language,
        }),
      }
    };
  },
  addOptions() {
    const { state } = useContext();
    return {
      ...this.parent?.(),
      lowlight,
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
  }, 
  addNodeView() {
    return VueNodeViewRenderer(CodeBlockComponent);
  },
});
export default CodeBlock;
