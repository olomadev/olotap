import { reactive } from 'vue';

const state = reactive({
  i18n: undefined,
  extensions: [],
  defaultLang: undefined,
  defaultMarkdownTheme: "github",
  constants: {},
  applyImageEvent: false,
});

export function createContext(instance) {
  state.i18n = instance.i18n;
  state.defaultLang = instance.defaultLang;
  state.defaultMarkdownTheme = instance.defaultMarkdownTheme;
  state.extensions = instance.extensions || [];
  state.constants = instance.constants || {};
}

export function useContext() {
  return {
    state,
  };
}