'use client'

import { useState } from 'react'
import { useCart } from '../../contexts/CartContext'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const { state, dispatch } = useCart()
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  })

  const updateQuantity = (perfumeId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', perfumeId })
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', perfumeId: perfumeId, quantity: newQuantity })
    }
  }

  const removeItem = (perfumeId: number) => {
    dispatch({ type: 'REMOVE_ITEM', perfumeId })
  }

  const generateWhatsAppMessage = () => {
    let message = `🛍️ *PEDIDO DE IMPORTADOS NOROESTE*\n\n`
    message += `👤 *Cliente:* ${customerInfo.name}\n`
    message += `📱 *Teléfono:* ${customerInfo.phone}\n`
    message += `📍 *Dirección:* ${customerInfo.address}\n\n`
    message += `🛒 *PRODUCTOS:*\n`
    
    state.items.forEach((item, index) => {
      message += `${index + 1}. *${item.perfume.name}*\n`
      message += `   Marca: ${item.perfume.brand}\n`
      message += `   Tamaño: ${item.perfume.size}\n`
      message += `   Precio: $${item.perfume.price.toLocaleString()}\n`
      message += `   Cantidad: ${item.quantity}\n`
      message += `   Subtotal: $${(item.perfume.price * item.quantity).toLocaleString()}\n\n`
    })
    
    message += `💰 *TOTAL: $${state.total.toLocaleString()}*\n\n`
    message += `¡Gracias por tu compra! 🙏`
    
    return encodeURIComponent(message)
  }

  const handleWhatsAppOrder = () => {
    if (!customerInfo.name || !customerInfo.phone) {
      alert('Por favor completa tu nombre y teléfono')
      return
    }
    
    const message = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/5491234567890?text=${message}` // Reemplazar con tu número
    window.open(whatsappUrl, '_blank')
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center py-16">
            <ShoppingCart className="mx-auto h-24 w-24 text-gray-400 mb-8" />
            <h1 className="text-3xl font-bold text-white mb-4">Tu carrito está vacío</h1>
            <p className="text-gray-400 mb-8">Agrega algunos perfumes increíbles a tu carrito</p>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continuar comprando
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-playfair font-bold text-gradient">
            🛒 Tu Carrito
          </h1>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continuar comprando
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items del carrito */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Productos en tu carrito</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.perfume.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {item.perfume.image_url ? (
                        <Image 
                          src={item.perfume.image_url} 
                          alt={item.perfume.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">Sin imagen</span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{item.perfume.name}</h3>
                      <p className="text-sm text-gray-400">{item.perfume.brand} - {item.perfume.size}</p>
                      <p className="text-amber-300 font-bold">${item.perfume.price.toLocaleString()}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.perfume.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-12 text-center text-white">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.perfume.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-white">
                        ${(item.perfume.price * item.quantity).toLocaleString()}
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeItem(item.perfume.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Resumen y checkout */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumen del pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Productos ({state.items.reduce((acc, item) => acc + item.quantity, 0)})</span>
                    <span>${state.total.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-amber-300">${state.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <h3 className="font-semibold">Información de contacto</h3>
                  <Input
                    placeholder="Tu nombre completo"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    placeholder="Tu número de WhatsApp"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  />
                  <Input
                    placeholder="Tu dirección (opcional)"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleWhatsAppOrder}
                >
                  Comprar por WhatsApp 📱
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
