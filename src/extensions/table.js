import { Table as TiptapTable } from '@tiptap/extension-table';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableRow } from '@tiptap/extension-table-row';
import TableActionButton from '../TableActionButton.vue';
import { useContext } from "../hooks/use-context";

export const Table = TiptapTable.extend({
  addOptions() {
    const { state } = useContext();
    return {
      ...this.parent?.(),
      resizable: true,
      bubbleMenuPlugin: true,
      HTMLAttributes: {
        class: 'table-wrapper'
      },
      button: ({ editor }) => ({
        component: TableActionButton,
        componentProps: {
          isActive: () => editor.isActive('table') || false,
          disabled: !editor.can().insertTable(),
          icon: 'mdi-table',
          tooltip: state.t('editor.table.tooltip'),
          id: 'table-insert-button',
        }
      })
    };
  },
  addExtensions() {
    return [
      TableRow.configure(this.options.tableRow),
      TableHeader.configure(this.options.tableHeader),
      TableCell.configure(this.options.tableCell)
    ];
  },
});
export default Table;