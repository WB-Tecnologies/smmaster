import React from 'react';
import { shallow } from 'enzyme';

import Tooltip from '../../../src/components/tooltip/Tooltip';

describe('Tooltip component', () => {
  let container;
  let props;

  beforeEach(() => {
    props = {
      position: {
        top: 0,
        left: 0,
      },
      content: 'description',
      title: 'title',
      isVisible: true,
    };
    container = shallow(<Tooltip {...props} />);
  });

  it('should render correctly', () => {
    expect(container.exists('.tooltip')).toBe(true);
  });

  it('should have active class when Tooltip is visible', () => {
    expect(container.exists('.tooltip_visible')).toEqual(props.isVisible);
  });
});
