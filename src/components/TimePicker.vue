<template>
  <div class="time-picker">
    <text-slider
      :value="selectedHour"
      @input="input"
      :options="hours"
    >
      <slot
        slot="up"
        name="hours-up"
      />
      <slot
        slot="down"
        name="hours-down"
      />
    </text-slider>
    <text-slider
      :value="selectedMinute"
      @input="input"
      :options="minutes"
    >
      <slot
        slot="up"
        name="minutes-up"
      />
      <slot
        slot="down"
        name="minutes-down"
      />
    </text-slider>
    <text-slider
      v-if="secondsPicker"
      :value="selectedSecond"
      @input="input"
      :options="seconds"
    >
      <slot
        slot="up"
        name="seconds-up"
      />
      <slot
        slot="down"
        name="seconds-down"
      />
    </text-slider>
  </div>
</template>

<script>
import helpers from '../mixins/helpers';
import TextSlider from './TextSlider.vue';

export default {
  props: {
    value: {
      required: false,
      default: '',
    },
    minuteStep: {
      type: [Number],
      default: 1,
    },
    secondsPicker: {
      type: [Boolean],
      default: false,
    },
  },
  components: {
    TextSlider,
  },
  mixins: [
    helpers,
  ],
  computed: {
    hours() {
      return this.generateHoursMatrix(this.value).map(element => ({
        key: element.toFormat('HH'),
        displayValue: element.toFormat('HH'),
        originalValue: element,
      }));
    },
    minutes() {
      return this.generateMinutesMatrix(this.value, this.minuteStep).map(element => ({
        key: element.toFormat('mm'),
        displayValue: element.toFormat('mm'),
        originalValue: element,
      }));
    },
    seconds() {
      return this.generateSecondsMatrix(this.value).map(element => ({
        key: element.toFormat('ss'),
        displayValue: element.toFormat('ss'),
        originalValue: element,
      }));
    },
    selectedHour() {
      return {
        key: this.value.toFormat('HH'),
        displayValue: this.value.toFormat('HH'),
        originalValue: this.value,
      };
    },
    selectedMinute() {
      return {
        key: this.value.toFormat('mm'),
        displayValue: this.value.toFormat('mm'),
        originalValue: this.value,
      };
    },
    selectedSecond() {
      return {
        key: this.value.toFormat('ss'),
        displayValue: this.value.toFormat('ss'),
        originalValue: this.value,
      };
    },
  },
  methods: {
    input(value) {
      this.$emit('input', value.originalValue);
    },
  },
};
</script>

<style>
.time-picker {
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;
}
</style>
