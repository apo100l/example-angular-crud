import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as productActions from './product.actions';
import {
  GetAllProductsError,
  GetAllProductsSuccess,
  RemoveProduct,
  RemoveProductError,
  RemoveProductSuccess,
} from './product.actions';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../types';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private productService: ProductService) {}

  @Effect()
  getAllProducts$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.GET_PRODUCTS),
    switchMap(() => this.productService.findAll()),
    map((data) => new GetAllProductsSuccess(data)),
    catchError((err) => [new GetAllProductsError(err)]),
  );

  @Effect()
  removeProduct$ = this.actions$.pipe(
    ofType(productActions.DELETE_PRODUCT),
    map((action: RemoveProduct) => action.payload),
    switchMap((id) => this.productService.delete(id).pipe(map(() => id))),
    map((id: number) => new RemoveProductSuccess(id)),
    catchError((err) => [new RemoveProductError(err)]),
  );
}
