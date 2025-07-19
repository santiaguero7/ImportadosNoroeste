-- Crear la tabla de perfumes en Supabase
CREATE TABLE perfumes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    category VARCHAR(10) CHECK (category IN ('mujer', 'hombre', 'unisex')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para actualizar updated_at
CREATE TRIGGER update_perfumes_updated_at 
    BEFORE UPDATE ON perfumes 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insertar datos de ejemplo
INSERT INTO perfumes (name, description, price, image_url, category) VALUES
('Chanel No. 5', 'El perfume más icónico de todos los tiempos. Una fragancia floral aldehídica que ha cautivado a mujeres de todo el mundo durante más de un siglo.', 85000, 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&crop=center', 'mujer'),
('Dior Sauvage', 'Una fragancia masculina fresca y especiada. Notas de bergamota, pimienta de Sichuan y ambroxan que crean una composición magnética.', 75000, 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=400&fit=crop&crop=center', 'hombre'),
('Tom Ford Black Orchid', 'Una fragancia unisex misteriosa y sensual. Combina trufa negra, ylang-ylang, bergamota y orquídea negra en una mezcla hipnótica.', 120000, 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop&crop=center', 'unisex'),
('Dolce & Gabbana Light Blue', 'Frescura mediterránea para mujer. Notas de limón siciliano, manzana Granny Smith y cedro que evocan un verano eterno.', 65000, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop&crop=center', 'mujer'),
('Versace Eros', 'Pasión y deseo masculino. Una fragancia oriental amaderada con notas de menta, manzana verde y vainilla que seducen los sentidos.', 68000, 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop&crop=center', 'hombre'),
('Yves Saint Laurent Libre', 'Libertad y elegancia femenina. Lavanda de Francia y flor de azahar de Marruecos en una composición audaz y sofisticada.', 78000, 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=400&fit=crop&crop=center', 'mujer'),
('Creed Aventus', 'El rey de las fragancias masculinas. Piña, grosella negra, abedul y almizcle en una composición que simboliza el éxito.', 180000, 'https://images.unsplash.com/photo-1594736797933-d0eb32d25330?w=400&h=400&fit=crop&crop=center', 'hombre'),
('Maison Margiela Replica By the Fireplace', 'Calidez y comodidad unisex. Castañas asadas, clavo de olor y vainilla que recrean la atmósfera de una chimenea.', 95000, 'https://images.unsplash.com/photo-1610889556528-6c7c98c3f759?w=400&h=400&fit=crop&crop=center', 'unisex'),
('Lancôme La Vie Est Belle', 'La vida es bella para la mujer moderna. Iris, jazmín, flor de azahar y vainilla en una celebración de la felicidad.', 82000, 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=400&h=400&fit=crop&crop=center', 'mujer'),
('Paco Rabanne 1 Million', 'Lujo y opulencia masculina. Canela, cuero, menta y rosa en una fragancia que huele a dinero y éxito.', 72000, 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=400&h=400&fit=crop&crop=center', 'hombre'),
('Viktor&Rolf Flowerbomb', 'Explosión floral para mujer. Sambac, jazmín, rosa, patchouli y vainilla en una bomba de feminidad seductora.', 88000, 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop&crop=center', 'mujer'),
('Le Labo Santal 33', 'Culto unisex del sándalo. Sándalo australiano, cardamomo, iris y violeta en una fragancia que define una generación.', 140000, 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=400&h=400&fit=crop&crop=center', 'unisex');

-- Crear bucket para almacenar imágenes (ejecutar en Supabase Storage)
-- Nombre del bucket: perfumes
-- Políticas de acceso: public para lectura
