import { AfterViewInit, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { CustomValidators } from '../../../common/validators';

@Component({
  selector: 'app-custom-form-textarea',
  template: `
    <div class="form-group w-100">
      <label *ngIf="label"
        >{{ label }}
        <ng-template [ngIf]="required"> *</ng-template>
      </label>
      <input
        type="text"
        [class.is-valid]="(control.dirty || control.touched) && !control.errors"
        [class.is-invalid]="(control.dirty || control.touched) && control.errors"
        class="form-control"
        (blur)="handleUpdate.emit()"
        [maxlength]="maxlength"
        [formControl]="control"
        [placeholder]="placeholder || label"
      />
      <ng-template [ngIf]="(control.dirty || control.touched) && control.errors">
        <app-custom-form-error-message [errors]="control.errors"></app-custom-form-error-message>
      </ng-template>
    </div>
  `,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomFormTextareaComponent),
      multi: true,
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomFormTextareaComponent),
      multi: true,
    },
  ],

  styles: [],
})
export class CustomFormTextareaComponent extends CustomValidators implements AfterViewInit, ControlValueAccessor {
  @Input() label = '';

  @Input() maxlength: string | number = 1000;

  @Input() placeholder: string = this.label;

  @Input() required = true;

  @Input() type = '';

  @Input() showClearButton;

  @Output() handleUpdate: EventEmitter<any> = new EventEmitter<any>();

  control: FormControl;

  get shouldShowClearButton(): boolean {
    return this.showClearButton && this.control.value;
  }

  ngAfterViewInit() {
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(this.onChange.bind(this));
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
    const validators = [].concat(this.required !== false ? Validators.required : []);
    if (this.control) {
      this.control.setValue(obj || null, { emitEvent: false });
    } else {
      this.control = new FormControl(obj || null, validators);
    }
  }

  clearValue(): void {
    this.control.setValue(null);
  }
}
