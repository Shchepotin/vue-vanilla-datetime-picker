<template>
  <div class="datetime-picker">
    <template v-if="!inline">
      <button
        type="button"
        @click="toggle"
        class="datetime-picker__button"
      >
        {{ formattedDateTime }}
      </button>
      <div
        v-if="isShow"
        v-click-outside="hide"
        class="datetime-picker-main"
      >
        <button
          v-if="!isDatePicker"
          @click="togglePicker"
          type="button"
          class="date-picker__button"
        >
          <slot name="date">🗓</slot>
        </button>
        <date-picker
          v-if="isDatePicker"
          @input="input"
          :value="date"
          :locale="locale"
          :start-from-sunday="startFromSunday"
          :min-date="parsedMinDate"
          :max-date="parsedMaxDate"
        >
          <slot slot="months-prev" name="months-prev"></slot>
          <slot slot="months-next" name="months-next"></slot>
          <slot slot="years-prev" name="years-prev"></slot>
          <slot slot="years-next" name="years-next"></slot>
          <slot slot="decades-prev" name="decades-prev"></slot>
          <slot slot="decades-next" name="decades-next"></slot>
        </date-picker>
        <button
          v-if="isDatePicker && timePicker"
          @click="togglePicker"
          type="button"
          class="time-picker__button"
        >
          <slot name="time">🕘</slot>
        </button>
        <time-picker
          v-if="!isDatePicker"
          @input="input"
          :value="date"
          :second-picker="secondPicker"
        >
          <slot slot="hours-up" name="hours-up"></slot>
          <slot slot="hours-down" name="hours-down"></slot>
          <slot slot="minutes-up" name="minutes-up"></slot>
          <slot slot="minutes-down" name="minutes-down"></slot>
          <slot slot="seconds-up" name="seconds-up"></slot>
          <slot slot="seconds-down" name="seconds-down"></slot>
        </time-picker>
      </div>
    </template>
    <template v-else>
      <div
        class="datetime-picker-inline"
      >
        <button
          v-if="!isDatePicker"
          @click="togglePicker"
          type="button"
          class="date-picker__button"
        >
          <slot name="date">🗓</slot>
        </button>
        <date-picker
          v-if="isDatePicker"
          @input="input"
          :value="date"
          :locale="locale"
          :start-from-sunday="startFromSunday"
          :min-date="parsedMinDate"
          :max-date="parsedMaxDate"
        >
          <slot name="months-prev" slot="months-prev"></slot>
          <slot slot="months-next" name="months-next"></slot>
          <slot slot="years-prev" name="years-prev"></slot>
          <slot slot="years-next" name="years-next"></slot>
          <slot slot="decades-prev" name="decades-prev"></slot>
          <slot slot="decades-next" name="decades-next"></slot>
        </date-picker>
        <button
          v-if="isDatePicker && timePicker"
          @click="togglePicker"
          type="button"
          class="time-picker__button"
        >
          <slot name="time">🕘</slot>
        </button>
        <time-picker
          v-if="!isDatePicker"
          @input="input"
          :value="date"
          :second-picker="secondPicker"
        >
          <slot slot="hours-up" name="hours-up"></slot>
          <slot slot="hours-down" name="hours-down"></slot>
          <slot slot="minutes-up" name="minutes-up"></slot>
          <slot slot="minutes-down" name="minutes-down"></slot>
          <slot slot="seconds-up" name="seconds-up"></slot>
          <slot slot="seconds-down" name="seconds-down"></slot>
        </time-picker>
      </div>
    </template>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside';
  import DatePicker from './DatePicker.vue';
  import TimePicker from './TimePicker.vue';

  import helpers from '../mixins/helpers';

  export default {
    name: 'datetime-picker',
    props: {
      value: {
        required: true,
      },
      minDate: {
        default: () => {
          return null;
        },
      },
      maxDate: {
        default: () => {
          return null;
        },
      },
      constraintsFormat: {
        type: [String],
        default: 'yyyy-LL-dd',
      },
      format: {
        type: [String],
        default: 'yyyy-LL-dd HH:mm',
      },
      valueFormat: {
        type: [String],
        default: 'yyyy-LL-dd HH:mm:ss',
      },
      inline: {
        type: [Boolean],
        default: false,
      },
      timePicker: {
        type: [Boolean],
        default: true,
      },
      startFromSunday: {
        type: [Boolean],
        default: false,
      },
      secondPicker: {
        type: [Boolean],
        default: false,
      },
      locale: {
        type: [String],
        default: 'en',
      },
    },
    components: {
      DatePicker,
      TimePicker,
    },
    mixins: [
      helpers,
    ],
    directives: {
      ClickOutside,
    },
    data() {
      return {
        isShow: false,
        isDatePicker: true,
      };
    },
    computed: {
      date() {
        return this.toDateTime(this.value, this.valueFormat, this.getDateTimeLocal());
      },
      parsedMinDate() {
        return this.toDateTime(this.minDate, this.constraintsFormat);
      },
      parsedMaxDate() {
        return this.toDateTime(this.maxDate, this.constraintsFormat);
      },
      formattedDateTime() {
        return this.date.setLocale(this.locale).toFormat(this.format);
      },
    },
    methods: {
      input(value) {
        if ((typeof this.value) === 'string') {
          this.$emit('input', value.toFormat(this.valueFormat));
        } else if (this.value !== null && this.value.isValid === true) {
          this.$emit('input', value);
        } else {
          this.$emit('input', value.toJSDate());
        }
      },
      toggle() {
        this.isShow = !this.isShow;
      },
      hide() {
        this.isDatePicker = true;
        this.isShow = false;
      },
      togglePicker() {
        this.isDatePicker = !this.isDatePicker;
      },
    },
    created() {
      if (this.value === null || this.value === '' || this.value === undefined) {
        this.$emit('input', this.getDateTimeLocal().toFormat(this.valueFormat));
      }
    },
  };
</script>

<style>
  .datetime-picker {
    position: relative;
  }

  .datetime-picker-main {
    position: absolute;
    width: 320px;
    z-index: 1;
    background: #ffffff;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #808080;
  }

  .datetime-picker-inline {
    position: static;
    width: 320px;
    background: #ffffff;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #808080;
  }

  .time-picker__button {
    width: 100%;
  }

  .date-picker__button {
    width: 100%;
    margin-bottom: 10px;
  }
</style>
