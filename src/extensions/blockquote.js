import { Blockquote as TiptapBlockquote } from '@tiptap/extension-blockquote';
import ActionButton from '../ActionButton.vue';
import { useContext } from "../hooks/use-context";

export const Blockquote = TiptapBlockquote.extend({
  addOptions() {
    const { state } = useContext();
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'blockquote',
      },
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
});
export default Blockquote;