'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        router.push('/admin')
      } else {
        setError('Contraseña incorrecta')
      }
    } catch (error) {
      setError('Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center text-amber-300 hover:text-amber-200 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al sitio
          </Link>
        </div>
        
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border-amber-300/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-playfair font-bold text-amber-300">
              Panel de Administración
            </CardTitle>
            <p className="text-gray-400 mt-2">
              Ingresa la contraseña para acceder
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-white">
                  Contraseña de administrador
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa la contraseña"
                    required
                    className="pr-12 bg-black/30 border-gray-600 text-white placeholder-gray-400 focus:border-amber-300"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <div className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/30 rounded-md p-3">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-amber-300 hover:bg-amber-400 text-black font-bold"
                disabled={loading}
              >
                {loading ? 'Verificando...' : 'Acceder al Panel'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-600/30">
              <p className="text-xs text-gray-500 text-center">
                Solo administradores autorizados pueden acceder a esta área
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
