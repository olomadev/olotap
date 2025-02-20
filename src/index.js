import OlotapEditor from "./components/OlotapEditor.vue";
import * as Context from './hooks/use-context';
import { useOlotapStore } from './hooks/use-store';
import { defaultBubbleList } from './bubble';

const OlotapPlugin = {
  async install(app, config = {}) {
    await Context.createContext(config); // loading the context's configuration
    const Extensions = await import('./extensions'); // loading extensions dynamically
    app.config.globalProperties.$extensions = Extensions;
  }
};

export { OlotapPlugin, OlotapEditor, defaultBubbleList, Context, useOlotapStore };


// Usage
/*
import { OlotapEditor, OlotapPlugin, defaultBubbleList } from 'olotap';

const app = createApp(App);
app.use(OlotapPlugin, config = {  });

export function registerPlugins(app) {
  OlotapPlugin.install(app, config = {})
}
*/
