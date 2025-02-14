import OlotapEditor from "./components/OlotapEditor.vue";
import * as Extensions from './extensions/index.js'; 
import * as Hooks from './hooks/index.js';
import { setConfig } from "./config";
const { createContext } = Hooks;

class OlotapPlugin {
  install(options) {
    setConfig({
      i18n: options.i18n ?? undefined
    })
    createContext({
      defaultLang: options.lang ?? "en",
      defaultMarkdownTheme: options.markdownTheme ?? "github",
    });
  }
}

export default OlotapPlugin;
export { OlotapEditor, Extensions, Hooks };

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
