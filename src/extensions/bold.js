import { Bold as TiptapBold } from '@tiptap/extension-bold';
import ActionButton from '../ActionButton.vue';
import { useContext } from "../hooks/use-context";

export const Bold = TiptapBold.extend({
  addOptions() {
    const { state } = useContext();
    return {
      ...this.parent?.(),
      button: ({ editor }) => {
        return {
          component: ActionButton,
          componentProps: {
            action: () => editor.chain().focus().toggleBold().run(),
            isActive: () => editor.isActive('bold') || false,
            disabled: !editor.can().toggleBold(),
            icon: 'mdi-format-bold',
            tooltip: state.t('editor.bold.tooltip'),
          }
        };
      }
    };
  }
});
export default Bold;
