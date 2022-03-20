import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { CustomFormAmountComponent } from './custom-form-amount/custom-form-amount.component';
import { CustomFormTextareaComponent } from './custom-form-textarea/custom-form-textarea.component';
import { CustomFormErrorMessageComponent } from './custom-form-error-message/custom-form-error-message.component';

@NgModule({
  declarations: [CustomFormAmountComponent, CustomFormTextareaComponent, CustomFormErrorMessageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    NgxMaskModule.forRoot({
      validation: false,
    }),
  ],
  exports: [CustomFormAmountComponent, CustomFormTextareaComponent, CustomFormErrorMessageComponent],
  providers: [],
})
export class CustomFormsModule {}
