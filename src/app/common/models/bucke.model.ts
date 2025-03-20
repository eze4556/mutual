export interface Buckle {
  id: string;             // Identificador único
  modelo: string;          // Modelo de la hebilla
  material: string;        // Material de la hebilla (ej. Metal)
  medida: string;          // Medida de la hebilla (ej. 4x6 cm)
  peso: number;            // Peso de la hebilla (en gramos)
  fechaCreacion: Date;     // Fecha de creación
  imagenUrl?: string;
  imagenesUrl?: string[];

  price: string;
  currency: 'USD' | 'EUR' | 'ARS';
}
