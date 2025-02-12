<template>
  <action-button
    style="min-width: 120px"
    :tooltip="active.title"
    :disabled="disabled"
    :color="color"
    class="text-none"
    :is-active="active.isActive"
  >
    <div>
      {{ active.title }}
    </div>
    <v-menu v-model="menu" activator="parent">
      <v-list density="compact" :max-height="maxHeight">
        <template v-for="(item, i) in items" :key="i">
          <v-list-item :active="item.isActive()" :disabled="item.disabled" @click="item.action">
            <template #prepend>
              <v-icon v-if="item.icon" :icon="item.icon" />
            </template>
            <v-list-item-title :style="item.style">{{ item.title }}</v-list-item-title>
          </v-list-item>
          <v-divider v-if="item.divider" />
        </template>
      </v-list>
    </v-menu>
  </action-button>
</template>

<script>
import ActionButton from './ActionButton.vue';

export default {
  components: {
    ActionButton
  },
  props: {
    editor: Object,
    disabled: {
      type: Boolean,
      default: false
    },
    color: String,
    maxHeight: [String, Number],
    icon: String,
    tooltip: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      menu: false
    };
  },
  computed: {
    active() {
      const find = this.items.find(k => k.isActive());
      if (find && !find.default) {
        return {
          ...find,
          icon: find.icon ? find.icon : this.icon
        };
      }
      return {
        title: this.tooltip,
        selectedFont: find ? find.title : null,
        icon: this.icon,
        isActive: () => false
      };
    }
  }
};
</script>
