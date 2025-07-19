'use client'

import { Search, Menu, ShoppingBag, User, Heart, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface NavbarProps {
  onSearch: (query: string) => void
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isVisible, setIsVisible] = useState(true)

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <nav className={`fixed top-0 w-full z-50 bg-gradient-to-r from-gray-900/20 via-gray-800/10 to-gray-900/20 backdrop-blur-sm border-b border-amber-300/10 transition-all duration-300 ${isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'}`} style={{ fontFamily: 'Libre Bodoni, serif', textTransform: 'uppercase' }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="relative flex items-center justify-center w-12 h-12" aria-label="Inicio">
              <span className="absolute inset-0 rounded-full bg-amber-300/30 border-2 border-amber-300"></span>
              <span className="relative z-10 text-xl font-bold text-amber-300 font-playfair">NI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" style={{ fontFamily: 'Libre Bodoni, serif', textTransform: 'uppercase' }}>
            <Link href="/?category=perfumes" className="text-white text-sm md:text-base transition-colors duration-200 border-b border-transparent hover:border-amber-300 pb-1 font-medium mt-2">
              Perfumes
            </Link>
            <Link href="/?category=marcas" className="text-white text-sm md:text-base transition-colors duration-200 border-b border-transparent hover:border-amber-300 pb-1 font-medium mt-2">
              Marcas
            </Link>
            <Link href="/?category=hombre" className="text-white text-sm md:text-base transition-colors duration-200 border-b border-transparent hover:border-amber-300 pb-1 font-medium mt-2">
              Hombre
            </Link>
            <Link href="/?category=mujer" className="text-white text-sm md:text-base transition-colors duration-200 border-b border-transparent hover:border-amber-300 pb-1 font-medium mt-2">
              Mujer
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-8" style={{ textTransform: 'none' }}>
            <form onSubmit={handleSearch} className="relative w-full group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white group-focus-within:text-amber-300 h-4 w-4 transition-colors duration-200" />
              <Input
                type="text"
                placeholder="BUSCAR..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/30 border border-gray-400 text-gray-200 placeholder-gray-400 focus:border-amber-300 focus:outline-none focus:ring-0 transition-all duration-200 rounded-lg"
                style={{ boxShadow: 'none', fontFamily: 'Libre Bodoni, serif', textTransform: 'none' }}
              />
            </form>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-amber-300 hover:bg-amber-300/10 transition-all duration-300 lg:hidden border border-gray-400 hover:border-amber-300">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-amber-300 hover:bg-amber-300/10 transition-all duration-300 hover:scale-110 border border-gray-400 hover:border-amber-300">
              <Heart className="h-5 w-5" />
            </Button>
            <Link href="/admin">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-amber-300 hover:bg-amber-300/10 transition-all duration-300 hover:scale-110 border border-gray-400 hover:border-amber-300">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-amber-300 hover:bg-amber-300/10 transition-all duration-300 hover:scale-110 relative border border-gray-400 hover:border-amber-300">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-amber-300 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold" style={{ textTransform: 'none' }}>
                0
              </span>
            </Button>
            
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
              <Link href="/?category=perfumes" className="block px-3 py-2 text-gray-200 hover:text-amber-300 hover:bg-amber-300/10 transition-all duration-300 rounded-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                Perfumes
              </Link>
              <Link href="/?category=marcas" className="block px-3 py-2 text-gray-200 hover:text-amber-300 hover:bg-amber-300/10 transition-all duration-300 rounded-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                Marcas
              </Link>
              <Link href="/?category=hombre" className="block px-3 py-2 text-gray-200 hover:text-amber-300 hover:bg-amber-300/10 transition-all duration-300 rounded-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                Hombre
              </Link>
              <Link href="/?category=mujer" className="block px-3 py-2 text-gray-200 hover:text-amber-300 hover:bg-amber-300/10 transition-all duration-300 rounded-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                Mujer
              </Link>
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
