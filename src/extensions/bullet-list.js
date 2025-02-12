import { BulletList as TiptapBulletList } from '@tiptap/extension-bullet-list'
import ActionButton from '../ActionButton.vue'

export const BulletList = TiptapBulletList.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().toggleBulletList().run(),
          isActive: () => editor.isActive('bulletList') || false,
          disabled: !editor.can().toggleBulletList(),
          icon: 'mdi-format-list-bulleted',
          tooltip: t('editor.bulletlist.tooltip')
        }
      })
    }
  }
})
export default BulletList;