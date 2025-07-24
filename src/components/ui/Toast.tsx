import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
  x?: number;
  y?: number;
}

const Toast: React.FC<ToastProps> = ({ message, show, onClose, x = 20, y = 20 }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;
  
  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: `${y}px`, 
        left: `${x}px`, 
        zIndex: 999999,
        maxWidth: '350px',
        pointerEvents: 'auto'
      }}
    >
      <div className="bg-[#18181b] border border-amber-400 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-fade-in font-playfair text-base">
        <div className="flex items-center gap-2">
          <span className="text-green-400 text-lg">✓</span>
          <span>{message}</span>
        </div>
        <button 
          onClick={onClose} 
          className="ml-4 text-amber-400 hover:text-amber-300 font-bold text-lg cursor-pointer transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
