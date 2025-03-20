import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon,IonButtons,IonList, IonFooter,IonTabBar,IonTabButton,IonLabel } from '@ionic/angular/standalone';
import { IoniconsModule } from '../../common/modules/ionicons.module';



@Component({
  selector: 'app-descuentos',
  templateUrl: './descuentos.component.html',
  styleUrls: ['./descuentos.component.scss'],
  standalone: true,
  imports: [IonHeader, IoniconsModule, IonToolbar, IonTitle, IonContent, IonButton,IonIcon,IonButtons,IonList,IonFooter,IonTabBar,IonTabButton,IonLabel  ],
})
export class DescuentosComponent  implements OnInit {

  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}

}
