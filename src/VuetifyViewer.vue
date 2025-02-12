<template>
  <div class="vuetify-pro-tiptap-editor__content" :class="viewerClass" :style="{ width: '100%' }">
    <slot name="before"></slot>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="content" v-html="cleanValue"></div>
    <slot name="after"></slot>
  </div>
</template>

<script>
import { unref } from 'vue'
import { useContext, useMarkdownTheme } from './hooks'
import { isBoolean, isString } from '@/utils'
import { generateHTML } from '@tiptap/html'
import { useTheme } from 'vuetify'
import Xss from 'xss'
import xssRules from './constants/xss-rules'

export default {
  props: {
    value: {
      type: [String, Object],
      default: ''
    },
    dense: {
      type: Boolean,
      default: false
    },
    markdownTheme: {
      type: [String, Boolean],
      default: undefined
    },
    xss: {
      type: [Boolean, Array],
      default: true
    },
    xssOptions: {
      type: Function,
      default: () => xssRules
    },
    extensions: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      state: useContext().state,
      theme: useTheme(),
      markdownThemeStyle: useMarkdownTheme(computed(() => this.markdownTheme)).markdownThemeStyle
    }
  },
  computed: {
    ext() {
      return [...this.state.extensions, ...this.extensions]
    },
    viewerClass() {
      return {
        dense: this.dense,
        view: true,
        ...unref(this.markdownThemeStyle)
      }
    },
    htmlValue() {
      if (isString(this.value)) return this.value
      return generateHTML(this.value, unref(this.ext))
    },
    cleanValue() {
      if (this.xss === false) {
        return unref(this.htmlValue)
      }
      const value = unref(this.htmlValue)
        .replace('https://youtu.be/', 'https://www.youtube.com/watch?v=')
        .replace('watch?v=', 'embed/')
        .replace('https://vimeo.com/', 'https://player.vimeo.com/video/')

      const whiteList = this.xssOptions

      return Xss(value, { whiteList, css: false })
    }
  }
}
</script>
