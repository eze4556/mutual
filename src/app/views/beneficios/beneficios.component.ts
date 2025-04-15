import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonCard,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonButtons,
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonLabel,
} from '@ionic/angular/standalone';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';

@Component({
  selector: 'app-beneficios',
  templateUrl: './beneficios.component.html',
  styleUrls: ['./beneficios.component.scss'],
  standalone: true,
  imports: [
    CommonModule, // ✅ necesario para usar *ngFor y otras directivas estructurales
    IoniconsModule,
    IonCard,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonButtons,
    IonFooter,
    IonTabBar,
    IonTabButton,
    IonLabel
  ],
})
export class BeneficiosComponent implements OnInit {
  beneficios = [
    {
      titulo: 'Geolocalización de servicios',
      descripcion: 'Disfrutá de importantes ahorros en una variedad de tiendas y servicios gracias a nuestros convenios exclusivos.'
    },
    {
      titulo: 'Amplia gama de servicios',
      descripcion: 'Desde atención médica y asesoramiento legal hasta actividades recreativas, ofrecemos servicios que cubren todas tus necesidades.'
    },
    {
      titulo: 'Trámites Simplificados',
      descripcion: 'Realiza trámites importantes, cómo la entrega de documentación, sin moverte de casa, ahorrando tiempo y esfuerzo.'
    },
    {
      titulo: 'Credencial Digital',
      descripcion: 'Accede de manera rápida y segura a todos tus beneficios y servicios con tu credencial digital desde tu celular.'
    },
    {
      titulo: 'Consultas Médicas Online',
      descripcion: 'Recibe atención médica de calidad desde la comodidad de tu hogar, sin necesidad de desplazamientos.'
    },
    {
      titulo: 'Sistemas de Descuentos',
      descripcion: 'Disfruta de importantes ahorros en una variedad de tiendas y servicios gracias a nuestros convenios exclusivos.'
    },
    {
      titulo: 'Agenda de Turnos',
      descripcion: 'Solicita y gestiona tus turnos médicos de forma sencilla y rápida desde tu dispositivo móvil.'
    }
  ];

  constructor() {}
  ngOnInit() {}
}
