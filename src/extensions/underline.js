import { Underline as TiptapUnderline } from '@tiptap/extension-underline';
import ActionButton from '../ActionButton.vue';

export const Underline = TiptapUnderline.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().toggleUnderline().run(),
          isActive: () => editor.isActive('underline') || false,
          disabled: !editor.can().toggleUnderline(),
          icon: 'mdi-format-underline',
          tooltip: t('editor.underline.tooltip')
        }
      })
    };
  }
});
export default Underline;