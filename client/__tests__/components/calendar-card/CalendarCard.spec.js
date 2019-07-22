import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import CalendarCard from '../../../src/components/calendar-card/CalendarCard';

describe('CalendarCard component', () => {
  const initialState = {
    postDetails: {
      items: {},
      error: null,
      loading: false,
    },
  };
  const mockStore = configureStore();
  let store;
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
    store = mockStore(initialState);
    container = mount(<CalendarCard store={store} {...props} />);
  });
  it('should render CalendarCard component', () => {
    expect(container.exists()).toBe(true);
  });
  it('should render CalendarCard component with props', () => {
    expect(container.props().post).toEqual(props.post);
  });
});
