
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import Calendar from '../../../src/components/calendar/Calendar';
import CalendarButton from '../../../src/components/calendar/CalendarButton';

describe('Calendar component', () => {
  const initialState = { currentDate: { date: 'Thu Jul 04 2019 13:53:10 GMT+0300 (Москва, стандартное время)' } };
  const mockStore = configureStore();
  let store;
  let container;
  let props;

  beforeEach(() => {
    props = {
      activeDate: new Date(),
      onChange: () => {},
    };
    store = mockStore(initialState);
    container = shallow(<Calendar store={store} {...props} />);
  });

  it('should render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });

  it('should check Prop matches with initialState', () => {
    expect(container.prop('date')).toEqual(initialState.date);
  });

  it('should call callBack by click', () => {
    const mockCallBack = jest.fn();

    const button = shallow((<CalendarButton onClick={mockCallBack} />));
    button.find('button').simulate('click');

    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
