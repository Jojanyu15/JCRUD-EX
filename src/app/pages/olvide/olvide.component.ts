import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olvide',
  templateUrl: './olvide.component.html',
  styleUrls: ['./olvide.component.css'],
})
export class OlvideComponent implements OnInit {
  usuario: UsuarioModel;
  constructor(private authSvc: AuthService, private router: Router) {
    this.usuario = new UsuarioModel();
  }

  ngOnInit(): void {}
  sendEmail(form: NgForm) {
    if (form.invalid) {
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      text: 'Por favor espere',
      icon: 'info',
    });
    Swal.showLoading();
    this.authSvc
      .resetPassword(this.usuario.email)
      .then((res) => {
        Swal.close();
        Swal.fire({
          allowOutsideClick: false,
          title: 'E-mail enviado',
          text:
            'Hemos enviado un correo electrónico a el e-mail que ingresaste para que recuperes tu contraseña.',
          icon: 'success',
        }).then((event) => {
          if (event.value) {
            this.router.navigateByUrl('/login');
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          allowOutsideClick: false,
          title: 'Error',
          text:
            'El e-mail que ingresaste no es válido o no ha sido registrado.',
          icon: 'error',
        });
      });
  }
}
