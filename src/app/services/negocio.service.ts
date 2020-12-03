import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';
import swal from 'sweetalert2';
import { time } from 'console';
@Injectable({
  providedIn: 'root',
})
export class NegocioService {
  PATH_USER = 'usuarios';
  PATH_NEGOCIO = 'negocios';
  UID = '';
  constructor(
    private afs: AngularFirestore,
    private authSvc: AuthService,
    private afstorage: AngularFireStorage
  ) {
    this.authSvc.getUID().then((uid) => {
      this.UID = uid;
    });
  }

  public async eliminarNegocio(id: string) {
    await this.authSvc.getUID().then((uid) => {
      this.UID = uid;
    });
    return this.afs
      .collection(this.PATH_USER)
      .doc(this.UID)
      .collection(this.PATH_NEGOCIO)
      .doc(id)
      .delete();
  }

  public async consultarNegocio(id: string) {
    await this.authSvc.getUID().then((uid) => {
      this.UID = uid;
    });
    return this.afs
      .collection(this.PATH_USER)
      .doc(this.UID)
      .collection(this.PATH_NEGOCIO)
      .doc(id)
      .valueChanges();
  }

  public async consultarNegocios() {
    await this.authSvc.getUID().then((uid) => {
      this.UID = uid;
    });
    return this.afs
      .collection(this.PATH_USER)
      .doc(this.UID)
      .collection(this.PATH_NEGOCIO)
      .valueChanges();
  }

  public async actualizarNegocio(id: string, form: FormGroup, imageFile: File) {
    await this.authSvc.getUID().then((uid) => {
      this.UID = uid;
    });
    const timestamp = new Date();
    if (imageFile !== undefined) {
      this.afstorage
        .upload(
          this.PATH_USER +
            '/' +
            this.UID +
            '/' +
            this.PATH_NEGOCIO +
            '/' +
            id +
            '/' +
            id +
            timestamp.getMilliseconds() +
            '.jpg',
          imageFile
        )
        .then((state) => {
          state.ref.getDownloadURL().then((download) => {
            form.value.photoPath = download;
            return this.afs
              .collection(this.PATH_USER)
              .doc(this.UID)
              .collection(this.PATH_NEGOCIO)
              .doc(id)
              .update(form.value);
          });
        });
    } else {
      return this.afs
        .collection(this.PATH_USER)
        .doc(this.UID)
        .collection(this.PATH_NEGOCIO)
        .doc(id)
        .update(form.value);
    }
  }

  public async buscarNegocio(negocio: string) {
    await this.authSvc.getUID().then((uid) => {
      this.UID = uid;
    });
    return this.afs
      .collection(this.PATH_USER)
      .doc(this.UID)
      .collection(this.PATH_NEGOCIO)
      .ref.where('nombre', '==', negocio);
  }

  public crearNegocio(form: FormGroup, imageFile: File) {
    return new Promise<boolean>((resolve, reject) => {
      this.authSvc.getUser().subscribe((us) => {
        console.log('a')
        console.log(us.emailVerified);
      });
      return this.afs
        .collection(this.PATH_USER)
        .doc(this.UID)
        .collection(this.PATH_NEGOCIO)
        .add(form.value)
        .then((doc) => {
          if (imageFile !== undefined) {
            this.afstorage
              .upload(
                this.PATH_USER +
                  '/' +
                  this.UID +
                  '/' +
                  this.PATH_NEGOCIO +
                  '/' +
                  doc.id +
                  '/' +
                  doc.id +
                  '.jpg',
                imageFile
              )
              .then((task) => {
                task.ref.getDownloadURL().then((url) => {
                  doc
                    .update({
                      photoPath: url,
                      id: doc.id,
                    })
                    .then((r) => {
                      resolve(true);
                    });
                });
              })
              .catch((err) => {
                resolve(false);
                console.log(err);
              })
              .catch((err) => {
                resolve(false);
                console.log(err);
              });
          } else {
            doc
              .update({
                id: doc.id,
              })
              .then((r) => {
                resolve(true);
              });
          }
        })
        .catch((err) => {
          resolve(false);
          console.log(err);
        })
        .then((e) => {
          resolve(true);
          console.log(e);
        });
    });
  }
}
