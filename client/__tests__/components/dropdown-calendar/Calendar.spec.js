
import React from 'react';
import DatePicker from 'react-datepicker';
import { shallow, mount } from 'enzyme';

import Calendar from '../../../src/components/calendar/Calendar';
import CalendarButton from '../../../src/components/calendar/CalendarButton';

describe('Calendar component', () => {
  const props = {
    activeDate: new Date(),
    onChange: () => {},
  };

  it('should render Calendar component', () => {
    const component = mount(<Calendar {...props} />);

    expect(component).toBeTruthy();
  });

  it('should render DatePicker component', () => {
    const component = mount(<Calendar {...props} />);

    expect(component.find(DatePicker).length).toEqual(1);
  });

  it('should call callBack by click', () => {
    const mockCallBack = jest.fn();

    const button = shallow((<CalendarButton onClick={mockCallBack} />));
    button.find('button').simulate('click');

    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
