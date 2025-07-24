import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 2147483647,
        maxWidth: 350,
        pointerEvents: 'auto',
      }}
    >
      <div className="bg-[#18181b] border border-amber-400 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-fade-in font-playfair text-base">
        <span className="text-green-400 text-lg">✓</span>
        <span>{message}</span>
      </div>
    </div>,
    document.body
  );
};

export default Toast;
