export interface CertificacionIngresosI {
  id: string; 
    ano: number;
    pdf: string; // URL del archivo PDF
    usuarioId: string; // Referencia al documento del usuario
  }