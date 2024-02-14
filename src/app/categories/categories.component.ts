import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.api.getAllCategory().subscribe((res) => {
      this.categories = res.data;
    });
  }
}
