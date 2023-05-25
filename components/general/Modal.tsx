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
      className="fixed inset-0 flex items-center justify-center bg-gray-500 
      bg-opacity-50 transition-opacity duration-300 z-30"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-4 relative transition-transform duration-300 transform
        flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="self-end" onClick={onClose}>
          <CrossIcon className="text-gray-700" />
        </button>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
