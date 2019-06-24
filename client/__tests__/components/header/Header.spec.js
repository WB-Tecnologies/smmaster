import React from 'react';
import { shallow, mount } from 'enzyme';

import Header from '../../../src/components/header/Header';
import Button from '../../../src/components/button/Button';
import Logo from '../../../src/components/logo/Logo';
import ButtonDropdown from '../../../src/components/button-dropdown/ButtonDropdown';

describe('Header component', () => {
  const props = {
    title: 'Title',
  };

  it('should render Header component', () => {
    const component = shallow(<Header {...props} />);

    expect(component).toBeTruthy();
  });

  it("should doesn't break without title", () => {
    const component = shallow(<Header />);

    expect(component.exists()).toBe(true);
  });

  it('should render Logo component', () => {
    const component = mount(<Header />);

    expect(component.find(Logo).length).toEqual(1);
  });

  it('should render Button component', () => {
    const component = mount(<Header />);

    expect(component.find(Button).length).toEqual(1);
  });

  it('should render ButtonDropdown component', () => {
    const component = mount(<Header />);

    expect(component.children(ButtonDropdown).length).toEqual(1);
  });
});
