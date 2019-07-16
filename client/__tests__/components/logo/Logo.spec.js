import React from 'react';
import { shallow } from 'enzyme';

import Logo from '../../../src/components/logo/Logo';

describe('Logo component', () => {
  const props = {
    link: 'Title',
    className: 'style',
  };

  it('should render Logo component', () => {
    const component = shallow(<Logo {...props} />);

    expect(component.exists()).toBe(true);
  });
});
