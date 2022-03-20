import { Component, Input, OnInit } from '@angular/core';
import { CustomValidators } from '../../../common/validators';
@Component({
  selector: 'app-custom-form-error-message',
  template: `
    <div class="invalid-feedback d-block" *ngIf="code">
      <ng-container [ngSwitch]="code">
        <ng-container *ngSwitchCase="'required'">Данное поле обязательно для заполнения</ng-container>
        <ng-container *ngSwitchCase="'email'">Неверный формат</ng-container>
        <ng-container *ngSwitchCase="'pattern'">Неверный формат</ng-container>
        <ng-container *ngSwitchCase="'dateFormat'">Неверный формат даты</ng-container>
        <ng-container *ngSwitchCase="'mixLength'"
          >Минимальная длина поля {{ data.requiredLength }} символов</ng-container
        >
        <ng-container *ngSwitchCase="'maxLength'"
          >Максимальная длина поля {{ data.requiredLength }} символов</ng-container
        >
        <ng-container *ngSwitchDefault>Неверный формат</ng-container>
      </ng-container>
    </div>
  `,
  styles: [],
})
export class CustomFormErrorMessageComponent {
  @Input() errors: { [key: string]: any } = {};

  get code() {
    return this.errors ? Object.keys(this.errors)[0] : null;
  }

  get data() {
    return this.code ? this.errors[this.code] : null;
  }
}
