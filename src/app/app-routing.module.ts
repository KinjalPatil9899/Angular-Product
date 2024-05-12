import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyShopComponent } from './my-shop/my-shop.component';

const routes: Routes = [
  // Other routes
  { path: '', component: MyShopComponent }, // Route for My Account page
  { path: 'my-account', component: MyAccountComponent }, // Route for My Account page
  // Other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
