<template>
  <div id="app">
    <DateTimePicker
      v-model="date"
      value-type="String"
      :empty-value="null"
    />

    <DateTimePicker
      style="margin-top: 200px"
      v-model="date"
      :inline="true"
      :min-date="'2018-08-03'"
      :max-date="'2018-12-01'"
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
      date: null,
    };
  },
};
</script>
