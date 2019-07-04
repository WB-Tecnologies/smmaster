import React from 'react';
import PropTypes from 'prop-types';

import Portal from '../portal/Portal';
import Button from '../button/Button';

import './modal.sass';

const Modal = ({
  title, isOpen, onCancel, image, children, label,
}) => {
  return (
    <>
      {isOpen && (
        <Portal>
          <div className="modal-overlay">
            <div className="modal-window">
              <div className="modal-window__header">
                {image && <img src={image} alt="undraw-process" className="modal-window__header-img" />}
              </div>
              <div className="modal-window__body">
                <p className="modal-window__title">{title}</p>
                {children}
              </div>
              <div className="modal-window__footer">
                <Button onClick={onCancel}>{label}</Button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};
Modal.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
  label: PropTypes.string,
};
Modal.defaultProps = {
  title: '',
  isOpen: false,
  onCancel: () => {},
  onSubmit: () => {},
  children: null,
  label: 'submit',
};
export default Modal;
