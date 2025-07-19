#!/bin/bash

# Script de inicialización para Importados Noroeste

echo "🚀 Configurando Importados Noroeste..."

# Crear archivo .env.local si no existe
if [ ! -f .env.local ]; then
    echo "📝 Creando archivo .env.local..."
    cp .env.local.example .env.local
    echo "✅ Archivo .env.local creado. Por favor, configura las variables de entorno."
else
    echo "✅ Archivo .env.local ya existe."
fi

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Verificar instalación
if [ $? -eq 0 ]; then
    echo "✅ Dependencias instaladas correctamente."
else
    echo "❌ Error al instalar dependencias."
    exit 1
fi

echo ""
echo "🎉 ¡Configuración completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Configura las variables de entorno en .env.local"
echo "2. Si tienes Supabase, ejecuta el script database.sql"
echo "3. Ejecuta 'npm run dev' para iniciar el servidor"
echo ""
echo "📖 Lee el README.md para más detalles."
