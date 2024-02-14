import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Token } from '@angular/compiler';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  iProduct: any;
  productID: any;
  isAdded: boolean = false;
  isLoading: boolean = false;
  constructor(private activateRoute: ActivatedRoute, private api: ApiService) {
    this.activateRoute.paramMap.subscribe((param) => {
      this.productID = param.get('id');
      this.api.getProductById(this.productID).subscribe((res) => {
        this.iProduct = res.data;
      });
    });
  }
  token: any = localStorage.getItem('userToken');
  addToCart(productId: any) {
    this.isLoading = true;
    this.api.addProductToCart(this.token, productId).subscribe((res) => {
      this.api.numOfCartItem.next(res.numOfCartItems);
      this.isLoading = false;
      this.isAdded = true;
    });
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
}
