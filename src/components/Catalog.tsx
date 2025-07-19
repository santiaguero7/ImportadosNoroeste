import PerfumeCard from "@/components/PerfumeCard";
import FilterSidebar from "@/components/FilterSidebar";
import { Button } from "@/components/ui/button";
import { Filter, Loader2 } from "lucide-react";
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
    <section className="py-16 bg-[#080808]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 uppercase">
            <span className="text-white">NUESTRO</span> <span className="text-amber-300">CATÁLOGO</span>
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto">
            Descubre nuestra selección cuidadosamente elegida de las fragancias más exclusivas y populares
          </p>
        </div>

        {/* Filter Sidebar (optional, keep if needed) */}
        <div className="flex gap-8">
          <div className="hidden lg:block min-w-[260px] -ml-4">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
            />
          </div>

          <div className="flex-1">
            {/* Filter Toggle Button (Mobile) */}
            <div className="lg:hidden mb-6">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full sm:w-auto border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-black font-bold"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>

            {/* Results Info */}
            <div className="mb-6">
              <p className="text-gray-400">
                {loading ? 'Cargando...' : `${perfumes.length} perfumes encontrados`}
              </p>
            </div>

            {/* Perfumes Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-amber-300" />
              </div>
            ) : perfumes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {perfumes.map((perfume) => (
                  <PerfumeCard key={perfume.id} perfume={perfume} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">
                  No se encontraron perfumes con los filtros seleccionados
                </p>
                <Button
                  variant="outline"
                  onClick={() => setFilters({ category: '', minPrice: 0, maxPrice: 999999, search: '' })}
                  className="mt-4 border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-black font-bold"
                >
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
