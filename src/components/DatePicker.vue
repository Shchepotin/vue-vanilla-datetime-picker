<template>
  <div class="date-picker">
    <div class="date-picker__header">
      <button
        v-if="section === 'days'"
        type="button"
        class="date-picker__prev_month"
        :class="{
          'date-picker__prev_month--disabled': previousMonth.disabled,
        }"
        @click="setPreviousMonth(previousMonth.value)"
        :disabled="previousMonth.disabled"
      >
        <slot
          name="months-prev"
          :item="previousMonth"
        />
      </button>
      <button
        v-else-if="section === 'months'"
        type="button"
        class="date-picker__prev_year"
        :class="{
          'date-picker__prev_year--disabled': previousYear.disabled,
        }"
        @click="setPreviousYear(previousYear.value)"
        :disabled="previousYear.disabled"
      >
        <slot
          name="years-prev"
          :item="previousYear"
        />
      </button>
      <button
        v-else-if="section === 'years'"
        type="button"
        class="date-picker__prev_decade"
        :class="{
          'date-picker__prev_decade--disabled': previousDecade.disabled,
        }"
        @click="setPreviousDecade(previousDecade.value)"
        :disabled="previousDecade.disabled"
      >
        <slot
          name="decades-prev"
          :item="previousDecade"
        />
      </button>
      <button
        v-if="section !== 'years'"
        type="button"
        @click="section = 'months'"
        class="date-picker__month-header"
      >
        {{ displayMonth }}
      </button>
      <button
        type="button"
        @click="section = 'years'"
        class="date-picker__year-header"
      >
        {{ displayYear }}
      </button>
      <button
        v-if="section === 'days'"
        type="button"
        class="date-picker__next_month"
        :class="{
          'date-picker__next_month--disabled': nextMonth.disabled,
        }"
        @click="setNextMonth(nextMonth.value)"
        :disabled="nextMonth.disabled"
      >
        <slot
          name="months-next"
          :item="nextMonth"
        />
      </button>
      <button
        v-else-if="section === 'months'"
        type="button"
        class="date-picker__next_year"
        :class="{
          'date-picker__next_year--disabled': nextYear.disabled,
        }"
        @click="setNextYear(nextYear.value)"
        :disabled="nextYear.disabled"
      >
        <slot
          name="years-next"
          :item="nextYear"
        />
      </button>
      <button
        v-else-if="section === 'years'"
        type="button"
        class="date-picker__next_decade"
        :class="{
          'date-picker__next_decade--disabled': nextDecade.disabled,
        }"
        @click="setNextDecade(nextDecade.value)"
        :disabled="nextDecade.disabled"
      >
        <slot
          name="decades-next"
          :item="nextDecade"
        />
      </button>
    </div>
    <div
      v-show="section === 'days'"
      class="date-picker__days"
    >
      <div
        class="weekday__row"
      >
        <div
          v-for="(nameWeekday, index) in nameWeekdays"
          :key="index"
          class="weekday__cell"
        >
          {{ nameWeekday }}
        </div>
      </div>
      <div
        v-for="(rows, rowIndex) in dateMatrixWithSelectedDate"
        :key="rowIndex"
        class="date-picker__row"
      >
        <div
          v-for="(info, index) in rows"
          :key="index"
          class="date-picker__cell"
          :class="[{
            'date-picker__cell--selected': info.selected && !isEmptyValue,
            'date-picker__day': info.date !== null,
            'date-picker__day--current': info.status === 'current',
            'date-picker__day--previous': info.status === 'previous',
            'date-picker__day--next': info.status === 'next',
            'date-picker__day--disabled': info.disabled,
          }, info.highlightedClass]"
          @click="!info.disabled && selectDay(info.date)"
        >
          {{ info.date !== null ? info.date.toFormat('dd') : '' }}
        </div>
      </div>
    </div>
    <div
      v-show="section === 'months'"
      class="date-picker__months"
    >
      <div
        v-for="(info, index) in monthMatrixWithSelectedMonth"
        :key="index"
        class="date-picker__month-button-wrapper"
      >
        <button
          @click="selectMonth(info.month)"
          type="button"
          class="date-picker__month-button"
          :class="{
            'date-picker__month-button--selected': info.selected,
            'date-picker__month-button--disabled': info.disabled,
          }"
          :disabled="info.disabled"
        >
          {{ info.monthLong }}
        </button>
      </div>
    </div>
    <div
      v-show="section === 'years'"
      class="date-picker__years"
    >
      <div
        v-for="(info, index) in yearMatrixWithSelectedYear"
        :key="index"
        class="date-picker__year-button-wrapper"
      >
        <button
          @click="selectYear(info.year)"
          type="button"
          class="date-picker__year-button"
          :class="{
            'date-picker__year-button--selected': info.selected,
            'date-picker__year-button--disabled': info.disabled,
          }"
          :disabled="info.disabled"
        >
          {{ info.yearNumber }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import helpers from '../mixins/helpers';

export default {
  name: 'DatePicker',
  props: {
    value: {
      required: false,
    },
    startFromSunday: {
      type: [Boolean],
      default: false,
    },
    isEmptyValue: {
      type: [Boolean],
      default: true,
    },
    initialView: {
      type: [String],
      default: 'days',
    },
    locale: {
      type: [String],
      default: 'en',
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
  },
  mixins: [
    helpers,
  ],
  computed: {
    dateMatrixWithSelectedDate() {
      return this.dateMatrix.map(rows => rows.map((info) => {
        let highlightedClass = this.highlighted.find(highlighted => highlighted.date.toFormat('yyyy-LL-dd') === info.date.toFormat('yyyy-LL-dd'));

        if (highlightedClass !== undefined) {
          highlightedClass = highlightedClass.class;
        }

        return {
          selected: info.date.toFormat('yyyy-LL-dd') === this.value.toFormat('yyyy-LL-dd'),
          disabled: (this.maxDate !== null && this.maxDate.toFormat('yyyy-LL-dd') < info.date.toFormat('yyyy-LL-dd'))
            || (this.minDate !== null && this.minDate.toFormat('yyyy-LL-dd') > info.date.toFormat('yyyy-LL-dd'))
            || this.disabledDates.find(date => date.toFormat('yyyy-LL-dd') === info.date.toFormat('yyyy-LL-dd')),
          highlightedClass,
          ...info,
        };
      }));
    },
    monthMatrixWithSelectedMonth() {
      return this.monthsMatrix.map(info => ({
        selected: info.month.toFormat('yyyy-LL') === this.value.toFormat('yyyy-LL'),
        disabled: (this.maxDate !== null && this.maxDate.toFormat('yyyy-LL') < info.month.toFormat('yyyy-LL'))
          || (this.minDate !== null && this.minDate.toFormat('yyyy-LL') > info.month.toFormat('yyyy-LL')),
        ...info,
      }));
    },
    yearMatrixWithSelectedYear() {
      return this.yearsMatrix.map(info => ({
        selected: info.year.toFormat('yyyy') === this.value.toFormat('yyyy'),
        disabled: (this.maxDate !== null && this.maxDate.toFormat('yyyy') < info.year.toFormat('yyyy'))
          || (this.minDate !== null && this.minDate.toFormat('yyyy') > info.year.toFormat('yyyy')),
        ...info,
      }));
    },
    previousMonth() {
      const value = this.getPreviousMonth(this.displayDate);

      return {
        value,
        disabled: (this.maxDate !== null && this.maxDate.toFormat('yyyy-LL') < value.toFormat('yyyy-LL'))
          || (this.minDate !== null && this.minDate.toFormat('yyyy-LL') > value.toFormat('yyyy-LL')),
      };
    },
    previousYear() {
      const value = this.getPreviousYear(this.displayDate);

      return {
        value,
        disabled: (this.maxDate !== null && this.maxDate.toFormat('yyyy') < value.toFormat('yyyy'))
          || (this.minDate !== null && this.minDate.toFormat('yyyy') > value.toFormat('yyyy')),
      };
    },
    previousDecade() {
      const value = this.getPreviousDecade(this.displayDate);

      return {
        value,
        disabled: (this.maxDate !== null && this.maxDate.toFormat('yyyy') < value.toFormat('yyyy'))
          || (this.minDate !== null && this.minDate.toFormat('yyyy') > value.toFormat('yyyy')),
      };
    },
    nextMonth() {
      const value = this.getNextMonth(this.displayDate);

      return {
        value,
        disabled: (this.maxDate !== null && this.maxDate.toFormat('yyyy-LL') < value.toFormat('yyyy-LL'))
          || (this.minDate !== null && this.minDate.toFormat('yyyy-LL') > value.toFormat('yyyy-LL')),
      };
    },
    nextYear() {
      const value = this.getNextYear(this.displayDate);

      return {
        value,
        disabled: (this.maxDate !== null && this.maxDate.toFormat('yyyy') < value.toFormat('yyyy'))
          || (this.minDate !== null && this.minDate.toFormat('yyyy') > value.toFormat('yyyy')),
      };
    },
    nextDecade() {
      const value = this.getNextDecade(this.displayDate);

      return {
        value,
        disabled: (this.maxDate !== null && this.maxDate.toFormat('yyyy') < value.toFormat('yyyy'))
          || (this.minDate !== null && this.minDate.toFormat('yyyy') > value.toFormat('yyyy')),
      };
    },
    displayYear() {
      return this.displayDate.year;
    },
    displayMonth() {
      return this.displayDate.setLocale(this.locale).monthLong;
    },
  },
  data() {
    return {
      dateMatrix: [],
      monthsMatrix: [],
      yearsMatrix: [],
      displayDate: this.value,
      nameWeekdays: [],
      section: this.initialView,
    };
  },
  methods: {
    selectDay(date) {
      this.displayDate = date;
      this.$emit('input', this.displayDate);
      this.dateMatrix = this.generateDateMatrix(this.displayDate, this.startFromSunday);
    },
    selectMonth(month) {
      this.displayDate = month;
      this.dateMatrix = this.generateDateMatrix(this.displayDate, this.startFromSunday);
      this.section = 'days';
      this.$emit('change-month', this.displayDate);
    },
    selectYear(year) {
      this.displayDate = year;
      this.monthsMatrix = this.generateMonthsMatrix(this.displayDate, this.locale);
      this.section = 'months';
      this.$emit('change-year', this.displayDate);
    },
    setPreviousMonth(previousMonth) {
      this.displayDate = previousMonth;
      this.dateMatrix = this.generateDateMatrix(this.displayDate, this.startFromSunday);
      this.$emit('change-month', this.displayDate);
    },
    setPreviousYear(previousYear) {
      this.displayDate = previousYear;
      this.monthsMatrix = this.generateMonthsMatrix(this.displayDate, this.locale);
      this.$emit('change-year', this.displayDate);
    },
    setPreviousDecade(previousDecade) {
      this.displayDate = previousDecade;
      this.yearsMatrix = this.generateYearsMatrix(this.displayDate);
      this.$emit('change-decade', this.displayDate);
    },
    setNextMonth(nextMonth) {
      this.displayDate = nextMonth;
      this.dateMatrix = this.generateDateMatrix(this.displayDate, this.startFromSunday);
      this.$emit('change-month', this.displayDate);
    },
    setNextYear(nextYear) {
      this.displayDate = nextYear;
      this.monthsMatrix = this.generateMonthsMatrix(this.displayDate, this.locale);
      this.$emit('change-year', this.displayDate);
    },
    setNextDecade(nextDecade) {
      this.displayDate = nextDecade;
      this.yearsMatrix = this.generateYearsMatrix(this.displayDate);
      this.$emit('change-decade', this.displayDate);
    },
  },
  watch: {
    value: {
      handler(value) {
        this.displayDate = value;
        this.dateMatrix = this.generateDateMatrix(this.displayDate, this.startFromSunday);
        this.monthsMatrix = this.generateMonthsMatrix(this.displayDate, this.locale);
        this.yearsMatrix = this.generateYearsMatrix(this.displayDate);
      },
      immediate: true,
      deep: true,
    },
    locale: {
      handler(value) {
        this.nameWeekdays = this.getShortNameWeekdays(this.startFromSunday, value);
      },
      immediate: true,
    },
    section: {
      handler(value) {
        this.$emit('change-view', value);
      },
      immediate: true,
    },
  },
};
</script>

<style>
.date-picker {
  display: flex;
  flex-direction: column;
}

.date-picker__row, .weekday__row {
  display: flex;
  flex-direction: row;
}

.weekday__row {
  margin-bottom: 10px;
}

.date-picker__cell, .weekday__cell {
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
}

.date-picker__header {
  display: flex;
  margin-bottom: 10px;
}

.date-picker__month-header {
  flex: 1;
}

.date-picker__year-header {
  flex: 1;
}

.date-picker__day {
  cursor: default;
  user-select: none;
}

.date-picker__day--previous, .date-picker__day--next {
  opacity: .4;
}

.date-picker__day--disabled {
  opacity: .1;
}

.date-picker__cell--selected {
  background: #eeeeee;
}

.date-picker__days, .date-picker__months, .date-picker__years {
  margin-bottom: 10px;
}

.date-picker__year-button, .date-picker__month-button {
  width: 100%;
  margin-bottom: 3px;
}
</style>
