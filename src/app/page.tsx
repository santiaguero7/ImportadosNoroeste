
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { getPerfumesFiltered } from '@/services/perfumeService'
import { Perfume } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import HeroCarousel from '@/components/HeroCarousel'
import PromoBanner from '@/components/PromoBanner'
import Footer from '@/components/Footer'
import Catalog from '@/components/Catalog'

export default function Home() {
  const [perfumes, setPerfumes] = useState<Perfume[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 999999,
    search: ''
  })

  const searchParams = useSearchParams()

  useEffect(() => {
    const category = searchParams.get('category')
    if (category) {
      setFilters(prev => ({ ...prev, category }))
    }
  }, [searchParams])

  useEffect(() => {
    loadPerfumes()
  }, [filters])

  const loadPerfumes = async () => {
    try {
      setLoading(true)
      const data = await getPerfumesFiltered(filters)
      setPerfumes(data)
    } catch (error) {
      console.error('Error loading perfumes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, search: query }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearch={handleSearch} />
      <HeroCarousel />
      <Catalog
        perfumes={perfumes}
        loading={loading}
        filters={filters}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        handleFilterChange={handleFilterChange}
        setFilters={setFilters}
      />
      <PromoBanner />
      <Footer />
    </div>
  )
}