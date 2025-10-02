import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import "./Modal.css";

const Modal = ({ show, title, onClose, children }: any) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (show) {
      lastFocusedElement.current = document.activeElement as HTMLElement;

      // Find focusable elements
      const focusableEls = modalRef.current?.querySelectorAll<
        | HTMLButtonElement
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLAnchorElement
      >(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstEl = focusableEls?.[0];
      const lastEl = focusableEls?.[focusableEls.length - 1];
      console.log(firstEl);
      // Focus first element
      firstEl?.focus();

      const handleKeyEvent = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstEl) {
            e.preventDefault();
            lastEl?.focus();
          } else if (!e.shiftKey && document.activeElement === lastEl) {
            e.preventDefault();
            firstEl?.focus();
          }
        }
        if (e.key === "Escape") onClose();
      };

      if (show) document.addEventListener("keydown", handleKeyEvent);
      return () => document.removeEventListener("keydown", handleKeyEvent);
    } else {
      lastFocusedElement.current?.focus();
    }
  }, [show, onClose]);

  if (!show) {
    return null;
  }
  return createPortal(
    <>
      <div className="modal-container" onClick={() => onClose()}></div>
      <div
        ref={modalRef}
        className={`modal-wrapper ${show ? "active" : ""}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={() => onClose()}>
            X
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </>,

    document.body
  );
};

export default Modal;
