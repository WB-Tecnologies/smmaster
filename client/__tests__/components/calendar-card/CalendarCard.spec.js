import React from 'react';
import { shallow } from 'enzyme';

import CalendarCard from '../../../src/components/calendar-view/calendar-card/CalendarCard';

describe('CalendarCard component', () => {
  let container;
  let props;

  beforeEach(() => {
    props = {
      post: {
        id: '123',
        accounts: [{ account: 1 }, { account: 2 }, { account: 3 }],
        attachments: [{ img: '1', alt: '1' }, { img: '2', alt: '2' }],
        title: 'Title',
        rubricColor: 'E3E7EB',
        isEmpty: false,
        descr: 'description',
      },
      time: new Date(),
      className: 'class',
    };

    container = shallow(<CalendarCard {...props} />);
  });
  it('should render CalendarCard component', () => {
    expect(container.exists()).toBe(true);
  });
});
