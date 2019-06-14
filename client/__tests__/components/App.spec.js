import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import App from '../../src/App';

describe('<App />', () => {
  const wrapper = shallow(<App />);

  it('should render App', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
