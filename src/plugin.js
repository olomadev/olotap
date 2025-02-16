import * as Hooks from './hooks/index.js';
const { createContext } = Hooks;
import { setConfig } from "./config";

// src/plugin.js
const OlotapPlugin = {
  install(app, options = {}) {
    setConfig({
      i18n: options.i18n ?? undefined
    });

    createContext({
      defaultLang: options.lang ?? "en",
      defaultMarkdownTheme: options.markdownTheme ?? "github",
    });
  }
};

export default OlotapPlugin;
