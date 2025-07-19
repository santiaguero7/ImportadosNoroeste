import { Button } from '@/components/ui/button'
import { ArrowRight, Star } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-secondary/50"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-float opacity-70"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-accent rounded-full animate-float opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-primary/70 rounded-full animate-float opacity-80" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-primary rounded-full animate-float opacity-60" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-60 right-1/3 w-1.5 h-1.5 bg-accent/70 rounded-full animate-float opacity-50" style={{ animationDelay: '4s' }}></div>
        
        {/* Gradient circles */}
        <div className="absolute top-32 right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse opacity-30"></div>
        <div className="absolute bottom-32 left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse opacity-20" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <div className="flex items-center justify-center mb-6 hero-badge">
            <Star className="h-6 w-6 text-primary mr-2 animate-pulse" />
            <span className="text-primary font-medium tracking-wider uppercase text-sm">
              Perfumes Importados
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 leading-tight hero-title">
            <span className="text-primary block animate-glow">Los Mejores</span>
            <span className="text-foreground">Perfumes</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed hero-description">
            Encontrá tu fragancia perfecta en nuestra colección de perfumes importados
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center hero-buttons">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg glow transition-all duration-500 hover:scale-110 hover:shadow-2xl transform group"
              onClick={() => {
                const catalogSection = document.getElementById('catalog')
                catalogSection?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span className="group-hover:mr-3 transition-all duration-300">Ver Catálogo</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary/30 text-foreground hover:bg-primary/20 hover:border-primary/50 px-8 py-6 text-lg transition-all duration-500 hover:scale-105 hover:shadow-lg transform backdrop-blur-sm"
              onClick={() => {
                const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491112345678'
                const message = encodeURIComponent('Hola, quiero consultar sobre sus perfumes importados')
                window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
              }}
            >
              Consultar
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
