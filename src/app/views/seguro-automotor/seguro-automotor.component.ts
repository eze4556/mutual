import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonContent, IonList, IonFooter, IonItem, IonTabBar, IonTabButton, IonLabel } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seguro-automotor',
  templateUrl: './seguro-automotor.component.html',
  styleUrls: ['./seguro-automotor.component.scss'],
  standalone:true,
  imports:[CommonModule, IonHeader,IonToolbar,IonButtons,IonButton, IonIcon,IonTitle,
    IonContent,IonList,IonFooter,IonItem,IonTabBar,IonTabButton,IonLabel
  ]
})
export class SeguroAutomotorComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
