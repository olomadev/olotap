import { useContext } from '../hooks/use-context';

export function tableRowTools() {
  const { state } = useContext();
  return [
    {
      title: state.t("editor.table.tools.add_row_before"),
      name: "addRowBefore",
      icon: 'mdi-table-row-plus-before',
      command: (editor) => {
        editor.commands.addRowBefore();
      },
    },
    {
      title: state.t("editor.table.tools.add_row_after"),
      name: "addRowAfter",
      icon: 'mdi-table-row-plus-after',
      command: (editor) => {
        editor.commands.addRowAfter();
      },
    },
    {
      title: state.t("editor.table.tools.delete_row"),
      name: "deleteRow",
      icon: 'mdi-table-row-remove',
      command: (editor) => {
        editor.commands.deleteRow();
      },
    },
    {
      title: state.t("editor.table.tools.delete_table"),
      name: "deleteTable",
      icon: 'mdi-table-remove',
      command: (editor) => {
        editor.commands.deleteTable();
      },
    },
  ];
}
export function tableColumnTools() {
  const { state } = useContext();
  return [
    {
      title: state.t("editor.table.tools.add_column_before"),
      name: "addColumnBefore",
      icon: 'mdi-table-column-plus-before',
      command: (editor) => {
        editor.commands.addColumnBefore();
      },
    },
    {
      title: state.t("editor.table.tools.add_column_after"),
      name: "addColumnAfter",
      icon: 'mdi-table-column-plus-after',
      command: (editor) => {
        editor.commands.addColumnAfter();
      },
    },
    {
      title: state.t("editor.table.tools.merge_or_split_cells"),
      name: "mergeOrSplitCells",
      icon: 'mdi-table-merge-cells',
      command: (editor) => {
        if (editor.can().mergeCells()) {
          editor.commands.mergeCells();
        } else {
          editor.commands.splitCell();
        }
      },
    },
    {
      title: state.t("editor.table.tools.delete_column"),
      name: "deleteColumn",
      icon: 'mdi-table-column-remove',
      command: (editor) => {
        editor.commands.deleteColumn();
      },
    },
    {
      title: state.t("editor.table.tools.delete_table"),
      name: "deleteTable",
      icon: 'mdi-table-remove',
      command: (editor) => {
        editor.commands.deleteTable();
      },
    },
  ];
}
