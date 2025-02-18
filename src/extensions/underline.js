import { Underline as TiptapUnderline } from '@tiptap/extension-underline';
import ActionButton from '../ActionButton.vue';
import { useContext } from "../hooks/use-context";

export const Underline = TiptapUnderline.extend({
  addOptions() {
    const { state } = useContext();
    return {
      ...this.parent?.(),
      button: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().toggleUnderline().run(),
          isActive: () => editor.isActive('underline') || false,
          disabled: !editor.can().toggleUnderline(),
          icon: 'mdi-format-underline',
          tooltip: state.t('editor.underline.tooltip')
        }
      })
    };
  }
});
export default Underline;