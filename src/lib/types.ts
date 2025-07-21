export interface Perfume {
  id: number
  name: string
  brand: string | null
  description: string
  price: number
  category: 'mujer' | 'hombre' | 'unisex'
  image_url: string | null
  created_at: string
  quantity: number | null
  size: string | null
  essence: string | null
}

export interface PerfumeInsert {
  name: string
  brand?: string
  description: string
  price: number
  category: 'mujer' | 'hombre' | 'unisex'
  image_url?: string
  quantity?: number
  size?: string
  essence?: string
}
