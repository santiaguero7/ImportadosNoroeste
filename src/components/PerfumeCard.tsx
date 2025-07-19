'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle } from 'lucide-react'
import { Perfume } from '@/lib/supabase'
import Image from 'next/image'
import { useState } from 'react'

interface PerfumeCardProps {
  perfume: Perfume
}

const PerfumeCard = ({ perfume }: PerfumeCardProps) => {
  const [isLiked, setIsLiked] = useState(false)
  
  const handleBuy = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491112345678'
    const message = encodeURIComponent(
      `Hola, quiero comprar el perfume ${perfume.name} que vi en tu página web. ¿Está disponible?`
    )
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <Card className="product-card group relative overflow-hidden border-border/50 bg-card">
      {/* Like button */}
      <button 
        onClick={toggleLike}
        className="absolute top-4 right-4 z-10 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
      >
        <Heart 
          className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
        />
      </button>

      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={perfume.image_url}
          alt={perfume.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <CardContent className="p-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              perfume.category === 'mujer' ? 'bg-pink-500/20 text-pink-400' :
              perfume.category === 'hombre' ? 'bg-blue-500/20 text-blue-400' :
              'bg-purple-500/20 text-purple-400'
            }`}>
              {perfume.category === 'mujer' ? 'Mujer' : 
               perfume.category === 'hombre' ? 'Hombre' : 'Unisex'}
            </span>
          </div>
          
          <h3 className="text-lg font-playfair font-semibold text-foreground line-clamp-2">
            {perfume.name}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {perfume.description}
          </p>
          
          <div className="text-xs text-muted-foreground mt-2">
            <span className="bg-muted/50 px-2 py-1 rounded">
              {perfume.category === 'hombre' ? 'Amaderado' : 
               perfume.category === 'mujer' ? 'Floral' : 'Fresco'}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gradient">
              ${perfume.price.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">
              Precio final
            </span>
          </div>
          
          <Button 
            onClick={handleBuy}
            className="btn-primary px-6 py-2"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Comprar
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default PerfumeCard
