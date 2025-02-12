import { Extension } from '@tiptap/core'
import ActionButton from '../ActionButton.vue'

export const Indent = Extension.create({
  name: 'indent',
  addOptions() {
    return {
      divider: false,
      spacer: false,
      button: ({ editor, t }) => {
        const items = ['outdent', 'indent']
        const commands = {
          indent: 'sinkListItem',
          outdent: 'liftListItem'
        }
        return items.map(item => ({
          component: ActionButton,
          componentProps: {
            action: () => {
              if (item === 'indent') editor.chain().focus().sinkListItem('listItem').run()
              if (item === 'outdent') editor.chain().focus().liftListItem('listItem').run()
            },
            disabled: !editor.can()[commands[item]]('listItem'),
            icon: item == 'outdent' ? 'mdi-format-indent-decrease' : 'mdi-format-indent-increase',
            tooltip: t(`editor.${item}.tooltip`)
          }
        }))
      }
    }
  }
})
export default Indent;
