import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

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
      setPrevSlide(currentSlide);
      setDirection('right');
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [currentSlide, slides.length]);

  const nextSlide = () => {
    setPrevSlide(currentSlide);
    setDirection('right');
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlideFn = () => {
    setPrevSlide(currentSlide);
    setDirection('left');
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Fondo negro con grid de puntos blancos y opacidad (estático) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#000000",
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.2) 1.5px, transparent 1.5px)`,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0",
          opacity: 0.6,
        }}
      />
      {/* Overlay oscuro (estático) */}
      <div className="absolute inset-0 bg-black/20 z-20" />

      {/* Slide animado */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-800 ease-in-out ${
            index === currentSlide ? "translate-x-0" : 
            index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <div className="relative h-full">
            {slide.image && (
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover opacity-20 z-0 pointer-events-none"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div className="max-w-4xl mx-auto px-4 animate-fade-in">
                <h2 className="text-amber-300 text-lg md:text-xl font-medium mb-2" style={{ fontFamily: 'Libre Bodoni, serif' }}>
                  {slide.subtitle}
                </h2>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 uppercase whitespace-nowrap" style={{ fontFamily: 'Libre Bodoni, serif' }}>
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Libre Bodoni, serif' }}>
                  {slide.description}
                </p>
                <Button
                  size="lg"
                  className="bg-transparent border border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-black font-semibold px-8 py-3 text-lg rounded-lg transition-all duration-300"
                  style={{ minWidth: 160 }}
                  onClick={() => {
                    const catalogSection = document.getElementById('catalog');
                    catalogSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {slide.cta}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-300 hover:bg-amber-600/20 h-12 w-12 transition-all duration-300 z-40 border border-amber-300/20 hover:border-amber-300/40"
        onClick={prevSlideFn}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-300 hover:bg-amber-600/20 h-12 w-12 transition-all duration-300 z-40 border border-amber-300/20 hover:border-amber-300/40"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-amber-300" : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => {
              setPrevSlide(currentSlide);
              setDirection('left');
              setCurrentSlide(index);
            }}
          />
        ))}
      </div>
    </div>
  )
};

export default HeroCarousel;
