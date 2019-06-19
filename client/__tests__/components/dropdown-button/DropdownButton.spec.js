import React from 'react';
import { shallow, mount } from 'enzyme';

import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from '../../../src/components/button-dropdown/ButtonDropdown';

describe('ButtonDropdown component', () => {

  it('renders', () => {
    const component = shallow(<ButtonDropdown />);

    expect(component.exists()).toBe(true);
  });
});

describe('DropdownToggle component', () => {

  it('user click on dropdown button', () => {
    const mockCallBack = jest.fn();

    const button = shallow((<DropdownToggle toggle={mockCallBack} />));
    button.find('button').simulate('click');

    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});

describe('DropdownMenu component', () => {
  const props = {
    isOpen: true,
  };

  const DropdownMenuComponent = mount(<DropdownMenu {...props} />).find(
    '.dropdown-menu',
  );

  expect(DropdownMenuComponent.hasClass('dropdown-menu')).toEqual(true);
});

describe('DropdownItem component', () => {
  it('renders', () => {
    const component = shallow(<DropdownItem />);

    expect(component.exists()).toBe(true);
  });
});
