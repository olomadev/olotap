import { createInjectionState } from '@vueuse/core'
import { computed, reactive, watchEffect } from 'vue'
import { useContext } from './use-context';

export const [useProvideOlotapStore, useOlotapStore] = createInjectionState(() => {
  const { state: _state } = useContext()
  const { defaultMarkdownThemeValue } = _state;

  const state = reactive({
    defaultMarkdownTheme: defaultMarkdownThemeValue,
    isFullscreen: false,
    isImageEvent: false,
    color: undefined,
    highlight: undefined
  })

  const isFullscreen = computed(() => state.isFullscreen)
  const isImageEvent = computed(() => state.isImageEvent)

  function toggleFullscreen() {
    state.isFullscreen = !state.isFullscreen
    _state.isFullscreen = state.isFullscreen
  }

  function toggleImageEvent() {
    state.isImageEvent = !state.isImageEvent
    _state.isImageEvent = !state.isImageEvent
  }

  watchEffect(() => {
    state.defaultMarkdownTheme = _state.defaultMarkdownTheme
  })

  return {
    state,
    isFullscreen,
    isImageEvent,
    toggleFullscreen,
    toggleImageEvent
  }
})
