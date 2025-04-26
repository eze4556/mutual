import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AfiliacionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  subirFormulario(dni: string, archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('dni', dni);
    formData.append('file', archivo);

    return this.http.post(this.apiUrl + 'afiliado/solicitar', formData);
  }
}
