import { FontFamily as TiptapFontFamily } from '@tiptap/extension-font-family';
import FontFamilySelectButton from '../FontFamilySelectButton.vue';
import { useContext } from "../hooks/use-context";

export const FontFamily = TiptapFontFamily.extend({
  addOptions() {
    const { state } = useContext();
    const { defaultFontFamilyList, defaultFontFamilyValue } = state;
    return {
      ...this.parent?.(),
      fontFamilies: defaultFontFamilyList,
      button: ({ editor, extension }) => {
        const fontFamilies = extension.options?.fontFamilies || [];

        const items = fontFamilies.map(k => ({
          title: k.title == 'editor.fontFamily.fonts.default' ? state.t(k.title) : state.t('editor.fontFamily.fonts.' + k.title),
          isActive: () => {
            const { fontFamily } = editor.getAttributes('textStyle');
            const isDefault = k.value === defaultFontFamilyValue;
            const notFontFamily = fontFamily === undefined;
            
            if (isDefault && notFontFamily) {
              return true;
            }

            return editor.isActive({ fontFamily: k.value }) || false;
          },
          action: () => {
            if (k.value === defaultFontFamilyValue) {
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
            tooltip: state.t('editor.fontFamily.tooltip'),
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
