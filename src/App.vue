<template>
  <div id="app">
    <DateTimePicker
      v-model="date"
      value-type="String"
      :empty-value="null"
      :hour-time="12"
    />

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
};
</script>
