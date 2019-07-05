import React from 'react';
import PropTypes from 'prop-types';

import Portal from '../portal/Portal';
import Button from '../button/Button';

import './modal-window.sass';

const ModalWindow = ({
  title, isOpen, onCancel, image, children, label,
}) => (isOpen && (
  <Portal>
    <div className="modal-overlay">
      <div className="modal-window">
        <div className="modal-window__header">
          <img src={image} alt="undraw-process" className="modal-window__header-img" />
        </div>
        <div className="modal-window__body">
          <p className="modal-window__title">{title}</p>
          <p className="modal-window__text">
            {children}
          </p>
          <div className="modal-window__footer">
            <Button isPrimary isPrimaryMd onClick={onCancel} className="modal-window__footer-btn">{label}</Button>
          </div>
        </div>
      </div>
    </div>
  </Portal>
));

ModalWindow.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
  image: PropTypes.string,
  children: PropTypes.node,
  label: PropTypes.string,
};
ModalWindow.defaultProps = {
  title: '',
  isOpen: false,
  onCancel: () => {},
  image: '',
  children: null,
  label: 'submit',
};
export default ModalWindow;
