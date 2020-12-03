import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { RouterLinkActive, Router, ActivatedRoute } from '@angular/router';
import { Negocio } from '../../models/negocio.model';
import swal from 'sweetalert2';
import { NegocioService } from '../../services/negocio.service';
import { AuthService } from '../../services/auth.service';
import { isString } from 'util';
@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.component.html',
  styleUrls: ['./negocio.component.css'],
})
export class NegocioComponent implements OnInit {
  negocio: Negocio;
  negocioForm: any;
  formReady = true;
  message: string;
  imgURL: any = './assets/noimage.png';
  imagefile: any;
  create = false;
  uid = '';

  constructor(
    private fb: FormBuilder,
    private routerL: ActivatedRoute,
    private nService: NegocioService,
    private router: Router,
    private authSvc: AuthService
  ) {
    this.negocio = new Negocio();
    this.negocioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      direccion: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: ['', [Validators.required, Validators.minLength(2)]],
      encargado: ['', [Validators.required, Validators.minLength(2)]],
    });

    this.routerL.paramMap.subscribe((params) => {
      this.create = params.has('create');
      if (!this.create) {
        this.uid = params.get('id');
        this.nService.consultarNegocio(params.get('id')).then((doc) => {
          doc.subscribe((negocio) => {
            this.negocio = new Negocio();
            this.imgURL = negocio?.photoPath;
            this.negocioForm = this.fb.group({
              nombre: [
                negocio.nombre,
                [Validators.required, Validators.minLength(2)],
              ],
              direccion: [
                negocio.direccion,
                [Validators.required, Validators.minLength(2)],
              ],
              descripcion: [
                negocio.descripcion,
                [Validators.required, Validators.minLength(2)],
              ],
              encargado: [
                negocio.encargado,
                [Validators.required, Validators.minLength(2)],
              ],
            });
          });
        });
      }
    });
  }

  eliminarNegocio() {
    swal
      .fire({
        title: '¿Eliminar negocio?',
        text:
          'Tenga en cuenta que no puede recuperar la información de su negocio si lo elimina.',
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
        icon: 'warning',
      })
      .then((result) => {
        if (result.isConfirmed) {
          swal.fire({
            title: 'Eliminando su negocio',
            text: 'Estamos eliminando su negocio por favor espere',
            allowOutsideClick: false,
            icon: 'info',
          });
          swal.showLoading();
          this.nService.eliminarNegocio(this.uid).then((res) => {
            swal.close();
            swal
              .fire({
                title: 'Eliminado',
                text: 'Su negocio ha sido eliminado',
                allowOutsideClick: false,
                icon: 'success',
              })
              .then((ok) => {
                this.router.navigateByUrl('/crud/negocios');
              });
          });
        }
      });
  }

  actualizarNegocio() {
    if (this.negocioForm.invalid) {
      return;
    }
    swal.fire({
      title: 'Actualizando su negocio',
      text: 'Estamos actualizando su negocio por favor espere',
      allowOutsideClick: false,
      icon: 'info',
    });
    swal.showLoading();
    console.log(this.imagefile);
    this.nService
      .actualizarNegocio(this.uid, this.negocioForm, this.imagefile)
      .then(() => {
        swal.close();
        swal
          .fire({
            title: 'Listo',
            text: 'Hemos actualizando su negocio',
            allowOutsideClick: false,
            icon: 'success',
          })
          .then((ok) => {
            this.router.navigateByUrl('/crud/negocios');
          });
      });
  }
  crearNegocio() {
    if (this.negocioForm.invalid) {
      return;
    }
    swal.fire({
      title: 'Creando su negocio',
      text: 'Estamos creando su negocio por favor espere',
      allowOutsideClick: false,
      icon: 'info',
    });
    swal.showLoading();

    this.nService
      .crearNegocio(this.negocioForm, this.imagefile)
      .then((res) => {
        if (res) {
          console.log(res);
          swal.close();
          swal
            .fire({
              title: 'Su negocio ha sido creado',
              allowOutsideClick: false,
              text: 'Ahora podrá gestionarlo y verlo',
              icon: 'success',
            })
            .then((okButton) => {
              this.router.navigateByUrl('/crud/negocios');
            });
        } else {
          swal.close();
          swal.fire({
            title: 'Error',
            text:
              'Ha ocurrido un error creando su negocio, asegurese de que su correo este verificado',
            icon: 'error',
          });
        }
      })
      .catch((err) => {
        swal.close();
        swal.fire({
          title: 'Error',
          text:
            'Ha ocurrido un error creando su negocio, asegurese de que su e-mail fue verificado.',
          icon: 'error',
        });
      });
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.negocio.photoPath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.imagefile = files[0];
    };
  }
  ngOnInit(): void {}
}
