import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../../../types';

@Component({
  selector: 'app-product-delete',
  template: `<div class="modal-header">
      <h4 class="modal-title">Подтвердите операцию!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss(false)">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Ву уверены, что хотите удалить "{{ product?.title }}"?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark mr-2" (click)="activeModal.close('Close click')">
        Закрыть
      </button>
      <button type="button" class="btn btn-danger" (click)="activeModal.close(product?.id)">Удалить</button>
    </div>`,
  styles: [],
})
export class ProductDeleteComponent {
  @Input() product: Product;
  constructor(public activeModal: NgbActiveModal) {}
}
