# Vue Datetime Picker

## Demo

See demo [here](https://codepen.io/Shchepotin/pen/wEQyQx?editors=1010)

## Requirements

- Vue.js `^2.0.0`

## Usage

```
npm install vue-vanilla-datetime-picker --save
```

```javascript
import DateTimePicker from 'vue-vanilla-datetime-picker';

// ...

components: {
  DateTimePicker: DateTimePicker
}

// ...
```

```sass
@import "node_modules/vue-vanilla-datetime-picker/dist/DateTimePicker"
```

### Props:

| Name               | Required | Type                            | Default             | Description                                                                                                            |
| ------------------ | -------- | ------------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| v-model, value     | *        | String, Date, DateTime (luxon)  |                     | Value                                                                                                                  |
| value-format       |          | String                          | yyyy-LL-dd HH:mm:ss | Value [format](https://github.com/moment/luxon/blob/master/docs/formatting.md#table-of-tokens)                         |
| max-date           |          | String, Date, DateTime (luxon)  | null                | Max date                                                                                                               |
| min-date           |          | String, Date, DateTime (luxon)  | null                | Min date                                                                                                               |
| constraints-format |          | String                          | yyyy-LL-dd          | Constraints [format](https://github.com/moment/luxon/blob/master/docs/formatting.md#table-of-tokens)                   |
| locale             |          | String                          | en                  | Set [locale](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry).                      |
| inline             |          | Boolean                         | false               | Enable inline mode.                                                                                                    |
| format             |          | String                          | yyyy-LL-dd HH:mm    | Display [format](https://github.com/moment/luxon/blob/master/docs/formatting.md#table-of-tokens).                      |
| time-picker        |          | Boolean                         | true                | Show time picker.                                                                                                      |
| start-from-sunday  |          | Boolean                         | false               | Set Sunday as first day of week.                                                                                       |
| seconds-picker     |          | Boolean                         | false               | Show second picker.                                                                                                    |
| initial-view       |          | String                          | days                | Initial view: 'days', 'months', 'years'                                                                                |
| main-button-class  |          | String                          |                     | Class for main button.                                                                                                 |
| disabled-dates     |          | Array                           | []                  | Array of disabled dates.                                                                                               |
| highlighted        |          | Array                           | []                  | Array of highlighted dates. Example: [{ date: '2018-09-17', class: 'highlighted' }]                                    |

### Slots:

| Name                  | Description                                                       |
| --------------------- | ----------------------------------------------------------------- |
| choose-date           | For main button if date not selected.                             |
| formatted-datetime    | For main button if date selected.                                 |
| date                  | For date button.                                                  |
| time                  | For time button.                                                  |
| months-prev           | For previous month button.                                        |
| months-next           | For next month button.                                            |
| years-prev            | For previous year button.                                         |
| years-next            | For next year button.                                             |
| decades-prev          | For previous decade button.                                       |
| decades-prev          | For next decade button.                                           |
| hours-up              | For hours up button.                                              |
| hours-down            | For hours down  button.                                           |
| minutes-up            | For minutes up button.                                            |
| minutes-down          | For minutes down button.                                          |
| seconds-up            | For seconds up button.                                            |
| seconds-down          | For seconds down button.                                          |

## Development

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build-lib
```

### Lints and fixes files

```
npm run lint
```
