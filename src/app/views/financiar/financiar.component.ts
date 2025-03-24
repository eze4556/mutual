import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';


@Component({
  selector: 'app-financiar',
  templateUrl: './financiar.component.html',
  styleUrls: ['./financiar.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule,IoniconsModule,],
})
export class FinanciarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
