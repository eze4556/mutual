import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon,IonButtons,IonList, IonFooter,IonTabBar,IonTabButton,IonLabel, IonCard, IonCardContent, IonItem, IonInput } from '@ionic/angular/standalone';



import { IoniconsModule } from 'src/app/common/modules/ionicons.module';

@Component({
  selector: 'app-afiliacion',
  templateUrl: './afiliacion.component.html',
  styleUrls: ['./afiliacion.component.scss'],
   standalone: true,
  imports: [IonInput, IonItem, IonCardContent, IonCard, IonHeader, IoniconsModule, IonToolbar, IonTitle, IonContent, IonButton,IonIcon,IonButtons,IonList,IonFooter,IonTabBar,IonTabButton,IonLabel  ],
})
export class AfiliacionComponent  implements OnInit {


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }




}
