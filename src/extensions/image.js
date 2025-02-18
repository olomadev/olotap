import { Image as TiptapImage } from '@tiptap/extension-image';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import ImageDialog from '../image/ImageDialog.vue';
import ImageView from '../image/ImageView.vue';
import ImageActionButton from '../ImageActionButton.vue';
import { useContext } from "../hooks/use-context";

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
    const { state } = useContext();
    const { IMAGE_SIZE } = state;
    return {
      ...this.parent?.(),
      upload: undefined,
      width: IMAGE_SIZE['size-medium'],
      display: 'inline',
      density: 'compact',
      variant: 'outlined',
      imageTabs: [],
      hiddenTabs: [],
      inline: true,
      dialogComponent: () => ImageDialog,
      button: ({ editor, extension }) => {
        const { upload, density, variant, imageTabs, hiddenTabs, dialogComponent } = extension.options;

        return {
          component: ImageActionButton,
          componentProps: {
            editor,
            density,
            variant,
            upload,
            imageTabs,
            hiddenTabs,
            isActive: () => editor.isActive('image') || false,
            disabled: !editor.can().setImage({}),
            icon: "mdi-image-plus",
            tooltip: state.t('editor.image.tooltip'),
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