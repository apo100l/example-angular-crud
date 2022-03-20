import { Action } from '@ngrx/store';
import { Product } from '../../../types';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_ERROR = 'DELETE_PRODUCT_ERROR';

export class GetAllProducts implements Action {
  readonly type = GET_PRODUCTS;
}

export class GetAllProductsSuccess implements Action {
  readonly type = GET_PRODUCTS_SUCCESS;

  constructor(public payload: Product[]) {}
}

export class GetAllProductsError implements Action {
  readonly type = GET_PRODUCTS_ERROR;

  constructor(public payload: Error) {}
}

export class RemoveProduct implements Action {
  readonly type = DELETE_PRODUCT;

  constructor(public payload: number) {}
}

export class RemoveProductSuccess implements Action {
  readonly type = DELETE_PRODUCT_SUCCESS;

  constructor(public payload: number) {}
}

export class RemoveProductError implements Action {
  readonly type = DELETE_PRODUCT_ERROR;

  constructor(public payload: Error) {}
}
