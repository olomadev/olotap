import { FontFamily as TiptapFontFamily } from '@tiptap/extension-font-family';
import FontFamilySelectButton from '../FontFamilySelectButton.vue';

import { getConfig } from "../config";
const { DEFAULT_FONT_FAMILY_LIST } = getConfig();

export const FontFamily = TiptapFontFamily.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      fontFamilies: DEFAULT_FONT_FAMILY_LIST,
      button: ({ editor, extension, t }) => {
        const fontFamilies = extension.options?.fontFamilies || [];

        const items = fontFamilies.map(k => ({
          title: k.title == 'editor.fontFamily.fonts.default' ? t(k.title) : t('editor.fontFamily.fonts.' + k.title),
          isActive: () => {
            const { fontFamily } = editor.getAttributes('textStyle');
            const isDefault = k.value === state.constants.DEFAULT_FONT_FAMILY_VALUE;
            const notFontFamily = fontFamily === undefined;
            
            if (isDefault && notFontFamily) {
              return true;
            }

            return editor.isActive({ fontFamily: k.value }) || false;
          },
          action: () => {
            if (k.value === state.constants.DEFAULT_FONT_FAMILY_VALUE) {
              editor.chain().focus().unsetFontFamily().run();
              return;
            }
            editor.chain().focus().setFontFamily(k.value).run();
          },
          disabled: !editor.can().setFontFamily(k.value),
          style: { fontFamily: k.value },
          divider: k.divider ?? false,
          default: k.default ?? false
        }));

        const disabled = items.filter(k => k.disabled).length === items.length;

        return {
          component: FontFamilySelectButton,
          componentProps: {
            icon: 'mdi-format-font',
            tooltip: t('editor.fontFamily.tooltip'),
            disabled,
            items,
            maxHeight: 280
          }
        };
      }
    };
  }
});
export default FontFamily;
