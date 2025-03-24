import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';


@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule,IoniconsModule,],
})
export class ServiceCardComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
