import { Sparkles, Gift, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Truck,
    title: "Envío Gratis",
    description: "En compras superiores a $50.000"
  },
  {
    icon: Shield,
    title: "Garantía 100%",
    description: "Productos originales garantizados"
  },
  {
    icon: Gift,
    title: "Muestras Gratis",
    description: "Con cada compra"
  },
  {
    icon: Sparkles,
    title: "Exclusividad",
    description: "Acceso a lanzamientos únicos"
  }
];

const PromoBanner = () => {
  return (
    <section className="py-20" style={{ background: '#090909', minHeight: '380px' }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-[#080808] rounded-2xl shadow-lg p-14 flex flex-col items-center justify-center min-h-[320px] md:min-h-[380px] transition-all duration-300 border border-[#23232a] hover:border-amber-300 hover:scale-[1.07] hover:bg-[#23232a]"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-300/10 rounded-full mb-4 group-hover:bg-amber-300/20 transition-colors duration-300">
                  <Icon className="h-8 w-8 text-amber-300 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-amber-300 group-hover:text-white transition-colors duration-300 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-white/80 text-sm group-hover:text-amber-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
