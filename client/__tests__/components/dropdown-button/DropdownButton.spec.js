import React from 'react';
import { shallow, mount } from 'enzyme';

import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from '../../../src/components/button-dropdown/ButtonDropdown';

describe('ButtonDropdown component', () => {
  it('should render ButtonDropdown component', () => {
    const component = shallow(<ButtonDropdown />);

    expect(component.exists()).toBe(true);
  });
});

describe('DropdownToggle component', () => {
  it('should call callBack by click', () => {
    const mockCallBack = jest.fn();

    const button = shallow((<DropdownToggle onClickHandler={mockCallBack} />));
    button.find('button').simulate('click');

    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});

describe('DropdownMenu component', () => {
  it('should render DropdownMenu component', () => {
    const props = {
      isOpen: true,
    };

    const wrapper = mount(<DropdownMenu {...props} />).find('div');

    expect(wrapper.length).toEqual(1);
  });
});

describe('DropdownItem component', () => {
  it('should render DropdownItem component', () => {
    const component = shallow(<DropdownItem />);

    expect(component.exists()).toBe(true);
  });
});
