'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { getPerfumesFiltered } from '@/services/perfumeService'
import { Perfume } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import HeroCarousel from '@/components/HeroCarousel'
import SpecialOrderSection from '@/components/SpecialOrderSection'
import Footer from '@/components/Footer'
import Catalog from '@/components/Catalog'

function HomeContent() {
  const [perfumes, setPerfumes] = useState<Perfume[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 999999,
    search: '',
    size: ''
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
      <SpecialOrderSection />
      <Footer />
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-300"></div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}