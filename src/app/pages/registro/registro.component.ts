import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AngularFireAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModel;
  constructor(private router: Router, private auth: AuthService) {}
  recordarme = false;
  ngOnInit() {
    this.usuario = new UsuarioModel();
  }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      text: 'Creando su usuario...',
      icon: 'info',
    });
    Swal.showLoading();
    this.auth
      .createUser(this.usuario.email, this.usuario.password)
      .then((res) => {
        // this.auth.sendVerificationEmail();
        Swal.fire({
          title: '¡Su cuenta ha sido creada!',
          text:
            'Ingrese a su correo electrónico y verifique su correo con el link que le hemos enviado.',
          icon: 'success',
        }).then((ok) => {
          if (ok.isConfirmed) {
            this.auth.logout();
            this.router.navigateByUrl('/login');
          }
        });
        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }
      })
      .catch((err) => {
        Swal.fire({
          title: 'Error',
          text:
            'Verifique que este correo no se encuentre en uso o haya ingresado un correo electrónico inválido.',
          icon: 'error',
        });
        console.log(err);
      });
    console.log(form);
  }
}
