# Importados Noroeste - Tienda de Perfumes

Una aplicación web moderna para la venta de perfumes importados, desarrollada con Next.js 14, TypeScript, Tailwind CSS y Supabase.

## 🌟 Características

- **Diseño moderno y responsive** con colores y estilo de Lovable
- **Página principal** con hero section y promociones
- **Catálogo completo** con filtros por categoría y precio
- **Búsqueda en tiempo real** por nombre de perfume
- **Integración con WhatsApp** para compras directas
- **Panel de administración** para gestión de productos
- **Subida de imágenes** a Supabase Storage
- **Base de datos** con Supabase PostgreSQL

## 🚀 Tecnologías

- **Frontend**: Next.js 14, React, TypeScript
- **Estilos**: Tailwind CSS v4
- **Base de datos**: Supabase (PostgreSQL)
- **Almacenamiento**: Supabase Storage
- **Componentes**: Componentes UI personalizados
- **Iconos**: Lucide React
- **Hosting**: Vercel (recomendado)

## 📦 Instalación

1. **Clona el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd ImportadosNoroeste
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura Supabase**
   - Crea una cuenta en [Supabase](https://supabase.com)
   - Crea un nuevo proyecto
   - Ejecuta el script SQL en `database.sql` en el editor SQL de Supabase
   - Crea un bucket llamado `perfumes` en Storage con políticas públicas para lectura

4. **Configura las variables de entorno**
   - Copia `.env.local` y actualiza los valores:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
   NEXT_PUBLIC_WHATSAPP_NUMBER=tu_numero_whatsapp
   ADMIN_PASSWORD=tu_contraseña_admin
   ```

5. **Ejecuta la aplicación**
   ```bash
   npm run dev
   ```

## 🗂️ Estructura del Proyecto

```
src/
├── app/
│   ├── admin/
│   │   └── page.tsx          # Panel de administración
│   ├── globals.css           # Estilos globales
│   ├── layout.tsx            # Layout principal
│   └── page.tsx              # Página principal
├── components/
│   ├── ui/                   # Componentes UI base
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   ├── FilterSidebar.tsx     # Sidebar de filtros
│   ├── Footer.tsx            # Footer
│   ├── Hero.tsx              # Hero section
│   ├── Navbar.tsx            # Navegación
│   ├── PerfumeCard.tsx       # Tarjeta de perfume
│   └── Promotions.tsx        # Sección de promociones
├── lib/
│   ├── supabase.ts           # Configuración Supabase
│   └── utils.ts              # Utilidades
└── services/
    └── perfumeService.ts     # Servicios de perfumes
```

## 🎨 Personalización

### Colores
Los colores están basados en el diseño de Lovable:
- **Primary**: `hsl(262, 83%, 58%)` - Púrpura vibrante
- **Accent**: `hsl(217, 91%, 60%)` - Azul brillante
- **Background**: `hsl(220, 26%, 14%)` - Gris oscuro
- **Foreground**: `hsl(210, 40%, 98%)` - Blanco suave

### Tipografía
- **Títulos**: Playfair Display (serif)
- **Cuerpo**: Inter (sans-serif)

## 🛠️ Funcionalidades

### Página Principal
- Hero section con llamada a la acción
- Sección de promociones y beneficios
- Catálogo con filtros y búsqueda
- Grid responsive de productos

### Funcionalidades de Filtrado
- Filtro por categoría (Mujer, Hombre, Unisex)
- Filtro por rango de precios
- Búsqueda por nombre
- Filtros rápidos de precio

### Integración WhatsApp
- Mensaje personalizado con nombre del producto
- Apertura automática de WhatsApp
- Número configurable por variable de entorno

### Panel de Administración
- Autenticación con contraseña
- CRUD completo de productos
- Subida de imágenes con preview
- Interfaz intuitiva y responsive

## 📱 Responsive Design

La aplicación está completamente optimizada para:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔧 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting
```

## 🚀 Despliegue en Vercel

1. **Conecta tu repositorio** a Vercel
2. **Configura las variables de entorno** en el dashboard de Vercel
3. **Despliega** automáticamente con cada push

## 📊 Base de Datos

### Tabla `perfumes`
```sql
- id: SERIAL PRIMARY KEY
- name: VARCHAR(255) NOT NULL
- description: TEXT
- price: DECIMAL(10, 2) NOT NULL
- image_url: TEXT
- category: VARCHAR(10) CHECK (category IN ('mujer', 'hombre', 'unisex'))
- created_at: TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
- updated_at: TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
```

## 🔐 Seguridad

- Autenticación del admin con contraseña
- Validación de datos en frontend y backend
- Políticas de seguridad en Supabase
- Sanitización de inputs

## 📞 Soporte

Para soporte técnico o preguntas sobre la implementación:
- Email: soporte@importadosnoroeste.com
- WhatsApp: +54 9 11 1234-5678

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Desarrollado con ❤️ para Importados Noroeste**
