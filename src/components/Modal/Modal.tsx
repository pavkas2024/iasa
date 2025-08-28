'use client'

import React, { ReactNode, MouseEvent, useEffect } from 'react';
import styles from './Modal.module.css';

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<Props> = ({ children, onClose, isOpen }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const closeESC = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeESC);
    return () => window.removeEventListener('keydown', closeESC);
  }, [onClose]);

  const handleBackDropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) onClose();
  };

  return isOpen ? (
    <div className={styles.overlay} onClick={handleBackDropClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Закрити модальне вікно">
          &times;
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  ) : null;
};

export default Modal;
