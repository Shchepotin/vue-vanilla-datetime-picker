<template>
  <div class="text-slider">
    <button
      @click="next"
      type="button"
      class="text-slider__button-previous"
    >
      <slot name="up">&uarr;</slot>
    </button>
    <div class="text-slider__value">
      {{ selectedValue ? selectedValue.displayValue : value.displayValue }}
    </div>
    <button
      @click="previous"
      type="button"
      class="text-slider__button-next"
    >
      <slot name="down">&darr;</slot>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: null,
    },
    options: {
      default: () => [],
    },
  },
  computed: {
    selectedValue() {
      return this.options.filter((element) => element.key === this.value.key)[0];
    },
  },
  methods: {
    previous() {
      let newValue = this.options.filter((element, index) => this.options[index + 1]
        && this.options[index + 1].key === this.value.key)[0];

      if (newValue === undefined) {
        newValue = this.options.filter((element) => element.key < this.value.key);
        newValue = newValue[newValue.length - 1];
      }

      if (newValue !== undefined) {
        this.$emit('input', newValue);
      } else {
        this.$emit('input', this.options[this.options.length - 1]);
      }
    },
    next() {
      let [newValue] = this.options.filter((element, index) => this.options[index - 1]
        && this.options[index - 1].key === this.value.key);

      if (newValue === undefined) {
        [newValue] = this.options.filter((element) => element.key > this.value.key);
      }

      if (newValue !== undefined) {
        this.$emit('input', newValue);
      } else {
        this.$emit('input', this.options[0]);
      }
    },
  },
};
</script>

<style>
.text-slider__value {
  text-align: center;
}
</style>
