import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { faGem } from '@fortawesome/free-regular-svg-icons';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private authsvc: AuthService, private router: Router) {}
  faGem = faGem;
  faLaptopCode = faLaptopCode;
  faGlobe = faGlobe;
  faHeart = faHeart;
  ngOnInit() {}
  logout() {
    this.authsvc.logout();
    this.router.navigateByUrl('/crud/login');
  }
}
