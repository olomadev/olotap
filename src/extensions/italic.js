import { Italic as TiptapItalic } from '@tiptap/extension-italic';
import ActionButton from '../ActionButton.vue';
import { useContext } from "../hooks/use-context";

export const Italic = TiptapItalic.extend({
  addOptions() {
    const { state } = useContext();
    return {
      ...this.parent?.(),
      button: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().toggleItalic().run(),
          isActive: () => editor.isActive('italic') || false,
          disabled: !editor.can().toggleItalic(),
          icon: 'mdi-format-italic',
          tooltip: state.t('editor.italic.tooltip'),
        },
      }),
    };
  },
});
export default Italic;
