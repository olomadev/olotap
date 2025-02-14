import { reactive } from 'vue';

const state = reactive({
  defaultLang: undefined,
  defaultMarkdownTheme: "github",
});

export function createContext(instance) {
  state.defaultLang = instance.defaultLang;
  state.defaultMarkdownTheme = instance.defaultMarkdownTheme;
}

export function useContext() {
  return {
    state,
  };
}