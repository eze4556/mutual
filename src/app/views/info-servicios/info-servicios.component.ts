import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { ServicioI } from 'src/app/common/models/servicio.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-servicios',
  templateUrl: './info-servicios.component.html',
  styleUrls: ['./info-servicios.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class InfoServiciosComponent implements OnInit {
  servicio: ServicioI | null = null;

  constructor(
    private route: ActivatedRoute,
    private firestoreService: FirestoreService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.servicio = await this.firestoreService.getServicioById(id);
    }
  }
}
