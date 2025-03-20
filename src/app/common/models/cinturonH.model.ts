// src/app/models/belt-buckle.model.ts

export interface BuckleBelt {
  id: string;                 // Identificador único
  buckleColor: string;       // Color de la hebilla
  size: string;              // Talle del cinturón
  fabricDesign: string;      // Diseño de la tela
  width: number;             // Ancho del cinturón (cm)
  fechaCreacion: Date;       // Fecha de creación
  // imagenUrl?: string;
      imagenesUrl?: string[];  // Almacenar múltiples URLs de imágenes

  price: string;

  // Propiedades de la Hebilla
  brand?: string;            // Marca de la hebilla (opcional)
  style: string;             // Estilo de la hebilla (ej. Country)
  model?: string;            // Modelo de la hebilla (opcional, ej. Western)
  targetAgeGroup: number;    // Público dirigido (ej. Adultos)
  currency: 'USD' | 'EUR' | 'ARS';
}
