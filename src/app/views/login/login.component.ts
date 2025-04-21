import { IonContent, IonItem, IonLabel, IonInput, IonIcon, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:true,
  imports:[CommonModule, IonContent, IonItem,IonLabel,IonInput,IonIcon,IonButton
  ]
})
export class LoginComponent implements OnInit {
  showPassword = false;

  constructor() {}

  ngOnInit() {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
