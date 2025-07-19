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
  }
  onFilterChange: (filters: any) => void
  isOpen: boolean
  onClose: () => void
}

const FilterSidebar = ({ filters, onFilterChange, isOpen, onClose }: FilterSidebarProps) => {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleCategoryChange = (category: string) => {
    const newFilters = { ...localFilters, category }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: number) => {
    const newFilters = { ...localFilters, [field]: value }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const newFilters = { category: '', minPrice: 0, maxPrice: 999999 }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 w-80 bg-card/95 backdrop-blur-sm border-r border-border/50 z-50 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-playfair font-bold text-foreground flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros
            </h2>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Category Filter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categoría</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant={localFilters.category === '' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => handleCategoryChange('')}
                >
                  Todos
                </Button>
                <Button
                  variant={localFilters.category === 'mujer' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => handleCategoryChange('mujer')}
                >
                  Mujer
                </Button>
                <Button
                  variant={localFilters.category === 'hombre' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => handleCategoryChange('hombre')}
                >
                  Hombre
                </Button>
                <Button
                  variant={localFilters.category === 'unisex' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => handleCategoryChange('unisex')}
                >
                  Unisex
                </Button>
              </CardContent>
            </Card>

            {/* Price Filter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rango de Precios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Precio mínimo</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={localFilters.minPrice}
                    onChange={(e) => handlePriceChange('minPrice', Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Precio máximo</label>
                  <Input
                    type="number"
                    placeholder="999999"
                    value={localFilters.maxPrice === 999999 ? '' : localFilters.maxPrice}
                    onChange={(e) => handlePriceChange('maxPrice', Number(e.target.value) || 999999)}
                    className="w-full"
                  />
                </div>
                
                {/* Quick price filters */}
                <div className="grid grid-cols-1 gap-2 mt-4">
                  <Button
                    variant="outline"
                    className="text-sm"
                    onClick={() => {
                      handlePriceChange('minPrice', 0)
                      handlePriceChange('maxPrice', 50000)
                    }}
                  >
                    Hasta $50.000
                  </Button>
                  <Button
                    variant="outline"
                    className="text-sm"
                    onClick={() => {
                      handlePriceChange('minPrice', 50000)
                      handlePriceChange('maxPrice', 100000)
                    }}
                  >
                    $50.000 - $100.000
                  </Button>
                  <Button
                    variant="outline"
                    className="text-sm"
                    onClick={() => {
                      handlePriceChange('minPrice', 100000)
                      handlePriceChange('maxPrice', 999999)
                    }}
                  >
                    Más de $100.000
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Clear Filters */}
            <Button
              variant="outline"
              onClick={clearFilters}
              className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
            >
              Limpiar filtros
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FilterSidebar
