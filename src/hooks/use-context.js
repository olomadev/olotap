import { reactive } from 'vue';

const defaultFontFamilyValue = "Hanken Grotesk";
const defaultMarkdownThemeValue = "default";
const editorUpdateThrottleWaitTime = 200;

const state = reactive({
  i18n: undefined,
  isFullscreen: false,
  isImageEvent: false,
  defaultMarkdownTheme: defaultMarkdownThemeValue,
  t: key => key,
  editorUpdateThrottleWaitTime,
  editorUpdateWatchThrottleWaitTime: editorUpdateThrottleWaitTime - 80,
  inputDensity: "compact",
  inputVariant: "outlined",
  inputClass: "",
  checkboxClass: "",
  imageMinSize: 20,
  imageMaxSize: 100000,
  imageThrottleWaitTime: 16,
  tableInitGridSize: 6,
  tableMaxGridSize: 10,
  tableDefaultSelectedGridSize: 2,
  colorsList: [
    "", // none
    "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5",
    "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50",
    "#8bc34a", "#cddc39", "#ffeb3b", "#ffc1a07", "#ff9800",
    "#ff5722", "#000000", "#333333", "#666666", "#999999",
    "#CCCCCC", "#D5D5D4", "#E8E8E8", "#EEEEEE",
  ],
  defaultFontFamilyValue,
  defaultFontFamilyList: [
    { title: "default", value: defaultFontFamilyValue, divider: true, default: true },
    { title: "Arial", value: "Arial" },
    { title: "Arial Black", value: "Arial Black" },
    { title: "Georgia", value: "Georgia" },
    { title: "Impact", value: "Impact" },
    { title: "Helvetica", value: "Helvetica" },
    { title: "Tahoma", value: "Tahoma" },
    { title: "Times New Roman", value: "Times New Roman" },
    { title: "Verdana", value: "Verdana" },
    { title: "Courier New", value: "Courier New", divider: true },
    { title: "Monaco", value: "Monaco" },
    { title: "Monospace", value: "monospace" },
  ],
  defaultMarkdownThemeValue,
  defaultMarkdownThemeList: [{ title: "default", value: defaultMarkdownThemeValue, default: true }],
  defaultFontSizeList: [8, 10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72],
  defaultFontSizeValue: "default",
  imageSize: {
    "size-small": 200,
    "size-medium": 500,
    "size-large": "100%",
  },
  videoSize: {
    "size-small": 480,
    "size-medium": 640,
    "size-large": "100%",
  },
  nodeTypeMenu: {
    image: [
      "float-left", "float-none", "float-right", "divider",
      "image-size-small", "image-size-medium", "image-size-large",
      "divider", "textAlign", "divider", "image",
      "image-aspect-ratio", "remove",
    ],
    text: ["bold", "italic", "underline", "strike", "divider", "color", "highlight", "textAlign", "divider", "link"],
    link: [
      "bold", "italic", "underline", "strike", "divider", "color", "highlight", "textAlign",
      "divider", "link", "unlink", "link-open",
    ],
    video: ["video-size-small", "video-size-medium", "video-size-large", "divider", "video", "remove"],
  },
});

export async function createContext(config) {
  return new Promise(resolve => {
    state.defaultMarkdownTheme = config.defaultMarkdownTheme ?? "github"
    if (config.i18n) {
      state.i18n = config.i18n;
      state.t = config.i18n.global.t;
    }
    state.editorUpdateThrottleWaitTime = config.editorUpdateThrottleWaitTime ?? state.editorUpdateThrottleWaitTime
    if (config['editorUpdateThrottleWaitTime']) {
      state.editorUpdateWatchThrottleWaitTime = config.editorUpdateThrottleWaitTime - 80  
    }
    state.inputDensity = config.inputDensity ?? state.inputDensity;
    state.inputVariant = config.inputVariant ?? state.inputVariant;
    state.inputClass = config.inputClass ?? state.inputClass;
    state.checkboxClass = config.checkboxClass ?? state.checkboxClass;
    state.imageMinSize = config.imageMinSize ?? state.imageMinSize;
    state.imageMaxSize = config.imageMaxSize ?? state.imageMaxSize;
    state.imageThrottleWaitTime = config.imageThrottleWaitTime ?? state.imageThrottleWaitTime;
    state.tableInitGridSize = config.tableInitGridSize ?? state.tableInitGridSize;
    state.tableMaxGridSize = config.tableMaxGridSize ?? state.tableMaxGridSize;
    state.tableDefaultSelectedGridSize = config.tableDefaultSelectedGridSize ?? state.tableDefaultSelectedGridSize;
    state.colorsList = config.colorsList ?? state.colorsList;
    state.defaultFontFamilyValue = config.defaultFontFamilyValue ?? state.defaultFontFamilyValue;
    state.defaultFontFamilyList = config.defaultFontFamilyList ?? state.defaultFontFamilyList;
    state.defaultMarkdownThemeValue = config.defaultMarkdownThemeValue ?? state.defaultMarkdownThemeValue;
    state.defaultMarkdownThemeList = config.defaultMarkdownThemeList ?? state.defaultMarkdownThemeList;
    state.defaultFontSizeList = config.defaultFontSizeList ?? state.defaultFontSizeList;
    state.defaultFontSizeValue = config.defaultFontSizeValue ?? state.defaultFontSizeValue;
    state.imageSize = config.imageSize ?? state.imageSize;
    state.videoSize = config.videoSize ?? state.videoSize;
    state.nodeTypeMenu = config.nodeTypeMenu ?? state.nodeTypeMenu;
    resolve()
  });
}

export function useContext() {
  return {
    state,
  };
}