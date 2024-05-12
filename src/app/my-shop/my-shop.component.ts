import { Component } from '@angular/core';
import { MyApiService } from '../service/my-api.service';
import { environment } from 'environment';

@Component({
  selector: 'app-my-shop',
  templateUrl: './my-shop.component.html',
  styleUrls: ['./my-shop.component.css']
})
export class MyShopComponent {

  products?: any[];
  currentPage: number = 1;
  pageSize: number = 3;
  totalPages!: number;
  sortBy: string = 'product_id'; // Default sorting by product_id
  sortOrder: string = 'DESC'; // Default sorting order is descending
  apiUrl = environment.nodeUrl;

  constructor(private myApiService: MyApiService) { }

  ngOnInit(): void {
    // this.fetchData();
    this.loadProducts();
  }

  loadProducts(): void {
    this.myApiService.getAllProduct(this.currentPage, this.pageSize, this.sortBy, this.sortOrder)
      .subscribe((response: any) => {
        this.products = response.data;
        this.totalPages = Math.ceil(response.totalRecords / this.pageSize);
      });
  }

  onSortBy(sortBy: Event): void {
    const selectedValue: string = (sortBy.target as HTMLSelectElement).value;
    this.sortBy = selectedValue;
    this.loadProducts();
  }

  onSortOrder(sortOrder: Event): void {
    const selectedValue: string = (sortOrder.target as HTMLSelectElement).value;
    this.sortOrder = selectedValue;
    this.loadProducts();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

}
