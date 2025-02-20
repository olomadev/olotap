import { getCssUnitWithDefault } from '@/utils';
import { Extension } from '@tiptap/core';
import ActionMenuButton from '../ActionMenuButton.vue';
import { useContext } from "../hooks/use-context";

export const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() {
    const { state } = useContext();
    const { defaultFontSizeList, defaultFontSizeValue } = state;
    return {
      ...this.parent?.(),
      types: ['textStyle'],
      fontSizes: [...defaultFontSizeList],
      button: ({ editor, extension }) => {
        const fontSizes = extension.options?.fontSizes || [];

        const items = [defaultFontSizeValue, ...fontSizes].map(k => ({
          title: k === defaultFontSizeValue ? state.t('editor.default') : String(k),
          isActive: () => {
            const { fontSize } = editor.getAttributes('textStyle');

            const isDefault = k === defaultFontSizeValue;
            const notFontSize = fontSize === undefined;
            if (isDefault && notFontSize) {
              return true;
            }

            return editor.isActive({ fontSize: String(k) }) || false;
          },
          action: () => {
            if (k === defaultFontSizeValue) {
              editor.chain().focus().unsetFontSize().run();
              return;
            }

            editor.chain().focus().setFontSize(String(k)).run();
          },
          disabled: !editor.can().setFontSize(String(k)),
          divider: k === defaultFontSizeValue,
          default: k === defaultFontSizeValue
        }));

        const disabled = items.filter(k => k.disabled).length === items.length;

        return {
          component: ActionMenuButton,
          componentProps: {
            icon: 'mdi-format-size',
            tooltip: state.t('editor.fontSize.tooltip'),
            disabled,
            items,
            maxHeight: 280
          }
        };
      }
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize || '',
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {};
              }

              return {
                style: `font-size: ${getCssUnitWithDefault(attributes.fontSize)}`
              };
            }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setFontSize: fontSize => ({ chain }) => {
        return chain().setMark('textStyle', { fontSize }).run();
      },
      unsetFontSize: () => ({ chain }) => {
        return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run();
      }
    };
  }
});
export default FontSize;