import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productList: any[] = [];
  categories: any[] = [];
  searchTerm: string = '';
  constructor(private api: ApiService, private router: Router) {}
  ngOnInit() {
    this.api.getAllProduct().subscribe((res) => {
      this.productList = res.data;
    });

    this.api.getAllCategory().subscribe((res) => {
      this.categories = res.data;
    });
  }
  gotoDetail(id: any) {
    this.router.navigate([`/detail`, id]);
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
        items: 2,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };
}
