<template>
  <div class="datetime-picker">
    <template v-if="!inline">
      <button
        type="button"
        @click="toggle"
        class="datetime-picker__button"
        :class="[{
          'datetime-picker__button--disabled': disabled,
        }, mainButtonClass]"
        :disabled="disabled"
      >
        <slot
          v-if="isEmptyValue"
          name="choose-date"
        >
          Choose date
        </slot>
        <slot
          v-else
          name="formatted-datetime"
          :formatted-datetime="formattedDateTime"
        >
          {{ formattedDateTime }}
        </slot>
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
          v-if="isDatePicker && !onlyTimePicker"
          @input="input($event, true)"
          :value="date"
          :is-empty-value="isEmptyValue"
          :initial-view="initialView"
          :locale="locale"
          :start-from-sunday="startFromSunday"
          :min-date="parsedMinDate"
          :max-date="parsedMaxDate"
          :disabled-dates="parsedDisabledDates"
          :highlighted="parsedHighlighted"
          @change-view="changeView"
        >
          <slot
            slot="months-prev"
            name="months-prev"
          />
          <slot
            slot="months-next"
            name="months-next"
          />
          <slot
            slot="years-prev"
            name="years-prev"
          />
          <slot
            slot="years-next"
            name="years-next"
          />
          <slot
            slot="decades-prev"
            name="decades-prev"
          />
          <slot
            slot="decades-next"
            name="decades-next"
          />
        </date-picker>
        <button
          v-if="isDatePicker && timePicker && !noToggleTimePicker && isShowTimePicker && !onlyTimePicker"
          @click="togglePicker"
          type="button"
          class="time-picker__button"
        >
          <slot name="time">🕘</slot>
        </button>
        <time-picker
          v-if="((!isDatePicker || noToggleTimePicker) && isShowTimePicker) || onlyTimePicker"
          @input="input"
          :value="date"
          :minute-step="minuteStep"
          :seconds-picker="secondsPicker"
        >
          <slot
            slot="hours-up"
            name="hours-up"
          />
          <slot
            slot="hours-down"
            name="hours-down"
          />
          <slot
            slot="minutes-up"
            name="minutes-up"
          />
          <slot
            slot="minutes-down"
            name="minutes-down"
          />
          <slot
            slot="seconds-up"
            name="seconds-up"
          />
          <slot
            slot="seconds-down"
            name="seconds-down"
          />
        </time-picker>
        <button
          v-if="todayButton"
          @click="today(true)"
          type="button"
          class="today__button"
        >
          <slot name="today">Today</slot>
        </button>
        <button
          v-if="clearButton"
          @click="clear(true)"
          type="button"
          class="clear__button"
        >
          <slot name="clear">Clear</slot>
        </button>
        <button
          v-if="closeButton"
          @click="close"
          type="button"
          class="close__button"
        >
          <slot name="close">Close</slot>
        </button>
      </div>
    </template>
    <template v-else>
      <div
        class="datetime-picker-inline"
        :class="{
          'datetime-picker-inline--disabled': disabled,
        }"
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
          v-if="isDatePicker && !onlyTimePicker"
          @input="input"
          :value="date"
          :is-empty-value="isEmptyValue"
          :initial-view="initialView"
          :locale="locale"
          :start-from-sunday="startFromSunday"
          :min-date="parsedMinDate"
          :max-date="parsedMaxDate"
          :disabled-dates="parsedDisabledDates"
          :highlighted="parsedHighlighted"
          @change-view="changeView"
        >
          <slot
            name="months-prev"
            slot="months-prev"
          />
          <slot
            slot="months-next"
            name="months-next"
          />
          <slot
            slot="years-prev"
            name="years-prev"
          />
          <slot
            slot="years-next"
            name="years-next"
          />
          <slot
            slot="decades-prev"
            name="decades-prev"
          />
          <slot
            slot="decades-next"
            name="decades-next"
          />
        </date-picker>
        <button
          v-if="isDatePicker && timePicker && !noToggleTimePicker && isShowTimePicker && !onlyTimePicker"
          @click="togglePicker"
          type="button"
          class="time-picker__button"
        >
          <slot name="time">🕘</slot>
        </button>
        <time-picker
          v-if="((!isDatePicker || noToggleTimePicker) && isShowTimePicker) || onlyTimePicker"
          @input="input"
          :value="date"
          :minute-step="minuteStep"
          :seconds-picker="secondsPicker"
        >
          <slot
            slot="hours-up"
            name="hours-up"
          />
          <slot
            slot="hours-down"
            name="hours-down"
          />
          <slot
            slot="minutes-up"
            name="minutes-up"
          />
          <slot
            slot="minutes-down"
            name="minutes-down"
          />
          <slot
            slot="seconds-up"
            name="seconds-up"
          />
          <slot
            slot="seconds-down"
            name="seconds-down"
          />
        </time-picker>
        <button
          v-if="todayButton"
          @click="today"
          type="button"
          class="today__button"
        >
          <slot name="today">Today</slot>
        </button>
        <button
          v-if="clearButton"
          @click="clear"
          type="button"
          class="clear__button"
        >
          <slot name="clear">Clear</slot>
        </button>
        <button
          v-if="closeButton"
          @click="close"
          type="button"
          class="close__button"
        >
          <slot name="close">Close</slot>
        </button>
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
  name: 'DatetimePicker',
  props: {
    value: {
      required: true,
    },
    minDate: {
      default: () => null,
    },
    maxDate: {
      default: () => null,
    },
    disabledDates: {
      type: [Array],
      default: () => [],
    },
    highlighted: {
      type: [Array],
      default: () => [],
    },
    constraintsFormat: {
      type: [String],
      default: 'yyyy-LL-dd',
    },
    initialView: {
      type: [String],
      default: 'days',
    },
    mainButtonClass: {
      type: [String],
      default: '',
    },
    format: {
      type: [String],
      default: 'yyyy-LL-dd HH:mm',
    },
    disabled: {
      type: [Boolean],
      default: false,
    },
    valueFormat: {
      type: [String],
      default: 'yyyy-LL-dd HH:mm:ss',
    },
    valueType: {
      type: [String],
      default: 'Auto',
    },
    emptyValue: {
      default: '',
    },
    minuteStep: {
      type: [Number],
      default: 1,
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
    secondsPicker: {
      type: [Boolean],
      default: false,
    },
    locale: {
      type: [String],
      default: 'en',
    },
    autoClose: {
      type: [Boolean],
      default: false,
    },
    clearButton: {
      type: [Boolean],
      default: false,
    },
    todayButton: {
      type: [Boolean],
      default: false,
    },
    closeButton: {
      type: [Boolean],
      default: false,
    },
    noToggleTimePicker: {
      type: [Boolean],
      default: false,
    },
    onlyTimePicker: {
      type: [Boolean],
      default: false,
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
      isShowTimePicker: true,
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
    parsedDisabledDates() {
      return this.disabledDates.map(date => this.toDateTime(date, this.constraintsFormat));
    },
    parsedHighlighted() {
      return this.highlighted.map(info => ({
        date: this.toDateTime(info.date, this.constraintsFormat),
        class: info.class,
      }));
    },
    formattedDateTime() {
      return this.date.setLocale(this.locale).toFormat(this.format);
    },
    isEmptyValue() {
      return this.value === '' || this.value === null || this.value === undefined || this.value === this.emptyValue;
    },
  },
  methods: {
    input(value, checkAutoClose = false) {
      if (this.valueType === 'Auto') {
        if ((typeof this.value) === 'string') {
          this.$emit('input', value.toFormat(this.valueFormat));
        } else if (this.value !== null && this.value.isValid === true) {
          this.$emit('input', value);
        } else {
          this.$emit('input', value.toJSDate());
        }
      } else if (this.valueType === 'String') {
        this.$emit('input', value.toFormat(this.valueFormat));
      } else if (this.valueType === 'Luxon') {
        this.$emit('input', value);
      } else if (this.valueType === 'Date') {
        this.$emit('input', value.toJSDate());
      }

      this.checkAutoClose(checkAutoClose);
    },
    toggle() {
      this.isShow = !this.isShow;

      if (this.isShow) {
        this.$emit('open');
      }
    },
    hide() {
      this.isDatePicker = true;
      this.isShow = false;

      this.$emit('close');
    },
    togglePicker() {
      this.isDatePicker = !this.isDatePicker;
    },
    today(checkAutoClose = false) {
      if (this.valueType === 'Auto') {
        if ((typeof this.value) === 'string') {
          this.$emit('input', this.getDateTimeLocal().toFormat(this.valueFormat));
        } else if (this.value !== null && this.value.isValid === true) {
          this.$emit('input', this.getDateTimeLocal());
        } else {
          this.$emit('input', this.getDateTimeLocal().toJSDate());
        }
      } else if (this.valueType === 'String') {
        this.$emit('input', this.getDateTimeLocal().toFormat(this.valueFormat));
      } else if (this.valueType === 'Luxon') {
        this.$emit('input', this.getDateTimeLocal());
      } else if (this.valueType === 'Date') {
        this.$emit('input', this.getDateTimeLocal().toJSDate());
      }

      this.checkAutoClose(checkAutoClose);
    },
    changeView(mode) {
      if (mode === 'days') {
        this.isShowTimePicker = true;
      } else {
        this.isShowTimePicker = false;
      }
    },
    clear(checkAutoClose = false) {
      this.$emit('input', this.emptyValue);
      this.checkAutoClose(checkAutoClose);
    },
    checkAutoClose(checkAutoClose = false) {
      if (checkAutoClose && this.autoClose) {
        this.hide();
      }
    },
    close() {
      this.hide();
    },
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
  position: relative;
  width: 320px;
  background: #ffffff;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #808080;
}

.datetime-picker-inline--disabled {
  opacity: .7;
}

.datetime-picker-inline--disabled:before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

.time-picker__button {
  width: 100%;
}

.date-picker__button {
  width: 100%;
  margin-bottom: 10px;
}

.clear__button, .today__button, .close__button {
  width: 100%;
  margin-top: 10px;
}
</style>
