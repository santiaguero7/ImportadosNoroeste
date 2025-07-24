import React from 'react';
import { createPortal } from 'react-dom';
import { Button } from './button';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WHATSAPP_NUMBERS = {
  sgo: '5493855847781',
  cba: '5493855982298',
};

const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#18181b] border border-gray-700 rounded-xl shadow-2xl max-w-xs w-full relative p-8 flex flex-col items-center" onClick={e => e.stopPropagation()}>
        <h2 className="text-lg font-bold text-white mb-6 text-center">¿En dónde deseas comprar?</h2>
        <div className="flex flex-col gap-4 w-full">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBERS.sgo}?text=Hola!%20Quiero%20hacer%20una%20consulta%20sobre%20perfumes.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg text-lg shadow-md">Santiago del Estero</Button>
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBERS.cba}?text=Hola!%20Quiero%20hacer%20una%20consulta%20sobre%20perfumes.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg text-lg shadow-md">Córdoba</Button>
          </a>
        </div>
        <Button onClick={onClose} variant="ghost" className="mt-6 text-gray-400 hover:text-white">Cerrar</Button>
      </div>
    </div>,
    document.body
  );
};

export default WhatsAppModal;
