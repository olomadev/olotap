<template>
  <v-dialog v-model="dialog" max-width="400" activator="parent" @click:outside="close">
    <v-card>
      <v-toolbar class="pl-5 pr-2" density="compact">
        <span class="headline">{{ $t('editor.image.dialog.title') }}</span>
        <v-spacer />
        <v-btn class="mx-0" icon @click="close">
          <v-icon icon="mdi-close"></v-icon>
        </v-btn>
      </v-toolbar>

      <v-tabs v-model="tab">
        <v-tab v-for="(imageTab, i) in defaultImageTabs" :key="i" :value="i">
          {{ imageTab.name }}
        </v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item v-for="(imageTab, i) in defaultImageTabs" :key="i" :value="i">
            <component class="pt-5" :is="imageTab.component" v-model="form" :upload="upload" />
          </v-window-item>
        </v-window>
      </v-card-text>

      <v-card-actions>
        <v-btn :disabled="disabledApply" @click="apply">
          {{ $t('editor.image.dialog.button.apply') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ImageUpload from './ImageUpload.vue';
import ImageUrl from './ImageUrl.vue';
import { useProvideOlotapStore } from '../hooks';

export default {
  components: {
    ImageUpload,
    ImageUrl,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    upload: {
      type: Function,
      default: undefined,
    },
    imageTabs: {
      type: Array,
      default: () => [],
    },
    hiddenTabs: {
      type: Array,
      default: () => [],
    },
    destroy: {
      type: Function,
      default: undefined,
    },
    editor: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { toggleImageEvent } = useProvideOlotapStore();
    return {
      toggleImageEvent
    }
  },
  data() {
    return {
      dialog: false,
      tab: false,
      form: {},
    };
  },
  computed: {
    defaultImageTabs() {
      const defTabs = [
        {
          name: this.$t('editor.image.dialog.tab.url'),
          type: 'url',
          component: ImageUrl,
        },
        {
          name: this.$t('editor.image.dialog.tab.upload'),
          type: 'upload',
          component: ImageUpload,
        },
      ];
      const filterDefTabs = defTabs.filter((item) => {
        if (!item.type) return item;
        return !this.hiddenTabs.includes(item.type);
      });
      return [...filterDefTabs, ...this.imageTabs];
    },
    disabledApply() {
      const { src } = this.form;
      if (typeof src === 'string' && src !== '') return false;
      return true;
    },
  },
  methods: {
    async apply() {
      const { src, lockAspectRatio, height } = this.form;
      if (!src) return;

      this.editor
        .chain()
        .focus()
        .setImage({
          ...this.form,
          src,
          height: lockAspectRatio ? undefined : height,
        })
        .run();

      this.toggleImageEvent();
      this.close();
    },
    close() {
      this.dialog = false;
      this.form = {};

      setTimeout(() => this.destroy?.(), 300);
    },
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(val) {
        this.form = {
          ...this.form,
          ...val,
        };
      },
    },
  }
};
</script>
