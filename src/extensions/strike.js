import { Strike as TiptapStrike } from '@tiptap/extension-strike';
import ActionButton from '../ActionButton.vue';
import { useContext } from "../hooks/use-context";

export const Strike = TiptapStrike.extend({
  addOptions() {
    const { state } = useContext();
    return {
      ...this.parent?.(),
      button: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().toggleStrike().run(),
          isActive: () => editor.isActive('strike') || false,
          disabled: !editor.can().toggleStrike(),
          icon: 'mdi-format-strikethrough',
          tooltip: state.t('editor.strike.tooltip'),
        }
      })
    };
  }
});
export default Strike;
