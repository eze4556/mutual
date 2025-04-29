import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonSpinner,
  IonIcon,
  IonText,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/common/services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    IonText,
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonIcon,
    IonContent,
    IonInput,
    IonButton,
    IonItem,
    IonLabel,
    IonSpinner,
  ],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmarPassword: ['', Validators.required],
      dni: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }

  async submitForm() {
    if (this.registerForm.invalid) {
      return;
    }

    const password = this.registerForm.get('password')?.value;
    const confirmarPassword = this.registerForm.get('confirmarPassword')?.value;

    if (password !== confirmarPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      this.successMessage = '';
      return;
    }

    this.isSubmitting = true;

    const formData = {
      nombre_completo: this.registerForm.get('nombre')?.value,
      email: this.registerForm.get('email')?.value,
      password: password,
      dni: this.registerForm.get('dni')?.value,
      telefono: this.registerForm.get('telefono')?.value,
    };

    try {
      const response = await firstValueFrom(
        this.authService.register(formData)
      );
      console.log('Registro exitoso:', response);

      this.successMessage = response?.message;
      this.errorMessage = '';
      this.registerForm.reset();
    } catch (e: any) {
      console.error('Error al registrar:', e);

      if (e?.error?.message) {
        this.errorMessage = e.error.message;
      } else {
        this.errorMessage = 'Ha ocurrido un error al subir el formulario';
      }
      this.successMessage = '';
    } finally {
      this.isSubmitting = false;
    }
  }
}
