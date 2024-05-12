import { Component, EventEmitter } from '@angular/core';
import { MyApiService } from '../service/my-api.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environment';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {

  apiUrl = environment.nodeUrl;
  products?: any[];
  currentPage: number = 1;
  pageSize: number = 6;
  totalPages!: number;
  sortBy: string = 'product_id'; // Default sorting by product_id
  sortOrder: string = 'DESC'; // Default sorting order is descending
  showForm: boolean = false;
  idProductsSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  constructor(private myApiService: MyApiService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.myApiService.getAllProduct(this.currentPage, this.pageSize, this.sortBy, this.sortOrder)
      .subscribe((response: any) => {
        this.products = response.data;
        this.totalPages = Math.ceil(response.totalRecords / this.pageSize);
      });
  }

  calculateIndex(indexWithinPage: number): number {
    return (this.currentPage - 1) * this.pageSize + indexWithinPage + 1;
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

  showAddProductForm(id: number | null = null ): void {
    this.showForm = !this.showForm;
    this.idProductsSubject.next(id);
  }

  deleteProduct(productId: number): void {
    this.myApiService.deleteProduct(productId)
    .subscribe((response: any) => {
      this.loadProducts();
    });
  }

  handleFormSubmit(): void {
    this.showForm = !this.showForm;
    this.loadProducts();
  }

}
