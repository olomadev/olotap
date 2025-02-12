<template>
  <NodeViewWrapper as="span" :class="imageViewClass" :style="imageMaxStyle">
    <div
      draggable="true"
      data-drag-handle
      :class="{
        'image-view__body--focused': selected,
        'image-view__body--resizing': resizing,
      }"
      class="image-view__body"
      :style="imageMaxStyle"
    >
      <img
        :src="imgAttrs.src"
        :alt="imgAttrs.alt"
        :style="imgAttrs.style"
        class="image-view__body__image"
        @load="onImageLoad"
        @click="selectImage"
      />

      <div v-if="editor.view.editable" v-show="selected || resizing" class="image-resizer">
        <span
          v-for="direction in resizeDirections"
          :key="direction"
          :class="`image-resizer__handler--${direction}`"
          class="image-resizer__handler"
          @mousedown="onMouseDown($event, direction)"
        ></span>
      </div>
    </div>
  </NodeViewWrapper>
</template>

<script>
import { clamp, throttle, isNumber } from '@/utils';
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
import { useOlotapStore } from '../hooks/use-store'

const IMAGE_MAX_SIZE = useOlotapStore().state.constants.IMAGE_MAX_SIZE;
const IMAGE_MIN_SIZE = useOlotapStore().state.constants.IMAGE_MIN_SIZE;
const IMAGE_THROTTLE_WAIT_TIME = useOlotapStore().state.constants.IMAGE_THROTTLE_WAIT_TIME;

export default {
  props: {
    ...nodeViewProps,
    selected: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    NodeViewWrapper
  },
  data() {
    return {
      ResizeDirection: {
        TOP_LEFT: 'tl',
        TOP_RIGHT: 'tr',
        BOTTOM_LEFT: 'bl',
        BOTTOM_RIGHT: 'br',
      },
      maxSize: {
        width: IMAGE_MAX_SIZE,
        height: IMAGE_MAX_SIZE,
      },
      originalSize: {
        width: 0,
        height: 0,
      },
      resizeDirections: [
        'tl',
        'tr',
        'bl',
        'br',
      ],
      resizing: false,
      resizerState: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        dir: '',
      },
    };
  },
  computed: {
    imgAttrs() {
      const { src, alt, width: w, height: h } = this.node.attrs;

      const width = isNumber(w) ? `${w}px` : w;
      const height = isNumber(h) ? `${h}px` : h;

      return {
        src: src || undefined,
        alt: alt || undefined,
        style: {
          width: width || undefined,
          height: height || undefined,
        },
      };
    },
    display() {
      return this.node.attrs.display || undefined;
    },
    lockAspectRatio() {
      return this.node.attrs.lockAspectRatio ?? true;
    },
    imageViewClass() {
      if (typeof this.display === 'string') {
        return ['image-view', `image-view--${this.display}`];
      }
      return ['image-view'];
    },
    imageMaxStyle() {
      const {
        style: { width },
      } = this.imgAttrs;

      return { width: width === '100%' ? width : undefined };
    },
  },
  methods: {
    onImageLoad(e) {
      this.originalSize.width = e.target.width;
      this.originalSize.height = e.target.height;
    },
    selectImage() {
      const { editor, getPos } = this;
      editor.commands.setNodeSelection(getPos());
    },
    getMaxSize: throttle(function () {
      const { editor } = this;
      const { width } = getComputedStyle(editor.view.dom);
      this.maxSize.width = Number.parseInt(width, 10);
    }, IMAGE_THROTTLE_WAIT_TIME),
    onMouseDown(e, dir) {
      e.preventDefault();
      e.stopPropagation();

      this.resizerState.x = e.clientX;
      this.resizerState.y = e.clientY;

      const originalWidth = this.originalSize.width;
      const originalHeight = this.originalSize.height;
      const aspectRatio = originalWidth / originalHeight;

      let width = Number(this.node.attrs.width);
      let height = Number(this.node.attrs.height);
      const maxWidth = this.maxSize.width;

      if (width && !height) {
        width = width > maxWidth ? maxWidth : width;
        height = Math.round(width / aspectRatio);
      } else if (height && !width) {
        width = Math.round(height * aspectRatio);
        width = width > maxWidth ? maxWidth : width;
      } else if (!width && !height) {
        width = originalWidth > maxWidth ? maxWidth : originalWidth;
        height = Math.round(width / aspectRatio);
      } else {
        width = width > maxWidth ? maxWidth : width;
      }

      this.resizerState.w = width;
      this.resizerState.h = height;
      this.resizerState.dir = dir;

      this.resizing = true;
      this.onEvents();
    },
    onMouseMove: throttle(function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (!this.resizing) return;

      const { x, y, w, h, dir } = this.resizerState;

      const dx = (e.clientX - x) * (/l/.test(dir) ? -1 : 1);
      const dy = (e.clientY - y) * (/t/.test(dir) ? -1 : 1);

      const width = clamp(w + dx, IMAGE_MIN_SIZE, this.maxSize.width);
      const height = this.lockAspectRatio ? null : Math.max(h + dy, IMAGE_MIN_SIZE);

      this.updateAttributes({
        width,
        height,
      });
    }, IMAGE_THROTTLE_WAIT_TIME),
    onMouseUp(e) {
      e.preventDefault();
      e.stopPropagation();
      if (!this.resizing) return;

      this.resizing = false;

      this.resizerState = {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        dir: '',
      };

      this.offEvents();
      this.selectImage();
    },
    onEvents() {
      document?.addEventListener('mousemove', this.onMouseMove, true);
      document?.addEventListener('mouseup', this.onMouseUp, true);
    },
    offEvents() {
      document?.removeEventListener('mousemove', this.onMouseMove, true);
      document?.removeEventListener('mouseup', this.onMouseUp, true);
    },
  },
  mounted() {
    this.resizeOb = new ResizeObserver(() => this.getMaxSize());
    this.resizeOb.observe(this.editor.view.dom);
  },
  beforeDestroy() {
    this.resizeOb.disconnect();
  },
};
</script>
