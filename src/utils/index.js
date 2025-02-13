import { differenceBy, isEqual, throttle } from 'lodash-unified';

/**
 * Merge objects
 */
export const mergeObjects = function(target, source) {
  if (typeof target !== 'object' || typeof source !== 'object') return source;
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object') {
      target[key] = mergeDeep(target[key] || {}, source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
};
/**
 * Convert file to base64 encoded object
 */
export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});
/**
 * Check url is valid
 */
export const isValidURL = function(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}
/**
 * Block editor default blocktools
 */
export const blockTools = function() {
  return [
    {
      name: "paragraph",
      tools: [
        {
          title: "Default",
          name: "default",
          icon: '<svg class="w-4 h-4 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" width="48" height="48"  viewBox="0 0 48 48"><path fill="currentColor" d="M33.52 13.16a13.63 13.63 0 0 0-.19 2.24v2.45l-.15.14h-.92l-.16-.13a16 16 0 0 0-.17-2.2A1 1 0 0 0 31 15h-4.76v12.39a32.3 32.3 0 0 0 .19 4.54.65.65 0 0 0 .5.55c.15 0 .72.08 1.71.14l.15.15v1l-.15.15c-1-.06-2.47-.09-4.51-.09s-3.59 0-4.51.09l-.13-.14v-1l.14-.15c1-.06 1.57-.11 1.72-.14a.65.65 0 0 0 .5-.55 34 34 0 0 0 .15-4.62V19c0-2.41 0-3.77-.05-4.07h-2.07a14.74 14.74 0 0 0-3.06.16.66.66 0 0 0-.33.22 3.28 3.28 0 0 0-.22.94c-.06.52-.11 1.05-.13 1.6L16 18h-.93l-.16-.14v-2.51a18.58 18.58 0 0 0-.17-2.18l.13-.15c.58.1 2.67.15 6.3.15h5.93q5 0 6.3-.15Z"/></svg>',
          command: (editor) => {
            editor.chain().focus().setVariant("default").run();
          },
          isActiveTest: (editor) => editor.isActive({ variant: "default" }),
        },
        {
          title: "Large",
          name: "large",
          icon: '<svg class="w-4 h-4 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" width="48" height="48"  viewBox="0 0 48 48"><path fill="currentColor" d="M41.37 6.12a27.85 27.85 0 0 0-.35 4L41 14.56l-.26.26h-1.69l-.29-.23a31.65 31.65 0 0 0-.29-4 1.83 1.83 0 0 0-1.69-1.24c-.35-.05-2-.08-5-.08h-3.49c0 .62-.05 3.06-.05 7.33v15a59.2 59.2 0 0 0 .34 8.18 1.14 1.14 0 0 0 .89 1 30 30 0 0 0 3.09.27l.26.26v1.77l-.26.26q-2.61-.16-8.12-.16t-8.12.16l-.24-.24v-1.8l.26-.26a29.7 29.7 0 0 0 3.09-.27 1.13 1.13 0 0 0 .89-1 58.62 58.62 0 0 0 .35-8.18v-15q0-6.51-.08-7.33h-3.77a27.11 27.11 0 0 0-5.51.29 1.12 1.12 0 0 0-.58.4 5.32 5.32 0 0 0-.4 1.69c-.12.93-.2 1.89-.24 2.87l-.26.26H8.17l-.29-.26L7.82 10a30.21 30.21 0 0 0-.31-3.93l.24-.26q1.54.25 11.33.26h10.68q9 0 11.34-.26Z"/></svg>',
          command: (editor) => {
            editor.chain().focus().setVariant("large").run();
          },
          isActiveTest: (editor) => editor.isActive({ variant: "large" }),
        },
      ],
    },
  ]
}
/**
 * Clamps a number between a minimum and a maximum value.
 * @param {number} val - The value to clamp.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} - The clamped value.
 */
export function clamp(val, min, max) {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}

/**
 * Checks if a value is a number.
 * @param {*} value - The value to check.
 * @returns {boolean} - True if the value is a number, otherwise false.
 */
export const isNumber = value => typeof value === 'number';

/**
 * Checks if a value is a string.
 * @param {*} value - The value to check.
 * @returns {boolean} - True if the value is a string, otherwise false.
 */
export const isString = value => typeof value === 'string';

/**
 * Checks if a value is a boolean.
 * @param {*} value - The value to check.
 * @returns {boolean} - True if the value is a boolean, otherwise false.
 */
export const isBoolean = value => typeof value === 'boolean';

/**
 * Checks if a value is a function.
 * @param {*} value - The value to check.
 * @returns {boolean} - True if the value is a function, otherwise false.
 */
export const isFunction = value => typeof value === 'function';

/**
 * Returns a CSS unit with a default value if no unit is specified.
 * @param {string|number} value - The value to parse.
 * @param {string} [defaultUnit='px'] - The default unit to use.
 * @returns {string|number} - The value with the appropriate unit.
 */
export const getCssUnitWithDefault = (value, defaultUnit = 'px') => {
  if (!value) return value;

  const stringValue = isNumber(value) ? String(value) : value;

  const num = Number.parseFloat(stringValue);
  const unitMatch = stringValue.match(/[a-zA-Z%]+$/);
  const unit = unitMatch ? unitMatch[0] : defaultUnit;

  return Number.isNaN(num) ? value : num + unit;
};

/**
 * Checks if the editor has a specific extension method with the given name.
 * @param {Object} editor - An instance of the editor.
 * @param {string} name - The name of the extension method.
 * @returns {boolean} - Returns true if the specified extension method is present, otherwise false.
 */
export function hasExtension(editor, name) {
  // Retrieve the extension manager of the editor, defaulting to an empty array if it doesn't exist
  const { extensions = [] } = editor.extensionManager || {};

  // Check if the extension method with the specified name is present in the extension manager
  const find = extensions.find(i => i.name === name);

  // Return false if the extension method with the specified name is not found, otherwise true
  return !!find;
}
const mobileRE =
  /(android|bb\d+|meego).+mobile|armv7l|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|samsungbrowser.*mobile|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;
const notMobileRE = /CrOS/;
const tabletRE = /android|ipad|playbook|silk/i;

/**
 * Determines if the current device is a mobile or tablet device.
 * @param {Object} opts - Options for the detection.
 * @param {string|Object} [opts.ua] - User agent string or request object.
 * @param {boolean} [opts.tablet] - Whether to detect tablets.
 * @param {boolean} [opts.featureDetect] - Whether to use feature detection.
 * @returns {boolean} `true` if the device is mobile or tablet, `false` otherwise.
 */
export function isMobile(opts = {}) {
  let ua = opts.ua || (typeof navigator !== 'undefined' && navigator.userAgent);

  if (ua && typeof ua === 'object' && ua.headers && typeof ua.headers['user-agent'] === 'string') {
    ua = ua.headers['user-agent'];
  }

  if (typeof ua !== 'string') {
    return false;
  }

  if (mobileRE.test(ua) && !notMobileRE.test(ua)) {
    return true;
  }

  if (opts.tablet && tabletRE.test(ua)) {
    return true;
  }

  if (
    opts.tablet &&
    opts.featureDetect &&
    typeof navigator !== 'undefined' &&
    navigator.maxTouchPoints > 1 &&
    ua.includes('Macintosh') &&
    ua.includes('Safari')
  ) {
    return true;
  }

  return false;
};

export { differenceBy, isEqual, throttle };


