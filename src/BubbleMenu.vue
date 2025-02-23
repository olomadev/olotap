<template>
  <bubble-menu v-show="items.length > 0" :editor="editor" :tippy-options="tippyOptions">
    <v-card class="olotap-editor__menu-bubble">
      <v-card-text class="d-flex pa-0">
        <v-toolbar density="compact" flat height="auto" class="py-1 ps-1">
          <template v-for="(item, key) in items" :key="key">
            <!-- Divider -->
            <v-divider v-if="item.type === 'divider'" vertical class="mx-1 me-2" />
            <!-- Buttons -->
            <component
              :is="item.component"
              v-else
              v-bind="item.componentProps"
              :editor="editor"
              :disabled="disabled || item.componentProps?.disabled"
            >
              <template v-for="(element, slotName, i) in item.componentSlots" :key="i" #[`${slotName}`]="values">
                <component :is="element" v-bind="values?.props" />
              </template>
            </component>
          </template>
        </v-toolbar>
      </v-card-text>
    </v-card>
  </bubble-menu>
</template>

<script>
import { unref } from 'vue'
import { BubbleMenu } from '@tiptap/vue-3'
import { TextSelection } from '@tiptap/pm/state'
import { Editor, Extension } from '@tiptap/vue-3'
import { NodeSelection } from '@tiptap/pm/state'
import { useContext } from './hooks/use-context';

export default {
  props: {
    editor: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    BubbleMenu
  },
  setup() {
    const { state } = useContext();
    return { state, i18n: state.i18n }
  },
  data() {
    return {
      tippyOptions: {
        maxWidth: 'auto',
        zIndex: 20,
        appendTo: 'parent'
      }
    }
  },
  computed: {
    nodeType() {
      const selection = this.editor.state.selection
      const isLink = this.isLinkSelection()

      const nodeTypeName = selection.node?.type.name;
      const isText = selection instanceof TextSelection

      if (isText) return 'text'
      if (nodeTypeName && Object.keys(this.state.nodeTypeMenu).includes(nodeTypeName)) {
        return nodeTypeName;
      }
      return undefined
    },
    nodeMenus() {
      const { extensions = [] } = this.editor.extensionManager
      const find = extensions.find(k => k.name === 'base-kit')
      if (!find) return {}

      const { button } = find.options?.bubble ?? {}

      if (!button) return {}

      const _button = button({
        editor: this.editor,
        extension: find,
        t: this.i18n.global.t
      })

      return _button
    },
    items() {
      if (!this.nodeType) return []
      return unref(this.nodeMenus)?.[this.nodeType] ?? []
    }
  },
  methods: {
    isLinkSelection() {
      const { schema } = this.editor
      const linkType = schema.marks.link
      if (!linkType) return false

      return this.editor.isActive(linkType.name)
    }
  }
}
</script>
