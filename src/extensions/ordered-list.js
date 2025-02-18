import { OrderedList as TiptapOrderedList } from '@tiptap/extension-ordered-list';
import ActionButton from '../ActionButton.vue';
import { useContext } from "../hooks/use-context";

export const OrderedList = TiptapOrderedList.extend({
  addOptions() {
    const { state } = useContext();
    return {
      ...this.parent?.(),
      button: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().toggleOrderedList().run(),
          isActive: () => editor.isActive('orderedList') || false,
          disabled: !editor.can().toggleOrderedList(),
          icon: 'mdi-format-list-numbered',
          tooltip: state.t('editor.orderedlist.tooltip'),
        },
      }),
    };
  },
});
export default OrderedList;