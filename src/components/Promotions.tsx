import { Card, CardContent } from '../components/ui/card'
import { Button } from '@/components/ui/button'
import { Gift, Percent, Truck, Star } from 'lucide-react'

const promotions = [
  {
    id: 1,
    title: "Variedad",
    subtitle: "Amplio catálogo",
    description: "Perfumes para todos los gustos",
    icon: Gift,
    color: "from-primary to-primary/80",
    textColor: "text-white"
  },
  {
    id: 2,
    title: "Envío Gratis",
    subtitle: "A todo el país",
    description: "En compras mayores a $50.000",
    icon: Truck,
    color: "from-accent to-accent/80",
    textColor: "text-white"
  },
  {
    id: 3,
    title: "Calidad",
    subtitle: "100% Originales",
    description: "Garantía de autenticidad",
    icon: Star,
    color: "from-purple-600 to-purple-800",
    textColor: "text-white"
  }
]

const Promotions = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background to-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
            <span className="text-foreground">Nuestros</span>{' '}
            <span className="text-primary">Beneficios</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprá con confianza y aprovechá todas nuestras ventajas exclusivas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promotions.map((promo, index) => {
            const IconComponent = promo.icon
            return (
              <Card 
                key={promo.id} 
                className={`group relative overflow-hidden border-0 hover:scale-105 transition-all duration-500 animate-fade-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${promo.color} opacity-90`}></div>
                <CardContent className="relative z-10 p-8 text-center">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className={`h-8 w-8 ${promo.textColor}`} />
                    </div>
                    <h3 className={`text-2xl font-playfair font-bold ${promo.textColor} mb-2`}>
                      {promo.title}
                    </h3>
                    <p className={`text-lg font-semibold ${promo.textColor} opacity-90 mb-3`}>
                      {promo.subtitle}
                    </p>
                    <p className={`${promo.textColor} opacity-80`}>
                      {promo.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Promotions
