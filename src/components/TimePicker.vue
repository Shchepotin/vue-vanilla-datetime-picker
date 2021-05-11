<template>
  <div class="time-picker">
    <text-slider
      :value="selectedHour"
      @input="input"
      :options="hours"
    >
      <template
        v-slot:up
      >
        <slot
          name="hours-up"
        >
          &uarr;
        </slot>
      </template>
      <template
        v-slot:down
      >
        <slot
          name="hours-down"
        >
          &darr;
        </slot>
      </template>
    </text-slider>
    <text-slider
      :value="selectedMinute"
      @input="input"
      :options="minutes"
    >
      <template
        v-slot:up
      >
        <slot
          name="minutes-up"
        >
          &uarr;
        </slot>
      </template>
      <template
        v-slot:down
      >
        <slot
          name="minutes-down"
        >
          &darr;
        </slot>
      </template>
    </text-slider>
    <text-slider
      v-if="secondsPicker"
      :value="selectedSecond"
      @input="input"
      :options="seconds"
    >
      <template
        v-slot:up
      >
        <slot
          name="seconds-up"
        >
          &uarr;
        </slot>
      </template>
      <template
        v-slot:down
      >
        <slot
          name="seconds-down"
        >
          &darr;
        </slot>
      </template>
    </text-slider>
    <text-slider
      v-if="hourTime === 12"
      :value="selectedHour"
      @input="input"
      :options="meridiems"
    >
      <template
        v-slot:up
      >
        <slot
          name="meridiems-up"
        >
          &uarr;
        </slot>
      </template>
      <template
        v-slot:down
      >
        <slot
          name="meridiems-down"
        >
          &darr;
        </slot>
      </template>
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
    hourTime: {
      type: [Number],
      default: 24,
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
      return this.generateHoursMatrix(this.value).map((element) => ({
        key: element.toFormat('HH'),
        displayValue: element.toFormat(this.hourTime === 12 ? 'hh' : 'HH'),
        originalValue: element,
      }));
    },
    minutes() {
      return this.generateMinutesMatrix(this.value, this.minuteStep).map((element) => ({
        key: element.toFormat('mm'),
        displayValue: element.toFormat('mm'),
        originalValue: element,
      }));
    },
    seconds() {
      return this.generateSecondsMatrix(this.value).map((element) => ({
        key: element.toFormat('ss'),
        displayValue: element.toFormat('ss'),
        originalValue: element,
      }));
    },
    meridiems() {
      return this.hours
        .filter((element) => element.originalValue.toFormat('h') === this.selectedHour.originalValue.toFormat('h'))
        .map((element) => ({
          ...element,
          displayValue: element.originalValue.toFormat('a'),
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
