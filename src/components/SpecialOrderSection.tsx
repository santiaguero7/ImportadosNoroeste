'use client'

import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'

export default function SpecialOrderSection() {
  const handleWhatsAppClick = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491112345678'
    const message = encodeURIComponent(
      '¡Hola! Estoy buscando una fragancia en especial que no encontré en el catálogo. ¿Podrían ayudarme a conseguirla?'
    )
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  return (
    <section className="py-8 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-amber-300/10 to-amber-400/5 border border-amber-300/20 rounded-2xl p-8 text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                ¿Buscas algo en especial?
              </h3>
              <p className="text-gray-300 text-lg">
                No dudes en hablarnos. Te lo traemos en 10 días.
              </p>
            </div>
            
            <Button
              onClick={handleWhatsAppClick}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Consultar por WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
