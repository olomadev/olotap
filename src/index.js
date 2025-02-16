import OlotapEditor from "./components/OlotapEditor.vue";
import * as Extensions from './extensions';
import { setConfig } from "./config";

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
import { OlotapEditor, Extensions } from 'olotap';

// Vue'ye eklemek için
const app = createApp(App);
app.use(OlotapPlugin, options = {  });

// with register function
export function registerPlugins(app) {
    OlotapPlugin.install(options = {})
}
*/
