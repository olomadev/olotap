import { IMAGE_SIZE, VIDEO_SIZE } from './constants/define'
import { isString } from '@/utils'
import { deleteSelection } from '@tiptap/pm/commands'
import ActionButton from './ActionButton.vue'

import i18n from '@/i18n';

/** Represents the floating types for bubble images */
const BubbleImageFloatType = ['float-left', 'float-none', 'float-right']

/** Represents the size types for bubble images or videos */
const BubbleImageOrVideoSizeType = ['size-small', 'size-medium', 'size-large']

/** Represents the various types for bubble images */
const BubbleImageType = [
  ...BubbleImageFloatType,
  `image-${BubbleImageOrVideoSizeType}`,
  `video-${BubbleImageOrVideoSizeType}`,
  'image',
  'image-aspect-ratio',
  'unlink',
  'link-open',
  'remove'
]

/** Represents the types for bubble videos */
const BubbleVideoType = ['video', 'remove']

/** Represents the overall types for bubbles */
const BubbleAllType = [...BubbleImageType, ...BubbleVideoType, 'divider']

/** Represents the key types for node types */
export const NodeTypeKey = ['image', 'text', 'link', 'video']

/** Represents the menu of bubble types for each node type */
export const BubbleTypeMenu = {}

/** Represents the menu of overall bubble types for each node type */
export const NodeTypeMenu = {}

/**
 * Represents the structure of a bubble menu item.
 */
export const BubbleMenuItem = {
  /** The type of the bubble item */
  type: BubbleAllType
}

/**
 * Represents a function to generate a bubble menu
 */
const BubbleView = (options) => {
  /**
   * Generates a bubble menu based on the provided options.
   * @param {Object} options - The options for generating the bubble menu.
   * @returns {BubbleTypeMenu} The generated bubble menu.
   */
  return BubbleTypeMenu
}

const imageFloatMenus = (editor) => {
  const types = ['float-left', 'float-none', 'float-right']
  const icons = ['mdi-format-float-left', 'mdi-format-float-none', 'mdi-format-float-right']
  const display = ['left', 'inline', 'right']

  return types.map((float, i) => ({
    type: float,
    component: ActionButton,
    componentProps: {
      tooltip: `editor.image.${float.replace('-', '.')}.tooltip`,
      icon: icons[i],
      action: () => editor.chain().focus().updateImage({ display: display[i] }).run(),
      isActive: () => editor.isActive('image', { display: display[i] })
    }
  }))
}

const imageSizeMenus = (editor) => {
  const types = ['size-small', 'size-medium', 'size-large']
  const icons = ['mdi-size-s', 'mdi-size-m', 'mdi-size-l']

  return types.map((size, i) => ({
    type: `image-${size}`,
    component: ActionButton,
    componentProps: {
      tooltip: `editor.${size.replace('-', '.')}.tooltip`,
      icon: icons[i],
      action: () => editor.chain().focus().updateImage({ width: IMAGE_SIZE[size], height: null }).run(),
      isActive: () => editor.isActive('image', { width: IMAGE_SIZE[size] })
    }
  }))
}

const videoSizeMenus = (editor) => {
  const types = ['size-small', 'size-medium', 'size-large']
  const icons = ['mdi-size-s', 'mdi-size-m', 'mdi-size-l']

  return types.map((size, i) => ({
    type: `video-${size}`,
    component: ActionButton,
    componentProps: {
      tooltip: `editor.${size.replace('-', '.')}.tooltip`,
      icon: icons[i],
      action: () => editor.chain().focus().updateVideo({ width: VIDEO_SIZE[size] }).run(),
      isActive: () => editor.isActive('video', { width: VIDEO_SIZE[size] })
    }
  }))
}

export const defaultBubbleList = (editor) => [
  ...imageFloatMenus(editor),
  ...imageSizeMenus(editor),
  ...videoSizeMenus(editor),
  {
    type: 'image-aspect-ratio',
    component: ActionButton,
    componentProps: {
      tooltip: 'editor.image.dialog.form.aspectRatio',
      icon: 'mdi-aspect-ratio',
      action: () => {
        const isLock = editor.isActive('image', { lockAspectRatio: true })
        editor.chain().focus().updateImage({
          lockAspectRatio: !isLock,
          height: isLock ? undefined : null
        }).run()
      },
      isActive: () => editor.isActive('image', { lockAspectRatio: true })
    }
  },
  {
    type: 'unlink',
    component: ActionButton,
    componentProps: {
      tooltip: 'editor.link.unlink.tooltip',
      icon: 'mdi-link-variant-off',
      action: () => {
        const { href } = editor.getAttributes('link')

        editor.chain().extendMarkRange('link', { href }).unsetLink().focus().run()
      }
    }
  },
  {
    type: 'link-open',
    component: ActionButton,
    componentProps: {
      tooltip: 'editor.link.open',
      icon: 'mdi-open-in-new',
      action: () => {
        const { href } = editor.getAttributes('link')
        if (isString(href) && href) {
          window.open(href, '_blank')
        }
      }
    }
  },
  {
    type: 'remove',
    component: ActionButton,
    componentProps: {
      tooltip: 'editor.remove',
      icon: 'mdi-delete',
      action: () => {
        const { state, dispatch } = editor.view
        deleteSelection(state, dispatch)
      }
    }
  }
]

/**
 * Generate bubble menu
 * @param {NodeTypeMenu} list
 * @param {BubbleMenuItem[]} defaultList
 * @param {Object} options
 * @return {BubbleTypeMenu}
 */
export const generateBubbleTypeMenu = (
  list,
  defaultList,
  { editor, extension }
) => {
  const { extensions = [] } = editor.extensionManager

  const items = {}

  for (const node of Object.keys(list)) {
    const nodeType = list[node]
    if (!nodeType) continue

    const _items = []

    for (const ext of nodeType) {
      if (ext === 'divider') {
        const lastItem = _items[_items.length - 1]
        if (lastItem?.type === 'divider') continue

        _items.push({
          type: 'divider',
          component: undefined,
          componentProps: {}
        })
        continue
      }

      const find = defaultList.find(k => k.type === ext)
      if (find) {

        // console.error(find.componentProps.tooltip)

        _items.push({
          ...find,
          componentProps: {
            ...find.componentProps,
            tooltip: find.componentProps.tooltip ? i18n.global.t(find.componentProps.tooltip) : undefined
          },
          componentSlots: find.componentSlots
        })
        continue
      }

      const findExt = extensions.find(k => k.name === ext)
      if (findExt) {
        const { button } = findExt.options
        const _button = button({ editor, extension: findExt, t: i18n.global.t })

        _items.push({
          type: ext,
          component: _button.component,
          componentProps: _button.componentProps,
          componentSlots: _button.componentSlots
        })
        continue
      }
    }

    const lastItem = _items[_items.length - 1]
    const fristItem = _items[0]

    if (lastItem?.type === 'divider') _items.pop()
    if (fristItem?.type === 'divider') _items.shift()

    items[node] = _items
  }

  return items
}
