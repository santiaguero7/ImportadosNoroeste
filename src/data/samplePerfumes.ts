// Datos de ejemplo para probar la aplicación sin base de datos
// Coloca este archivo en src/data/samplePerfumes.ts

export const samplePerfumes = [
  {
    id: 1,
    name: "Chanel No. 5",
    description: "El perfume más icónico de todos los tiempos. Una fragancia floral aldehídica que ha cautivado a mujeres de todo el mundo durante más de un siglo.",
    price: 85000,
    image_url: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop&crop=center&auto=format",
    category: "mujer" as const,
    size: "100ml",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: "Dior Sauvage",
    description: "Una fragancia masculina fresca y especiada. Notas de bergamota, pimienta de Sichuan y ambroxan que crean una composición magnética.",
    price: 75000,
    image_url: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&h=800&fit=crop&crop=center&auto=format",
    category: "hombre" as const,
    size: "100ml",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 3,
    name: "Tom Ford Black Orchid",
    description: "Una fragancia unisex misteriosa y sensual. Combina trufa negra, ylang-ylang, bergamota y orquídea negra en una mezcla hipnótica.",
    price: 120000,
    image_url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&h=800&fit=crop&crop=center&auto=format",
    category: "unisex" as const,
    size: "100ml",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 4,
    name: "Dolce & Gabbana Light Blue",
    description: "Frescura mediterránea para mujer. Notas de limón siciliano, manzana Granny Smith y cedro que evocan un verano eterno.",
    price: 65000,
    image_url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=800&fit=crop&crop=center&auto=format",
    category: "mujer" as const,
    size: "100ml",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 5,
    name: "Versace Eros",
    description: "Pasión y deseo masculino. Una fragancia oriental amaderada con notas de menta, manzana verde y vainilla que seducen los sentidos.",
    price: 68000,
    image_url: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&h=800&fit=crop&crop=center&auto=format",
    category: "hombre" as const,
    size: "100ml",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 6,
    name: "Yves Saint Laurent Libre",
    description: "Libertad y elegancia femenina. Lavanda de Francia y flor de azahar de Marruecos en una composición audaz y sofisticada.",
    price: 78000,
    image_url: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=800&fit=crop&crop=center&auto=format",
    category: "mujer" as const,
    size: "100ml",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  }
]
