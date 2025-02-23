import { HorizontalRule as TiptapHorizontalRule } from '@tiptap/extension-horizontal-rule'
import ActionButton from '../ActionButton.vue'
import { useContext } from "../hooks/use-context";

export const HorizontalRule = TiptapHorizontalRule.extend({
  name: 'horizontalRule',
  draggable: true,
  addOptions() {
    const { state } = useContext();
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'hr-wrapper',
        style: 'display: flex;justify-content: center;',
      },
      button: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().setHorizontalRule().run(),
          isActive: () => editor.isActive('horizontalRule') || false,
          disabled: !editor.can().setHorizontalRule(),
          icon: 'mdi-minus',
          tooltip: state.t('editor.horizontalrule.tooltip')
        }
      })
    }
  }
})
export default HorizontalRule;
