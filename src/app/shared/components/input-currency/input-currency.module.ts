import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputCurrencyComponent } from './input-currency.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';

@NgModule({
  declarations: [InputCurrencyComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxCurrencyModule],
  exports: [InputCurrencyComponent]
})
export class InputCurrencyModule {}
