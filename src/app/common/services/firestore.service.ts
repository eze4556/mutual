import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  docData,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  DocumentReference,
  DocumentData,
  WithFieldValue,
  UpdateData,
  getDocs
} from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Categoria } from '../models/categoria.models';
import { Apk } from '../models/apk.model';
// import { Belt , Buckle } from '../models/cinturonH.model';

import { BuckleBelt } from '../models/cinturonH.model';
import { Buckle } from '../models/bucke.model';
import { LeatherStrap } from '../models/lonja.model';




// Convertidor genérico para Firestore
const converter = <T>() => ({
  toFirestore: (data: WithFieldValue<T>) => data,
  fromFirestore: (snapshot: any) => snapshot.data() as T
});

const docWithConverter = <T>(firestore: Firestore, path: string) =>
  doc(firestore, path).withConverter(converter<T>());

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private firestore: Firestore = inject(Firestore);

    private storage: Storage = inject(Storage); // Inyectar el servicio de Storage


  constructor() { }

  getFirestoreInstance(): Firestore {
    return this.firestore;
  }

  getDocument<T>(enlace: string): Promise<DocumentData> {
    const document = docWithConverter<T>(this.firestore, enlace);
    return getDoc(document);
  }

  getDocumentChanges<T>(enlace: string): Observable<T> {
    const document = docWithConverter<T>(this.firestore, enlace);
    return docData(document) as Observable<T>;
  }

  getCollectionChanges<T>(path: string): Observable<T[]> {
    const itemCollection = collection(this.firestore, path);
    return collectionData(itemCollection, { idField: 'id' }) as Observable<T[]>;
  }

  createDocument<T>(data: T, enlace: string): Promise<void> {
    const document = docWithConverter<T>(this.firestore, enlace);
    return setDoc(document, data);
  }

  async createDocumentWithAutoId<T>(data: T, enlace: string): Promise<void> {
    const itemCollection = collection(this.firestore, enlace);
    const newDocRef = doc(itemCollection).withConverter(converter<T>());
    await setDoc(newDocRef, data);
  }

  async updateDocument<T>(data: UpdateData<T>, enlace: string, idDoc: string): Promise<void> {
    const document = docWithConverter<T>(this.firestore, `${enlace}/${idDoc}`);
    return updateDoc(document, data);
  }

  deleteDocumentID(enlace: string, idDoc: string): Promise<void> {
    const document = doc(this.firestore, `${enlace}/${idDoc}`);
    return deleteDoc(document);
  }

  deleteDocFromRef(ref: DocumentReference): Promise<void> {
    return deleteDoc(ref);
  }

  createIdDoc(): string {
    return uuidv4();
  }

  async getAuthUser() {
    return { uid: '05OTLvPNICH5Gs9ZsW0k' };
  }

  async createUserWithSubcollections(userData: any, userId: string): Promise<void> {
    const userRef = doc(this.firestore, `Usuarios/${userId}`);
    await setDoc(userRef, userData);

    // Create subcollections
    const subcollections = ['certIngreso', 'declaracionJurada', 'facturacion', 'infoPersonal', 'planPago', 'AFIP', 'sueldos', 'f931'];
    for (const subcollection of subcollections) {
      const subcollectionRef = doc(collection(userRef, subcollection));
      await setDoc(subcollectionRef, { initialized: true }); // Puedes añadir datos por defecto aquí
    }
  }

  async getDocumentIdInSubcollection(path: string, subcollection: string): Promise<string | null> {
    const subcollectionRef = collection(this.firestore, `${path}/${subcollection}`);
    const querySnapshot = await getDocs(subcollectionRef);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];  // Suponiendo que solo hay un documento
      return doc.id;
    } else {
      return null;
    }
  }



public async getDocumentById<T>(collectionPath: string, documentId: string): Promise<T | undefined> {
  try {
    const docRef = doc(this.firestore, collectionPath, documentId).withConverter(converter<T>());
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as T) : undefined;
  } catch (error) {
    console.error("Error al obtener el documento:", error);
    throw error; // Relanza el error para manejarlo en el componente
  }
}


  // categorias

  async createCategoria(categoria: Categoria): Promise<void> {
  const id = this.createIdDoc(); // Genera un id único
  categoria.fechaCreacion = new Date(); // Establece la fecha de creación
  await this.createDocument<Categoria>(categoria, `categorias/${id}`);
}


getCategorias(): Observable<Categoria[]> {
  return this.getCollectionChanges<Categoria>('categorias');
}


async updateCategoria(id: string, categoria: Partial<Categoria>): Promise<void> {
  await this.updateDocument<Categoria>(categoria, 'categorias', id);
}

