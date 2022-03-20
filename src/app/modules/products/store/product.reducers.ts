import * as productActions from './product.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '../../../types';
import { AppAction } from '../../../app.action';

export interface State {
  data: Product[];
  loading: boolean;
  error?: Error;
}

const initialState: State = {
  data: [],
  loading: true,
  error: null,
};

export function reducer(state = initialState, action: AppAction): State {
  switch (action.type) {
    case productActions.GET_PRODUCTS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case productActions.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case productActions.GET_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case productActions.DELETE_PRODUCT: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case productActions.DELETE_PRODUCT_SUCCESS: {
      const data = state.data.filter((p) => p.id !== action.payload);
      return {
        ...state,
        data,
        error: null,
        loading: false,
      };
    }
    case productActions.DELETE_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
  }
  return state;
}

export const getProductsState = createFeatureSelector<State>('products');
export const getAllProducts = createSelector(getProductsState, (state: State) => state.data);
export const isLoading = createSelector(getProductsState, (state: State) => state.loading);
