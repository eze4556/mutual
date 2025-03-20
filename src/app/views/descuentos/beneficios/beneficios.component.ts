import { Component, OnInit } from '@angular/core';


import { IonHeader, IonToolbar,IonCard, IonTitle, IonContent, IonButton, IonIcon,IonButtons,IonList, IonFooter,IonTabBar,IonTabButton,IonLabel, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';


@Component({
  selector: 'app-beneficios',
  templateUrl: './beneficios.component.html',
  styleUrls: ['./beneficios.component.scss'],
   standalone: true,
    imports: [IonCardContent,IoniconsModule, IonCardTitle,IonCard, IonCardHeader, IonHeader, IonToolbar, IonTitle, IonContent, IonButton,IonIcon,IonButtons,IonList,IonFooter,IonTabBar,IonTabButton,IonLabel  ],
})
export class BeneficiosComponent  implements OnInit {

  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}

}
