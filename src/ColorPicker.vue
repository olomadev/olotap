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
          <v-btn v-if="color == ''" flat elevation="0" icon density="compact" @click="setColor(color)">
            <v-icon icon="mdi-circle-off-outline" :color="color" />
          </v-btn>
          <v-btn v-else flat elevation="0" icon density="compact" @click="setColor(color)">
            <v-icon icon="mdi-circle" :color="color" />
          </v-btn>
        </template>

        <v-text-field
          v-model="inputValue"
          class="mt-2 mx-1"
          :density="getDensity"
          :variant="getVariant"
          append-inner-icon="mdi-check"
          label="HEX"
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
import { useContext } from './hooks/use-context';
import { computed } from 'vue';

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
  setup() {
    const context = useContext();
    return {
      getDensity: computed(() => context.state.inputDensity),
      getVariant: computed(() => context.state.inputVariant),
      getColorList: computed(() => context.state.colorsList),
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

      // this.editor.

    }
  }

};
</script>