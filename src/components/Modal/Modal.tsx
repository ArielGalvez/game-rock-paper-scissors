import React, { useEffect, useState } from "react";
import iconClose from "/images/icon-close.svg";
import ReactDOM from "react-dom";
import "./Modal.css";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={handleClick}>
        <button onClick={onClose}>
          <img src={iconClose} alt="close" />
        </button>
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
