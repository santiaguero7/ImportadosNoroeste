'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, Upload, Eye, EyeOff } from 'lucide-react'
import { getPerfumes, createPerfume, updatePerfume, deletePerfume, uploadImage } from '@/services/perfumeService'
import { Perfume, PerfumeInsert } from '@/lib/supabase'
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
    description: '',
    price: '',
    category: 'mujer' as 'mujer' | 'hombre' | 'unisex',
    imageFile: null as File | null
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

  const loadPerfumes = async () => {
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

      // Upload image if new file selected
      if (formData.imageFile) {
        imageUrl = await uploadImage(formData.imageFile)
      }

      const perfumeData: PerfumeInsert = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        image_url: imageUrl
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
      description: perfume.description,
      price: perfume.price.toString(),
      category: perfume.category,
      imageFile: null
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
      description: '',
      price: '',
      category: 'mujer',
      imageFile: null
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
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {editingPerfume ? 'Editar Perfume' : 'Agregar Nuevo Perfume'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nombre
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Nombre del perfume"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="price" className="text-sm font-medium">
                      Precio
                    </label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descripción del perfume"
                    className="w-full p-2 border rounded-md bg-background text-foreground"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Categoría
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full p-2 border rounded-md bg-background text-foreground"
                  >
                    <option value="mujer">Mujer</option>
                    <option value="hombre">Hombre</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="image" className="text-sm font-medium">
                    Imagen
                  </label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4"
                  />
                  {editingPerfume && editingPerfume.image_url && (
                    <div className="mt-2">
                      <Image
                        src={editingPerfume.image_url}
                        alt="Imagen actual"
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : editingPerfume ? 'Actualizar' : 'Crear'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Perfumes List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {perfumes.map((perfume) => (
            <Card key={perfume.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={perfume.image_url}
                  alt={perfume.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{perfume.name}</h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {perfume.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-primary">
                    ${perfume.price.toLocaleString()}
                  </span>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                    {perfume.category}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(perfume)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(perfume.id)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
