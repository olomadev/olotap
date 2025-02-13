import { createInjectionState } from '@vueuse/core'
import { computed, reactive, watchEffect } from 'vue'
import { useContext } from './use-context';

export const [useProvideOlotapStore, useOlotapStore] = createInjectionState(() => {
  const { state: _state } = useContext()

  const state = reactive({
    i18n: _state.i18n ?? undefined,
    extensions: _state.extensions ?? [],
    defaultLang: _state.constants.DEFAULT_LANG_VALUE,
    defaultMarkdownTheme: _state.constants.DEFAULT_MARKDOWN_THEME_VALUE,
    isFullscreen: false,
    color: undefined,
    highlight: undefined
  })

  const isFullscreen = computed(() => state.isFullscreen)

  function toggleFullscreen() {
    state.isFullscreen = !state.isFullscreen
  }

  watchEffect(() => {
    state.extensions = _state.extensions
    state.defaultLang = _state.defaultLang
    state.defaultMarkdownTheme = _state.defaultMarkdownTheme
  })

  return {
    state,
    isFullscreen,
    toggleFullscreen
  }
})
