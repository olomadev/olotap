import OlotapEditor from "./components/OlotapEditor.vue";
import Extensions from "./extensions/index.js";

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

export { OlotapPlugin, OlotapEditor, Extensions };


// Usage

/*
import OlotapPlugin, { OlotapEditor, Extensions, Hooks } from 'olotap';

// Vue'ye eklemek için
const app = createApp(App);
app.use(OlotapPlugin, options = {  });

// with register function
export function registerPlugins(app) {
    OlotapPlugin.install(options = {})
}
*/
