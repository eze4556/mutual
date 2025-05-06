import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonIcon,
  IonButton,
  IonSpinner,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonIcon,
    IonButton,
    IonSpinner,
    ReactiveFormsModule,
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      dni: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async submitLogin() {
    if (this.loginForm.invalid) return;

    this.isSubmitting = true;
    const { dni, password } = this.loginForm.value;

    try {
      // Recuperamos el email utilizando el DNI
      const response = await await firstValueFrom(this.authService.getUserByDNI(dni));
      const email = response?.user?.email;
      console.log('Email recuperado:', email);
      if (!email) {
        this.errorMessage = 'No se encontró un usuario con ese DNI.';
        this.isSubmitting = false;
        return;
      }

      // Intentamos hacer login con Firebase usando el correo y la contraseña
      const userCredential = await this.authService.loginWithFirebase(email, password);

      const idToken = await userCredential.user?.getIdToken()

      console.log('ID Token:', idToken);

      // Redirigimos al usuario a la página principal
      this.router.navigate(['/home']);

    } catch (error) {
      console.error('Error al loguearse:', error);
      this.errorMessage = 'Correo o contraseña incorrectos.';
    } finally {
      this.isSubmitting = false;
    }
  }
}
