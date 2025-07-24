import React, { useRef, useEffect, useState } from 'react';
import { Button } from './button';

interface WhatsAppPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  direction?: 'up' | 'down';
  customMessage?: string;
}

const WHATSAPP_NUMBERS = {
  sgo: '5493855847781',
  cba: '5493855982298',
};

const WhatsAppPopover: React.FC<WhatsAppPopoverProps> = ({ isOpen, onClose, anchorEl, direction, customMessage }) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  // Calculate position immediately when needed
  const getPosition = () => {
    if (!anchorEl) return null;
    const rect = anchorEl.getBoundingClientRect();
    return {
      top: (typeof direction === 'undefined' || direction === 'down')
        ? rect.bottom + window.scrollY + 8
        : rect.top + window.scrollY - 8,
      left: rect.left + window.scrollX + rect.width / 2,
    };
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !anchorEl) return null;
  
  const position = getPosition();
  if (!position) return null;
  
  const translateY = (typeof direction === 'undefined' || direction === 'down') ? '0' : '-100%';
  
  return (
    <div
      ref={popoverRef}
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        transform: `translate(-50%, ${translateY})`,
        zIndex: 9999,
      }}
      className="bg-[#070707] border border-[#23232a] rounded-xl max-w-xs w-72 p-6 flex flex-col items-center"
    >
      <h2 className="text-lg font-bold text-white mb-6 text-center">¿En dónde deseas comprar?</h2>
      <div className="flex flex-col gap-4 w-full">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBERS.sgo}?text=${encodeURIComponent(customMessage || 'Hola! Estoy buscando una fragancia especial. ¿Podrían ayudarme?')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button className="w-full bg-green-800 hover:bg-green-700 text-white font-bold py-3 rounded-lg text-lg shadow-md cursor-pointer">Santiago del Estero</Button>
        </a>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBERS.cba}?text=${encodeURIComponent(customMessage || 'Hola! Estoy buscando una fragancia especial. ¿Podrían ayudarme?')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button className="w-full bg-green-800 hover:bg-green-700 text-white font-bold py-3 rounded-lg text-lg shadow-md cursor-pointer">Córdoba</Button>
        </a>
      </div>
      <Button onClick={onClose} variant="ghost" className="mt-6 text-gray-400 hover:text-white cursor-pointer">Cerrar</Button>
    </div>
  );
};

export default WhatsAppPopover;
