import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isLogin = false;
  numOfItems?: number;
  constructor(
    private auth: AuthService,
    private router: Router,
    private api: ApiService
  ) {
    this.api.numOfCartItem.subscribe({
      next: (x) => {
        this.numOfItems = x;
      },
    });
    this.auth.userData.subscribe({
      next: () => {
        this.auth.decodeUserData();
        if (this.auth.userData.getValue() !== null) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      },
    });
  }
  logOut() {
    localStorage.removeItem('userToken');
    this.auth.userData.next(null);
    this.isLogin = false;
    this.router.navigate(['/login']);
  }
}
