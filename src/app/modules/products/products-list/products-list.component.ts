import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { GetAllProducts, RemoveProduct } from '../store/product.actions';
import { Observable, takeUntil } from 'rxjs';
import { Product } from '../../../types';
import { getAllProducts, isLoading } from '../store/product.reducers';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDeleteComponent } from '../modals/product-delete/product-delete.component';
import { Destroy } from '../../../common/destroy';

@Component({
  selector: 'app-products-list',
  template: `
    <div class="card flex-fill overflow-hidden">
      <div class="card-body border-0 d-flex flex-column p-0">
        <div class="flex-fill overflow-auto">
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Название</th>
                <th scope="col">Цена</th>
                <th scope="col">&nbsp;</th>
              </tr>
            </thead>
            <tbody *ngIf="(isLoading | async) === false">
              <tr *ngFor="let _ of data | async">
                <th scope="row">
                  <span>{{ _?.id }}</span>
                </th>
                <td>
                  <span>{{ _?.title }}</span>
                </td>
                <td>
                  <span>{{ _?.price || 0 }}</span>
                </td>
                <td class="d-flex align-items-center justify-content-end">
                  <button type="button" class="btn btn-primary mr-2" routerLink="edit/{{ _?.id }}">Изменить</button>
                  <button type="button" class="btn btn-danger" (click)="handleDelete(_)">Удалить</button>
                </td>
              </tr>
            </tbody>
            <tbody *ngIf="isLoading | async">
              <tr>
                <td [colSpan]="5" class="text-center">Загрузка...</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button type="button" routerLink="add" class="btn btn-block w-100 btn-success">Добавить</button>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        width: 100%;
        height: 100%;
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        overflow: hidden;
      }
    `,
  ],
})
export class ProductsListComponent extends Destroy implements OnInit {
  data: Observable<Product[]>;
  isLoading: Observable<boolean>;

  constructor(private store: Store<AppState>, private modalService: NgbModal) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAllProducts());
    this.data = this.store.select(getAllProducts);
    this.isLoading = this.store.select(isLoading);
  }

  handleDelete(product: Product): void {
    const modalRef = this.modalService.open(ProductDeleteComponent);
    modalRef.closed.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      data && this.store.dispatch(new RemoveProduct(data));
    });
    modalRef.componentInstance.product = product;
  }
}
