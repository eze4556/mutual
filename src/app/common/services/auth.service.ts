import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth, signInWithEmailAndPassword, signOut, authState, UserCredential, signInWithCustomToken } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private auth: Auth,
    private http: HttpClient,
  ) {}

  register(formData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'user/register', formData);
  }

  loginWithFirebase(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithCustomToken(customToken: string) {
    return from(signInWithCustomToken(this.auth, customToken));
  }

  getUserByDNI(dni: string): Observable<any> {
    return this.http.get(this.apiUrl + 'user/profile/' + dni);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}

