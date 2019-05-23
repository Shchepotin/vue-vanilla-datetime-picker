import { DateTime } from 'luxon';
import { shallowMount } from '@vue/test-utils';
import DateTimePicker from '@/components/DateTimePicker.vue';

describe('DateTimePicker. Prop value-type', () => {
  it('Props value-type="Auto"', () => {
    const value = DateTime.local();
    const wrapper = shallowMount(DateTimePicker, {
      propsData: {
        value,
        valueType: 'Auto',
      },
    });
    expect(wrapper.text()).toMatch(value.toFormat('yyyy-LL-dd HH:mm'));
  });

  it('Props value-type="String"', () => {
    const testDate = DateTime.local();

    const value = testDate.toFormat('yyyy-LL-dd HH:mm:ss');
    const wrapper = shallowMount(DateTimePicker, {
      propsData: {
        value,
        valueType: 'String',
      },
    });
    expect(wrapper.text()).toMatch(testDate.toFormat('yyyy-LL-dd HH:mm'));
  });

  it('Props value-type="Date"', () => {
    const value = new Date();
    const wrapper = shallowMount(DateTimePicker, {
      propsData: {
        value,
        valueType: 'String',
      },
    });
    expect(wrapper.text()).toMatch(DateTime.fromJSDate(value).toFormat('yyyy-LL-dd HH:mm'));
  });


  it('Props value-type="Luxon"', () => {
    const value = DateTime.local();
    const wrapper = shallowMount(DateTimePicker, {
      propsData: {
        value,
        valueType: 'Luxon',
      },
    });
    expect(wrapper.text()).toMatch(value.toFormat('yyyy-LL-dd HH:mm'));
  });
});
