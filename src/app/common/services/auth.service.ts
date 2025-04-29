import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth, signInWithEmailAndPassword, signOut, authState, UserCredential } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  private apiUrl = environment.apiUrl;

  constructor(
    private auth: Auth,
    private http: HttpClient,
  ) {}

  register(formData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'user/register', formData);
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }


  logout(): Promise<void> {
    return signOut(this.auth);
  }

  getUser(): Observable<any> {
    return this.user$;
  }
}

