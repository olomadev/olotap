import { getCssUnitWithDefault } from '@/utils';
import { Node } from '@tiptap/core';
import VideoDialog from '../video/VideoDialog.vue';
import VideoActionButton from '../VideoActionButton.vue';
import { useOlotapStore } from '../hooks/use-store'

const VIDEO_SIZE = useOlotapStore().state.constants.VIDEO_SIZE;

function linkConvert(src) {
  // Youtube
  src = src.replace('https://youtu.be/', 'https://www.youtube.com/watch?v=').replace('watch?v=', 'embed/');
  // Vimeo 
  src = src.replace('https://vimeo.com/', 'https://player.vimeo.com/video/');
  // Bilibili
  const isBilibiliLink = /^https?:\/\/www.bilibili.com\/video\/.*/i.test(src);
  if (isBilibiliLink) {
    src = src
      .replace(/\?.*$/i, '')
      .replace('https://www.bilibili.com/video/', 'https://player.bilibili.com/player.html?bvid=');
  }
  // Google Drive
  if (src.includes('drive.google.com')) {
    src = src.replace('/view', '/preview');
  }
  return src;
}
export const Video = Node.create({
  name: 'video',
  group: 'block',
  atom: true,
  draggable: true,
  addAttributes() {
    return {
      src: {
        default: null,
        renderHTML: ({ src }) => ({
          src: src ? linkConvert(src) : null,
        }),
      },
      width: {
        default: this.options.width,
        renderHTML: ({ width }) => ({
          width: getCssUnitWithDefault(width),
        }),
      },
      frameborder: {
        default: this.options.frameborder ? 1 : 0,
        parseHTML: () => (this.options.frameborder ? 1 : 0),
      },
      allowfullscreen: {
        default: this.options.allowFullscreen,
        parseHTML: () => this.options.allowFullscreen,
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-video] iframe',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    const { width = '100%' } = HTMLAttributes ?? {};

    const iframeHTMLAttributes = {
      ...HTMLAttributes,
      width: '100%',
      height: '100%',
    };
    const responsiveStyle = `position: relative;overflow: hidden;display: flex;flex: 1;max-width: ${width};`;
    const responsiveSizesStyle = `flex: 1;padding-bottom: ${(9 / 16) * 100}%;`;

    const iframeDOM = ['iframe', iframeHTMLAttributes];
    const sizesDOM = ['div', { style: responsiveSizesStyle }];
    const responsiveDOM = ['div', { style: responsiveStyle }, sizesDOM, iframeDOM];

    const divAttrs = {
      ...this.options.HTMLAttributes,
      'data-video': '',
    };
    return ['div', divAttrs, responsiveDOM];
  },
  addCommands() {
    return {
      setVideo:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },

      updateVideo:
        (options) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, options);
        },
    };
  },
  addOptions() {
    return {
      divider: false,
      spacer: false,
      allowFullscreen: true,
      frameborder: false,
      width: VIDEO_SIZE['size-medium'],
      HTMLAttributes: {
        class: 'iframe-wrapper',
        style: 'display: flex;justify-content: center;',
      },
      dialogComponent: () => VideoDialog,
      button: ({ editor, extension, t }) => {
        const { dialogComponent } = extension.options;

        return {
          component: VideoActionButton,
          componentProps: {
            isActive: () => editor.isActive('video') || false,
            icon: "mdi-video-plus",
            tooltip: t('editor.video.tooltip'),
          },
          componentSlots: {
            dialog: dialogComponent(),
          },
          disabled: () => !editor.can().setVideo({}),
        };
      },
    };
  },
});
export default Video;