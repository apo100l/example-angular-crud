import { AfterViewInit, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { CustomValidators } from '../../../common/validators';

@Component({
  selector: 'app-custom-form-amount',
  template: `
    <div class="form-group w-100">
      <label *ngIf="label"
        >{{ label }}
        <ng-template [ngIf]="required"> *</ng-template>
      </label>
      <input
        type="text"
        [class.is-valid]="!control.errors"
        [class.is-invalid]="control.errors"
        class="form-control"
        mask="0*.00"
        [dropSpecialCharacters]="false"
        (blur)="handleUpdate.emit()"
        [formControl]="control"
        [placeholder]="placeholder || label"
      />
      <ng-template [ngIf]="control.errors">
        <app-custom-form-error-message [errors]="control.errors"></app-custom-form-error-message>
      </ng-template>
    </div>
  `,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomFormAmountComponent),
      multi: true,
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomFormAmountComponent),
      multi: true,
    },
  ],
  styles: [],
})
export class CustomFormAmountComponent extends CustomValidators implements AfterViewInit, ControlValueAccessor {
  @Input() required = true;

  @Input() label;

  @Input() placeholder;

  @Output() handleUpdate: EventEmitter<any> = new EventEmitter<any>();

  control: FormControl;

  ngAfterViewInit(): void {
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.onChange(data);
    });
  }

  onChange(_: any) {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean) {
    isDisabled ? this.control.disable({ emitEvent: false }) : this.control.enable({ emitEvent: false });
  }

  writeValue(obj: any): void {
    const validators: ValidatorFn[] = [];
    this.required !== false && validators.push(Validators.required);
    if (this.control) {
      this.control.patchValue(obj, { emitEvent: false });
    } else {
      this.control = new FormControl(obj, validators);
    }
  }
}
