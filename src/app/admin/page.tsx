'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Plus, Edit, Trash2, Upload, LogOut } from 'lucide-react'
import { getPerfumes, createPerfume, updatePerfume, deletePerfume, uploadImage } from '../../services/perfumeService'
import { Perfume, PerfumeInsert } from '../../lib/supabase'
import Image from 'next/image'

export default function AdminPage() {
  const [perfumes, setPerfumes] = useState<Perfume[]>([])
  const [loading, setLoading] = useState(false)
  const [editingPerfume, setEditingPerfume] = useState<Perfume | null>(null)
  const [showForm, setShowForm] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    category: 'mujer' as 'mujer' | 'hombre' | 'unisex',
    imageFile: null as File | null,
    quantity: '',
    size: '',
    essence: ''
  })

  useEffect(() => {
    loadPerfumes()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const loadPerfumes: () => Promise<void> = async () => {
    try {
      setLoading(true)
      const data = await getPerfumes()
      setPerfumes(data)
    } catch (error) {
      console.error('Error loading perfumes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.description || !formData.price) {
      alert('Por favor, completa todos los campos')
      return
    }

    try {
      setLoading(true)
      let imageUrl = editingPerfume?.image_url || ''

      // Subir imagen si hay archivo nuevo
      if (formData.imageFile) {
        imageUrl = await uploadImage(formData.imageFile)
      }

      // Helper para null si vacío
      const toNullIfEmpty = (val: string) => val === '' ? null : val

      const perfumeData: PerfumeInsert = {
        name: formData.name,
        brand: formData.brand,
        description: formData.description,
        price: formData.price === '' ? 0 : Number(formData.price),
        category: formData.category as 'mujer' | 'hombre' | 'unisex',
        image_url: toNullIfEmpty(imageUrl) ?? '',
        quantity: formData.quantity === '' ? 0 : Number(formData.quantity),
        size: formData.size,
        essence: formData.essence
      }

      if (editingPerfume) {
        await updatePerfume({ ...perfumeData, id: editingPerfume.id })
      } else {
        await createPerfume(perfumeData)
      }

      resetForm()
      loadPerfumes()
      alert(editingPerfume ? 'Perfume actualizado' : 'Perfume creado')
    } catch (error) {
      console.error('Error saving perfume:', error)
      alert('Error al guardar el perfume')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (perfume: Perfume) => {
    setEditingPerfume(perfume)
    setFormData({
      name: perfume.name,
      brand: perfume.brand || '',
      description: perfume.description,
      price: perfume.price.toString(),
      category: perfume.category,
      imageFile: null,
      quantity: perfume.quantity?.toString() || '',
      size: perfume.size || '',
      essence: perfume.essence || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este perfume?')) {
      try {
        await deletePerfume(id)
        loadPerfumes()
        alert('Perfume eliminado')
      } catch (error) {
        console.error('Error deleting perfume:', error)
        alert('Error al eliminar el perfume')
      }
    }
  }

  const handleAddStock = async (perfume: Perfume) => {
    const quantityToAdd = prompt('¿Cuántas unidades deseas agregar al stock?', '1')
    if (quantityToAdd && !isNaN(Number(quantityToAdd))) {
      try {
        const newQuantity = (perfume.quantity || 0) + Number(quantityToAdd)
        await updatePerfume({ 
          id: perfume.id, 
          quantity: newQuantity 
        })
        loadPerfumes()
        alert(`Se agregaron ${quantityToAdd} unidades. Stock actual: ${newQuantity}`)
      } catch (error) {
        console.error('Error updating stock:', error)
        alert('Error al actualizar el stock')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      description: '',
      price: '',
      category: 'mujer',
      imageFile: null,
      quantity: '',
      size: '',
      essence: ''
    })
    setEditingPerfume(null)
    setShowForm(false)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }))
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-playfair font-bold text-gradient">
            Panel de Administración
          </h1>
          <div className="flex gap-4">
            <Button
              onClick={() => setShowForm(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Perfume
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/'}
            >
              Ver Sitio
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <Card className="w-full max-w-lg mx-auto">
              <CardHeader>
                <CardTitle>
                  {editingPerfume ? 'Editar Perfume' : 'Agregar Nuevo Perfume'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Nombre</label>
                      <Input id="name" value={formData.name} onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder="Nombre del perfume" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="brand" className="text-sm font-medium">Marca</label>
                      <Input id="brand" value={formData.brand} onChange={e => setFormData(prev => ({ ...prev, brand: e.target.value }))} placeholder="Marca" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="price" className="text-sm font-medium">Precio</label>
                      <Input id="price" type="number" value={formData.price} onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))} placeholder="0" required />
                    </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="quantity" className="text-sm font-medium">Cantidad</label>
                      <Input id="quantity" type="number" value={formData.quantity} onChange={e => setFormData(prev => ({ ...prev, quantity: e.target.value }))} placeholder="0" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="size" className="text-sm font-medium">Tamaño</label>
                      <Input id="size" value={formData.size} onChange={e => setFormData(prev => ({ ...prev, size: e.target.value }))} placeholder="100ml" required />
                    </div>
                  </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Descripción</label>
                    <textarea id="description" value={formData.description} onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))} placeholder="Descripción del perfume" className="w-full p-2 border rounded-md bg-background text-foreground" rows={3} required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium text-foreground">Categoría</label>
                    <select 
                      id="category" 
                      value={formData.category} 
                      onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as any }))} 
                      className="w-full p-3 border rounded-lg bg-[#0a0a0a] text-white border-border focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
                      style={{ backgroundColor: '#0a0a0a', color: 'white' }}
                    >
                      <option value="mujer" style={{ backgroundColor: '#0a0a0a', color: 'white' }}>👩 Mujer</option>
                      <option value="hombre" style={{ backgroundColor: '#0a0a0a', color: 'white' }}>👨 Hombre</option>
                      <option value="unisex" style={{ backgroundColor: '#0a0a0a', color: 'white' }}>👫 Unisex</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="essence" className="text-sm font-medium text-foreground">Esencia</label>
                    <select 
                      id="essence" 
                      value={formData.essence} 
                      onChange={e => setFormData(prev => ({ ...prev, essence: e.target.value }))} 
                      className="w-full p-3 border rounded-lg bg-[#0a0a0a] text-white border-border focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
                      style={{ backgroundColor: '#0a0a0a', color: 'white' }}
                    >
                      <option value="" style={{ backgroundColor: '#0a0a0a', color: 'white' }}>Seleccionar esencia...</option>
                      <option value="Amaderado" style={{ backgroundColor: '#0a0a0a', color: 'white' }}>🌲 Amaderado</option>
                      <option value="Floral" style={{ backgroundColor: '#0a0a0a', color: 'white' }}>🌸 Floral</option>
                      <option value="Fresco" style={{ backgroundColor: '#0a0a0a', color: 'white' }}>🌊 Fresco</option>
                      <option value="Oriental" style={{ backgroundColor: '#0a0a0a', color: 'white' }}>🏺 Oriental</option>
                      <option value="Cítrico" style={{ backgroundColor: '#0a0a0a', color: 'white' }}>🍋 Cítrico</option>
                      <option value="Frutal" style={{ backgroundColor: '#0a0a0a', color: 'white' }}>🍑 Frutal</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="image" className="text-sm font-medium">Imagen</label>
                    <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4" />
                    {editingPerfume && editingPerfume.image_url && (
                      <div className="mt-2">
                        <Image src={editingPerfume.image_url} alt="Imagen actual" width={100} height={100} className="rounded-md object-cover" />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={loading}>{loading ? 'Guardando...' : editingPerfume ? 'Actualizar' : 'Crear'}</Button>
                    <Button type="button" variant="outline" onClick={resetForm}>Cancelar</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabla de perfumes */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl shadow-2xl border-2 border-amber-300/20 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-300/20 to-amber-400/10 px-6 py-4 border-b-2 border-amber-300/20">
            <h3 className="text-2xl font-bold text-amber-300 flex items-center gap-3">
              📦 Inventario de Perfumes
              <span className="text-sm bg-amber-300/20 px-3 py-1 rounded-full text-amber-200">
                {perfumes.length} productos
              </span>
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#23232a] to-[#2a2a2a] text-amber-300 border-b border-amber-300/20">
                  <th className="py-4 px-6 text-left font-bold uppercase tracking-wide text-sm">
                    <div className="flex items-center gap-2">
                      🖼️ Imagen
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left font-bold uppercase tracking-wide text-sm">
                    <div className="flex items-center gap-2">
                      📝 Nombre
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left font-bold uppercase tracking-wide text-sm">
                    <div className="flex items-center gap-2">
                      🏷️ Marca
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left font-bold uppercase tracking-wide text-sm">
                    <div className="flex items-center gap-2">
                      👥 Categoría
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left font-bold uppercase tracking-wide text-sm">
                    <div className="flex items-center gap-2">
                      🌸 Esencia
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left font-bold uppercase tracking-wide text-sm">
                    <div className="flex items-center gap-2">
                      📏 Tamaño
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left font-bold uppercase tracking-wide text-sm">
                    <div className="flex items-center gap-2">
                      💰 Precio
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left font-bold uppercase tracking-wide text-sm">
                    <div className="flex items-center gap-2">
                      📊 Stock
                    </div>
                  </th>
                  <th className="py-4 px-6 text-center font-bold uppercase tracking-wide text-sm">
                    <div className="flex items-center justify-center gap-2">
                      ⚡ Acciones
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#0f0f0f]">
              {perfumes.map((perfume, index) => (
                <tr key={perfume.id} className="border-b border-amber-300/10 hover:bg-gradient-to-r hover:from-amber-300/5 hover:to-amber-400/5 transition-all duration-300 group">
                  <td className="py-4 px-6">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-[#23232a] to-[#1a1a1a] flex items-center justify-center border-2 border-gray-600 group-hover:border-amber-300/50 transition-all shadow-lg">
                      {perfume.image_url ? (
                        <Image src={perfume.image_url} alt={perfume.name} width={80} height={80} className="object-cover w-full h-full rounded-lg" />
                      ) : (
                        <div className="text-xs text-gray-400 text-center">
                          <div className="text-2xl mb-1">📷</div>
                          Sin imagen
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-bold text-white text-lg group-hover:text-amber-200 transition-colors">{perfume.name}</div>
                      <div className="text-sm text-gray-400">#{perfume.id}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold text-sm">
                      {perfume.brand}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full font-semibold text-sm border ${
                      perfume.category === 'mujer' 
                        ? 'bg-pink-500/20 text-pink-300 border-pink-500/30' 
                        : perfume.category === 'hombre' 
                        ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                        : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                    }`}>
                      {perfume.category === 'mujer' ? 'Mujer' : perfume.category === 'hombre' ? 'Hombre' : 'Unisex'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 font-semibold text-sm">
                      {perfume.essence}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-sm">
                      {perfume.size}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-xl text-green-400">
                      ${perfume.price.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full font-bold text-sm ${
                        (perfume.quantity ?? 0) > 10 
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                          : (perfume.quantity ?? 0) > 5
                          ? 'bg-gray-700/40 text-gray-300 border border-gray-600/30'
                          : 'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}>
                        {perfume.quantity ?? 0}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2 justify-center">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleEdit(perfume)} 
                        title="Editar"
                        className="bg-blue-500/20 border-blue-500/30 text-blue-300 hover:bg-blue-500/30 hover:text-blue-200 transition-all"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDelete(perfume.id)} 
                        title="Eliminar"
                        className="bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30 hover:text-red-200 transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleAddStock(perfume)} 
                        title="Agregar stock"
                        className="bg-green-500/20 border-green-500/30 text-green-300 hover:bg-green-500/30 hover:text-green-200 transition-all"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
