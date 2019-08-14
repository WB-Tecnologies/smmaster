import React from 'react';
import PropTypes from 'prop-types';

import Portal from '../portal/Portal';
import Button from '../button/Button';

import './modal-window.sass';

const ModalWindow = ({
  image,
  title,
  isOpen,
  onCancel,
  onSubmit,
  children,
  labelCancel,
  labelSubmit,
}) => (isOpen && (
  <Portal>
    <div className="modal-overlay">
      <div className="modal-window">
        {image && (
          <div className="modal-window__header">
            <img src={image} alt="undraw-process" className="modal-window__header-img" />
          </div>
        )}
        <div className="modal-window__body">
          <p className="modal-window__title">{title}</p>
          <p className="modal-window__text">
            {children}
          </p>
          <div className="modal-window__footer">
            {labelSubmit && <Button isPrimary isPrimaryMd onClick={onSubmit} className="modal-window__footer-btn">{labelSubmit}</Button>}
            {labelCancel && <Button isOutline onClick={onCancel} className="modal-window__footer-btn">{labelCancel}</Button>}
          </div>
        </div>
      </div>
    </div>
  </Portal>
));

ModalWindow.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  image: PropTypes.string,
  children: PropTypes.node,
  labelCancel: PropTypes.string,
  labelSubmit: PropTypes.string,
};
ModalWindow.defaultProps = {
  isOpen: false,
  image: '',
  children: null,
  onSubmit: () => {},
  labelCancel: 'cancel',
  labelSubmit: 'submit',
};
export default ModalWindow;
