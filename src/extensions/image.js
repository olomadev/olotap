import { Image as TiptapImage } from '@tiptap/extension-image';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import ImageDialog from '../image/ImageDialog.vue';
import ImageView from '../image/ImageView.vue';
import ImageActionButton from '../ImageActionButton.vue';

import { getConfig } from "../config";
const { IMAGE_SIZE } = getConfig();

export const Image = TiptapImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      lockAspectRatio: {
        default: true,
      },
      width: {
        default: this.options.width,
      },
      height: {
        default: null,
      },
      display: {
        default: this.options.display,
        renderHTML: ({ display }) => {
          if (!display) {
            return {};
          }

          return {
            'data-display': display,
          };
        },
        parseHTML: (element) => {
          const display = element.getAttribute('data-display');
          return display || 'inline';
        },
      },
    };
  },
  addNodeView() {
    return VueNodeViewRenderer(ImageView);
  },
  addCommands() {
    return {
      ...this.parent?.(),
      updateImage:
        (options) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, options);
        },
    };
  },
  addOptions() {
    return {
      ...this.parent?.(),
      upload: undefined,
      width: IMAGE_SIZE['size-medium'],
      display: 'inline',
      imageTabs: [],
      hiddenTabs: [],
      inline: true,
      dialogComponent: () => ImageDialog,
      button: ({ editor, extension, t }) => {
        const { upload, imageTabs, hiddenTabs, dialogComponent } = extension.options;

        return {
          component: ImageActionButton,
          componentProps: {
            editor,
            upload,
            imageTabs,
            hiddenTabs,
            isActive: () => editor.isActive('image') || false,
            disabled: !editor.can().setImage({}),
            icon: "mdi-image-plus",
            tooltip: t('editor.image.tooltip'),
          },
          componentSlots: {
            dialog: dialogComponent(),
          },
        };
      },
    };
  },
});
export default Image;