export interface Apk {
  id?: string;
  nombre: string;
  descripcion: string;
  imagenUrl?: string; // URL de la imagen subida
  apkUrl?: string; // URL del archivo APK subido
  categoriaId?: string; // ID de la categoría opcional
  fechaCreacion: Date;
}
