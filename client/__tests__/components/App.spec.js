import React from 'react';
import { shallow } from 'enzyme';

import App from '../../src/App';

describe('<App />', () => {
  const wrapper = shallow(<App />);

  it('should render App', () => {
    expect(wrapper.find('div').length).toBe(1);
  });
});
