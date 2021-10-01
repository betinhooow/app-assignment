import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnalyticsSavingGoalsService } from 'src/app/core/analytics/analytics.saving-goals.service';
import { FutureMonthSelectorModule } from 'src/app/shared/components/future-month-selector/future-month-selector.module';
import { InputCurrencyModule } from 'src/app/shared/components/input-currency/input-currency.module';
import { RadiusButtonModule } from 'src/app/shared/components/radius-button/radius-button.module';
import { SavingGoalsProxy } from 'src/app/shared/proxy/saving-goals.proxy';
import { SavingGoalsRoutingModule } from './saving-goals-routing.module';
import { SavingGoalsComponent } from './saving-goals.component';
import { SavingGoalsService } from './saving-goals.service';

@NgModule({
  imports: [
    CommonModule,
    SavingGoalsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputCurrencyModule,
    FutureMonthSelectorModule,
    RadiusButtonModule
  ],
  providers: [SavingGoalsService, SavingGoalsProxy, AnalyticsSavingGoalsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [SavingGoalsComponent],
  exports: [SavingGoalsComponent]
})
export class SavingGoalsModule {}
