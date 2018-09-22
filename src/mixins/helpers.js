import {DateTime} from 'luxon';

export default {
  methods: {
    generateSecondsMatrix(date) {
      return Array.from({length: 60}, (elColumn, columnIndex) => DateTime
        .local(date.year, date.month, date.day, date.hour, date.minute, columnIndex));
    },
    generateMinutesMatrix(date) {
      return Array.from({length: 60}, (elColumn, columnIndex) => DateTime
        .local(date.year, date.month, date.day, date.hour, columnIndex, date.second));
    },
    generateHoursMatrix(date) {
      return Array.from({length: 24}, (elColumn, columnIndex) => DateTime
        .local(date.year, date.month, date.day, columnIndex, date.minute, date.second));
    },
    generateDateMatrix(selectedDate, startFromSunday = false) {
      const selectedMonth = selectedDate;
      let firstMonthDay = DateTime
        .local(selectedMonth.year, selectedMonth.month, 1).weekday + (startFromSunday ? 1 : 0);

      if (startFromSunday) {
        firstMonthDay = firstMonthDay !== 8 ? firstMonthDay : 1;
      }

      let count = 1;
      let countNextMonth = 1;

      const previousMonth = this.getPreviousMonth(selectedMonth);
      const nextMonth = this.getNextMonth(selectedMonth);

      return Array.from({length: 6}, (elColumn, columnIndex) => Array
        .from({length: 7}, (elRow, rowIndex) => {
          const day = {
            status: null,
            date: null,
          };

          const time = [
            selectedMonth.hour,
            selectedMonth.minute,
            selectedMonth.second,
          ];

          if ((columnIndex === 0 && (rowIndex >= firstMonthDay - 1))
            || (columnIndex > 0 && count <= selectedMonth.daysInMonth)) {
            day.status = 'current';
            day.date = DateTime
              .local(selectedMonth.year, selectedMonth.month, count, ...time);

            count += 1;
          } else if (columnIndex === 0 && rowIndex < firstMonthDay - 1) {
            day.status = 'previous';
            day.date = DateTime
              .local(
                previousMonth.year, previousMonth.month,
                (
                  (
                    previousMonth.daysInMonth - firstMonthDay
                  ) + 2
                ) + rowIndex,
                ...time,
              );
          } else {
            day.status = 'next';
            day.date = DateTime
              .local(nextMonth.year, nextMonth.month, countNextMonth, ...time);

            countNextMonth += 1;
          }

          return day;
        }));
    },
    generateMonthsMatrix(date, locale = 'en') {
      return Array.from({length: 12}, (elColumn, columnIndex) => {
        const dateTime = DateTime.local(
          date.year, columnIndex + 1, date.day,
          date.hour, date.minute, date.second,
        ).setLocale(locale);

        return {
          month: dateTime,
          monthLong: dateTime.monthLong,
          monthShort: dateTime.monthShort,
        };
      });
    },
    generateYearsMatrix(date) {
      return Array.from({length: 10}, (elColumn, columnIndex) => {
        const dateTime = DateTime.local(
          (date.year - (date.year % 10)) + columnIndex, date.month, date.day,
          date.hour, date.minute, date.second,
        );

        return {
          year: dateTime,
          yearNumber: dateTime.year,
        };
      });
    },
    getPreviousMonth(date) {
      return DateTime.local(date.year, date.month, 1, date.hour, date.minute, date.second)
        .minus({month: 1});
    },
    getNextMonth(date) {
      return DateTime.local(date.year, date.month, 1, date.hour, date.minute, date.second)
        .plus({month: 1});
    },
    getPreviousDecade(date) {
      return DateTime.local(date.year, date.month, 1, date.hour, date.minute, date.second)
        .minus({year: 10});
    },
    getNextDecade(date) {
      return DateTime.local(date.year, date.month, 1, date.hour, date.minute, date.second)
        .plus({year: 10});
    },
    getPreviousYear(date) {
      return DateTime.local(date.year, date.month, 1, date.hour, date.minute, date.second)
        .minus({year: 1});
    },
    getNextYear(date) {
      return DateTime.local(date.year, date.month, 1, date.hour, date.minute, date.second)
        .plus({year: 1});
    },
    toDateTime(value, format, defaultDate = null) {
      let date = defaultDate;

      if (value !== '' && (typeof value) === 'string') {
        date = DateTime.fromFormat(value, format);
      } else if (value !== null && value.isValid === true) {
        date = value;
      } else if (value instanceof Date) {
        date = DateTime.fromJSDate(value);
      }

      return date;
    },
    getShortNameWeekdays(startFromSunday = false, locale = 'en') {
      return Array.from({length: 7}, (elColumn, columnIndex) => DateTime
        .fromObject({
          weekday: startFromSunday
            ? (columnIndex === 0
              ? 7 : columnIndex) : columnIndex + 1
        }).setLocale(locale).weekdayShort);
    },
    getDateTimeLocal() {
      return DateTime.fromObject({
        minutes: 0,
        hours: 0,
        seconds: 0,
      });
    }
  },
};
