import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonCard,
  IonCardContent,
  IonItem,
  IonInput,
} from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';
import { AfiliacionService } from 'src/app/common/services/afiliacion.service';

@Component({
  selector: 'app-afiliacion',
  templateUrl: './afiliacion.component.html',
  styleUrls: ['./afiliacion.component.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonItem,
    IonCardContent,
    IonCard,
    IonHeader,
    IoniconsModule,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonFooter,
    IonTabBar,
    IonTabButton,
    IonLabel,
    CommonModule,
    FormsModule,
  ],
})
export class AfiliacionComponent {
  selectedFile: File | null = null;
  dni: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  @ViewChild('fileInput', { static: false }) fileInput: any;

  constructor(private afiliacionService: AfiliacionService) {}

  validateDNI() {
    this.dni = this.dni.replace(/\D/g, ''); // Reemplaza todo lo que no sea número
  }

  triggerFileInput() {
    // Simula un click para pedir un archivo
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    // Guarda el archivo en memoria
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (file.type !== 'application/pdf') {
        this.selectedFile = null;
        this.errorMessage = 'Solo se permiten archivos PDF.';
        this.successMessage = '';
        return;
      }

      this.selectedFile = file;
      this.errorMessage = '';
      this.successMessage = '';
    }
  }

  async submitForm() {
    if (!this.dni || !this.selectedFile) {
      this.errorMessage = 'Debes ingresar el DNI y seleccionar un archivo PDF.';
      this.successMessage = '';
      return;
    }
    this.errorMessage = '';

    try {
      const res = await firstValueFrom(
        this.afiliacionService.subirFormulario(this.dni, this.selectedFile)
      );
      // Si la respuesta es exitosa, mostramos el mensaje de éxito
      if (res?.message) {
        this.successMessage = res.message;
      }
      this.errorMessage = '';
      this.selectedFile = null;
      this.dni = '';
    } catch (e: any) {
      // Si ocurre un error, intentamos acceder al mensaje de error del servidor
      if (e?.error?.message) {
        this.errorMessage = e.error.message;
      } else {
        this.errorMessage = 'Ha ocurrido un error al subir el formulario';
      }
      this.successMessage = '';
      console.error('Error al subir el formulario:', e);
    }
  }
}
