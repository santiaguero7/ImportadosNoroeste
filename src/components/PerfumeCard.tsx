'use client'

import { Button } from '@/components/ui/button'
import { Heart, ShoppingCart } from 'lucide-react'
import { Perfume } from '@/lib/supabase'
import { useState } from 'react'

interface PerfumeCardProps {
  perfume: Perfume
  onOpenModal: (perfume: Perfume) => void
  onAddToCart: (perfume: Perfume, event?: React.MouseEvent) => void
}

const PerfumeCard = ({ perfume, onOpenModal, onAddToCart }: PerfumeCardProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const [added, setAdded] = useState(false)

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

  return (
    <div className="group relative w-full">
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl overflow-hidden border border-gray-600/20 hover:border-gray-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-800/20 w-full" onClick={() => onOpenModal(perfume)}>
          
          {/* Image */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f]">
            <div className="aspect-[5/3] relative">
              <img
                src={perfume.image_url}
                alt={perfume.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Wishlist Button */}
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
              onClick={(e) => {
                e.stopPropagation()
                toggleLike()
              }}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>

            {/* Stock Badge */}
            {perfume.quantity && perfume.quantity <= 2 && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-red-500/80 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                ¡Últimas unidades!
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="mb-2 flex gap-2 items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wide">{perfume.brand}</span>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wide px-2 py-1 bg-amber-300/10 rounded-full border border-amber-300/30">
                {perfume.category === 'mujer' ? 'Mujer' : perfume.category === 'hombre' ? 'Hombre' : 'Unisex'}
              </span>
            </div>

            <div className="mb-2">
              <h3 className="text-lg font-bold text-white group-hover:text-gray-200 transition-colors duration-300">
                {perfume.name}
              </h3>
              <p className="text-amber-300 text-sm font-medium">
                {perfume.size}
              </p>
            </div>

            <p className="text-gray-400 text-sm mb-4">
              {perfume.essence || getFragranceType(perfume.category)}
            </p>

            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xl font-bold text-amber-300">
                  ${perfume.price.toLocaleString()}
                </p>
                <p className="text-gray-500 text-sm">
                  Stock: {perfume.quantity || 0}
                </p>
              </div>
            </div>

            <div className="relative w-full">
              <Button
                className="w-full bg-[#23232a] text-white font-bold hover:bg-amber-400 hover:text-black transition-colors duration-200 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  onAddToCart(perfume, e)
                  setAdded(true)
                  setTimeout(() => setAdded(false), 1200)
                }}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Agregar al carrito
              </Button>
              {added && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#23232a] text-amber-400 px-3 py-1 rounded-xl shadow-lg text-xs font-bold z-20 transition-all duration-300 border border-amber-400">
                  Agregado
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
   
  )
}

export default PerfumeCard