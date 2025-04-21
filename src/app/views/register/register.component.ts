import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent,
  IonInput, IonButton, IonItem, IonLabel, IonSpinner,IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon,
    IonContent, IonInput, IonButton, IonItem, IonLabel, IonSpinner
  ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {}

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

  submitForm() {
    if (this.registerForm.valid) {
      this.isSubmitting = true;
      const formData = this.registerForm.value;

      // Procesar el formulario...
      console.log('Formulario enviado:', formData);

      // Simulación de envío
      setTimeout(() => {
        this.isSubmitting = false;
        this.registerForm.reset();
      }, 2000);
    }
  }
}
