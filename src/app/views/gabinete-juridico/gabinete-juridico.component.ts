import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';



@Component({
  selector: 'app-gabinete-juridico',
  templateUrl: './gabinete-juridico.component.html',
  standalone: true,
  imports: [CommonModule, IonicModule,IoniconsModule],
  styleUrls: ['./gabinete-juridico.component.scss'],
})
export class GabineteJuridicoComponent  implements OnInit {

  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}

}
