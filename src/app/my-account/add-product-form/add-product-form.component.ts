import { Component, EventEmitter, Output } from '@angular/core';
import { MyApiService } from 'src/app/service/my-api.service';
import { MyAccountComponent } from '../my-account.component';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent {

  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();

  product_name: string = '';
  product_price!: string;
  product_image: File | null = null;
  product_id: number | null = null;

  constructor(
    private myApiService: MyApiService,
    private myAccountComponent: MyAccountComponent
  ) { }

  ngOnInit(): void {
    this.myAccountComponent.idProductsSubject.subscribe((id: number | null) => {
      if(id !== null){
        this.product_id = id;
        this.myApiService.getProduct(this.product_id)
        .subscribe((response: any) => {
          this.product_name = response.data[0].product_name;
          this.product_price = response.data[0].product_price;
          this.product_image = response.data[0].product_image;
        });
      } else {
          this.product_id = null;
          this.product_name = '';
          this.product_price = '';
          this.product_image = null;
      }
      
    });
  }

  onFileSelected(event: any): void {
    this.product_image = event.target.files[0] as File;
  }

  onSubmit(): void {
    // Handle form submission here

    if (!this.product_image) {
      return;
    }

    const formData = new FormData();
    formData.append('product_name', this.product_name);
    formData.append('product_price', this.product_price);
    formData.append('product_image', this.product_image);

    this.myApiService.addProduct(formData)
    .subscribe((response: any) => {
      this.formSubmitted.emit();
    });
  }

  onUpdateSubmit(): void {
    // Handle form submission here

    if (!this.product_image) {
      return;
    }

    const formData = new FormData();
    formData.append('product_name', this.product_name);
    formData.append('product_price', this.product_price);
    formData.append('product_image', this.product_image);

    this.myApiService.updateProduct(this.product_id,formData)
    .subscribe((response: any) => {
      this.formSubmitted.emit();
    });
  }
}
