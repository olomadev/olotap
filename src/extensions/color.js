import { Color as TiptapColor } from '@tiptap/extension-color';
import ColorActionButton from '../ColorActionButton.vue';
import { useContext } from "../hooks/use-context";

export const Color = TiptapColor.extend({
  addOptions() {
    const { state } = useContext();
    return {
      ...this.parent?.(),
      button: ({ editor }) => ({
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
          tooltip: state.t('editor.color.tooltip')
        }
      })
    };
  }
});
export default Color;