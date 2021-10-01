import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FutureMonthSelectorComponent } from './future-month-selector.component';
import { InputLabelModule } from '../input-label/input-label.module';

@NgModule({
  declarations: [FutureMonthSelectorComponent],
  imports: [CommonModule, InputLabelModule],
  exports: [FutureMonthSelectorComponent]
})
export class FutureMonthSelectorModule {}
