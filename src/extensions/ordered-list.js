import { OrderedList as TiptapOrderedList } from '@tiptap/extension-ordered-list';
import ActionButton from '../ActionButton.vue';

export const OrderedList = TiptapOrderedList.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().toggleOrderedList().run(),
          isActive: () => editor.isActive('orderedList') || false,
          disabled: !editor.can().toggleOrderedList(),
          icon: 'mdi-format-list-numbered',
          tooltip: t('editor.orderedlist.tooltip'),
        },
      }),
    };
  },
});
export default OrderedList;