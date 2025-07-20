'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Filter, X } from 'lucide-react'
import { useState } from 'react'

interface FilterSidebarProps {
  filters: {
    category: string
    minPrice: number
    maxPrice: number
    search?: string
    size?: string
  }
  onFilterChange: (filters: any) => void
  isOpen: boolean
  onClose: () => void
}

const FilterSidebar = ({ filters, onFilterChange, isOpen, onClose }: FilterSidebarProps) => {
  const [localFilters, setLocalFilters] = useState(filters)
  // Para mostrar vacío en vez de 0 en el input de precio mínimo
  const minPriceValue = localFilters.minPrice === 0 ? '' : localFilters.minPrice;

  const handleCategoryChange = (category: string) => {
    const newFilters = { ...localFilters, category }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleSizeChange = (size: string) => {
    const newFilters = { ...localFilters, size }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: number) => {
    const newFilters = { ...localFilters, [field]: value }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const newFilters = { category: '', minPrice: 0, maxPrice: 999999, search: '', size: '' }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="p-4 h-full max-h-[90vh] overflow-y-auto rounded-t-2xl rounded-b-2xl" style={{ background: '#070707' }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-playfair font-bold text-amber-300 flex items-center gap-2">
          <Filter className="h-4 w-4 text-amber-300" />
          FILTROS
        </h2>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onClose}
          className="text-amber-300 hover:bg-amber-300/10 hover:text-amber-200"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

          <div className="space-y-6">
            {/* Category Filter */}
            <div className="bg-[#090909] rounded-xl p-4 border-2 border-[#23232a]">
              <h3 className="text-md font-bold text-amber-300 mb-3 uppercase tracking-wide">Categoría</h3>
              <div className="space-y-2">
                <Button
                  variant={localFilters.category === '' ? 'default' : 'outline'}
                  className={`w-full justify-start font-medium transition-all rounded-xl ${
                    localFilters.category === '' 
                      ? 'bg-amber-300 text-black hover:bg-amber-400' 
                      : 'border-[#23232a] text-white hover:bg-amber-300/10 hover:border-amber-300 hover:text-amber-300'
                  }`}
                  onClick={() => handleCategoryChange('')}
                >
                  Todos
                </Button>
                <Button
                  variant={localFilters.category === 'mujer' ? 'default' : 'outline'}
                  className={`w-full justify-start font-medium transition-all rounded-xl ${
                    localFilters.category === 'mujer' 
                      ? 'bg-amber-300 text-black hover:bg-amber-400' 
                      : 'border-[#23232a] text-white hover:bg-amber-300/10 hover:border-amber-300 hover:text-amber-300'
                  }`}
                  onClick={() => handleCategoryChange('mujer')}
                >
                  Mujer
                </Button>
                <Button
                  variant={localFilters.category === 'hombre' ? 'default' : 'outline'}
                  className={`w-full justify-start font-medium transition-all rounded-xl ${
                    localFilters.category === 'hombre' 
                      ? 'bg-amber-300 text-black hover:bg-amber-400' 
                      : 'border-[#23232a] text-white hover:bg-amber-300/10 hover:border-amber-300 hover:text-amber-300'
                  }`}
                  onClick={() => handleCategoryChange('hombre')}
                >
                  Hombre
                </Button>
                <Button
                  variant={localFilters.category === 'unisex' ? 'default' : 'outline'}
                  className={`w-full justify-start font-medium transition-all rounded-xl ${
                    localFilters.category === 'unisex' 
                      ? 'bg-amber-300 text-black hover:bg-amber-400' 
                      : 'border-[#23232a] text-white hover:bg-amber-300/10 hover:border-amber-300 hover:text-amber-300'
                  }`}
                  onClick={() => handleCategoryChange('unisex')}
                >
                  Unisex
                </Button>
              </div>
            </div>

            {/* Price Filter */}
            <div className="bg-[#090909] rounded-xl p-4 border-2 border-[#23232a]">
              <h3 className="text-md font-bold text-amber-300 mb-3 uppercase tracking-wide">Rango de Precios</h3>
              <div className="space-y-3">
                <div className="space-y-2">
                  <label className="text-sm text-gray-300 font-medium">Precio mínimo</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={minPriceValue}
                    onChange={(e) => handlePriceChange('minPrice', Number(e.target.value))}
                    className="w-full  border-[#23232a] text-white placeholder:text-gray-500 focus:border-amber-300 focus:ring-amber-300 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-300 font-medium">Precio máximo</label>
                  <Input
                    type="number"
                    placeholder="Sin límite"
                    value={localFilters.maxPrice === 999999 ? '' : localFilters.maxPrice}
                    onChange={(e) => handlePriceChange('maxPrice', Number(e.target.value) || 999999)}
                    className="w-full border-[#23232a] text-white placeholder:text-gray-500 focus:border-amber-300 focus:ring-amber-300 rounded-xl"
                  />
                </div>
                
                {/* Quick price filters */}
                <div className="grid grid-cols-1 gap-2 mt-6">
                  <Button
                    variant="outline"
                    className="text-sm border-[#23232a] text-white hover:bg-amber-300/10 hover:border-amber-300 hover:text-amber-300 transition-all rounded-xl"
                    onClick={() => {
                      handlePriceChange('minPrice', 0)
                      handlePriceChange('maxPrice', 50000)
                    }}
                  >
                    Hasta $50.000
                  </Button>
                  <Button
                    variant="outline"
                    className="text-sm border-[#23232a] text-white hover:bg-amber-300/10 hover:border-amber-300 hover:text-amber-300 transition-all rounded-xl"
                    onClick={() => {
                      handlePriceChange('minPrice', 50000)
                      handlePriceChange('maxPrice', 100000)
                    }}
                  >
                    $50.000 - $100.000
                  </Button>
                  <Button
                    variant="outline"
                    className="text-sm border-[#23232a] text-white hover:bg-amber-300/10 hover:border-amber-300 hover:text-amber-300 transition-all rounded-xl"
                    onClick={() => {
                      handlePriceChange('minPrice', 100000)
                      handlePriceChange('maxPrice', 999999)
                    }}
                  >
                    Más de $100.000
                  </Button>
                </div>
              </div>
            </div>

            {/* Size Filter */}
            <div className="bg-[#090909] rounded-xl p-4 border-2 border-[#23232a]">
              <h3 className="text-md font-bold text-amber-300 mb-3 uppercase tracking-wide">Tamaño</h3>
              <div className="space-y-2">
                <Button
                  variant={!localFilters.size || localFilters.size === '' ? 'default' : 'outline'}
                  className={`w-full justify-start font-medium transition-all rounded-xl ${
                    !localFilters.size || localFilters.size === '' 
                      ? 'bg-amber-300 text-black hover:bg-amber-400' 
                      : 'border-[#23232a] text-white hover:bg-amber-300/10 hover:border-amber-300 hover:text-amber-300'
                  }`}
                  onClick={() => handleSizeChange('')}
                >
                  Todos los tamaños
                </Button>
                <Button
                  variant={localFilters.size === '50ml' ? 'default' : 'outline'}
                  className={`w-full justify-start font-medium transition-all rounded-xl ${
                    localFilters.size === '50ml' 
                      ? 'bg-amber-300 text-black hover:bg-amber-400' 
                      : 'border-[#23232a] text-white hover:bg-amber-300/10 hover:border-amber-300 hover:text-amber-300'
                  }`}
                  onClick={() => handleSizeChange('50ml')}
                >
                  50ml
                </Button>
                <Button
                  variant={localFilters.size === '100ml' ? 'default' : 'outline'}
                  className={`w-full justify-start font-medium transition-all rounded-xl ${
                    localFilters.size === '100ml' 
                      ? 'bg-amber-300 text-black hover:bg-amber-400' 
                      : 'border-[#23232a] text-white hover:bg-amber-300/10 hover:border-amber-300 hover:text-amber-300'
                  }`}
                  onClick={() => handleSizeChange('100ml')}
                >
                  100ml
                </Button>
                <Button
                  variant={localFilters.size === '150ml' ? 'default' : 'outline'}
                  className={`w-full justify-start font-medium transition-all rounded-xl ${
                    localFilters.size === '150ml' 
                      ? 'bg-amber-300 text-black hover:bg-amber-400' 
                      : 'border-[#23232a] text-white hover:bg-amber-300/10 hover:border-amber-300 hover:text-amber-300'
                  }`}
                  onClick={() => handleSizeChange('150ml')}
                >
                  150ml
                </Button>
              </div>
            </div>

            {/* Clear Filters */}
            <Button
              variant="outline"
              onClick={clearFilters}
              className="w-full border-amber-300/50 text-amber-300 hover:bg-amber-300 hover:text-black font-bold transition-all py-2 rounded-xl mb-3"
            >
              Limpiar filtros
            </Button>
            <Button
              variant="default"
              onClick={onClose}
              className="w-full bg-amber-300 text-black font-bold transition-all py-2 rounded-xl mb-3"
            >
              Aplicar filtros
            </Button>
          </div>
        </div>
  )
}

export default FilterSidebar
