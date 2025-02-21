<template>
  <div v-if="editor" class="olotap">
    
    <BubbleMenu v-if="!hideBubble" :editor="editor" :disabled="disableToolbar" />

    <bubble-menu-table
      v-if="editor && tableRowTools"
      :editor="editor"
      :pluginKey="getTableRowKey"
      :should-show="tableIsActive"
      :tippy-options="{
        placement: 'left',
        getReferenceClientRect: getTableRowMenuCoords,
      }"
    >
      <menu-item :coords="getMenuCoords">
        <menu-button
          class="rounded-full text-slate-400 hover:text-slate-800"
          :content="moreIconRound"
        />
        <template #dropdown>
          <menu-dropdown-button
            v-for="tool in tableRowTools"
            :title="tool.title"
            :icon="tool.icon"
            :key="tool.title"
            :label="tool.title"
            @click.prevent.stop="tool.command(editor)"
          />
        </template>
      </menu-item>
    </bubble-menu-table>

    <bubble-menu-table
      v-if="editor && tableColumnTools"
      :editor="editor"
      :pluginKey="getTableColumnKey"
      :should-show="tableIsActive"
      :tippy-options="{
        placement: 'bottom',
        getReferenceClientRect: getTableColumnMenuCoords,
      }"
    >
      <menu-item :coords="getMenuCoords">
        <menu-button
          :content="moreIconRound"
          class="rounded-full text-slate-400 hover:text-slate-800"
        />
        <template #dropdown>
          <menu-dropdown-button
            v-for="tool in tableColumnTools"
            :title="tool.title"
            :icon="tool.icon"
            :key="tool.title"
            :label="tool.title"
            @click.prevent="tool.command(editor)"
          />
        </template>
      </menu-item>
    </bubble-menu-table>

    <v-input class="pt-0" hide-details="auto" :error-messages="errorMessages">
      <v-card
        :flat="flat"
        :color="bgColor"
        v-bind="$attrs"
        :style="{
          borderColor: $attrs['error-messages'] ? '#ff5252' : undefined,
          width: '100%',
        }"
        class="olotap-editor"
        :class="{ 'olotap-editor--fullscreen': isFullscreen }"
      >
        <template v-if="label && !isFullscreen">
          <slot name="label"></slot>
          <!--
            <v-card-title :class="bg-grey-lighten-3">
              {{ label }}
            </v-card-title>
            <v-divider />
          -->
        </template>

        <TipTapToolbar
          v-if="!hideToolbar"
          class="olotap-editor__toolbar"
          :editor="editor"
          :disabled="disableToolbar"
        />
        <slot
          name="editor"
          v-bind="{ editor, props: { class: 'olotap-editor__content', 'data-testid': 'value' } }"
        >
          <editor-content
            class="olotap-editor__content"
            :class="contentDynamicClasses"
            :style="contentDynamicStyles"
            :editor="editor"
            data-testid="value"
            >
          </editor-content>
        </slot>
      </v-card>
    </v-input>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3';
import { useContext, useMarkdownTheme, useProvideOlotapStore } from '../hooks';
import { throttle, getCssUnitWithDefault } from '@/utils';
import { isMobile } from '@/utils';
import TipTapToolbar from '../TiptapToolbar.vue';
import BubbleMenu from '../BubbleMenu.vue';
import BubbleMenuTable from '../table/bubbleMenuForTable.js';
import { tableRowTools, tableColumnTools } from "../table/tools";
import {
  GetTopLevelBlockCoords,
  GetTableColumnCoords,
  GetTableRowCoords,
  GetTopLevelNode,
} from "../utils/pm-utils.js";
import MenuButton from "../table/MenuButton.vue"
import MenuItem from "../table/MenuItem.vue"
import MenuDropdownButton from "../table/MenuDropdownButton.vue"
import '../styles/index.scss'

