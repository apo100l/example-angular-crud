import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsListComponent,
  },
  {
    path: 'add',
    component: ProductEditComponent,
  },
  {
    path: 'edit/:id',
    component: ProductEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
