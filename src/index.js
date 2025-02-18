import OlotapEditor from "./components/OlotapEditor.vue";
import * as Context from './hooks/use-context';
import * as Extensions from './extensions';
import { defaultBubbleList } from './bubble';

const OlotapPlugin = {
  install(app, config = {}) {
    Context.createContext(config);
  }
};

export { OlotapPlugin, OlotapEditor, Extensions, defaultBubbleList };

// Usage
/*
import { OlotapEditor, OlotapPlugin, Extension } from 'olotap';

const app = createApp(App);
app.use(OlotapPlugin, config = {  });

export function registerPlugins(app) {
  OlotapPlugin.install(config = {})
}
*/
