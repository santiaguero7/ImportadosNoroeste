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
  // --- LOGIN SIMPLE ---
  const [isLogged, setIsLogged] = useState(false);
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ok = localStorage.getItem('admin_logged_in');
      if (ok === 'true') setIsLogged(true);
    }
  }, []);
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "veigar") {
      setIsLogged(true);
      if (typeof window !== 'undefined') localStorage.setItem('admin_logged_in', 'true');
      setPassword("");
    } else {
      alert("Contraseña incorrecta");
      setPassword("");
    }
  };

  // --- HOOKS DE ADMIN ---
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
    essence: '',
    provincia: 'Santiago del Estero' as 'Santiago del Estero' | 'Cordoba'
  })


  useEffect(() => {
    if (isLogged) {
      loadPerfumes();
    }
  }, [isLogged]);

  if (!isLogged) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070707]">
        <form onSubmit={handleLogin} className="bg-[#23232a] p-8 rounded-xl shadow-lg flex flex-col gap-4 w-full max-w-xs border border-[#23232a]">
          <h2 className="text-xl font-bold text-white mb-2 text-center">Acceso Admin</h2>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="p-2 rounded bg-[#070707] border border-[#23232a] text-white"
          />
          <button type="submit" className="bg-amber-400 hover:bg-amber-500 text-black font-bold py-2 rounded transition cursor-pointer">Entrar</button>
        </form>
      </div>
    );
  }

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
      setPerfumes(data ?? [])
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
        essence: formData.essence,
        provincia: formData.provincia
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
      essence: perfume.essence || '',
      provincia: perfume.provincia || 'Santiago del Estero'
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

  // Add handler for removing stock
  const handleRemoveStock = async (perfume: Perfume) => {
    const quantityToRemove = prompt('¿Cuántas unidades deseas restar del stock?', '1')
    if (quantityToRemove && !isNaN(Number(quantityToRemove))) {
      try {
        let newQuantity = (perfume.quantity || 0) - Number(quantityToRemove)
        if (newQuantity < 0) newQuantity = 0
        await updatePerfume({ 
          id: perfume.id, 
          quantity: newQuantity 
        })
        loadPerfumes()
        alert(`Se restaron ${quantityToRemove} unidades. Stock actual: ${newQuantity}`)
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
      essence: '',
      provincia: 'Santiago del Estero'
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
    <div className="min-h-screen bg-[#070707] p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8 bg-[#030303] p-6 rounded-xl shadow-lg border border-[#23232a]">
          <h1 className="text-3xl font-bold text-white tracking-wide" style={{ fontFamily: 'Libre Bodoni, serif' }}>
            Panel de Administración
          </h1>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowForm(true)}
              variant="outline"
              className="border-[#23232a] text-white hover:bg-[#23232a] px-6 py-2 rounded-lg cursor-pointer"
            >
              <Plus className="h-5 w-5 mr-2" />
              Agregar Perfume
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/'}
              className="border-[#23232a] text-white hover:bg-[#23232a] px-6 py-2 rounded-lg cursor-pointer"
            >
              Ver Sitio
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsLogged(false);
                if (typeof window !== 'undefined') localStorage.removeItem('admin_logged_in');
              }}
              className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white px-6 py-2 rounded-lg cursor-pointer"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={e => { if (e.target === e.currentTarget) setShowForm(false) }}>
            <Card className="w-full max-w-2xl mx-auto bg-[#23232a] border border-[#23232a] shadow-lg">
              <CardHeader className="border-b border-[#23232a] bg-[#23232a]">
                <CardTitle className="text-lg font-medium text-white" style={{ fontFamily: 'Libre Bodoni, serif' }}>
                  {editingPerfume ? 'Editar Perfume' : 'Agregar Nuevo Perfume'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-300">Nombre</label>
                      <Input id="name" value={formData.name} onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder="Nombre del perfume" required className="bg-[#070707] border-[#23232a] text-white" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="brand" className="text-sm font-medium text-gray-300">Marca</label>
                      <Input id="brand" value={formData.brand} onChange={e => setFormData(prev => ({ ...prev, brand: e.target.value }))} placeholder="Marca" required className="bg-[#070707] border-[#23232a] text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="price" className="text-sm font-medium text-gray-300">Precio</label>
                      <Input id="price" type="number" value={formData.price} onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))} placeholder="0" required className="bg-[#070707] border-[#23232a] text-white" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="quantity" className="text-sm font-medium text-gray-300">Cantidad</label>
                      <Input id="quantity" type="number" value={formData.quantity} onChange={e => setFormData(prev => ({ ...prev, quantity: e.target.value }))} placeholder="0" required className="bg-[#070707] border-[#23232a] text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="size" className="text-sm font-medium text-gray-300">Tamaño</label>
                      <Input id="size" value={formData.size} onChange={e => setFormData(prev => ({ ...prev, size: e.target.value }))} placeholder="100ml" required className="bg-[#070707] border-[#23232a] text-white" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="category" className="text-sm font-medium text-gray-300">Categoría</label>
                      <select 
                        id="category" 
                        value={formData.category} 
                        onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as any }))} 
                        className="w-full p-2 border border-[#23232a] rounded-md bg-[#070707] text-white"
                      >
                        <option value="mujer">Mujer</option>
                        <option value="hombre">Hombre</option>
                        <option value="unisex">Unisex</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="essence" className="text-sm font-medium text-gray-300">Esencia</label>
                    <select 
                      id="essence" 
                      value={formData.essence} 
                      onChange={e => setFormData(prev => ({ ...prev, essence: e.target.value }))} 
                      className="w-full p-2 border border-[#23232a] rounded-md bg-[#070707] text-white"
                    >
                      <option value="">Seleccionar esencia...</option>
                      <option value="Amaderado">Amaderado</option>
                      <option value="Floral">Floral</option>
                      <option value="Fresco">Fresco</option>
                      <option value="Oriental">Oriental</option>
                      <option value="Cítrico">Cítrico</option>
                      <option value="Frutal">Frutal</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="provincia" className="text-sm font-medium text-gray-300">Provincia</label>
                    <select
                      id="provincia"
                      value={formData.provincia}
                      onChange={e => setFormData(prev => ({ ...prev, provincia: e.target.value as any }))}
                      className="w-full p-2 border border-[#23232a] rounded-md bg-[#070707] text-white"
                    >
                      <option value="Santiago del Estero">Santiago del Estero</option>
                      <option value="Cordoba">Córdoba</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium text-gray-300">Descripción</label>
                    <textarea id="description" value={formData.description} onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))} placeholder="Descripción del perfume" className="w-full p-2 border border-[#23232a] rounded-md bg-[#070707] text-white" rows={3} required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="image" className="text-sm font-medium text-gray-300">Imagen</label>
                    <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="bg-[#070707] border-[#23232a] text-white" />
                    {editingPerfume && editingPerfume.image_url && (
                      <div className="mt-2">
                        <Image src={editingPerfume.image_url} alt="Imagen actual" width={100} height={100} className="rounded-md object-cover border border-[#23232a]" />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                      {loading ? 'Guardando...' : editingPerfume ? 'Actualizar' : 'Crear'}
                    </Button>
                    <Button type="button" onClick={resetForm} className="bg-gray-700 hover:bg-gray-800 text-white border border-[#23232a] font-bold cursor-pointer">
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabla de perfumes */}
        <div className="bg-[#030303] rounded-xl shadow-lg border border-[#23232a] overflow-hidden">
          <div className="bg-[#070707] px-6 py-4 border-b border-[#23232a]">
            <h3 className="text-xl font-bold text-white flex items-center gap-3" style={{ fontFamily: 'Libre Bodoni, serif' }}>
              Inventario de Perfumes
              <span className="text-sm bg-[#23232a] px-3 py-1 rounded-full text-gray-300">
                {perfumes.length} tipos de productos
              </span>
              <span className="text-sm bg-[#23232a] px-3 py-1 rounded-full text-gray-300">
                Stock total: {perfumes.reduce((acc, p) => acc + (p.quantity ?? 0), 0)}
              </span>
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-[#23232a] border-b border-[#23232a]">
                <tr>
                  <th className="px-3 py-4 text-center text-sm font-bold text-gray-200 uppercase tracking-wider w-16" style={{ fontFamily: 'Libre Bodoni, serif' }}>
                    Imagen
                  </th>
                  <th className="px-3 py-4 text-center text-sm font-bold text-gray-200 uppercase tracking-wider w-2/5" style={{ fontFamily: 'Libre Bodoni, serif' }}>
                    Producto
                  </th>
                  <th className="px-2 py-4 text-center text-sm font-bold text-gray-200 uppercase tracking-wider w-20" style={{ fontFamily: 'Libre Bodoni, serif' }}>
                    Marca
                  </th>
                  <th className="px-2 py-4 text-center text-sm font-bold text-gray-200 uppercase tracking-wider w-20" style={{ fontFamily: 'Libre Bodoni, serif' }}>
                    Categoría
                  </th>
                  <th className="px-2 py-4 text-center text-sm font-bold text-gray-200 uppercase tracking-wider w-20" style={{ fontFamily: 'Libre Bodoni, serif' }}>
                    Esencia
                  </th>
                  <th className="px-2 py-4 text-center text-sm font-bold text-gray-200 uppercase tracking-wider w-16" style={{ fontFamily: 'Libre Bodoni, serif' }}>
                    Tamaño
                  </th>
                  <th className="px-2 py-4 text-center text-sm font-bold text-gray-200 uppercase tracking-wider w-20" style={{ fontFamily: 'Libre Bodoni, serif' }}>
                    Precio
                  </th>
                  <th className="px-2 py-4 text-center text-sm font-bold text-gray-200 uppercase tracking-wider w-12" style={{ fontFamily: 'Libre Bodoni, serif' }}>
                    Stock
                  </th>
                  <th className="px-2 py-4 text-center text-sm font-bold text-gray-200 uppercase tracking-wider w-12" style={{ fontFamily: 'Libre Bodoni, serif' }}>
                    Lugar
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold text-gray-200 uppercase tracking-wider w-32" style={{ fontFamily: 'Libre Bodoni, serif' }}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#070707] divide-y divide-[#23232a]">
              {perfumes.map((perfume, index) => (
                <tr key={perfume.id} className="hover:bg-[#23232a] transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#23232a] flex items-center justify-center border border-[#23232a]">
                      {perfume.image_url ? (
                        <Image src={perfume.image_url} alt={perfume.name} width={56} height={56} className="object-cover w-full h-full" />
                      ) : (
                        <div className="text-gray-400 text-xs text-center">
                          <div className="text-lg mb-0.5">📷</div>
                          <div className="text-xs">Sin imagen</div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-base font-bold text-white" style={{ fontFamily: 'Libre Bodoni, serif' }}>{perfume.name}</div>
                      <div className="text-xs text-gray-400">ID: {perfume.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-base font-semibold text-blue-300" style={{ fontFamily: 'Libre Bodoni, serif' }}>
                      {perfume.brand}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-base font-normal text-gray-300" style={{ fontFamily: 'Libre Bodoni, serif' }}>
                      {perfume.category === 'mujer' ? 'Mujer' : perfume.category === 'hombre' ? 'Hombre' : 'Unisex'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-base font-normal text-gray-300" style={{ fontFamily: 'Libre Bodoni, serif' }}>
                      {perfume.essence || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-base font-normal text-gray-300" style={{ fontFamily: 'Libre Bodoni, serif' }}>
                      {perfume.size}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-base font-bold text-white" style={{ fontFamily: 'Libre Bodoni, serif' }}>
                      ${perfume.price.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-base font-bold text-gray-300" style={{ fontFamily: 'Libre Bodoni, serif' }}>
                      {perfume.quantity ?? 0}
                    </span>
                  </td>
                    <td className="px-6 py-4 font-bold text-amber-300 text-center">
                      {perfume.provincia === 'Cordoba' ? 'Cba' : 'Sgo'}
                    </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-center">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleEdit(perfume)} 
                        title="Editar"
                        className="border-[#23232a] text-blue-300 hover:bg-blue-900/30 hover:border-blue-900/40 cursor-pointer"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDelete(perfume.id)} 
                        title="Eliminar"
                        className="border-[#23232a] text-red-400 hover:bg-red-900/30 hover:border-red-900/40 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleAddStock(perfume)} 
                        title="Agregar stock"
                        className="border-[#23232a] text-green-300 hover:bg-green-900/30 hover:border-green-900/40 cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleRemoveStock(perfume)} 
                        title="Restar stock"
                        className="border-[#23232a] text-red-400 hover:bg-red-900/30 hover:border-red-900/40 cursor-pointer"
                      >
                        <span className="font-bold text-lg">-</span>
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
