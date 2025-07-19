'use client'

import { useState, useEffect } from 'react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Plus, Edit, Trash2, Upload, Eye, EyeOff } from 'lucide-react'
import { getPerfumes, createPerfume, updatePerfume, deletePerfume, uploadImage } from '../../services/perfumeService'
import { Perfume, PerfumeInsert } from '../../lib/supabase'
import Image from 'next/image'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [perfumes, setPerfumes] = useState<Perfume[]>([])
  const [loading, setLoading] = useState(false)
  const [editingPerfume, setEditingPerfume] = useState<Perfume | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    category: 'mujer' as 'mujer' | 'hombre' | 'unisex',
    imageFile: null as File | null,
    quantity: ''
  })

  useEffect(() => {
    if (isAuthenticated) {
      loadPerfumes()
    }
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'
    if (password === adminPassword) {
      setIsAuthenticated(true)
    } else {
      alert('Contraseña incorrecta')
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
        brand: toNullIfEmpty(formData.brand),
        description: toNullIfEmpty(formData.description),
        price: formData.price === '' ? null : Number(formData.price),
        category: toNullIfEmpty(formData.category),
        image_url: toNullIfEmpty(imageUrl),
        quantity: formData.quantity === '' ? null : Number(formData.quantity)
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
      quantity: perfume.quantity?.toString() || ''
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

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      description: '',
      price: '',
      category: 'mujer',
      imageFile: null,
      quantity: ''
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Panel de Administración</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa la contraseña"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Iniciar Sesión
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
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
                    <div className="space-y-2">
                      <label htmlFor="quantity" className="text-sm font-medium">Cantidad</label>
                      <Input id="quantity" type="number" value={formData.quantity} onChange={e => setFormData(prev => ({ ...prev, quantity: e.target.value }))} placeholder="0" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Descripción</label>
                    <textarea id="description" value={formData.description} onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))} placeholder="Descripción del perfume" className="w-full p-2 border rounded-md bg-background text-foreground" rows={3} required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">Categoría</label>
                    <select id="category" value={formData.category} onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as any }))} className="w-full p-2 border rounded-md bg-background text-foreground">
                      <option value="mujer">Mujer</option>
                      <option value="hombre">Hombre</option>
                      <option value="unisex">Unisex</option>
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
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#18181b] rounded-xl shadow-lg">
            <thead>
              <tr className="bg-[#23232a] text-amber-300">
                <th className="py-3 px-4 text-left">Imagen</th>
                <th className="py-3 px-4 text-left">Nombre</th>
                <th className="py-3 px-4 text-left">Marca</th>
                <th className="py-3 px-4 text-left">Categoría</th>
                <th className="py-3 px-4 text-left">Precio</th>
                <th className="py-3 px-4 text-left">Cantidad</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {perfumes.map((perfume) => (
                <tr key={perfume.id} className="border-b border-[#23232a] hover:bg-[#23232a]/30 transition-all">
                  <td className="py-2 px-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-[#23232a] flex items-center justify-center">
                      {perfume.image_url ? (
                        <Image src={perfume.image_url} alt={perfume.name} width={64} height={64} className="object-cover w-full h-full" />
                      ) : (
                        <span className="text-xs text-gray-400">Sin imagen</span>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-4 font-semibold">{perfume.name}</td>
                  <td className="py-2 px-4">{perfume.brand}</td>
                  <td className="py-2 px-4">{perfume.category}</td>
                  <td className="py-2 px-4">${perfume.price.toLocaleString()}</td>
                  <td className="py-2 px-4">{perfume.quantity ?? 0}</td>
                  <td className="py-2 px-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(perfume)} title="Editar">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(perfume.id)} className="text-destructive hover:bg-destructive/10" title="Eliminar">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => {/* lógica para agregar stock */}} title="Agregar stock">
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
  )
}
