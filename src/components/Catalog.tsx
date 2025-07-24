import PerfumeCard from "@/components/PerfumeCard";
import PerfumeModal from "@/components/PerfumeModal";
import FilterSidebar from "@/components/FilterSidebar";

import { Button } from "@/components/ui/button";
import Toast from "@/components/ui/Toast";
import { Input } from "@/components/ui/input";
import { Filter, Loader2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Perfume } from "@/lib/supabase";
import { useState, useMemo } from "react";
import { useCart } from "@/contexts/CartContext";

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
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toast, setToast] = useState<{ show: boolean; message: string; x?: number; y?: number }>({ show: false, message: "" });

  const [currentPage, setCurrentPage] = useState(1)

  // Scroll al top del catálogo al cambiar de página
  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  const { dispatch } = useCart()

  const ITEMS_PER_PAGE = 12

  // Calcular perfumes para la página actual
  const paginatedPerfumes = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return perfumes.slice(startIndex, endIndex)
  }, [perfumes, currentPage])

  const totalPages = Math.ceil(perfumes.length / ITEMS_PER_PAGE)

  // Reset página cuando cambian los filtros
  const handleFilterChangeWithReset = (newFilters: any) => {
    setCurrentPage(1)
    handleFilterChange(newFilters)
  }

  const handleOpenModal = (perfume: Perfume) => {
    setSelectedPerfume(perfume)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPerfume(null)
  }

  const handleAddToCart = (perfume: Perfume, event?: React.MouseEvent) => {
    dispatch({ type: 'ADD_ITEM', perfume });
    setToast({ show: true, message: `${perfume.name} agregado al carrito`, x: 20, y: 20 });
  }  
  return (
    <>
      <Toast 
        message={toast.message} 
        show={toast.show} 
        onClose={() => setToast((t) => ({ ...t, show: false }))} 
        x={toast.x} 
        y={toast.y}
      />
      <section id="catalog" className="py-8 sm:py-10 lg:py-12 bg-[#070707] min-h-screen">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        {/* Title Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-3 sm:mb-4 uppercase">
            <span className="text-white">NUESTRO</span> <span className="text-amber-300">CATÁLOGO</span>
          </h2>
          <p className="text-white text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4 mb-8">
            Descubre nuestra selección cuidadosamente elegida de las fragancias más exclusivas y populares
          </p>
          
          {/* Nueva barra de filtros: izquierda (Filtrar/Limpiar), centro (buscador), derecha (provincia), WhatsApp */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center max-w-3xl mx-auto px-4 w-full">

            {/* Izquierda: Filtrar y Limpiar */}
            <div className="flex gap-3 w-full sm:w-auto justify-start">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black font-bold text-sm sm:text-base px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentPage(1)
                  setFilters({ category: '', minPrice: 0, maxPrice: 999999, search: '', size: '', provincia: 'Santiago del Estero' })
                }}
                className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black font-bold text-sm sm:text-base px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                Limpiar
              </Button>
            </div>
            {/* Centro: Buscador */}
            <div className="flex-1 w-full sm:max-w-xs flex justify-center">
              <div className="relative group w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-amber-300 h-4 w-4 transition-colors duration-200" />
                <Input
                  type="text"
                  placeholder="Buscar perfumes..."
                  value={filters.search || ''}
                  onChange={(e) => handleFilterChangeWithReset({ ...filters, search: e.target.value })}
                  className="pl-10 bg-black/30 border border-gray-400 text-gray-200 placeholder-gray-400 focus:border-amber-300 focus:outline-none focus:ring-0 transition-all duration-200 rounded-xl py-3"
                  style={{ boxShadow: 'none', fontFamily: 'Libre Bodoni, serif' }}
                />
              </div>
            </div>
            {/* Derecha: Provincia */}
            <div className="flex gap-2 ml-2 justify-end w-full sm:w-auto">
              <Button
                variant={filters.provincia === 'Santiago del Estero' || !filters.provincia ? 'default' : 'outline'}
                className={`px-4 py-2 rounded-lg font-bold text-sm border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black transition-all duration-200 ${filters.provincia === 'Santiago del Estero' || !filters.provincia ? 'bg-amber-400 text-black' : ''} cursor-pointer`}
                onClick={() => handleFilterChangeWithReset({ ...filters, provincia: 'Santiago del Estero' })}
              >
                Santiago del Estero
              </Button>
              <Button
                variant={filters.provincia === 'Cordoba' ? 'default' : 'outline'}
                className={`px-4 py-2 rounded-lg font-bold text-sm border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black transition-all duration-200 ${filters.provincia === 'Cordoba' ? 'bg-amber-400 text-black' : ''} cursor-pointer`}
                onClick={() => handleFilterChangeWithReset({ ...filters, provincia: 'Cordoba' })}
              >
                Córdoba
              </Button>
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
                onFilterChange={handleFilterChangeWithReset}
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
          <div className="w-full flex flex-col items-center justify-start pt-4">
            {/* Products Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-16 sm:py-20">
                <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-amber-400" />
              </div>
            ) : paginatedPerfumes.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 w-full max-w-7xl mx-auto px-4">
                  {paginatedPerfumes.map((perfume) => (
                    <PerfumeCard 
                      key={perfume.id} 
                      perfume={perfume} 
                      onOpenModal={handleOpenModal}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
                
                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8 px-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCurrentPage(prev => {
                          const newPage = Math.max(prev - 1, 1);
                          setTimeout(scrollToCatalog, 0);
                          return newPage;
                        });
                      }}
                      disabled={currentPage === 1}
                      className="border-amber-400/50 text-amber-400 hover:bg-amber-400 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Anterior
                    </Button>
                    
                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={page === currentPage ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setCurrentPage(() => {
                              setTimeout(scrollToCatalog, 0);
                              return page;
                            });
                          }}
                          className={
                            page === currentPage
                              ? "bg-amber-400 text-black hover:bg-amber-500"
                              : "border-amber-400/50 text-amber-400 hover:bg-amber-400 hover:text-black"
                          }
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCurrentPage(prev => {
                          const newPage = Math.min(prev + 1, totalPages);
                          setTimeout(scrollToCatalog, 0);
                          return newPage;
                        });
                      }}
                      disabled={currentPage === totalPages}
                      className="border-amber-400/50 text-amber-400 hover:bg-amber-400 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Siguiente
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                )}
              </>
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

        {/* Perfume Modal */}
        <PerfumeModal
          perfume={selectedPerfume}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />


      </div>
      </section>
    </>
  );
};

export default Catalog;
