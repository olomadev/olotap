<template>
  <v-toolbar v-bind="$attrs" density="compact" flat height="auto" class="py-1 ps-1">

    <template v-for="(item, key) in items" :key="key">
      <!-- Spacer -->
      <v-spacer v-if="item.spacer" />
      
      <!-- Buttons -->
      <component
        :is="item.button.component"
        v-bind="item.button.componentProps"
        :editor="editor"
        :disabled="disabled || item.button.componentProps?.disabled"
      >
        <template v-for="(element, slotName, i) in item.button.componentSlots" :key="i" #[`${slotName}`]="values">
          <component :is="element" v-bind="values?.props" />
        </template>
      </component>

      <!-- Divider -->
      <v-divider v-if="item.divider" vertical class="mx-1 me-2" />
    </template>
  </v-toolbar>
</template>

<script>
import { isFunction } from '@/utils'

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
  created() {

  },
  computed: {
    items() {
      const extensions = [...this.editor.extensionManager.extensions]

      const sortExtensions = extensions.sort((arr, acc) => {
        const a = arr.options.sort ?? -1
        const b = acc.options.sort ?? -1
        return a - b
      })

      let menus = []
      for (const extension of sortExtensions) {
        const { button, divider = false, spacer = false, t = null } = extension.options
        if (!button || !isFunction(button)) continue

        const _button = button({
          editor: this.editor,
          extension,
          t
        })

        if (Array.isArray(_button)) {
          const menu = _button.map((k, i) => ({
            button: k,
            divider: i === _button.length - 1 ? divider : false,
            spacer: i === 0 ? spacer : false
          }))
          menus = [...menus, ...menu]
          continue
        }

        menus.push({ button: _button, divider, spacer, t })
      }
      
      return menus
    }
  }
}
</script>
