export interface Categoria {
  id?: string;          // Opcional, el id se genera automáticamente en Firestore
  nombre: string;       // Nombre de la categoría
  descripcion?: string; // Descripción opcional de la categoría
  fechaCreacion: Date;  // Fecha de creación de la categoría
}
