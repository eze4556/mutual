import { Component,OnInit } from '@angular/core';
import { IonHeader, IonGrid, IonCardHeader, IonCardTitle,IonFooter,IonTabButton, IonTabBar, IonCardContent, IonCol, IonRow, IonToolbar, IonTitle, IonContent, IonLabel, IonList, IonItem, IonCard, IonInput, IonSpinner, IonButtons, IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';
import { UserI } from '../common/models/users.models';
import { FirestoreService } from '../common/services/firestore.service';
import { FormsModule } from '@angular/forms';
import { IoniconsModule } from '../common/modules/ionicons.module';
import { AuthService } from 'src/app/common/services/auth.service';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonImg, IonList, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput,
    IonIcon, IonButton, IonButtons, IonSpinner, IonInput, IonCard,IonFooter,IonTabButton,
    FormsModule,IonTabBar,
    IoniconsModule,CommonModule, IonGrid, IonCol, IonRow, IonCardHeader, IonCardTitle,IonCardContent,
  ],
})
export class HomePage implements OnInit {

 users: UserI[] = [];
  newUser: UserI = this.initUser();
  cargando: boolean = false;
  user: UserI | undefined;
  showForm: boolean = false;

  constructor(private firestoreService: FirestoreService, private navCtrl: NavController,private authService: AuthService,private router: Router,  private navController: NavController,) {}

  ngOnInit() {
    this.loadUsers();
    this.getUser();
  }

  loadUsers() {
    this.firestoreService.getCollectionChanges<UserI>('Usuarios').subscribe(data => {
      if (data) {
        this.users = data;
      }
    });
  }

  irAcARRITO(){
    this.navController.navigateRoot('/carrito')
  }

  initUser(): UserI {
    return {
      id: this.firestoreService.createIdDoc(),
      nombre: '',
      apellido: '',
      password: '',
    };
  }

  async save() {
    this.cargando = true;
    const userId = this.newUser.id;
    await this.firestoreService.createUserWithSubcollections(this.newUser, userId);
    this.cargando = false;
    this.newUser = this.initUser();
    this.showForm = false;
  }

  async edit(user: UserI) {
    console.log(user.id)
    this.navCtrl.navigateForward(`/home/${user.id}`);
  }


async delete(user: UserI) {
  try {
    this.cargando = true;
    console.log(user.id)
    await this.firestoreService.deleteDocumentID('Usuarios', user.id);
    this.cargando = false;
    // this.loadUsers();
  } catch (error) {
    this.cargando = false;
    console.error('Error al eliminar usuario:', error);

  }
}

  async getUser() {
    const authUser = await this.firestoreService.getAuthUser();
    if (authUser) {
      const uid = authUser.uid;
      const res = await this.firestoreService.getDocument<UserI>('Usuarios/' + uid);
      this.user = res['data']();
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  navigateToPage(page: string) {
    // Implementa la lógica de navegación aquí
  }

  ver(user: UserI) {
  this.navCtrl.navigateForward(`/ver-usuario/${user.id}`);
}


  goBack() {
    window.history.back();
  }



  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }



}
