import { Highlight as TiptapHighlight } from '@tiptap/extension-highlight';
import HighlightActionButton from '../HighlightActionButton.vue';

export const Highlight = TiptapHighlight.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      multicolor: true,
      button: ({ editor, t }) => ({
        component: HighlightActionButton,
        componentProps: {
          editor,
          action: (color) => {
            if (typeof color === 'string') {
              editor.chain().focus().setHighlight({ color }).run();
              if (color == '') {
                editor.chain().focus().unsetHighlight().run(); // remove mark  
              }
            } else {
              editor.chain().focus().unsetHighlight().run(); // remove mark
            }
          },
          isActive: () => editor.isActive('highlight') || false,
          disabled: !editor.can().setHighlight(),
          icon: 'mdi-format-color-highlight',
          tooltip: t('editor.highlight.tooltip')
        }
      })
    };
  }
});
export default Highlight;