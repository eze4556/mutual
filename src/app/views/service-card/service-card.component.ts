import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { ServicioI } from 'src/app/common/models/servicio.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, IoniconsModule],
})
export class ServiceCardComponent implements OnInit {
  servicios: ServicioI[] = [];
  serviciosChunked: ServicioI[][] = [];
  constructor(private firestoreService: FirestoreService,
    private router:Router
  ) {}

  async ngOnInit() {
    this.servicios = await this.firestoreService.getServicios();
    this.chunkServicios(2); // de a 2 por fila
  }

  chunkServicios(size: number) {
    this.serviciosChunked = [];
    for (let i = 0; i < this.servicios.length; i += size) {
      this.serviciosChunked.push(this.servicios.slice(i, i + size));
    }
  }

  goToInfoServicio(id: string) {
    this.router.navigate(['/infoServicio', id]);
  }
}
