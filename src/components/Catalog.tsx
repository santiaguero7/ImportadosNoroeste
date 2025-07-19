import PerfumeCard from "@/components/PerfumeCard";
import FilterSidebar from "@/components/FilterSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Loader2, Search } from "lucide-react";
import { Perfume } from "@/lib/supabase";

interface CatalogProps {
  perfumes: Perfume[];
  loading: boolean;
  filters: any;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  handleFilterChange: (newFilters: any) => void;
  setFilters: (filters: any) => void;
}

const Catalog: React.FC<CatalogProps> = ({
  perfumes,
  loading,
  filters,
  showFilters,
  setShowFilters,
  handleFilterChange,
  setFilters,
}) => {
  return (
    <section id="catalog" className="py-16 sm:py-20 lg:py-24 bg-[#070707] min-h-screen">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        {/* Title Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-3 sm:mb-4 uppercase">
            <span className="text-white">NUESTRO</span> <span className="text-amber-300">CATÁLOGO</span>
          </h2>
          <p className="text-white text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4 mb-8">
            Descubre nuestra selección cuidadosamente elegida de las fragancias más exclusivas y populares
          </p>
          
          {/* Filter Button and Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto px-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black font-bold text-sm sm:text-base px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            
            <div className="flex-1 w-full sm:max-w-md">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-amber-300 h-4 w-4 transition-colors duration-200" />
                <Input
                  type="text"
                  placeholder="Buscar perfumes..."
                  value={filters.search || ''}
                  onChange={(e) => handleFilterChange({ ...filters, search: e.target.value })}
                  className="pl-10 bg-black/30 border border-gray-400 text-gray-200 placeholder-gray-400 focus:border-amber-300 focus:outline-none focus:ring-0 transition-all duration-200 rounded-xl py-3"
                  style={{ boxShadow: 'none', fontFamily: 'Libre Bodoni, serif' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Modal */}
        {showFilters && (
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowFilters(false);
            }}
          >
            <div
              className="bg-[#0d101a] border border-[#23232a] rounded-xl max-w-md w-full"
              style={{ maxHeight: 'calc(100vh - 48px)', overflow: 'visible' }}
              onClick={e => e.stopPropagation()}
            >
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                isOpen={showFilters}
                onClose={() => setShowFilters(false)}
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="relative w-full">
          {/* Products Section - Centered */}

          {/* Products Section - Centered */}
          <div className="w-full flex flex-col items-center justify-center min-h-[900px] pt-16 pb-16">
            {/* Espacio extra arriba, sin mensaje de resultados */}

            {/* Products Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-16 sm:py-20">
                <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-amber-400" />
              </div>
            ) : perfumes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto px-4">
                {perfumes.map((perfume) => (
                  <PerfumeCard key={perfume.id} perfume={perfume} />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-20 sm:py-32 w-full">
                <div className="text-center max-w-lg mx-auto">
                  <h3 className="text-xl sm:text-2xl font-bold text-amber-300 mb-4 font-playfair">
                    No encontramos perfumes
                  </h3>
                  <p className="text-gray-400 text-base sm:text-lg mb-8 leading-relaxed">
                    No se encontraron perfumes que coincidan con los filtros seleccionados. 
                    Intenta ajustar los criterios de búsqueda.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setFilters({ category: '', minPrice: 0, maxPrice: 999999, search: '' })}
                    className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black font-bold text-base px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    Limpiar filtros
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
