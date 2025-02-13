
import { isBoolean, isString } from '@/utils';
import { computed, unref, watch } from 'vue';
import { useContext } from './use-context';

export function useMarkdownTheme(value, hooks) {
  const { state } = useContext();

  const markdownTheme = computed(() => {
    if (isBoolean(unref(value))) return state.constants.DEFAULT_MARKDOWN_THEME_VALUE;
    if (isString(state.defaultMarkdownTheme) && state.defaultMarkdownTheme) {
      return state.defaultMarkdownTheme;
    }

    return state.constants.DEFAULT_MARKDOWN_THEME_VALUE;
  });

  const markdownThemeStyle = computed(() => {
    return {
      [`markdown-theme-${unref(markdownTheme)}`]: !!isString(unref(markdownTheme))
    };
  });

  function setMarkdownTheme(val) {
    if (!isBoolean(unref(value)) && unref(value) !== val) {
      hooks?.(val);
    }
  }

  watch(markdownTheme, val => setMarkdownTheme(val));

  watch(value, val => {
    if (val && isString(val) && state.defaultMarkdownTheme !== val) {
      state.defaultMarkdownTheme = val;
    }
  });

  const onCreated = () => {
    if (state.defaultMarkdownTheme) setMarkdownTheme(state.defaultMarkdownTheme);
  };

  onCreated();

  return {
    markdownThemeStyle
  };
}

