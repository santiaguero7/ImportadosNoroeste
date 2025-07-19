// Servicio temporal para desarrollo sin Supabase
// Este archivo sirve como fallback cuando no tienes Supabase configurado

import { samplePerfumes } from '@/data/samplePerfumes'
import { Perfume, PerfumeInsert, PerfumeUpdate } from '@/lib/supabase'

let perfumesData = [...samplePerfumes]

export async function getPerfumes(): Promise<Perfume[]> {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 500))
  return perfumesData
}

export async function getPerfumesFiltered(filters: {
  category?: string
  minPrice?: number
  maxPrice?: number
  search?: string
}): Promise<Perfume[]> {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  let filtered = [...perfumesData]

  if (filters.category && filters.category !== '') {
    filtered = filtered.filter(p => p.category === filters.category)
  }

  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(p => p.price >= filters.minPrice!)
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(p => p.price <= filters.maxPrice!)
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
    )
  }

  return filtered
}

export async function getPerfumeById(id: number): Promise<Perfume | null> {
  await new Promise(resolve => setTimeout(resolve, 200))
  return perfumesData.find(p => p.id === id) || null
}

export async function createPerfume(perfume: PerfumeInsert): Promise<Perfume> {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const newPerfume: Perfume = {
    ...perfume,
    id: Math.max(...perfumesData.map(p => p.id)) + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  perfumesData.push(newPerfume)
  return newPerfume
}

export async function updatePerfume(perfume: PerfumeUpdate): Promise<Perfume> {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const index = perfumesData.findIndex(p => p.id === perfume.id)
  if (index === -1) {
    throw new Error('Perfume not found')
  }

  const updatedPerfume: Perfume = {
    ...perfumesData[index],
    ...perfume,
    updated_at: new Date().toISOString()
  }

  perfumesData[index] = updatedPerfume
  return updatedPerfume
}

export async function deletePerfume(id: number): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const index = perfumesData.findIndex(p => p.id === id)
  if (index === -1) {
    throw new Error('Perfume not found')
  }

  perfumesData.splice(index, 1)
  return true
}

export async function uploadImage(file: File): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Simular subida de imagen retornando una URL de placeholder
  return `https://via.placeholder.com/400x400/8b5cf6/ffffff?text=${encodeURIComponent(file.name)}`
}

export async function deleteImage(imageUrl: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 200))
  // En el modo de desarrollo, simplemente no hacer nada
  console.log('Deleting image:', imageUrl)
}
