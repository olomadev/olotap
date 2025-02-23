<template>
  <v-dialog v-model="dialog" max-width="400" activator="parent" @click:outside="close">
    <v-card>
      <v-toolbar class="mb-5 pl-5 pr-2" density="compact">
        <span class="headline">{{ $t('editor.link.dialog.title') }}</span>
        <v-spacer />
        <v-btn class="mx-0" icon @click="close">
          <v-icon icon="mdi-close"></v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-text-field 
          density="compact" 
          variant="outlined"
          v-model="attrs.href" 
          :label="$t('editor.link.dialog.link')" 
          autofocus 
        >
        </v-text-field>
        
        <v-text-field 
          density="compact" 
          variant="outlined"
          v-model="attrs.rel" 
          :label="$t('editor.link.dialog.rel')" 
          hide-details
        >
        </v-text-field>

        <v-checkbox
          class="mt-2"
          style="margin-left:0;padding-left:0;"
          density="compact" 
          variant="outlined"
          v-model="attrs.target"
          :label="$t('editor.link.dialog.openInNewTab')"
          false-value="_self"
          true-value="_blank"
        >
        </v-checkbox>
      </v-card-text>

      <v-card-actions>
        <v-btn :disabled="isDisabled" @click="apply">
          {{ $t('editor.link.dialog.button.apply') }}
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
      default: undefined
    },
    target: {
      type: String,
      default: '_blank'
    },
    rel: {
      type: String,
      default: undefined
    },
    editor: {
      type: Object,
      required: true
    },
    destroy: {
      type: Function,
      default: undefined
    }
  },
  data() {
    return {
      attrs: this.generateLinkAttrs(),
      dialog: false
    };
  },
  computed: {
    isDisabled() {
      const { href, target, rel } = this.attrs;
      if (!href) return true;

      return this.value === href && this.target === target && this.rel === rel;
    }
  },
  methods: {
    generateLinkAttrs() {
      return {
        href: '',
        target: '_blank',
        rel: ''
      };
    },
    apply() {
      const { href, target, rel } = this.attrs;
      // URL validation
      if (!isValidURL(href)) {
        alert(this.$t('editor.link.dialog.messages.invalidUrl'));
        return;
      }
      if (href) {
        this.editor.chain().focus().extendMarkRange('link').setLink({ href, target, rel }).run();
      }
      this.close();
    },
    close() {
      this.dialog = false;
      this.attrs = this.generateLinkAttrs();

      setTimeout(() => this.destroy?.(), 300);
    }
  },
  watch: {
    dialog(val) {
      if (!val) return;

      this.attrs = {
        href: this.value,
        target: this.target,
        rel: this.rel
      };
    }
  }
};
</script>