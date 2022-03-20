import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Destroy } from './destroy';

export class CustomValidators extends Destroy implements Validators {
  control: FormControl;

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.dirty || control.touched) {
      control.invalid && this.control.setErrors(control.errors);
      control.dirty && this.control.markAsDirty();
      control.touched && this.control.markAsTouched();
      return control.invalid ? control.errors : null;
    }
    return null;
  }
}
