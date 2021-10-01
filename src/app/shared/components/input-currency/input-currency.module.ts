import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputCurrencyComponent } from './input-currency.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';
import { InputLabelModule } from '../input-label/input-label.module';

@NgModule({
  declarations: [InputCurrencyComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxCurrencyModule, InputLabelModule],
  exports: [InputCurrencyComponent]
})
export class InputCurrencyModule {}
