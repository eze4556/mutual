import { Component,OnInit } from '@angular/core';
import { IonHeader, IonGrid, IonCardHeader, IonCardTitle,IonFooter,IonTabButton, IonTabBar,
  IonCardContent, IonCol, IonRow, IonToolbar, IonTitle, IonContent, IonLabel, IonList, IonItem,
  IonCard, IonInput, IonSpinner, IonButtons, IonButton, IonIcon, IonImg, NavController } from '@ionic/angular/standalone';
import { FirestoreService } from '../common/services/firestore.service';
import { FormsModule } from '@angular/forms';
import { IoniconsModule } from '../common/modules/ionicons.module';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonImg, IonList, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, IonList,
    IonItem, IonInput, IonIcon, IonButton, IonButtons, IonSpinner,
    IonInput, IonCard,IonFooter,IonTabButton, FormsModule,IonTabBar,
    IoniconsModule,CommonModule, IonGrid, IonCol, IonRow, IonCardHeader, IonCardTitle,IonCardContent,
  ],
})
export class HomePage implements OnInit {

  bannerImage: string = '';
  credentialImage: string = '';

  beneficiosImage: string = '';
  descuentosImage: string = '';
  institucionalImage: string = '';
  serviciosImage: string = '';

  assistanceList: any[] = [];

  constructor(
    private firestoreService: FirestoreService,
  ) {}

  async ngOnInit() {
    await this.loadHomeData();
  }

  async loadHomeData() {
    try {
      // Banner
      const bannerData = await this.firestoreService.getSubCollectionItem('home', 'banner');
      if (bannerData?.imageUrl) {
        this.bannerImage = bannerData.imageUrl;
      }

      // Credencial
      const credencialData = await this.firestoreService.getSubCollectionItem('home', 'credential');
      if (credencialData?.imageUrl) {
        this.credentialImage = credencialData.imageUrl;
      }

      // Grid
      const gridData = await this.firestoreService.getGridSections();
      if (gridData) {
        this.beneficiosImage = gridData.beneficios || '';
        this.descuentosImage = gridData.descuentos || '';
        this.institucionalImage = gridData.institucional || '';
        this.serviciosImage = gridData.servicios || '';
      }

      // Asistencia
      this.assistanceList = await this.firestoreService.getAssistanceItems();
    } catch (error) {
      console.error('Error loading home data:', error);
    }
  }

  goBack() {
    window.history.back();
  }

}
