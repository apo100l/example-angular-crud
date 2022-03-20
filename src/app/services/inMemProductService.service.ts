import { InMemoryDbService } from 'angular-in-memory-web-api';
import * as lodash from 'lodash';
export class InMemProductsService implements InMemoryDbService {
  createDb() {
    return {
      products: lodash.range(1, 101).map((i) => ({
        id: i,
        title: `Product ${i}`,
        price: i,
      })),
    };
  }
}
