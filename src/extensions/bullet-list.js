import { BulletList as TiptapBulletList } from '@tiptap/extension-bullet-list'
import ActionButton from '../ActionButton.vue'
import { useContext } from "../hooks/use-context";

export const BulletList = TiptapBulletList.extend({
  addOptions() {
    const { state } = useContext();
    return {
      ...this.parent?.(),
      button: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().toggleBulletList().run(),
          isActive: () => editor.isActive('bulletList') || false,
          disabled: !editor.can().toggleBulletList(),
          icon: 'mdi-format-list-bulleted',
          tooltip: state.t('editor.bulletlist.tooltip')
        }
      })
    }
  }
})
export default BulletList;