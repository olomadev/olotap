import { Color as TiptapColor } from '@tiptap/extension-color';
import ColorActionButton from '../ColorActionButton.vue';

export const Color = TiptapColor.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ColorActionButton,
        componentProps: {
          editor,
          action: (color) => {
            if (typeof color === 'string') editor.chain().focus().setColor(color).run();
          },
          isActive: () => {
            const { color } = editor.getAttributes('textStyle');
            if (!color) return false;
            return editor.isActive({ color }) || false;
          },
          disabled: !editor.can().setColor(''),
          icon: 'mdi-format-color-text',
          tooltip: t('editor.color.tooltip')
        }
      })
    };
  }
});
export default Color;