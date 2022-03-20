import * as fromGames from './modules/products/store/product.reducers';

export interface AppState {
  products: fromGames.State;
}
