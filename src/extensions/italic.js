import { Italic as TiptapItalic } from '@tiptap/extension-italic';
import ActionButton from '../ActionButton.vue';

export const Italic = TiptapItalic.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().toggleItalic().run(),
          isActive: () => editor.isActive('italic') || false,
          disabled: !editor.can().toggleItalic(),
          icon: 'mdi-format-italic',
          tooltip: t('editor.italic.tooltip'),
        },
      }),
    };
  },
});
export default Italic;
