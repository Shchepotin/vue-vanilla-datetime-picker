<template>
  <div
    class="datetime-picker"
    v-click-outside="hide"
  >
    <button
      v-if="!inline"
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
      v-if="isShow || inline"
      :class="{
        'datetime-picker-main': !inline,
        'datetime-picker-inline': inline,
        'datetime-picker-inline--disabled': disabled && inline,
      }"
    >
      <button
        v-show="!isDatePicker"
        @click="togglePicker"
        type="button"
        class="date-picker__button"
      >
        <slot name="date">🗓</slot>
      </button>
      <date-picker
        v-show="isDatePicker && !onlyTimePicker"
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
        @change-month="changeMonth"
        @change-year="changeYear"
        @change-decade="changeDecade"
      >
        <template
          v-slot:months-prev="props"
        >
          <slot
            name="months-prev"
            v-bind="props"
          >
            &lt;
          </slot>
        </template>
        <template
          v-slot:months-next="props"
        >
          <slot
            name="months-next"
            v-bind="props"
          >
            &gt;
          </slot>
        </template>

        <template
          v-slot:years-prev="props"
        >
          <slot
            name="years-prev"
            v-bind="props"
          >
            &lt;
          </slot>
        </template>
        <template
          v-slot:years-next="props"
        >
          <slot
            name="years-next"
            v-bind="props"
          >
            &gt;
          </slot>
        </template>

        <template
          v-slot:decades-prev="props"
        >
          <slot
            name="decades-prev"
            v-bind="props"
          >
            &lt;
          </slot>
        </template>
        <template
          v-slot:decades-next="props"
        >
          <slot
            name="decades-next"
            v-bind="props"
          >
            &gt;
          </slot>
        </template>
      </date-picker>
      <button
        v-show="isDatePicker && timePicker && !noToggleTimePicker && isShowTimePicker && !onlyTimePicker"
        @click="togglePicker"
        type="button"
        class="time-picker__button"
      >
        <slot name="time">🕘</slot>
      </button>
      <time-picker
        v-show="((!isDatePicker || noToggleTimePicker) && isShowTimePicker) || onlyTimePicker"
        @input="input"
        :value="date"
        :minute-step="minuteStep"
        :seconds-picker="secondsPicker"
        :hour-time="hourTime"
      >
        <template
          v-slot:hours-up
        >
          <slot
            name="hours-up"
          />
        </template>
        <template
          v-slot:hours-down
        >
          <slot
            name="hours-down"
          />
        </template>
        <template
          v-slot:minutes-up
        >
          <slot
            name="minutes-up"
          />
        </template>
        <template
          v-slot:minutes-down
        >
          <slot
            name="minutes-down"
          />
        </template>
        <template
          v-slot:seconds-up
        >
          <slot
            name="seconds-up"
          />
        </template>
        <template
          v-slot:seconds-down
        >
          <slot
            name="seconds-down"
          />
        </template>
        <template
          v-slot:meridiems-up
        >
          <slot
            name="meridiems-up"
          />
        </template>
        <template
          v-slot:meridiems-down
        >
          <slot
            name="meridiems-down"
          />
        </template>
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
  </div>
</template>

<script>
import ClickOutside from '../directives/click-outside';
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
    hourTime: {
      type: [Number],
      default: 24,
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
      this.emitValueEvent(value, 'input');
      this.checkAutoClose(checkAutoClose);
    },
    toggle() {
      if (this.isShow) {
        this.close();
      } else {
        this.open();
      }
    },
    hide() {
      if (!this.inline && this.isShow) {
        this.isDatePicker = true;
        this.isShow = false;

        this.$emit('close');
      }
    },
    togglePicker() {
      this.isDatePicker = !this.isDatePicker;
    },
    today(checkAutoClose = false) {
      this.emitValueEvent(this.getDateTimeLocal(), 'input');
      this.checkAutoClose(checkAutoClose);
    },
    changeMonth(value) {
      this.emitValueEvent(value, 'change-month');
    },
    changeYear(value) {
      this.emitValueEvent(value, 'change-year');
    },
    changeDecade(value) {
      this.emitValueEvent(value, 'change-decade');
    },
    changeView(mode) {
      this.isShowTimePicker = mode === 'days';
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
    open() {
      this.isShow = true;

      this.$emit('open');
    },
    close() {
      this.hide();
    },
    emitValueEvent(value, eventName) {
      if (this.valueType === 'Auto') {
        if ((typeof this.value) === 'string') {
          this.$emit(eventName, value.toFormat(this.valueFormat));
        } else if (this.value !== null && this.value.isValid === true) {
          this.$emit(eventName, value);
        } else {
          this.$emit(eventName, value.toJSDate());
        }
      } else if (this.valueType === 'String') {
        this.$emit(eventName, value.toFormat(this.valueFormat));
      } else if (this.valueType === 'Luxon') {
        this.$emit(eventName, value);
      } else if (this.valueType === 'Date') {
        this.$emit(eventName, value.toJSDate());
      }
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
