import { Blockquote as TiptapBlockquote } from '@tiptap/extension-blockquote';
import ActionButton from '../ActionButton.vue';

export const Blockquote = TiptapBlockquote.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'blockquote',
      },
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().toggleBlockquote().run(),
          isActive: () => editor.isActive('blockquote') || false,
          disabled: !editor.can().toggleBlockquote(),
          icon: 'mdi-format-quote-open',
          tooltip: t('editor.blockquote.tooltip'),
        },
      }),
    };
  },
});
export default Blockquote;