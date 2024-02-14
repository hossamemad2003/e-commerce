import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  token: any = localStorage.getItem('userToken');
  cartList: any[] = [];
  cartDetail?: any;
  numberItemOfCart?: number;
  isLoading: boolean = false;
  constructor(private api: ApiService, private route: Router) {
    this.api.getUserCart(this.token).subscribe((res) => {
      console.log(res);
      this.cartDetail = res.data;
      this.cartList = res.data.products;
      this.numberItemOfCart = res.numOfCartItems;
    });
  }
  removeItem(id: any) {
    this.isLoading = true;
    this.api.removeCartItem(this.token, id).subscribe((res) => {
      // console.log(res);
      this.cartDetail = res.data;
      this.cartList = res.data.products;
      this.numberItemOfCart = res.numOfCartItems;
      this.isLoading = false;
    });
  }

  updateQuantity(id: any, count: number) {
    this.isLoading = true;
    this.api
      .updateProductCartQuantity(this.token, id, count)
      .subscribe((res) => {
        // console.log(res);
        this.cartDetail = res.data;
        this.cartList = res.data.products;
        this.numberItemOfCart = res.numOfCartItems;

        this.isLoading = false;
      });
  }

  gotoCheckOut() {
    this.route.navigate(['payment']);
  }
}
