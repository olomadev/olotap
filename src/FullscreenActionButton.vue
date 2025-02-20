<template>
  <v-btn
    class="rounded me-1 ms-0"
    density="comfortable"
    size="small"
    :disabled="disabled"
    :color="color"
    icon
    :class="{
      'v-btn--active': isActive?.()
    }"
    @click="onAction(useWindow)"
  >
    <v-icon :icon="icon" />
    <v-tooltip :eager="false" activator="parent" location="top" :text="text" />
    <slot></slot>
  </v-btn>
</template>

<script>
import { useOlotapStore, useContext } from './hooks'
import { useFullscreen } from '@vueuse/core'
import { computed, watch } from 'vue'

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    color: String,
    isActive: Function,
    useWindow: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { state, toggleFullscreen } = useOlotapStore()
    const { isFullscreen, enter, exit } = useFullscreen()

    watch(isFullscreen, val => {
      if (!val && state.isFullscreen && props.useWindow) {
        onAction()
      }
    })

    const text = computed(() => {
      const tooltip = state.isFullscreen ? 'editor.fullscreen.tooltip.exit' : 'editor.fullscreen.tooltip.fullscreen'
      if (!tooltip) return undefined
      return useContext().state.t(tooltip)
    })

    const icon = computed(() => {
      const _icon = state.isFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'
      return _icon
    })

    function onAction(_useWindow = false) {
      toggleFullscreen()

      if (state.isFullscreen) {
        document.documentElement.classList.add('overflow-y-hidden')
        _useWindow && enter()
      } else {
        document.documentElement.classList.remove('overflow-y-hidden')
        _useWindow && exit()
      }
    }

    return {
      onAction,
      text,
      icon,
      props
    }
  }
}
</script>
