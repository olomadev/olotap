import { Bold as TiptapBold } from '@tiptap/extension-bold';
import ActionButton from '../ActionButton.vue';

export const Bold = TiptapBold.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => {
        return {
          component: ActionButton,
          componentProps: {
            action: () => editor.chain().focus().toggleBold().run(),
            isActive: () => editor.isActive('bold') || false,
            disabled: !editor.can().toggleBold(),
            icon: 'mdi-format-bold',
            tooltip: t('editor.bold.tooltip'),
          }
        };
      }
    };
  }
});
export default Bold;
