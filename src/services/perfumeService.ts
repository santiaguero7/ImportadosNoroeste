import { supabase, Perfume, PerfumeInsert, PerfumeUpdate } from '@/lib/supabase'

// Importar servicio de desarrollo como fallback
// import * as devService from './perfumeService.dev'

// Verificar si Supabase está configurado
const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Obtener todos los perfumes
export async function getPerfumes() {
  if (!isSupabaseConfigured) {
    return [] // devService removed
  }

  const { data, error } = await supabase
    .from('perfumes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching perfumes:', error)
    return []
  }

  return data as Perfume[]
}

// Obtener perfumes con filtros
export async function getPerfumesFiltered(filters: {
  category?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  size?: string
}) {
  if (!isSupabaseConfigured) {
    return [] // devService removed
  }

  let query = supabase
    .from('perfumes')
    .select('*')

  // Filtro por categoría
  if (filters.category && filters.category !== '') {
    if (filters.category === 'hombre') {
      query = query.in('category', ['hombre', 'unisex'])
    } else if (filters.category === 'mujer') {
      query = query.in('category', ['mujer', 'unisex'])
    } else {
      query = query.eq('category', filters.category)
    }
  }

  // Filtro por precio
  if (filters.minPrice !== undefined) {
    query = query.gte('price', filters.minPrice)
  }
  if (filters.maxPrice !== undefined) {
    query = query.lte('price', filters.maxPrice)
  }

  // Filtro por tamaño
  if (filters.size && filters.size !== '') {
    query = query.eq('size', filters.size)
  }

  // Filtro por búsqueda
  if (filters.search) {
    query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  }

  query = query.order('created_at', { ascending: false })

  const { data, error } = await query

  if (error) {
    console.error('Error fetching filtered perfumes:', error)
    return []
  }

  return data as Perfume[]
}

// Obtener un perfume por ID
export async function getPerfumeById(id: number) {
  if (!isSupabaseConfigured) {
    return null // devService removed (getPerfumeById can return null)
  }

  const { data, error } = await supabase
    .from('perfumes')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching perfume:', error)
    return null
  }

  return data as Perfume
}

// Crear un nuevo perfume
export async function createPerfume(perfume: PerfumeInsert) {
  if (!isSupabaseConfigured) {
    return // devService removed (createPerfume returns void)
  }

  const { data, error } = await supabase
    .from('perfumes')
    .insert([perfume])
    .select()
    .single()

  if (error) {
    console.error('Error creating perfume:', error)
    throw error
  }

  return data as Perfume
}

// Actualizar un perfume
export async function updatePerfume(perfume: PerfumeUpdate) {
  if (!isSupabaseConfigured) {
    return // devService removed (updatePerfume returns void)
  }

  const { data, error } = await supabase
    .from('perfumes')
    .update(perfume)
    .eq('id', perfume.id)
    .select()
    .single()

  if (error) {
    console.error('Error updating perfume:', error)
    throw error
  }

  return data as Perfume
}

// Eliminar un perfume
export async function deletePerfume(id: number) {
  if (!isSupabaseConfigured) {
    return // devService removed (deletePerfume returns void)
  }

  const { error } = await supabase
    .from('perfumes')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting perfume:', error)
    throw error
  }

  return true
}

// Subir imagen a Supabase Storage
export async function uploadImage(file: File): Promise<string> {
  if (!isSupabaseConfigured) {
    return '' // devService removed (uploadImage returns string)
  }

  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`
  const filePath = `${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('perfumes')
    .upload(filePath, file)

  if (uploadError) {
    console.error('Error uploading image:', uploadError, file);
    alert('Error subiendo imagen: ' + JSON.stringify(uploadError));
    throw uploadError
  }

  const { data: { publicUrl } } = supabase.storage
    .from('perfumes')
    .getPublicUrl(filePath)

  return publicUrl
}

// Eliminar imagen de Supabase Storage
export async function deleteImage(imageUrl: string) {
  if (!isSupabaseConfigured) {
    return // devService removed (deleteImage returns void)
  }

  // Extraer el path de la URL
  const url = new URL(imageUrl)
  const path = url.pathname.split('/').pop()
  
  if (path) {
    const filePath = `perfumes/${path}`
    const { error } = await supabase.storage
      .from('perfumes')
      .remove([filePath])

    if (error) {
      console.error('Error deleting image:', error)
      throw error
    }
  }
}
