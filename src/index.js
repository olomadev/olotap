import OlotapEditor from "./components/OlotapEditor.vue";
import * as Context from './hooks/use-context';
import { defaultBubbleList } from './bubble';

const OlotapPlugin = {
  async install(app, config = {}) {
    await Context.createContext(config);
    const Extensions = await import('./extensions');
    app.config.globalProperties.$extensions = Extensions;
  }
};

export { OlotapPlugin, OlotapEditor, defaultBubbleList, Context };


// Usage
/*
import { OlotapEditor, OlotapPlugin, defaultBubbleList } from 'olotap';

const app = createApp(App);
app.use(OlotapPlugin, config = {  });

export function registerPlugins(app) {
  OlotapPlugin.install(app, config = {})
}
*/
