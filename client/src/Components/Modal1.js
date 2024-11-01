import React, { useEffect } from 'react';
import Lottie from 'react-lottie';
import './Modal.css';
import Key from '../Asserts/Key.json';

const Modal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); 

      return () => clearTimeout(timer); 
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Key,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Your Text is Encrypting</h2>
        <Lottie options={defaultOptions} height={100} width={100} />
      </div>
    </div>
  );
};

export default Modal;
