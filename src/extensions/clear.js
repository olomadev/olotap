import { Node } from '@tiptap/core'
import ActionButton from '../ActionButton.vue'

export const Clear = Node.create({
  name: 'clear',
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
          disabled: !editor.can().chain().focus().clearNodes().unsetAllMarks().run(),
          icon: 'mdi-format-clear',
          tooltip: t('editor.clear.tooltip')
        }
      })
    }
  }
})
export default Clear;
