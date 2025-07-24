import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Tipos para TypeScript
export interface Perfume {
  id: number
  name: string
  brand: string
  description: string
  price: number
  image_url: string
  category: 'hombre' | 'mujer' | 'unisex'
  quantity: number
  size: string
  essence: string
  provincia: 'Santiago del Estero' | 'Cordoba'
  created_at: string
  updated_at: string
}

export interface PerfumeInsert {
  name: string
  brand: string
  description: string
  price: number
  image_url: string
  category: 'hombre' | 'mujer' | 'unisex'
  quantity: number
  size: string
  essence: string
  provincia: 'Santiago del Estero' | 'Cordoba'
}

export interface PerfumeUpdate {
  id: number
  name?: string
  brand?: string
  description?: string
  price?: number
  image_url?: string
  category?: 'hombre' | 'mujer' | 'unisex'
  quantity?: number
  size?: string
  essence?: string
  provincia?: 'Santiago del Estero' | 'Cordoba'
}
