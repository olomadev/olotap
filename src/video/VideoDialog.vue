<template>
  <v-dialog v-model="dialog" max-width="400" activator="parent" @click:outside="close">
    <v-card>
      <v-toolbar class="mb-5 pl-5 pr-2" density="compact">
        <span class="headline">{{ $t('editor.video.dialog.title') }}</span>
        <v-spacer />
        <v-btn class="mx-0" icon @click="close">
          <v-icon icon="mdi-close"></v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-text-field 
          density="compact"
          variant="outlined"
          v-model="url" 
          :label="$t('editor.video.dialog.link')" 
          hide-details 
          autofocus
        >
        </v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn :disabled="isDisabled" @click="apply">
          {{ $t('editor.video.dialog.button.apply') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { isValidURL } from '@/utils';

export default {
  props: {
    value: {
      type: String,
      default: undefined,
    },
    editor: {
      type: Object,
      required: true,
    },
    destroy: {
      type: Function,
      default: undefined,
    },
  },
  data() {
    return {
      url: '',
      dialog: false,
    };
  },
  computed: {
    isDisabled() {
      if (this.value === this.url) return true;
      if (!this.url) return true;
      return false;
    },
  },
  methods: {
    apply() {
      if (this.url) {
        // URL validation
        if (!isValidURL(this.url)) {
          alert(this.$t('editor.link.dialog.messages.invalidUrl'));
          return;
        }
        this.editor.chain().focus().setVideo({ src: this.url }).run();
      }
      this.close();
    },
    close() {
      this.dialog = false;
      this.url = '';
      setTimeout(() => this.destroy?.(), 300);
    },
  },
  watch: {
    value(newValue) {
      if (newValue) {
        this.url = newValue;
      }
    },
  },
};
</script>
