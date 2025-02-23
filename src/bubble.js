import { isString } from '@/utils'
import { deleteSelection } from '@tiptap/pm/commands'
import ActionButton from './ActionButton.vue'
import { useContext } from './hooks/use-context';

const supportedCodes = [
  "plaintext", "1c", "abnf", "access-logs", "actionscript", "ada", "apache", "applescript",
  "arcade", "arduino", "arm-assembly", "asciidoc", "aspectj", "autohotkey", "autoit",
  "avr-assembler", "awk", "axapta", "bash", "basic", "bbcode", "blade", "c", "csharp",
  "cpp", "cal", "capn-proto", "clojure", "cmake", "coffeescript", "coq", "csp", "css",
  "d", "dart", "delphi", "diff", "django", "dockerfile", "dos", "dsconfig", "dts",
  "dust", "ebnf", "elixir", "elm", "erb", "erlang", "excel", "fsharp", "fix", "flix",
  "fortran", "gams", "gauss", "gherkin", "go", "golo", "gradle", "graphql", "groovy",
  "html", "http", "haml", "handlebars", "haskell", "haxe", "hlsl", "hy", "inform7",
  "ini", "irpf90", "java", "javascript", "jboss-cli", "json", "julia", "kotlin",
  "lasso", "latex", "ldif", "leaf", "less", "lisp", "livecode", "livescript", "llvm",
  "lua", "makefile", "markdown", "mathematica", "matlab", "maxima", "mel", "mercury",
  "mirc", "mizar", "mojo", "monkey", "moonscript", "n1ql", "nginx", "nim", "nix",
  "nodejs-repl", "nsis", "objectivec", "ocaml", "openscad", "oxygene", "parser3",
  "perl", "php", "php-template", "pony", "powershell", "processing", "prolog",
  "properties", "protocol-buffers", "puppet", "purebasic", "python", "q", "qml", "r",
  "razor", "reasonml", "red", "redis", "roboconf", "ruby", "rust", "sas", "scala",
  "scheme", "scilab", "scss", "shell", "smali", "smalltalk", "sml", "sqf", "sql",
  "stan", "stata", "step21", "stylus", "subunit", "swift", "tcl", "terraform",
  "test-anything-protocol", "tex", "thrift", "tp", "twig", "typescript", "vala",
  "vbnet", "vbscript", "verilog", "vhdl", "vim", "x86-assembly", "xquery", "yaml",
  "zephir"
];

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
  const { state } = useContext();
  const imageSize = state.imageSize;

  const types = ['size-small', 'size-medium', 'size-large']
  const icons = ['mdi-size-s', 'mdi-size-m', 'mdi-size-l']

  return types.map((size, i) => ({
    type: `image-${size}`,
    component: ActionButton,
    componentProps: {
      tooltip: `editor.${size.replace('-', '.')}.tooltip`,
      icon: icons[i],
      action: () => editor.chain().focus().updateImage({ width: imageSize[size], height: null }).run(),
      isActive: () => editor.isActive('image', { width: imageSize[size] })
    }
  }))
}

const videoSizeMenus = (editor) => {
  const { state } = useContext();
  const videoSize = state.imageSize;

  const types = ['size-small', 'size-medium', 'size-large']
  const icons = ['mdi-size-s', 'mdi-size-m', 'mdi-size-l']

  return types.map((size, i) => ({
    type: `video-${size}`,
    component: ActionButton,
    componentProps: {
      tooltip: `editor.${size.replace('-', '.')}.tooltip`,
      icon: icons[i],
      action: () => editor.chain().focus().updateVideo({ width: videoSize[size] }).run(),
      isActive: () => editor.isActive('video', { width: videoSize[size] })
    }
  }))
}

const codeBlockMenus = (editor) => {
  const _state = useContext().state;
  return [
   {
      type: 'paste-code',
      component: ActionButton,
      componentProps: {
        tooltip: 'editor.codeblock.paste.tooltip',
        icon: 'mdi-pencil',
        action: () => {
          const newCode = prompt(_state.t('editor.codeblock.paste.prompt'), '');
          if (newCode) {
            const { state, dispatch } = editor.view;
            const { selection } = state;
            const { from, to } = selection;
            const node = state.doc.nodeAt(from);

            if (node && node.type.name === 'codeBlock') {
              const pos = from - 1; // to get the exact start of the node
              dispatch(
                state.tr.replaceWith(pos, to, node.type.create(node.attrs, state.schema.text(newCode)))
              );
              editor.commands.focus(); // refocus editor
            }
          } else {
            alert(_state.t('editor.codeblock.paste.empty'))
          }
        }
      }
    },
    {
      type: 'change-language',
      component: ActionButton,
      componentProps: {
        tooltip: 'editor.codeblock.changeLang.tooltip',
        icon: 'mdi-code-braces',
        action: () => {
          const newLang = prompt(_state.t('editor.codeblock.changeLang.prompt'), 'javascript');
          if (! supportedCodes.includes(newLang)) {
            const supportedLangs = supportedCodes.map(item => item).join(', ');
            alert(_state.t('editor.codeblock.changeLang.notSupport') + '\n\n' + supportedLangs);
            return;
          }
          if (newLang) {
            editor.chain().focus().updateAttributes('codeBlock', { language: newLang }).run();
          }
        }
      }
    },
    {
      type: 'copy-code',
      component: ActionButton,
      componentProps: {
        tooltip: 'editor.codeblock.copy.tooltip',
        icon: 'mdi-content-copy',
        action: () => {
          let copied = false;
          const { state } = editor.view;
          const { from, to } = state.selection;
          const codeContent = state.doc.textBetween(from, to, '\n');
          const text = codeContent;
          if (!navigator.clipboard) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            document.body.appendChild(textarea);
            textarea.select();
            try {
              const successful = document.execCommand('copy');
              if (successful) {
                copied = true;
              }
            } catch (err) {
              console.log('Fallback: Unable to copy.', err);
            }
            document.body.removeChild(textarea);
          } else {
            navigator.clipboard
              .writeText(text)
              .then(() => {
                copied = true;
                setTimeout(() => {
                  copied = false;
                }, 2000);
              })
              .catch((err) => {
                console.log('Failed to copy code:', err);
              });
          }
        }
      }
    }
  ]
}

export const defaultBubbleList = (editor) => [
  ...imageFloatMenus(editor),
  ...imageSizeMenus(editor),
  ...videoSizeMenus(editor),
  ...codeBlockMenus(editor),
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
  { editor, extension, t }
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
            tooltip: find.componentProps.tooltip ? t(find.componentProps.tooltip) : undefined
          },
          componentSlots: find.componentSlots
        })
        continue
      }

      const findExt = extensions.find(k => k.name === ext)
      if (findExt) {
        const { button } = findExt.options
        const _button = button({ editor, extension: findExt, t })

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
