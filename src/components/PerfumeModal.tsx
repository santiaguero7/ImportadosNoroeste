'use client'

import { Button } from '@/components/ui/button'
// import SimpleToast from '@/components/ui/SimpleToast'
import { X, Heart, ShoppingCart, MessageCircle } from 'lucide-react'
import { Perfume } from '@/lib/supabase'
import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'

interface PerfumeModalProps {
  perfume: Perfume | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: (perfume: Perfume) => void
}

const PerfumeModal = ({ perfume, isOpen, onClose, onAddToCart }: PerfumeModalProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const [quantity, setQuantity] = useState(1)
  // Eliminar Toast, si quieres notificación usa SimpleToast
  const { dispatch } = useCart()

  if (!isOpen || !perfume) return null

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(perfume)
    }
    // Aquí podrías usar setToast de Catalog si quieres notificación global
    onClose()
  }

  const handleBuy = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491112345678'
    const message = encodeURIComponent(
      `Hola, quiero comprar ${quantity} unidad(es) del perfume ${perfume.name} que vi en tu página web. ¿Está disponible?`
    )
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }

  const getFragranceType = (category: string) => {
    switch (category) {
      case 'hombre': return 'Amaderado'
      case 'mujer': return 'Floral'
      default: return 'Fresco'
    }
  }

  const getFragranceDetails = (category: string) => {
    switch (category) {
      case 'hombre':
        return {
          notas: 'Cedro, Sándalo, Bergamota',
          descripcion: 'Una fragancia masculina y sofisticada con toques amaderados que evocan elegancia y fuerza.'
        }
      case 'mujer':
        return {
          notas: 'Rosa, Jazmín, Vainilla',
          descripcion: 'Una fragancia femenina y delicada con notas florales que expresan sensualidad y romance.'
        }
      default:
        return {
          notas: 'Cítricos, Menta, Marino',
          descripcion: 'Una fragancia fresca y versátil que combina notas cítricas con toques marinos.'
        }
    }
  }

  const details = getFragranceDetails(perfume.category)

  return (
    <>
      {/* Eliminar Toast, si quieres notificación usa SimpleToast */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
      <div
        className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-600/20 rounded-xl max-w-lg w-full overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-300 hover:bg-amber-300/10"
        >
          <X className="h-6 w-6" />
        </Button>
        {/* Image */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f]">
          <div className="aspect-[4/3] relative">
            <img
              src={perfume.image_url.includes('unsplash') ? 
                perfume.image_url.replace(/w=\d+&h=\d+/, 'w=1200&h=1200').replace(/fit=crop/, 'fit=crop&q=90') : 
                perfume.image_url
              }
              alt={perfume.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg"
              }}
            />
            {/* Stock Badge */}
            {perfume.quantity && perfume.quantity < 5 && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-red-500/80 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                ¡Últimas unidades!
              </div>
            )}
          </div>
        </div>
        {/* Content */}
        <div className="p-6">
          <div className="mb-2 flex gap-2 items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wide">{perfume.brand}</span>
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wide px-2 py-1 bg-amber-300/10 rounded-full border border-amber-300/30">{perfume.category === 'mujer' ? 'Mujer' : perfume.category === 'hombre' ? 'Hombre' : 'Unisex'}</span>
          </div>
          <h2 className="text-lg font-bold text-white mb-2">
            {perfume.name}
          </h2>
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-sm">
              {perfume.essence || getFragranceType(perfume.category)}
            </p>
            <p className="text-amber-300 text-sm font-medium">
              {perfume.size}
            </p>
          </div>
          <p className="text-gray-300 text-sm mb-4">
            {perfume.description}
          </p>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xl font-bold text-amber-300">
              ${perfume.price.toLocaleString()}
            </p>
            <p className="text-gray-500 text-sm">
              Stock: {perfume.quantity || 0}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              className="flex-1 bg-[#23232a] text-white font-bold hover:bg-amber-400 hover:text-black transition-colors duration-200 cursor-pointer"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Agregar al carrito
            </Button>
           
          </div>
        </div>
      </div>
      </div>
    </>
  )
};

export default PerfumeModal
