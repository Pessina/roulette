import React, { FC, ReactNode, useEffect } from "react";

import { CrossIcon } from "./icons";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-background-700 
      bg-opacity-80 transition-opacity duration-300 z-50"
      onClick={onClose}
    >
      <div
        className="bg-background-500 rounded-lg shadow-lg p-4 relative transition-transform duration-300 transform
        flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="self-end" onClick={onClose}>
          <CrossIcon className="text-text-900" />
        </button>
        <div className="mt-2 text-text-100">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
