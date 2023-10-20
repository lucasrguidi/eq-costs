import React from 'react';
import { ModalOverlay, ModalBody, ModalHeader } from './styles';
import { AiOutlineClose } from 'react-icons/ai';

function Modal({ title, setModal, children }) {
  const closeModal = (event) => {
    if (event.target.id === 'modal-overlay') setModal(false);
  };

  return (
    <ModalOverlay id='modal-overlay' onMouseDown={closeModal}>
      <ModalBody>
        <ModalHeader>
          {title}
          <AiOutlineClose style={{ cursor: 'pointer' }} onClick={() => setModal(false)} />
        </ModalHeader>
        {children}
      </ModalBody>
    </ModalOverlay>
  );
}

export default Modal;
