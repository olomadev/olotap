import { reactive } from 'vue';

const DEFAULT_FONT_FAMILY_VALUE = "Hanken Grotesk";
const DEFAULT_MARKDOWN_THEME_VALUE = "github";
const EDITOR_UPDATE_THROTTLE_WAIT_TIME = 200;

const state = reactive({
  i18n: undefined,
  defaultLang: undefined,
  defaultMarkdownTheme: "github",
  t: key => key,
  // default constants -------------------------
  // 
  DEFAULT_LANG_VALUE: "en",
  EDITOR_UPDATE_THROTTLE_WAIT_TIME,
  EDITOR_UPDATE_WATCH_THROTTLE_WAIT_TIME: EDITOR_UPDATE_THROTTLE_WAIT_TIME - 80,
  IMAGE_MIN_SIZE: 20,
  IMAGE_MAX_SIZE: 100000,
  IMAGE_THROTTLE_WAIT_TIME: 16,
  TABLE_INIT_GRID_SIZE: 6,
  TABLE_MAX_GRID_SIZE: 10,
  TABLE_DEFAULT_SELECTED_GRID_SIZE: 2,
  COLORS_LIST: [
      "", // none
      "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5",
      "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50",
      "#8bc34a", "#cddc39", "#ffeb3b", "#ffc1a07", "#ff9800",
      "#ff5722", "#000000", "#333333", "#666666", "#999999",
      "#CCCCCC", "#D5D5D4", "#E8E8E8", "#EEEEEE",
  ],
  DEFAULT_FONT_FAMILY_VALUE,
  DEFAULT_FONT_FAMILY_LIST: [
      { title: "default", value: DEFAULT_FONT_FAMILY_VALUE, divider: true, default: true },
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
  DEFAULT_MARKDOWN_THEME_VALUE,
  DEFAULT_MARKDOWN_THEME_LIST: [{ title: "default", value: DEFAULT_MARKDOWN_THEME_VALUE, default: true }],
  DEFAULT_FONT_SIZE_LIST: [8, 10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72],
  DEFAULT_FONT_SIZE_VALUE: "default",
  IMAGE_SIZE: {
    "size-small": 200,
    "size-medium": 500,
    "size-large": "100%",
  },
  VIDEO_SIZE: {
    "size-small": 480,
    "size-medium": 640,
    "size-large": "100%",
  },
  NODE_TYPE_MENU: {
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

export function createContext(config) {
  state.defaultLang = config.defaultLang ?? "en";
  state.defaultMarkdownTheme = config.defaultMarkdownTheme ?? "github"
  if (config.i18n) {
    state.i18n = config.i18n;
    state.t = config.i18n.global.t;
  }
  // constants -------------------------
  // 
  state.DEFAULT_LANG_VALUE = state.defaultLang
  state.EDITOR_UPDATE_THROTTLE_WAIT_TIME = config.EDITOR_UPDATE_THROTTLE_WAIT_TIME ?? state.EDITOR_UPDATE_THROTTLE_WAIT_TIME
  if (config['EDITOR_UPDATE_THROTTLE_WAIT_TIME']) {
    state.EDITOR_UPDATE_WATCH_THROTTLE_WAIT_TIME = config.EDITOR_UPDATE_THROTTLE_WAIT_TIME - 80  
  }
  state.IMAGE_MIN_SIZE = config.IMAGE_MIN_SIZE ?? state.IMAGE_MIN_SIZE;
  state.IMAGE_MAX_SIZE = config.IMAGE_MAX_SIZE ?? state.IMAGE_MAX_SIZE;
  state.IMAGE_THROTTLE_WAIT_TIME = config.IMAGE_THROTTLE_WAIT_TIME ?? state.IMAGE_THROTTLE_WAIT_TIME;
  state.TABLE_INIT_GRID_SIZE = config.TABLE_INIT_GRID_SIZE ?? state.TABLE_INIT_GRID_SIZE;
  state.TABLE_MAX_GRID_SIZE = config.TABLE_MAX_GRID_SIZE ?? state.TABLE_MAX_GRID_SIZE;
  state.TABLE_DEFAULT_SELECTED_GRID_SIZE = config.TABLE_DEFAULT_SELECTED_GRID_SIZE ?? state.TABLE_DEFAULT_SELECTED_GRID_SIZE;
  state.COLORS_LIST = config.COLORS_LIST ?? state.COLORS_LIST;
  state.DEFAULT_FONT_FAMILY_VALUE = config.DEFAULT_FONT_FAMILY_VALUE ?? state.DEFAULT_FONT_FAMILY_VALUE;
  state.DEFAULT_FONT_FAMILY_LIST = config.DEFAULT_FONT_FAMILY_LIST ?? state.DEFAULT_FONT_FAMILY_LIST;
  state.DEFAULT_MARKDOWN_THEME_VALUE = config.DEFAULT_MARKDOWN_THEME_VALUE ?? state.DEFAULT_MARKDOWN_THEME_VALUE;
  state.DEFAULT_MARKDOWN_THEME_LIST = config.DEFAULT_MARKDOWN_THEME_LIST ?? state.DEFAULT_MARKDOWN_THEME_LIST;
  state.DEFAULT_FONT_SIZE_LIST = config.DEFAULT_FONT_SIZE_LIST ?? state.DEFAULT_FONT_SIZE_LIST;
  state.DEFAULT_FONT_SIZE_VALUE = config.DEFAULT_FONT_SIZE_VALUE ?? state.DEFAULT_FONT_SIZE_VALUE;
  state.IMAGE_SIZE = config.IMAGE_SIZE ?? state.IMAGE_SIZE;
  state.VIDEO_SIZE = config.VIDEO_SIZE ?? state.VIDEO_SIZE;
  state.NODE_TYPE_MENU = config.NODE_TYPE_MENU ?? state.NODE_TYPE_MENU;
}

export function useContext() {
  return {
    state,
  };
}