import { TextAlign as TiptapTextAlign } from '@tiptap/extension-text-align';
import ActionMenuButton from '../ActionMenuButton.vue';
const Alignments = ['left', 'center', 'right', 'justify'];

export const TextAlign = TiptapTextAlign.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      types: ['heading', 'paragraph', 'image'],
      button: ({ editor, extension, t }) => {
        const alignments = (extension.options?.alignments || Alignments);
        const items = alignments.map(k => {
          return {
            title: t(`editor.textalign.${k}.tooltip`),
            icon: `mdi-format-align-${k}`,
            isActive: () => editor.isActive({ textAlign: k }) || false,
            action: () => editor.chain().focus().setTextAlign(k).run(),
            disabled: false, // !editor.can().setTextAlign(k)
          };
        });

        const disabled = items.every(k => k.disabled);

        return {
          component: ActionMenuButton,
          componentProps: {
            icon: 'mdi-format-align-center',
            tooltip: t('editor.textalign.tooltip'),
            disabled,
            items
          }
        };
      }
    };
  }
});
export default TextAlign;
