import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  isError = false;
  errormsg?: string;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private auth: AuthService
  ) {
    if (localStorage.getItem('userToken') !== null) {
      this.router.navigate(['/home']);
    }
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  login(loginForm: FormGroup) {
    if (loginForm.valid) {
      this.isLoading = true;
      this.api.login(loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isError = false;
          if (res.message === 'success') {
            localStorage.setItem('userToken', res.token);
            this.auth.decodeUserData();
            this.isLoading = false;
            this.router.navigate(['/home']);
          }
        },
        error: (err) => {
          console.log(err);
          console.log(err.error.message);
          if (err.error.message === 'fail') {
            this.errormsg = `${err.error.errors.param} ${err.error.errors.msg}`;
          } else {
            this.errormsg = err.error.message;
          }
          this.isError = true;
          this.isLoading = false;
        },
      });
    }
  }
  goToResetPass() {
    this.router.navigate(['resetPass']);
  }
}
