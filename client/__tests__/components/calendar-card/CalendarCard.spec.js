import React from 'react';
import { mount } from 'enzyme';

import CalendarCard from '../../../src/components/calendar-card/CalendarCard';

describe('CalendarCard component', () => {
  let container;
  let props;

  beforeEach(() => {
    props = {
      post: {
        id: '123',
        accounts: [{ account: 1 }, { account: 2 }, { account: 3 }],
        title: 'Title',
        rubricColor: 'E3E7EB',
        isEmpty: false,
      },
      time: new Date(),
    };
    container = mount(<CalendarCard {...props} />);
  });
  it('should render CalendarCard component', () => {
    expect(container.exists()).toBe(true);
  });
  it('should render CalendarCard component with props', () => {
    expect(container.props().post).toEqual(props.post);
  });
});
