import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  checkOutForm: FormGroup;
  isLoading: boolean = false;
  token = localStorage.getItem('userToken');
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: Router
  ) {
    this.checkOutForm = fb.group({
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
      city: ['', [Validators.required]],
      detail: [''],
    });
  }
  handleSubmit(checkOutForm: FormGroup) {
    this.isLoading = true;
    this.api.getUserCart(this.token).subscribe((res) => {
      this.api
        .onlinePayment(res.data._id, this.token, checkOutForm.value)
        .subscribe((res) => {
          let url = res.session.url;
          window.location.href = url;
          this.isLoading = false;
        });
    });
  }
}
