<template>
  <div v-if="editor" class="olotap dense">
    
    <BubbleMenu v-if="!hideBubble" :editor="editor" :disabled="disableToolbar" />

    <v-input class="pt-0" hide-details="auto" :error-messages="errorMessages">
      <v-card
        :flat="flat"
        :outlined="outlined"
        color="grey-lighten-4"
        v-bind="$attrs"
        :style="{
          borderColor: $attrs['error-messages'] ? '#ff5252' : undefined,
          width: '100%',
        }"
        class="olotap-editor"
        :class="{ 'olotap-editor--fullscreen': isFullscreen }"
      >
        <template v-if="label && !isFullscreen">
          <v-card-title :class="bg-grey-lighten-3">
            {{ label }}
          </v-card-title>
          <v-divider />
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

        <!-- custom bubble menu for table extension -->
        <div
          v-if="!isMobileDevice"
          id="bubble-menu"
          ref="bubbleMenuRef"
          v-show="isBubbleMenuVisible"
          :style="bubbleMenuStyle"
        >
          <button @click.stop.prevent="clickTableButton"><v-icon>mdi-dots-vertical</v-icon></button>
        </div>
      </v-card>
    </v-input>
  </div>
</template>

<script>
import { computed, watch, onUnmounted } from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-3';
import { useMarkdownTheme, useProvideOlotapStore } from '../hooks';
import { throttle, getCssUnitWithDefault, isBoolean, isEqual, differenceBy } from '@/utils';
import { isMobile, mergeObjects } from '@/utils';
import BubbleMenu from '../BubbleMenu.vue';
import TipTapToolbar from '../TiptapToolbar.vue';
import '../styles/index.scss'
import { useContext } from '../hooks/use-context';

export default {
  name: 'OlotapEditor',
  components: {
    EditorContent,
    BubbleMenu,
    TipTapToolbar,
  },
  props: {
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
      isMobileDevice: isMobile()
    }
  },
  data() {
    return {
      editor: null,
      updateHandler: null,
      bubbleMenuStyle: null,
      isBubbleMenuVisible: false,
      markdownThemeStyle: null,
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
        //   }, this.state.EDITOR_UPDATE_THROTTLE_WAIT_TIME),
        // },
        onUpdate: throttle(({ editor }) => {
          const output = this.getOutput(editor, this.output);
          this.$emit('update:modelValue', output);
          this.$emit('change', { editor, output });
        }, this.state.EDITOR_UPDATE_THROTTLE_WAIT_TIME),
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
    clickTableButton(event) {
      event.stopImmediatePropagation();
      document.getElementById('table-insert-button').click()
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

<style>
/* Bubble Menu and Buton CSS */
#bubble-menu {
  display: none; /* hidden at start */
  position: absolute;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 5px;
  z-index: 1000;
  flex-direction: column;
}

#bubble-menu button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 16px;
}

#bubble-menu button:hover {
  background-color: #f0f0f0;
}
</style>