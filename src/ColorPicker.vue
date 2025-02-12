<template>
  <v-menu
    v-model="menu"
    :nudge-left="nudgeLeft || 255"
    :nudge-top="nudgeTop || 42"
    :close-on-content-click="false"
    transition="scale-transition"
    :origin="!nudgeLeft ? 'top right' : 'top left'"
    activator="parent"
  >
    <v-list>
      <v-sheet class="d-flex flex-wrap justify-between ma-1" fluid :max-width="230">

        <template v-for="color in getColorList" :key="color">
          <v-btn v-if="color == ''" flat icon density="compact" @click="setColor(color)">
            <v-icon icon="mdi-circle-off-outline" :color="color" />
          </v-btn>
          <v-btn v-else flat icon density="compact" @click="setColor(color)">
            <v-icon icon="mdi-circle" :color="color" />
          </v-btn>
        </template>

        <v-text-field
          v-model="inputValue"
          class="mt-2 mx-1"
          append-inner-icon="mdi-check"
          density="compact"
          label="HEX"
          variant="outlined"
          flat
          hide-details
          single-line
          clearable
          @click:append-inner="setColor(inputValue)"
        >
          <template v-if="inputValue" #prepend-inner>
            <v-icon class="opacity-100" icon="mdi-circle" :color="inputValue" />
          </template>
        </v-text-field>
      </v-sheet>
    </v-list>
  </v-menu>
</template>

<script>
import { useOlotapStore } from '../hooks/use-store'

const COLORS_LIST = useOlotapStore().state.constants.COLORS_LIST;

export default {
  props: {
    editor: { type: Object, required: true },
    modelValue: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      default: ''
    },
    nudgeLeft: {
      type: [String, Number],
      default: 0
    },
    nudgeTop: {
      type: [String, Number],
      default: 0
    },
    more: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      inputValue: '',
      menu: false
    };
  },
  watch: {
    menu(val) {
      this.inputValue = this.modelValue;
    }
  },
  methods: {
    setColor(color) {
      this.$emit('update:modelValue', color);
      this.$emit('change', color);
      this.inputValue = color;
      this.menu = false;
    }
  },
  computed: {
    getColorList() {
      return COLORS_LIST;
    }
  }

};
</script>