import { History as TiptapHistory } from '@tiptap/extension-history';
import ActionButton from '../ActionButton.vue';

export const History = TiptapHistory.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      depth: 10,
      button: ({ editor, t }) => {
        const historys = ['undo', 'redo'];

        return historys.map(item => ({
          component: ActionButton,
          componentProps: {
            action: () => {
              if (item === 'undo') editor.chain().focus().undo().run();
              if (item === 'redo') editor.chain().focus().redo().run();
            },
            disabled: !editor.can()[item](),
            icon: item == "undo" ? "mdi-undo" : "mdi-redo",
            tooltip: item == "undo" ? t('editor.undo.tooltip') : t('editor.redo.tooltip'),
          }
        }));
      }
    };
  }
});
export default History;
