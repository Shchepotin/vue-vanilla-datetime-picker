<template>
  <div id="app">
    <DateTimePicker
      v-model="date"
      value-type="String"
      :empty-value="null"
      :hour-time="12"
      @change-month="changeMonth"
      @change-year="changeYear"
      @change-decade="changeDecade"
    />

    <DateTimePicker
      v-model="date"
      value-type="String"
      :empty-value="null"
      :hour-time="12"
      @change-month="changeMonth"
      @change-year="changeYear"
      @change-decade="changeDecade"
    >
      <template
        v-slot:months-prev="props"
      >
        {{ props.item.value.toFormat('MMMM') }}
      </template>
      <template
        v-slot:months-next="props"
      >
        {{ props.item.value.toFormat('MMMM') }}
      </template>
      <template
        v-slot:years-prev="props"
      >
        {{ props.item.value.toFormat('yyyy') }}
      </template>
      <template
        v-slot:years-next="props"
      >
        {{ props.item.value.toFormat('yyyy') }}
      </template>
      <template
        v-slot:decades-prev="props"
      >
        {{ props.item.value.toFormat('yyyy') }}
      </template>
      <template
        v-slot:decades-next="props"
      >
        {{ props.item.value.toFormat('yyyy') }}
      </template>
    </DateTimePicker>

    <DateTimePicker
      v-model="date"
      value-type="String"
      :empty-value="null"
      :no-toggle-time-picker="true"
    />

    <DateTimePicker
      v-model="date"
      value-type="String"
      :empty-value="null"
      :only-time-picker="true"
      format="HH:mm"
    />

    <DateTimePicker
      style="margin-top: 200px"
      v-model="date"
      :inline="true"
      :min-date="'2018-08-03'"
      :max-date="'2018-12-01'"
      @change-month="changeMonth"
      @change-year="changeYear"
      @change-decade="changeDecade"
    />

    <DateTimePicker
      v-model="date"
      :inline="true"
      :min-date="'2018-08-03'"
      :max-date="'2018-12-01'"
      :no-toggle-time-picker="true"
    />

    <DateTimePicker
      v-model="date"
      :inline="true"
      :min-date="'2018-08-03'"
      :max-date="'2018-12-01'"
      :only-time-picker="true"
    />
  </div>
</template>

<script>
import DateTimePicker from './components/DateTimePicker.vue';

export default {
  components: {
    DateTimePicker,
  },
  data() {
    return {
      date: '',
    };
  },
  methods: {
    changeMonth(value) {
      console.log('month', value);
    },
    changeYear(value) {
      console.log('year', value);
    },
    changeDecade(value) {
      console.log('decade', value);
    },
  },
};
</script>
