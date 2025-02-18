// StarterKit
import { Extension } from '@tiptap/core';
import { CharacterCount } from '@tiptap/extension-character-count';
import { Document } from '@tiptap/extension-document';
import { Dropcursor } from '@tiptap/extension-dropcursor';
import Focus from '@tiptap/extension-focus';
import { Gapcursor } from '@tiptap/extension-gapcursor';
import { HardBreak } from '@tiptap/extension-hard-break';
import { ListItem } from '@tiptap/extension-list-item';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Text } from '@tiptap/extension-text';
import { TextStyle } from '@tiptap/extension-text-style';
import { defaultBubbleList, generateBubbleTypeMenu } from '../bubble';
import { useContext } from "../hooks/use-context";
/**
 * Represents the interface for options in the base toolkit.
 */
export const BaseKit = Extension.create({
  name: 'base-kit',
  addOptions() {
    const { state } = useContext();
    const { NODE_TYPE_MENU } = state;
    return {
      ...this.parent?.(),
      bubble: {
        list: NODE_TYPE_MENU,
        defaultBubbleList,
        button: ({ editor, extension }) => {
          const { list = {}, defaultBubbleList } = extension.options?.bubble ?? {};
          const defaultList = defaultBubbleList?.(editor) ?? [];
          return generateBubbleTypeMenu(list, defaultList, { 
            editor, 
            extension, 
            t: (...args) => state.t(...args) // a wrapper function that directly calls function `t`
          });
        }
      }
    };
  },
  addExtensions() {
    const extensions = [];

    if (this.options.placeholder !== false) {
      extensions.push(
        Placeholder.configure({
          placeholder: '',
          ...this.options.placeholder
        })
      );
    }

    if (this.options.focus !== false) {
      extensions.push(
        Focus.configure({
          className: 'focus',
          ...this.options.focus
        })
      );
    }

    if (this.options.document !== false) {
      extensions.push(Document.configure());
    }

    if (this.options.text !== false) {
      extensions.push(Text.configure());
    }

    if (this.options.gapcursor !== false) {
      extensions.push(Gapcursor.configure());
    }

    if (this.options.dropcursor !== false) {
      extensions.push(Dropcursor.configure(this.options.dropcursor));
    }

    if (this.options.characterCount !== false) {
      extensions.push(CharacterCount.configure(this.options.characterCount));
    }

    if (this.options.paragraph !== false) {
      extensions.push(Paragraph.configure(this.options.paragraph));
    }

    if (this.options.hardBreak !== false) {
      extensions.push(HardBreak.configure(this.options.hardBreak));
    }

    if (this.options.listItem !== false) {
      extensions.push(ListItem.configure(this.options.listItem));
    }

    if (this.options.textStyle !== false) {
      extensions.push(TextStyle.configure(this.options.textStyle));
    }

    return extensions;
  }
});
export default BaseKit;