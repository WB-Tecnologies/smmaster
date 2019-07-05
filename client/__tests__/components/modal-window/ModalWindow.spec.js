import React from 'react';
import { shallow, mount } from 'enzyme';

import ModalWindow from '../../../src/components/modal-window/ModalWindow';
import Button from '../../../src/components/button/Button';

describe('ModalWindow component', () => {
  const props = {
    title: 'Title',
    isOpen: true,
    onCancel: () => {},
    image: 'image',
    label: 'label',
  };
  let shallowWrapper;

  beforeEach(() => {
    shallowWrapper = shallow(<ModalWindow {...props} />);
  });

  it('should render ModalWindow component', () => {
    expect(shallowWrapper).toBeTruthy();
  });

  it('should display data when props are passed', () => {
    expect(shallowWrapper.find('.modal-window__title').text()).toEqual(props.title);
  });

  it('should render Button component', () => {
    const component = mount(<ModalWindow {...props} />);
    expect(component.find(Button).length).toEqual(1);
  });
});
