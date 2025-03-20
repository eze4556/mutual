

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlShortenerService {
  private apiUrl = 'https://api.tinyurl.com/create';
  private apiKey = 'nNRgzGIiQVp3NiT2clQMutn3pXSzhHb5vXMopOcK6E07lEM1OsUX0UmPgzgO';

  constructor(private http: HttpClient) {}

   // Método para acortar cualquier URL
  async shortenUrl(longUrl: string): Promise<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    });

    const body = {
      url: longUrl,
      domain: 'tiny.one'
    };

    try {
      const response: any = await this.http.post(this.apiUrl, body, { headers }).toPromise();
      return response.data.tiny_url; // Devuelve la URL acortada
    } catch (error) {
      console.error('Error al acortar la URL:', error);
      throw error;
    }
  }
}

