import { Extension } from '@tiptap/core'
import FullscreenActionButton from '../FullscreenActionButton.vue'

export const Fullscreen = Extension.create({
  name: 'fullscreen',
  addOptions() {
    return {
      ...this.parent?.(),
      useWindow: false,
      button: ({ editor, extension }) => ({
        component: FullscreenActionButton,
        componentProps: {
          useWindow: extension.options.useWindow ?? false
        }
      })
    }
  }
})
export default Fullscreen;