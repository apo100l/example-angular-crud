import { Component } from '@angular/core';
import { Destroy } from '../../../common/destroy';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of, switchMap, takeUntil, tap } from 'rxjs';
import { Product } from '../../../types';
import { ProductService } from '../../../services/product.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  template: ` <div class="card flex-fill overflow-hidden" *ngIf="!isLoading">
    <div class="card-header">
      <h6 class="p-0 m-0">{{ data.getValue()?.title || 'Новый продукт' }}</h6>
    </div>
    <form (submit)="handleSubmit($event)" class="card-body border-0 d-flex flex-column">
      <div class="flex-fill overflow-auto">
        <div class="row no-gutters d-flex flex-column" [formGroup]="form">
          <div class="col-6">
            <app-custom-form-textarea label="Название" required formControlName="title"></app-custom-form-textarea>
          </div>
          <div class="col-6">
            <app-custom-form-amount label="Цена" required formControlName="price"></app-custom-form-amount>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <button type="button" routerLink="/products" class="btn btn-block w-100 btn-primary">Назад</button>
        </div>
        <div class="col-6">
          <button type="submit" class="btn btn-block w-100 btn-success" [disabled]="form.invalid || isEditLoading">
            Сохранить
          </button>
        </div>
      </div>
    </form>
  </div>`,
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
export class ProductEditComponent extends Destroy {
  data: BehaviorSubject<Product> = new BehaviorSubject<Product>(null);
  form: FormGroup;
  isLoading = true;
  isEditLoading = false;
  constructor(
    private store: Store<AppState>,
    private activateRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
  ) {
    super();
    this.activateRoute.params
      .pipe(
        tap(() => (this.isLoading = true)),
        takeUntil(this.destroy$),
        switchMap(({ id }) => (id && Number(id) ? this.productService.findById(Number(id)) : of({}))),
      )
      .subscribe(
        (data) => {
          this.data.next(data);
          this.form = this.productService.form(data);
          this.isLoading = false;
        },
        () => {
          this.router.navigate([`/products`]).then();
        },
      );
  }

  handleSubmit($event): void {
    $event.preventDefault();
    $event.stopPropagation();
    const formRaw = this.form.getRawValue();
    this.form.disable({ emitEvent: false });
    const action: (data: Product) => Observable<Product> = formRaw?.id
      ? this.productService.update.bind(this.productService)
      : this.productService.insert.bind(this.productService);
    this.isEditLoading = true;
    action(formRaw)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (!formRaw?.id) {
          this.router.navigate([`/products/edit/${data?.id}`]).then();
        } else {
          this.data.next(formRaw);
          this.form.enable({ emitEvent: false });
          this.isEditLoading = false;
        }
      });
  }
}
