import { HorizontalRule as TiptapHorizontalRule } from '@tiptap/extension-horizontal-rule'
import ActionButton from '../ActionButton.vue'

export const HorizontalRule = TiptapHorizontalRule.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().setHorizontalRule().run(),
          disabled: !editor.can().setHorizontalRule(),
          icon: 'mdi-minus',
          tooltip: t('editor.horizontalrule.tooltip')
        }
      })
    }
  }
})
export default HorizontalRule;
