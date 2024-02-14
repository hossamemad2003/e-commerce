import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  isError = false;
  errormsg?: string;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    this.registerForm = fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rePassword: ['', [Validators.required]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    });
  }
  register(registerForm: FormGroup) {
    // console.log(registerForm.value);
    if (registerForm.valid) {
      this.isLoading = true;
      this.api.register(registerForm.value).subscribe({
        next: (res) => {
          // console.log(res);
          this.isError = false;
          if (res.message === 'success') {
            this.isLoading = false;

            //navigate to login
            this.router.navigate(['/login']);
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
}
