import { DateTime } from 'luxon';
import { shallowMount } from '@vue/test-utils';
import DateTimePicker from '../../src/components/DateTimePicker.vue';

describe('DateTimePicker. Prop value-format', () => {
  it('Props default value-format', () => {
    const testDate = DateTime.local();
    const value = testDate.toFormat('yyyy-LL-dd HH:mm:ss');
    const wrapper = shallowMount(DateTimePicker, {
      propsData: {
        value,
      },
    });
    expect(wrapper.text()).toMatch(testDate.toFormat('yyyy-LL-dd HH:mm'));
  });

  it('Props value-format="yyyy-LL-dd HH:mm"', () => {
    const testDate = DateTime.local();
    const value = testDate.toFormat('yyyy-LL-dd HH:mm');
    const wrapper = shallowMount(DateTimePicker, {
      propsData: {
        value,
        valueFormat: 'yyyy-LL-dd HH:mm',
      },
    });
    expect(wrapper.text()).toMatch(testDate.toFormat('yyyy-LL-dd HH:mm'));
  });

  it('Props value-format="yyyy-LL-dd hh:mm a"', () => {
    const testDate = DateTime.local();
    const value = testDate.toFormat('yyyy-LL-dd hh:mm a');
    const wrapper = shallowMount(DateTimePicker, {
      propsData: {
        value,
        valueFormat: 'yyyy-LL-dd hh:mm a',
      },
    });
    expect(wrapper.text()).toMatch(testDate.toFormat('yyyy-LL-dd HH:mm'));
  });

  it('Props value-format="HH:mm yyyy-LL-dd"', () => {
    const testDate = DateTime.local();
    const value = testDate.toFormat('HH:mm yyyy-LL-dd');
    const wrapper = shallowMount(DateTimePicker, {
      propsData: {
        value,
        valueFormat: 'HH:mm yyyy-LL-dd',
      },
    });
    expect(wrapper.text()).toMatch(testDate.toFormat('yyyy-LL-dd HH:mm'));
  });
});
