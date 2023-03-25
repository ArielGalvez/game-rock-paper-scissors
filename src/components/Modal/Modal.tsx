import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose}>x</button>
        {children}
      </div>
    </div>
  );
};

export interface ModalPortalProps extends ModalProps {
  isOpen: boolean;
}

export const ModalPortal: React.FC<ModalPortalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const [container, setContainer] = useState<Element>();

  useEffect(() => {
    setContainer(document.createElement("div"));
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.appendChild(container!);
      document.body.style.overflow = "hidden";
    } else if (container && document.body.contains(container)) {
      document.body.removeChild(container);
      document.body.style.overflow = "auto";
    }
    return () => {
      if (container && document.body.contains(container)) {
        document.body.removeChild(container);
        document.body.style.overflow = "auto";
      }
    };
  }, [isOpen, container]);

  if (!container) {
    return null;
  }

  return ReactDOM.createPortal(
    <Modal onClose={onClose}>{children}</Modal>,
    container
  );
};
