<template>
  <v-menu v-model="menu" activator="parent">
    <v-list density="compact">
      <template v-for="(item, index) in items">
        <v-list-item v-if="item.key === 'insert-table'" :key="index" :disabled="item.disabled">
          <template #prepend>
            <v-icon :icon="item.icon" />
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <create-table-popover v-if="item.key === 'insert-table'" :key="index" @create-table="createTable" />
        </v-list-item>
        <v-list-item v-else-if="item.type === 'item'" :key="'item-' + index" :disabled="item.disabled" @click="setTable(item.key)">
          <template #prepend>
            <v-icon :icon="item.icon" />
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        <v-divider v-else :key="'divider-' + index" />
      </template>
    </v-list>
  </v-menu>
</template>

<script>
import CreateTablePopover from './CreateTablePopover.vue';

export default {
  components: {
    CreateTablePopover
  },
  props: {
    editor: Object,
    activator: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      menu: false
    };
  },
  computed: {
    items() {
      const disabled = !this.editor.isActive('table');
      return [
        { type: 'item', key: 'insert-table', title: this.$t('editor.table.menu.insert_table.create'), icon: 'mdi-table-plus' },
        { type: 'divider' },
        { type: 'item', key: 'add-column-before', title: this.$t('editor.table.menu.add_column_before'), icon: 'mdi-table-column-plus-before', disabled },
        { type: 'item', key: 'add-column-after', title: this.$t('editor.table.menu.add_column_after'), icon: 'mdi-table-column-plus-after', disabled },
        { type: 'item', key: 'delete-column', title: this.$t('editor.table.menu.delete_column'), icon: 'mdi-table-column-remove', disabled },
        { type: 'divider' },
        { type: 'item', key: 'add-row-before', title: this.$t('editor.table.menu.add_row_before'), icon: 'mdi-table-row-plus-before', disabled },
        { type: 'item', key: 'add-row-after', title: this.$t('editor.table.menu.add_row_after'), icon: 'mdi-table-row-plus-after', disabled },
        { type: 'item', key: 'delete-row', title: this.$t('editor.table.menu.delete_row'), icon: 'mdi-table-row-remove', disabled },
        { type: 'divider' },
        { type: 'item', key: 'merge-or-split-cells', title: this.$t('editor.table.menu.merge_or_split_cells'), icon: 'mdi-table-merge-cells', disabled },
        { type: 'divider' },
        { type: 'item', key: 'delete-table', title: this.$t('editor.table.menu.delete_table'), icon: 'mdi-table-remove', disabled }
      ];
    }
  },
  methods: {
    setTable(key, options) {
      if (!key) return;
      const actions = {
        'insert-table': () => this.editor.chain().focus().insertTable({ ...options }).run(),
        'add-column-before': () => this.editor.chain().focus().addColumnBefore().run(),
        'add-column-after': () => this.editor.chain().focus().addColumnAfter().run(),
        'delete-column': () => this.editor.chain().focus().deleteColumn().run(),
        'add-row-before': () => this.editor.chain().focus().addRowBefore().run(),
        'add-row-after': () => this.editor.chain().focus().addRowAfter().run(),
        'delete-row': () => this.editor.chain().focus().deleteRow().run(),
        'merge-or-split-cells': () => this.editor.chain().focus().mergeOrSplit().run(),
        'delete-table': () => this.editor.chain().focus().deleteTable().run()
      };
      actions[key]?.();
    },
    createTable(options) {
      this.setTable('insert-table', options);
      this.menu = false;
    }
  }
};
</script>

<style scoped>
.v-list-item:hover {
  cursor: pointer;
}
</style>