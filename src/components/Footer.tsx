import { Instagram, Heart, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import WhatsAppPopover from '@/components/ui/WhatsAppPopover'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const [showWhatsAppPopover, setShowWhatsAppPopover] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);
  const socialLinks = [
    {
      name: 'Instagram',
      icon: <Instagram size={20} />,
      url: 'https://instagram.com',
      onClick: undefined
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={20} />,
      url: undefined,
      onClick: (e: any) => {
        setPopoverAnchor(e.currentTarget);
        setShowWhatsAppPopover(true);
      }
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-t from-[#090909] to-[#070707] border-t border-[#23232a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo/Name */}
          <div className="text-center md:text-left">
            <button 
              onClick={scrollToTop}
              className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-400 to-gray-300 bg-clip-text text-transparent hover:opacity-80 transition-opacity font-playfair"
            >
              Importados Noroeste
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 sm:space-x-6">
            {socialLinks.map((link) => (
              link.url ? (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 hover:text-amber-400 transition-all duration-300 p-2 sm:p-3 rounded-lg hover:bg-amber-300/10 hover:scale-110"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ) : (
                <button
                  key={link.name}
                  onClick={link.onClick}
                  className="text-amber-300 hover:text-amber-400 transition-all duration-300 p-2 sm:p-3 rounded-lg hover:bg-amber-300/10 hover:scale-110 cursor-pointer"
                  aria-label={link.name}
                >
                  {link.icon}
                </button>
              )
            ))}
            <WhatsAppPopover 
              isOpen={showWhatsAppPopover} 
              onClose={() => setShowWhatsAppPopover(false)} 
              anchorEl={popoverAnchor} 
              direction="up" 
              customMessage="Hola! Me interesa conocer más sobre sus fragancias. ¿Podrían ayudarme?"
            />
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm font-playfair">
              © {currentYear} Importados Noroeste
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Todos los derechos reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer
