
# Olotap Tiptap Editor for Vue

Tiptap editor for Vue.js


Aşağudaki gibi bir vue + vite için en son sürümü kullanarak bir npm paketi oluşturmak istiyorum. Common js değil modern api desteklemeli. Bana en sorunsuz şekilde bunu nasıl yapacağımı anlatabilir misin ?

olotap/
└── src/
    ├── components/
    	└── OlotapEdior.vue
    ├── config/
    ├── extensions/
    	├── base-kit.js
    	├── bold.js
    	├── clear.js
    	└── index.js
    ├── hooks/
    ├── bubble.js
    ├── ActionButton.vue
    ├── VideoActionButton.vue
    └── index.js


index.js dosyam:
------------------------------------------

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


extensions/index.js dosyam
-----------------------------------------

export { default as BaseKit } from './base-kit';
export { default as Blockquote } from './blockquote';
export { default as Bold } from './bold';

export default {
  BaseKit,
  Blockquote,
  Bold
};


Kullanım Örneği
------------------------------------------

plugins/index.js
------------------------------------------

import { OlotapPlugin, OlotapEditor, Extensions, Hooks } from 'olotap';

// Vue'ye eklemek için
const app = createApp(App);
app.use(OlotapPlugin, options = {  });

// with register function
export function registerPlugins(app) {
    OlotapPlugin.install(options = {})
}

App.vue
------------------------------------------

<template>
  <div>
    <!-- Vite ve Vue logoları -->
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>

    <OlotapEditor 
      v-if="extensions.length > 0"
      :extensions="extensions"
      ref="editorRef"
      :key="editorKey"
      v-model="model.contentJson"
      v-model:markdown-theme="markdownTheme"
      output="json"
      :outlined="true"
      :error-messages="errorMessages"
      rounded
      :min-height="600"
      max-width="900"
      @change="onChange"
    >
    </OlotapEditor>

    <!-- Düzenleyici içeriğini gösterme -->
    <div class="content">
      <h3>Editor Content:</h3>
      <pre>{{ editorContent }}</pre>
    </div>
  </div>
</template>

<script>
import { OlotapEditor, Extensions } from "olotap";

const {
  BaseKit,
  History,
  Bold,
} = Extensions;


export default {
  name: 'App',
  components: {
    OlotapEditor
  },
  data() {
    return {
      model: {
        contentJson: null
      },
      errorMessages: [],
      markdownTheme: null,
      editorKey: "",
      extensions: null,
      editorContent: ''
    };
  },
  created() {
    this.extensions = [
      BaseKit.configure({
        placeholder: {
          placeholder: this.$t("editor.placeholder")
        },
        bubble: {
          // default config
          list: {
            image: [ 'float-left', 'float-none', 'float-right', 'divider', 'image-size-small', 'image-size-medium', 'image-size-large', 'divider', 'textAlign', 'divider', 'image', 'image-aspect-ratio', 'remove'],
            text: ['bold', 'italic', 'underline', 'strike', 'divider', 'color', 'highlight', 'textAlign', 'divider', 'link'],
            video: ['video', 'video-size-small', 'video-size-medium', 'video-size-large', 'remove']
          },
          defaultBubbleList: editor => {
            // You can customize the bubble menu here
            const defaultBubble = defaultBubbleList(editor)
            return defaultBubble; // default customize bubble list
          }
        }
      }),
    ];

  },
  methods: {
    onChange(val) {

    }
  }
};
</script>