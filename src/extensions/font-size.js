import { getCssUnitWithDefault } from '@/utils';
import { Extension } from '@tiptap/core';
import ActionMenuButton from '../ActionMenuButton.vue';
import { useContext } from './hooks/use-context';
const { state } = useContext();

const DEFAULT_FONT_SIZE_LIST = state.constants.DEFAULT_FONT_SIZE_LIST;
const DEFAULT_FONT_SIZE_VALUE = state.constants.DEFAULT_FONT_SIZE_VALUE;

export const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() {
    return {
      ...this.parent?.(),
      types: ['textStyle'],
      fontSizes: [...DEFAULT_FONT_SIZE_LIST],
      button: ({ editor, extension, t }) => {
        const fontSizes = extension.options?.fontSizes || [];

        const items = [DEFAULT_FONT_SIZE_VALUE, ...fontSizes].map(k => ({
          title: k === DEFAULT_FONT_SIZE_VALUE ? t('editor.default') : String(k),
          isActive: () => {
            const { fontSize } = editor.getAttributes('textStyle');

            const isDefault = k === DEFAULT_FONT_SIZE_VALUE;
            const notFontSize = fontSize === undefined;
            if (isDefault && notFontSize) {
              return true;
            }

            return editor.isActive({ fontSize: String(k) }) || false;
          },
          action: () => {
            if (k === DEFAULT_FONT_SIZE_VALUE) {
              editor.chain().focus().unsetFontSize().run();
              return;
            }

            editor.chain().focus().setFontSize(String(k)).run();
          },
          disabled: !editor.can().setFontSize(String(k)),
          divider: k === DEFAULT_FONT_SIZE_VALUE,
          default: k === DEFAULT_FONT_SIZE_VALUE
        }));

        const disabled = items.filter(k => k.disabled).length === items.length;

        return {
          component: ActionMenuButton,
          componentProps: {
            icon: 'mdi-format-size',
            tooltip: t('editor.fontSize.tooltip'),
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