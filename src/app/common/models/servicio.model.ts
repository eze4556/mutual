export interface ServicioI {
  id?: string;
  titulo: string;
  resumen: string;
  imagen1Url?: string;
  imagen2Url?: string;
  categorias: { nombre: string; subcategorias: string[] }[];
  faqs: { pregunta: string; respuesta: string }[];
}
