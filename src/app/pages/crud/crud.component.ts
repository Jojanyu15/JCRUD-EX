import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit {
  USER_VERIFIED = false;
  constructor(private auth: AuthService) {}
  sendEmail() {
    this.auth.sendVerificationEmail();
    swal.fire({
      title: '¡Email enviado!',
      text:
        'Hemos enviado a su correo un e-mail de verificación. Por favor revise',
    });
  }

  ngOnInit(): void {
    this.auth.getUser().subscribe((user) => {
      user.getIdToken(true).then((x) => {
        this.USER_VERIFIED = user.emailVerified;
        if (!this.USER_VERIFIED) {
          this.auth.sendVerificationEmail();
          console.log('sin verificar');
        }
      });
    });
  }
}
