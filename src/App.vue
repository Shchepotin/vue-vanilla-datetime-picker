<template>
  <div id="app">
    <h2>DateTimePicker without props:</h2>
    <DateTimePicker
      id="picker-no-props"
      v-model="dateNoProps"
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
      dateNoProps: '',
    };
  },
  methods: {},
};
</script>
