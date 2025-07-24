'use client'

import { Search, Menu, ShoppingBag, User, Heart, X, ShoppingCart } from 'lucide-react'
// Icono WhatsApp SVG minimalista y fino, igual al oficial
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" width={props.width || 26} height={props.height || 26} fill="none" {...props}>
    <path d="M16 3C9.373 3 4 8.373 4 15c0 2.65.87 5.1 2.36 7.1L4 29l7.18-2.32A12.93 12.93 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M21.13 18.37c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.25-1.36-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3s.99 2.66 1.13 2.85c.14.18 1.95 2.98 4.73 4.06.66.28 1.18.45 1.58.58.66.21 1.26.18 1.73.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33Z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'
import WhatsAppModal from '@/components/ui/WhatsAppModal'
import WhatsAppPopover from '@/components/ui/WhatsAppPopover'

interface NavbarProps {
  onSearch: (query: string) => void
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isVisible, setIsVisible] = useState(true)
  const [showWhatsAppPopover, setShowWhatsAppPopover] = useState(false)
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null)
  const { state } = useCart()

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      const catalogSection = document.getElementById('catalog');
      
      if (catalogSection) {
        const catalogTop = catalogSection.offsetTop - 100;
        
        if (currentScrollY > catalogTop) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, []);

  // Sincronizar búsqueda nav con catálogo y scrollear
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (window.location.pathname === '/') {
      onSearch(query); // Actualiza el filtro global del catálogo
      setTimeout(() => {
        const catalogSection = document.getElementById('catalog');
        if (catalogSection) {
          catalogSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Si no está en home, redirige con query y hash
      window.location.href = `/?search=${encodeURIComponent(query)}#catalog`;
    }
  }

  return (
    <nav className={`fixed top-0 w-full z-50 bg-gradient-to-r from-gray-900/20 via-gray-800/10 to-gray-900/20 backdrop-blur-sm border-b border-[#23232a] transition-all duration-300 ${isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'}`} style={{ fontFamily: 'Libre Bodoni, serif', textTransform: 'uppercase' }}>
      <div className="container mx-auto px-24 lg:px-32">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center" style={{ minWidth: '120px' }}>
            <Link href="/"
              className="flex items-center justify-center w-12 h-12 transition-transform duration-200 hover:scale-125 active:scale-125"
              aria-label="Inicio"
            >
              <span className="text-5xl font-bold text-amber-300 font-playfair">IN</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12" style={{ fontFamily: 'Libre Bodoni, serif', textTransform: 'uppercase' }}>
            <div className="flex items-center space-x-12 ml-20">
              <button 
                onClick={() => {
                  window.location.href = '/#catalog';
                }}
                className="text-white text-lg md:text-xl transition-colors duration-200 border-b border-transparent hover:border-amber-300 pb-1 font-medium mt-2 tracking-wider"
              >
                PERFUMES
              </button>
              <button 
                onClick={() => {
                  window.location.href = '/?category=hombre#catalog';
                }}
                className="text-white text-lg md:text-xl transition-colors duration-200 border-b border-transparent hover:border-amber-300 pb-1 font-medium mt-2 tracking-wider"
              >
                HOMBRE
              </button>
              <button 
                onClick={() => {
                  window.location.href = '/?category=mujer#catalog';
                }}
                className="text-white text-lg md:text-xl transition-colors duration-200 border-b border-transparent hover:border-amber-300 pb-1 font-medium mt-2 tracking-wider"
              >
                MUJER
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-8" style={{ textTransform: 'none' }}>
            <form onSubmit={handleSearch} className="relative w-full group max-w-xl ml-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white group-focus-within:text-amber-300 h-4 w-4 transition-colors duration-200" />
              <Input
                type="text"
                placeholder="BUSCAR..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/30 border border-gray-400 text-gray-200 placeholder-gray-400 focus:border-amber-300 focus:outline-none focus:ring-0 transition-all duration-200 rounded-lg w-full"
                style={{ boxShadow: 'none', fontFamily: 'Libre Bodoni, serif', textTransform: 'none' }}
              />
            </form>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-4 justify-center" style={{ minWidth: '120px' }}>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-amber-300 hover:bg-amber-300/10 transition-all duration-300 lg:hidden border border-gray-400 hover:border-amber-300">
              <Search className="h-5 w-5" />
            </Button>
            {/* WhatsApp Icon abre modal */}
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-amber-300 hover:bg-amber-300/10 transition-all duration-300 hover:scale-110 border border-gray-400 hover:border-amber-300 px-4 py-2 h-10 cursor-pointer"
              aria-label="WhatsApp"
              onClick={e => {
                setPopoverAnchor(e.currentTarget);
                setShowWhatsAppPopover(true);
              }}
            >
              <WhatsAppIcon />
            </Button>
            <WhatsAppPopover 
              isOpen={showWhatsAppPopover} 
              onClose={() => setShowWhatsAppPopover(false)} 
              anchorEl={popoverAnchor} 
              direction="down" 
              customMessage="Hola! Me interesa conocer más sobre sus fragancias. ¿Podrían ayudarme?"
            />
            <Link href="/cart">
              <Button variant="ghost" className="text-gray-300 hover:text-amber-300 hover:bg-amber-300/10 transition-all duration-300 hover:scale-110 relative border border-gray-400 hover:border-amber-300 px-4 py-2 h-10 cursor-pointer">
                <ShoppingCart className="h-6 w-6" />
                {state.items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-300 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold" style={{ textTransform: 'none' }}>
                    {state.items.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-amber-300 hover:text-amber-200 hover:bg-amber-300/10 transition-all duration-300 border border-amber-300/20 hover:border-amber-300/40"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-amber-300/10 bg-black/50 backdrop-blur-sm" style={{ fontFamily: 'Libre Bodoni, serif' }}>
            <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                window.location.href = '/#catalog';
              }}
              className="block w-full text-left px-3 py-2 text-gray-200 hover:text-amber-300 hover:bg-amber-300/10 transition-all duration-300 rounded-lg font-medium"
            >
              Perfumes
            </button>
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                window.location.href = '/?category=hombre#catalog';
              }}
              className="block w-full text-left px-3 py-2 text-gray-200 hover:text-amber-300 hover:bg-amber-300/10 transition-all duration-300 rounded-lg font-medium"
            >
              Hombre
            </button>
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                window.location.href = '/?category=mujer#catalog';
              }}
              className="block w-full text-left px-3 py-2 text-gray-200 hover:text-amber-300 hover:bg-amber-300/10 transition-all duration-300 rounded-lg font-medium"
            >
              Mujer
            </button>
              <div className="px-3 py-2">
                <form onSubmit={handleSearch}>
                  <Input
                    type="text"
                    placeholder="Buscar perfumes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-black/30 border-amber-300/20 text-gray-200 placeholder-amber-300/50 rounded-lg"
                  />
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
