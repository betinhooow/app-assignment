import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { ProxyModule } from 'src/app/shared/proxy/proxy.module';
import { MainComponent } from './main.component';
import { InputCurrencyModule } from 'src/app/shared/components/input-currency/input-currency.module';
import { FutureMonthSelectorModule } from 'src/app/shared/components/future-month-selector/future-month-selector.module';
import { RadiusButtonModule } from 'src/app/shared/components/radius-button/radius-button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SavingGoalsService } from './saving-goals.service';
import { SavingGoalsProxy } from 'src/app/shared/proxy/saving-goals.proxy';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputCurrencyModule,
    FutureMonthSelectorModule,
    RadiusButtonModule
  ],
  providers: [SavingGoalsService, SavingGoalsProxy],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [MainComponent],
  exports: [MainComponent]
})
export class MainModule {}