export default {
  name: 'OlotapEditor',
  components: {
    EditorContent,
    BubbleMenu,
    BubbleMenuTable,
    TipTapToolbar,
    MenuButton,
    MenuItem,
    MenuDropdownButton,
  },
  props: {
    bgColor: {
      type: String,
      default: "grey-lighten-4"
    },
    extensions: {
      type: Array,
      default: () => [],
    },
    markdownTheme: {
      type: [String, Boolean],
      default: undefined,
    },
    modelValue: {
      type: [String, Object],
      default: '',
    },
    output: {
      type: String,
      default: 'html',
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    flat: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: undefined,
    },
    hideToolbar: {
      type: Boolean,
      default: false,
    },
    disableToolbar: {
      type: Boolean,
      default: false,
    },
    hideBubble: {
      type: Boolean,
      default: false,
    },
    removeDefaultWrapper: {
      type: Boolean,
      default: false,
    },
    maxWidth: {
      type: [String, Number],
      default: undefined,
    },
    minHeight: {
      type: [String, Number],
      default: undefined,
    },
    maxHeight: {
      type: [String, Number],
      default: undefined,
    },
    editorClass: {
      type: [String, Array, Object],
      default: undefined,
    },
    errorMessages: {
      type: [String, Array],
      default: () => [],
    },
  },
  emits: ['enter', 'change', 'update:modelValue', 'update:markdownTheme'],
  setup(props) {
    const { isFullscreen } = useProvideOlotapStore();
    const { state } = useContext();
    return {
      state,
      isFullscreen,
      isMobileDevice: isMobile(),
      moreIconRound:
        '<svg class="w-5 h-5 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
    };
  },
  data() {
    return {
      editor: null,
      updateHandler: null,
      markdownThemeStyle: null,
      tableRowTools: null,
      tableColumnTools: null,
    }
  },
  watch: {
    markdownTheme: {
      immediate: true, // it is triggered at first.
      handler(newValue) {
        if (this.updateHandler) {
          this.updateHandler(newValue);
        }
      },
    },
  },
  mounted() {
    this.tableRowTools = tableRowTools();
    this.tableColumnTools = tableColumnTools();
  },
  created() {
    try {
      const { markdownThemeStyle, updateHandler } = useMarkdownTheme(
        () => this.markdownTheme,
        (value) => {
          if (value !== this.markdownTheme) {
            this.$emit("update:markdownTheme", value);
          }
        }
      );
      this.markdownThemeStyle = markdownThemeStyle;
      this.updateHandler = updateHandler;
      //
      // create editor
      // 
      this.editor = new Editor({
        content: this.modelValue,
        // editorProps: {
        //   handleKeyDown: throttle((view, event) => {
        //     if (event.key === 'Enter' && !event.shiftKey) {
        //       this.$emit('enter');
        //       return true;
        //     }
        //     return false;
        //   }, this.state.editorUpdateThrottleWaitTime),
        // },
        onUpdate: throttle(({ editor }) => {
          const output = this.getOutput(editor, this.output);
          this.$emit('update:modelValue', output);
          this.$emit('change', { editor, output });
        }, this.state.editorUpdateThrottleWaitTime),
        extensions: this.sortExtensions(this.extensions),
        autofocus: false,
        editable: !this.disabled,
        injectCSS: true,
      });
    } catch (error) {
      console.error('Error while creating the editor:', error);
    }
  },
  computed: {
    getTableRowKey() {
      return "tableRowMenu_" + this.state.i18n.global.locale;
    },
    getTableColumnKey() {
      return "tableColumnMenu_" + this.state.i18n.global.locale;
    },
    getMenuCoords() {
      return GetTopLevelBlockCoords(this.editor.view)
    },
    contentDynamicClasses() {
      return [
        {
          ...this.markdownThemeStyle,
        },
        this.editorClass,
      ];
    },
    contentDynamicStyles() {
      const maxWidth = getCssUnitWithDefault(this.maxWidth);
      const maxHeightStyle = {
        maxWidth: maxWidth,
        width: !maxWidth ? undefined : '100%',
        margin: !maxWidth ? undefined : '0 auto',
        backgroundColor: '#FFFFFF',
      };
      if (this.isFullscreen) return { height: '100%', overflowY: 'auto', ...maxHeightStyle };
      const minHeight = getCssUnitWithDefault(this.minHeight);
      const maxHeight = getCssUnitWithDefault(this.maxHeight);
      return {
        minHeight,
        maxHeight,
        overflowY: 'auto',
        ...maxHeightStyle,
      };
    },
  },
  methods: {
    tableIsActive() {
      return this.getTopLevelNodeType() == "table";
    },
    getTableRowMenuCoords() {
      return GetTableRowCoords(this.editor.view);
    },
    getTableColumnMenuCoords() {
      return GetTableColumnCoords(this.editor.view);
    },
    getTopLevelNodeType() {
      return GetTopLevelNode(this.editor.view)?.type.name;
    },
    getOutput(editor, output) {
      if (this.removeDefaultWrapper) {
        if (output === 'html') return editor.isEmpty ? '' : editor.getHTML();
        if (output === 'json') return editor.isEmpty ? {} : editor.getJSON();
        if (output === 'text') return editor.isEmpty ? '' : editor.getText();
        return '';
      }
      if (output === 'html') return editor.getHTML();
      if (output === 'json') return editor.getJSON();
      if (output === 'text') return editor.getText();
      return '';
    },
    sortExtensions(extensions) {
      return extensions.map((ext, i) => ext.configure({ sort: i }));
    }
  },
};
</script>