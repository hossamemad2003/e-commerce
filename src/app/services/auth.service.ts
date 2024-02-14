import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData = new BehaviorSubject(null);
  constructor() {}
  decodeUserData() {
    let token = JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken: any = jwtDecode(token);
    this.userData.next(decodedToken);
  }
}
