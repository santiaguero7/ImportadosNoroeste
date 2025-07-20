import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "NOROESTE IMPORTADOS",
      subtitle: "Fragancias Exclusivas",
      description: "Hace tu pedido de tu fragancia favorita y recibila en la puerta de tu casa",
      image: "",
      cta: "Ver Catálogo"
    },
    {
      id: 2,
      title: "Perfumes de Lujo",
      subtitle: "Pedidos únicos",
      description: "Las mejores marcas internacionales al mejor precio.",
      image: "/perfume.png.webp",
      cta: "Explorar"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000); // Más tiempo entre transiciones

    return () => clearInterval(timer);
  }, [slides.length]); // Removí currentSlide de dependencies

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlideFn = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Fondo estático con puntos - una sola vez */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "#000000",
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.2) 1.5px, transparent 1.5px)`,
          backgroundSize: "30px 30px",
          opacity: 0.6,
        }}
      />

      {/* Container para slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-300 ease-out ${
              index === currentSlide 
                ? "translate-x-0" 
                : index < currentSlide 
                  ? "-translate-x-full" 
                  : "translate-x-full"
            }`}
            style={{
              willChange: index === currentSlide || Math.abs(index - currentSlide) === 1 ? 'transform' : 'auto'
            }}
          >
            {/* Imagen de fondo si existe - optimizada */}
            {slide.image && (
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            )}
            
            {/* Contenido principal */}
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-amber-300 text-lg md:text-xl font-medium mb-2" style={{ fontFamily: 'Libre Bodoni, serif' }}>
                  {slide.subtitle}
                </h2>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 uppercase whitespace-nowrap" style={{ fontFamily: 'Libre Bodoni, serif' }}>
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Libre Bodoni, serif' }}>
                  {slide.description}
                </p>
                <a
                  href="#catalog"
                  className="inline-block bg-transparent border-2 border-amber-300 text-amber-300 hover:bg-amber-300/10 hover:text-amber-200 font-semibold px-8 py-3 text-lg rounded-lg transition-all duration-200 transform hover:scale-102 no-underline"
                  style={{ 
                    minWidth: 160,
                    fontFamily: 'Libre Bodoni, serif'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {slide.cta}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-300 hover:bg-amber-600/20 h-12 w-12 transition-all duration-300 z-20 border border-amber-300/20 hover:border-amber-300/40"
        onClick={prevSlideFn}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-300 hover:bg-amber-600/20 h-12 w-12 transition-all duration-300 z-20 border border-amber-300/20 hover:border-amber-300/40"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-amber-300" : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => {
              setCurrentSlide(index);
            }}
          />
        ))}
      </div>
    </div>
  )
};

export default HeroCarousel;