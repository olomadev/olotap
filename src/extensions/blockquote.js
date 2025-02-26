import { Blockquote as TiptapBlockquote } from '@tiptap/extension-blockquote';
import ActionButton from '../ActionButton.vue';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import BlockquoteWrapper from '../Blockquote.vue';
import { useContext } from "../hooks/use-context";

export const Blockquote = TiptapBlockquote.extend({
  name: 'blockquote',
  draggable: true,
  addOptions() {
    const { state } = useContext();
    return {
      ...this.parent?.(),
      button: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().toggleBlockquote().run(),
          isActive: () => editor.isActive('blockquote') || false,
          disabled: !editor.can().toggleBlockquote(),
          icon: 'mdi-format-quote-open',
          tooltip: state.t('editor.blockquote.tooltip'),
        },
      }),
    };
  },
  addNodeView() {
    return VueNodeViewRenderer(BlockquoteWrapper);
  },
});
export default Blockquote;