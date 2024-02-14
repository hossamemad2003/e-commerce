import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService) {
    this.resetForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  sendCode() {
    // console.log(this.resetForm.value.email);
    // this.api.sendCode(this.resetForm.value).subscribe();
  }
}
