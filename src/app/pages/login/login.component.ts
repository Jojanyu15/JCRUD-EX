import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authSvc: AuthService, private router: Router) {}
  usuario: UsuarioModel;
  recordarme = false;
  ngOnInit() {
    this.usuario = new UsuarioModel();
    this.authSvc.isLoggedIn().then((logged) => {
      if (logged) {
        this.router.navigateByUrl('/crud/home');
      }
    });
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(form: NgForm) {
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
      .login(this.usuario.email, this.usuario.password)
      .then((res) => {
        console.log(res);
        Swal.close();
        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }
        this.router.navigateByUrl('/crud/home');
      })
      .catch((err) => {
        Swal.fire({
          allowOutsideClick: false,
          title: 'Error al autenticar',
          text: 'Correo o contraseña inválidos, por favor verifique',
          icon: 'error',
        });
        console.log(err);
      });
  }
}
