import { createContext } from './hooks/index.js'
import OlotapEditor from "./OlotapEditor.vue";
import * as defaultConstants from './constants/define.js';

function mergeDeep(target, source) {
  if (typeof target !== 'object' || typeof source !== 'object') return source;
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object') {
      target[key] = mergeDeep(target[key] || {}, source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

export default {

  install(app, options) {

    const mergedConstants = mergeDeep({ ...defaultConstants }, options.constants || {});

    createContext({
      i18n: options.i18n ?? : undefined,
      defaultLang: options.lang ?? mergedConstants.DEFAULT_LANG_VALUE,
      defaultMarkdownTheme: options.markdownTheme ?? mergedConstants.DEFAULT_MARKDOWN_THEME_VALUE,
      extensions: options.extensions,
      constants: mergedConstants
    });

    app.component("OlotapEditor", OlotapEditor);
  }
};

export { OlotapEditor };
