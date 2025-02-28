<template>
  <v-menu
    v-model="menu"
    location="end bottom"
    open-on-click
    open-on-hover
    :close-on-content-click="false"
    activator="parent"
  >
    <v-card density="compact" class="table-grid-size-editor">
      <v-card-text class="pa-2 pb-0">
        <v-checkbox
          v-model="withHeaderRow"
          density="compact"
          hide-details
          :label="$t('editor.table.menu.insert_table.with_header_row')"
        />
      </v-card-text>

      <v-card-text class="d-flex flex-column flex-wrap justify-space-between pa-2">
        <div v-for="row in tableGridSize.rows" :key="'r' + row" class="d-flex">
          <div
            style="cursor: pointer"
            v-for="col in tableGridSize.cols"
            :key="'c' + col"
            :class="{
              'table-grid-size-editor__cell--selected':
                col <= selectedTableGridSize.cols && row <= selectedTableGridSize.rows
            }"
            class="pa-1"
            @mouseover="selectTableGridSize(row, col)"
            @mousedown="onMouseDown(row, col)"
          >
            <div class="table-grid-size-editor__cell__inner"></div>
          </div>
        </div>
      </v-card-text>

      <v-card-subtitle class="pt-0 pb-2">
        {{ selectedTableGridSize.rows }} x {{ selectedTableGridSize.cols }}
      </v-card-subtitle>
    </v-card>
  </v-menu>
</template>

<script>
import { isMobile } from '@/utils';
import { computed, reactive, ref, unref } from 'vue';
import { useContext } from '../hooks/use-context';

export default {
  setup() {
    const { state } = useContext();
    const tableGridSize = reactive({
      rows: isMobile() ? state.tableMaxGridSize : state.tableInitGridSize,
      cols: isMobile() ? state.tableMaxGridSize : state.tableInitGridSize,
    });
    const selectedTableGridSize = reactive({
      rows: state.tableDefaultSelectedGridSize,
      cols: state.tableDefaultSelectedGridSize,
    });
    return { state, tableGridSize, selectedTableGridSize };
  },
  data() {
    return {
      menu: false,
      withHeaderRow: true,
    };
  },
  methods: {
    selectTableGridSize(rows, cols) {
      const tableGridSize = unref(this.tableGridSize);
      if (rows === tableGridSize.rows) {
        this.tableGridSize.rows = Math.min(rows + 1, this.state.tableMaxGridSize);
      }
      if (cols === tableGridSize.cols) {
        this.tableGridSize.cols = Math.min(cols + 1, this.state.tableMaxGridSize);
      }
      this.selectedTableGridSize.rows = rows;
      this.selectedTableGridSize.cols = cols;
    },
    onMouseDown(rows, cols) {
      this.$emit('create-table', { rows, cols, withHeaderRow: unref(this.withHeaderRow) });
      this.resetTableGridSize();
    },
    resetTableGridSize() {
      this.menu = false;
      this.withHeaderRow = true;
      this.tableGridSize.rows = this.state.tableInitGridSize;
      this.tableGridSize.cols = this.state.tableInitGridSize;
      this.selectedTableGridSize.rows = this.state.tableDefaultSelectedGridSize;
      this.selectedTableGridSize.cols = this.state.tableDefaultSelectedGridSize;
    },
  },
};
</script>