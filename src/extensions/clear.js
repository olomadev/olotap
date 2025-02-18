import { Node } from '@tiptap/core'
import ActionButton from '../ActionButton.vue'
import { useContext } from "../hooks/use-context";

export const Clear = Node.create({
  name: 'clear',
  addOptions() {
    const { state } = useContext();
    return {
      ...this.parent?.(),
      button: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
          disabled: !editor.can().chain().focus().clearNodes().unsetAllMarks().run(),
          icon: 'mdi-format-clear',
          tooltip: state.t('editor.clear.tooltip')
        }
      })
    }
  }
})
export default Clear;
