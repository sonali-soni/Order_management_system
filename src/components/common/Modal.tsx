import React from 'react';
import Modal from 'react-modal';
import '../../styles/Modal.scss';

interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
  onSubmit: () => void;
  onCancel: () => void;
  isSubmitDisabled: boolean;
  children: React.ReactNode;
}

const rootElement = document.getElementById('root');

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onRequestClose,
  title,
  onSubmit,
  onCancel,
  isSubmitDisabled,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={title} appElement={rootElement ? rootElement : undefined}>
      <h2>{title}</h2>
      <div>{children}</div>
      <div className='button-section'>
        <button className="submit-btn" disabled={isSubmitDisabled} onClick={onSubmit}>
            Submit
        </button>
        <button className="cancel-btn" onClick={onCancel}>
            Cancel
        </button>
      </div>
    </Modal>
  );
};

export default React.memo(CustomModal);
