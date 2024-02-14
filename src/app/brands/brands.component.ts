import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit {
  brandsList: any[] = [];
  constructor(private api: ApiService) {}
  ngOnInit() {
    this.api.getAllBrands().subscribe((res) => {
      // console.log(res);
      this.brandsList = res.data;
    });
  }
}