async deleteCategoria(id: string): Promise<void> {
  await this.deleteDocumentID('categorias', id);
}



  // Función para subir un archivo (imagen o APK) y obtener la URL
  async uploadFile(file: File, path: string): Promise<string> {
    const storageRef = ref(this.storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  // Crear un APK
  async createApk(apk: Apk, apkFile: File, imageFile?: File): Promise<void> {
    if (imageFile) {
      const imagePath = `apks/images/${apk.nombre}_${uuidv4()}`; // Ruta donde se guardará la imagen
      apk.imagenUrl = await this.uploadFile(imageFile, imagePath); // Subir imagen y obtener URL
    }

    const apkPath = `apks/files/${apk.nombre}_${uuidv4()}`; // Ruta donde se guardará el archivo APK
    apk.apkUrl = await this.uploadFile(apkFile, apkPath); // Subir APK y obtener URL

    apk.fechaCreacion = new Date(); // Establece la fecha de creación
    const id = this.createIdDoc(); // Genera un id único para el APK
    await this.createDocument<Apk>(apk, `apks/${id}`);
  }

  // Obtener los APKs
  getApks(): Observable<Apk[]> {
    return this.getCollectionChanges<Apk>('apks');
  }

  // Actualizar un APK
  async updateApk(id: string, apk: Partial<Apk>, apkFile?: File, imageFile?: File): Promise<void> {
    if (imageFile) {
      const imagePath = `apks/images/${apk.nombre}_${uuidv4()}`; // Nueva ruta de imagen
      apk.imagenUrl = await this.uploadFile(imageFile, imagePath); // Subir nueva imagen y obtener URL
    }

    if (apkFile) {
      const apkPath = `apks/files/${apk.nombre}_${uuidv4()}`; // Nueva ruta de archivo APK
      apk.apkUrl = await this.uploadFile(apkFile, apkPath); // Subir nuevo APK y obtener URL
    }

    await this.updateDocument<Apk>(apk, 'apks', id);
  }

  // Eliminar un APK
  async deleteApk(id: string): Promise<void> {
    await this.deleteDocumentID('apks', id);
  }





   // *** BUCKLEBELTS (CINTURONES CON HEBILLAS) ***

  // Crear un BuckleBelt
  async createBuckleBelt(buckleBelt: BuckleBelt): Promise<void> {
    const id = this.createIdDoc(); // Genera un ID único
    buckleBelt.id = id; // Asigna el ID al objeto
    await this.createDocument<BuckleBelt>(buckleBelt, 'buckleBelts');
  }

  // Obtener todos los BuckleBelts
  getBuckleBelts(): Observable<BuckleBelt[]> {
    return this.getCollectionChanges<BuckleBelt>('buckleBelts');
  }

  // Obtener un BuckleBelt por ID
  async getBuckleBeltById(id: string): Promise<BuckleBelt | undefined> {
    return await this.getDocumentById<BuckleBelt>('buckleBelts', id);
  }

  // Actualizar un BuckleBelt
  async updateBuckleBelt(id: string, buckleBelt: Partial<BuckleBelt>): Promise<void> {
    await this.updateDocument<BuckleBelt>(buckleBelt, 'buckleBelts', id);
  }

  // Eliminar un BuckleBelt
  async deleteBuckleBelt(id: string): Promise<void> {
    await this.deleteDocumentID('buckleBelts', id);
  }


// *** BUCKLE (HEBILLAS) ***

// Crear un Buckle
async createBuckle(buckle: Buckle): Promise<void> {
  const id = this.createIdDoc(); // Genera un ID único
  buckle.id = id; // Asigna el ID al objeto
  await this.createDocument<Buckle>(buckle, 'buckles'); // Asigna al path 'buckles'
}

// Obtener todos los Buckles
getBuckles(): Observable<Buckle[]> {
  return this.getCollectionChanges<Buckle>('buckles');
}

// Obtener un Buckle por ID
async getBuckleById(id: string): Promise<Buckle | undefined> {
  return await this.getDocumentById<Buckle>('buckles', id);
}

// Actualizar un Buckle
async updateBuckle(id: string, buckle: Partial<Buckle>): Promise<void> {
  await this.updateDocument<Buckle>(buckle, 'buckles', id);
}

// Eliminar un Buckle
async deleteBuckle(id: string): Promise<void> {
  await this.deleteDocumentID('buckles', id);
}


// *** LEATHERSTRAP (LONJAS) ***

// Crear un LeatherStrap
async createLeatherStrap(leatherStrap: LeatherStrap): Promise<void> {
  const id = this.createIdDoc(); // Genera un ID único
  leatherStrap.id = id; // Asigna el ID al objeto
  await this.createDocument<LeatherStrap>(leatherStrap, 'leatherStraps'); // Asigna al path 'leatherStraps'
}

// Obtener todos los LeatherStraps
getLeatherStraps(): Observable<LeatherStrap[]> {
  return this.getCollectionChanges<LeatherStrap>('leatherStraps');
}

// Obtener un LeatherStrap por ID
async getLeatherStrapById(id: string): Promise<LeatherStrap | undefined> {
  return await this.getDocumentById<LeatherStrap>('leatherStraps', id);
}

// Actualizar un LeatherStrap
async updateLeatherStrap(id: string, leatherStrap: Partial<LeatherStrap>): Promise<void> {
  await this.updateDocument<LeatherStrap>(leatherStrap, 'leatherStraps', id);
}

// Eliminar un LeatherStrap
async deleteLeatherStrap(id: string): Promise<void> {
  await this.deleteDocumentID('leatherStraps', id);
}


 // Método para subir el PDF
  async uploadPdf(pdfBlob: Blob): Promise<string> {
    const filePath = `pedidos/pedido_${new Date().getTime()}.pdf`; // Define un nombre único para el archivo
    const file = new File([pdfBlob], filePath, { type: 'application/pdf' }); // Crear un objeto File
    const url = await this.uploadFile(file, filePath); // Llama al método de subida
    return url; // Devuelve la URL del archivo
  }


}
