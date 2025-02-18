import { HorizontalRule as TiptapHorizontalRule } from '@tiptap/extension-horizontal-rule'
import ActionButton from '../ActionButton.vue'
import { useContext } from "../hooks/use-context";

export const HorizontalRule = TiptapHorizontalRule.extend({
  addOptions() {
    const { state } = useContext();
    return {
      ...this.parent?.(),
      button: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().setHorizontalRule().run(),
          disabled: !editor.can().setHorizontalRule(),
          icon: 'mdi-minus',
          tooltip: state.t('editor.horizontalrule.tooltip')
        }
      })
    }
  }
})
export default HorizontalRule;
