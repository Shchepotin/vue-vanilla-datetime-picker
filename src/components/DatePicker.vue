<template>
  <div class="date-picker">
    <div class="date-picker__header">
      <button
        v-if="section === 'days'"
        type="button"
        class="date-picker__prev_month"
        @click="prevMonth"
      >
        <slot name="months-prev">&lt;</slot>
      </button>
      <button
        v-else-if="section === 'months'"
        type="button"
        class="date-picker__prev_year"
        @click="prevYear"
      >
        <slot name="years-prev">&lt;</slot>
      </button>
      <button
        v-else-if="section === 'years'"
        type="button"
        class="date-picker__prev_decade"
        @click="prevDecade"
      >
        <slot name="decades-prev">&lt;</slot>
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
        @click="nextMonth"
      >
        <slot name="months-next">&gt;</slot>
      </button>
      <button
        v-else-if="section === 'months'"
        type="button"
        class="date-picker__next_year"
        @click="nextYear"
      >
        <slot name="years-next">&gt;</slot>
      </button>
      <button
        v-else-if="section === 'years'"
        type="button"
        class="date-picker__next_decade"
        @click="nextDecade"
      >
        <slot name="decades-next">&gt;</slot>
      </button>
    </div>
    <div v-if="section === 'days'" class="date-picker__days">
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
          :class="{
            'date-picker__cell--selected': info.selected,
            'date-picker__day': info.date !== null,
            'date-picker__day--current': info.status === 'current',
            'date-picker__day--previous': info.status === 'previous',
            'date-picker__day--next': info.status === 'next',
            'date-picker__day--disabled': info.disabled,
          }"
          @click="!info.disabled && selectDay(info.date)"
        >
          {{ info.date !== null ? info.date.toFormat('dd') : '' }}
        </div>
      </div>
    </div>
    <div v-else-if="section === 'months'" class="date-picker__months">
      <div
        v-for="(info, index) in monthMatrixWithSelectedMonth"
        :key="index"
        class="date-picker__month-button-wrapper"
      >
        <button
          @click="selectMonth(info.month)"
          class="date-picker__month-button"
          :class="{
            'date-picker__month-button--selected': info.selected,
          }"
        >
          {{ info.monthLong }}
        </button>
      </div>
    </div>
    <div v-else-if="section === 'years'" class="date-picker__years">
      <div
        v-for="(info, index) in yearMatrixWithSelectedYear"
        :key="index"
        class="date-picker__year-button-wrapper"
      >
        <button
          @click="selectYear(info.year)"
          class="date-picker__year-button"
          :class="{
            'date-picker__year-button--selected': info.selected,
          }"
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
    name: 'date-picker',
    props: {
      value: {
        required: false,
      },
      startFromSunday: {
        type: [Boolean],
        default: false,
      },
      locale: {
        type: [String],
        default: 'en',
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
    },
    mixins: [
      helpers,
    ],
    computed: {
      dateMatrixWithSelectedDate() {
        return this.dateMatrix.map(rows => rows.map(info => ({
          selected: info.date.toFormat('yyyy-LL-dd') === this.value.toFormat('yyyy-LL-dd'),
          disabled: (this.maxDate !== null && this.maxDate.toFormat('yyyy-LL-dd') < info.date.toFormat('yyyy-LL-dd'))
            || (this.minDate !== null && this.minDate.toFormat('yyyy-LL-dd') > info.date.toFormat('yyyy-LL-dd')),
          ...info,
        })));
      },
      monthMatrixWithSelectedMonth() {
        return this.monthsMatrix.map(info => ({
          selected: info.month.toFormat('yyyy-LL') === this.value.toFormat('yyyy-LL'),
          ...info,
        }));
      },
      yearMatrixWithSelectedYear() {
        return this.yearsMatrix.map(info => ({
          selected: info.year.toFormat('yyyy') === this.value.toFormat('yyyy'),
          ...info,
        }));
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
        section: 'days',
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
      },
      selectYear(year) {
        this.displayDate = year;
        this.monthsMatrix = this.generateMonthsMatrix(this.displayDate, this.locale);
        this.section = 'months';
      },
      prevMonth() {
        this.displayDate = this.getPreviousMonth(this.displayDate);
        this.dateMatrix = this.generateDateMatrix(this.displayDate, this.startFromSunday);
      },
      prevYear() {
        this.displayDate = this.getPreviousYear(this.displayDate);
        this.monthsMatrix = this.generateMonthsMatrix(this.displayDate, this.locale);
      },
      prevDecade() {
        this.displayDate = this.getPreviousDecade(this.displayDate);
        this.yearsMatrix = this.generateYearsMatrix(this.displayDate);
      },
      nextMonth() {
        this.displayDate = this.getNextMonth(this.displayDate);
        this.dateMatrix = this.generateDateMatrix(this.displayDate, this.startFromSunday);
      },
      nextYear() {
        this.displayDate = this.getNextYear(this.displayDate);
        this.monthsMatrix = this.generateMonthsMatrix(this.displayDate, this.locale);
      },
      nextDecade() {
        this.displayDate = this.getNextDecade(this.displayDate);
        this.yearsMatrix = this.generateYearsMatrix(this.displayDate);
      },
    },
    created() {
      this.nameWeekdays = this.getShortNameWeekdays(this.startFromSunday, this.locale);
      this.dateMatrix = this.generateDateMatrix(this.displayDate, this.startFromSunday);
      this.monthsMatrix = this.generateMonthsMatrix(this.displayDate, this.locale);
      this.yearsMatrix = this.generateYearsMatrix(this.displayDate);
    },
    watch: {
      value: {
        handler() {
          this.displayDate = this.value;
          this.dateMatrix = this.generateDateMatrix(this.displayDate, this.startFromSunday);
          this.monthsMatrix = this.generateMonthsMatrix(this.displayDate, this.locale);
          this.yearsMatrix = this.generateYearsMatrix(this.displayDate);
        },
        deep: true,
      },
      locale() {
        this.nameWeekdays = this.getShortNameWeekdays(this.startFromSunday, this.locale);
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
