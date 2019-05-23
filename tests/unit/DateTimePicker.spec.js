import { shallowMount } from '@vue/test-utils';
import DateTimePicker from '@/components/DateTimePicker.vue';

describe('Simple DateTimePicker', () => {
  it('renders props.value when passed', () => {
    const value = '2019-03-06 00:00:00';
    const wrapper = shallowMount(DateTimePicker, {
      propsData: { value },
    });
    expect(wrapper.text()).toMatch('2019-03-06 00:00');
  });
});
