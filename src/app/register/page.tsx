'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    apellido: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validaciones
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.nombre || !formData.apellido) {
      setError('Todos los campos son obligatorios')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Ingresa un email válido')
      return
    }

    setLoading(true)

    try {
      const { cliente, error: registerError } = await registerClient({
        email: formData.email,
        password: formData.password,
        nombre: formData.nombre,
        apellido: formData.apellido
      })

      if (registerError || !cliente) {
        setError(registerError || 'Error al registrar usuario')
        return
      }

      // Login automático después del registro
      login(cliente)
      router.push('/')
      
    } catch (error) {
      console.error('Error en registro:', error)
      setError('Error interno del servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#070707] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#23232a] border border-[#23232a] shadow-lg">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-[#070707]">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold text-white" style={{ fontFamily: 'Libre Bodoni, serif' }}>
                Crear Cuenta
              </CardTitle>
              <p className="text-gray-400 mt-2">Únete a Importados Noroeste</p>
            </div>
            <div className="w-10"></div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="nombre" className="text-sm font-medium text-gray-300">Nombre</label>
                <Input
                  id="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                  placeholder="Tu nombre"
                  required
                  className="bg-[#070707] border-[#23232a] text-white placeholder-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="apellido" className="text-sm font-medium text-gray-300">Apellido</label>
                <Input
                  id="apellido"
                  type="text"
                  value={formData.apellido}
                  onChange={(e) => setFormData(prev => ({ ...prev, apellido: e.target.value }))}
                  placeholder="Tu apellido"
                  required
                  className="bg-[#070707] border-[#23232a] text-white placeholder-gray-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="tu@email.com"
                required
                className="bg-[#070707] border-[#23232a] text-white placeholder-gray-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-300">Contraseña</label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Mínimo 6 caracteres"
                  required
                  className="bg-[#070707] border-[#23232a] text-white placeholder-gray-500 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">Repetir Contraseña</label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Repite tu contraseña"
                  required
                  className="bg-[#070707] border-[#23232a] text-white placeholder-gray-500 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full text-gray-400 hover:text-white"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-900/40 text-red-300 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-300 hover:bg-amber-400 text-black font-bold"
            >
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Button>

            <div className="text-center pt-4">
              <p className="text-gray-400">
                ¿Ya tienes cuenta?{' '}
                <Link href="/login" className="text-amber-300 hover:text-amber-400 font-medium">
                  Iniciar Sesión
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
