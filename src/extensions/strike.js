import { Strike as TiptapStrike } from '@tiptap/extension-strike';
import ActionButton from '../ActionButton.vue';

export const Strike = TiptapStrike.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().toggleStrike().run(),
          isActive: () => editor.isActive('strike') || false,
          disabled: !editor.can().toggleStrike(),
          icon: 'mdi-format-strikethrough',
          tooltip: t('editor.strike.tooltip'),
        }
      })
    };
  }
});
export default Strike;
