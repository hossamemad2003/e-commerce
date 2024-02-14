import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  token: any;
  numOfCartItem = new BehaviorSubject(0);
  apiUrl = 'https://ecommerce.routemisr.com';
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('userToken');
    this.getUserCart(this.token).subscribe((res) => {
      this.numOfCartItem.next(res.numOfCartItems);
    });
  }
  register(userData: object): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/v1/auth/signup`, userData);
  }
  login(userData: object): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/v1/auth/signin`, userData);
  }
  getAllProduct(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/v1/products`);
  }
  getProductById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/v1/products/${id}`);
  }
  getAllCategory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/v1/categories`);
  }
  addProductToCart(token: any, prdId: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/v1/cart`,
      {
        productId: prdId,
      },
      {
        headers: { token: token },
      }
    );
  }

  getUserCart(token: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/v1/cart`, {
      headers: { token: token },
    });
  }

  removeCartItem(token: any, id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/v1/cart/${id}`, {
      headers: { token: token },
    });
  }
  updateProductCartQuantity(
    token: any,
    id: any,
    count: number
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/api/v1/cart/${id}`,
      {
        count: count,
      },
      {
        headers: { token: token },
      }
    );
  }

  onlinePayment(cartId: any, token: any, checkOut: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress: checkOut,
      },
      {
        headers: { token: token },
      }
    );
  }

  getAllBrands(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/v1/brands`);
  }

  sendCode(email: object): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/v1/auth/forgotPasswords`, email);
  }
}
