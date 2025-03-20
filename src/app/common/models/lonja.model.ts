export interface LeatherStrap {
  id: string;             // Identificador único
  cintos: string;         // Tipo de cintos (ej. Formal, Casual)
  ancho: number;          // Ancho del cinto (en cm)
  espesor: number;        // Espesor del cinto (en mm)
  color: string;          // Color del cinto
  material: string;       // Material del cinto (ej. Cuero, Sintético)
  fechaCreacion: Date;    // Fecha de creación
  // imagenUrl?: string;     
    imagenesUrl?: string[];

  price: number;
    currency: 'USD' | 'EUR' | 'ARS';
    largo: string;

}
