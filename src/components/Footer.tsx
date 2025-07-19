import { Instagram, Heart, MessageCircle } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Instagram',
      icon: <Instagram size={20} />,
      url: 'https://instagram.com'
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={20} />,
      url: 'https://wa.me/5491112345678'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-t from-[#090909] to-[#070707] border-t border-[#23232a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[180px] flex items-center">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo/Name */}
          <div>
            <button 
              onClick={scrollToTop}
              className="text-xl md:text-2xl font-bold text-gradient hover:opacity-80 transition-opacity font-playfair"
            >
              IMPORTADOS NOROESTE
            </button>
           
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-500 transition-colors duration-200 p-2 glass rounded-lg hover:bg-yellow-400/10"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-muted-foreground text-xs md:text-sm font-playfair">
              © {currentYear} Importados Noroeste
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer
