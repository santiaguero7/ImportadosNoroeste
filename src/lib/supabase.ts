import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Tipos para TypeScript
export interface Perfume {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  category: 'hombre' | 'mujer' | 'unisex'
  created_at: string
  updated_at: string
}

export interface PerfumeInsert {
  name: string
  description: string
  price: number
  image_url: string
  category: 'hombre' | 'mujer' | 'unisex'
}

export interface PerfumeUpdate {
  id: number
  name?: string
  description?: string
  price?: number
  image_url?: string
  category?: 'hombre' | 'mujer' | 'unisex'
}
