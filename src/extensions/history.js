import { History as TiptapHistory } from '@tiptap/extension-history';
import ActionButton from '../ActionButton.vue';
import { useContext } from "../hooks/use-context";

export const History = TiptapHistory.extend({
  addOptions() {
    const { state } = useContext();
    return {
      ...this.parent?.(),
      depth: 10,
      button: ({ editor }) => {
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
            tooltip: item == "undo" ? state.t('editor.undo.tooltip') : state.t('editor.redo.tooltip'),
          }
        }));
      }
    };
  }
});
export default History;
