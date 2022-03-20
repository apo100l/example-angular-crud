import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductService } from '../../services/product.service';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import * as productReducer from './store/product.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/product.effects';
import { ProductDeleteComponent } from './modals/product-delete/product-delete.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { CustomFormsModule } from '../custom-forms/custom-forms.module';
import { ReactiveFormsModule } from '@angular/forms';

export const reducers: ActionReducerMap<any> = {
  products: productReducer.reducer,
};
@NgModule({
  entryComponents: [ProductDeleteComponent],
  declarations: [ProductsListComponent, ProductDeleteComponent, ProductEditComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgbModalModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ProductEffects]),
    CustomFormsModule,
    ReactiveFormsModule,
  ],
  providers: [ProductService],
})
export class ProductsModule {}
