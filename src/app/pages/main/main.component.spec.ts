import { createComponentFactory, Spectator, SpyObject } from '@ngneat/spectator';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { InputCurrencyModule } from 'src/app/shared/components/input-currency/input-currency.module';
import { FutureMonthSelectorModule } from 'src/app/shared/components/future-month-selector/future-month-selector.module';
import { RadiusButtonModule } from 'src/app/shared/components/radius-button/radius-button.module';
import { SavingGoalsService } from './saving-goals.service';
import { of } from 'rxjs';

describe('MainComponent', () => {
  let spectator: Spectator<MainComponent>;
  let savingGoalsServiceSpy: SpyObject<SavingGoalsService>;

  const createComponent = createComponentFactory<MainComponent>({
    component: MainComponent,
    imports: [
      CommonModule,
      MainRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      InputCurrencyModule,
      FutureMonthSelectorModule,
      RadiusButtonModule,
    ],
    mocks: [SavingGoalsService]
  });

  beforeEach(() => {
    spectator = createComponent();
    savingGoalsServiceSpy = spectator.inject(SavingGoalsService);

    savingGoalsServiceSpy.submitSavingGoals.and.returnValue(of({
      reachDate: new Date(),
      amount: 2000
    }))
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should initialize the forms', () => {
    const { amount, reachDate } = spectator.component.savingForm.controls;

    expect(amount.validator).not.toBeNull();
    expect(amount.value).toEqual(0);
    expect(reachDate.validator).toBeNull();
    expect(reachDate.value).not.toBeNull();
    expect(spectator.component.monthlyAmount).toEqual(0);
  });

  it('should calculate monthly amount when amount changed', () => {
    const { amount } = spectator.component.savingForm.controls;

    amount.setValue(25000);

    expect(spectator.component.monthlyAmount).toEqual(25000);
  });

  it('should calculate monthly amount when reach date changed', () => {
    const { amount, reachDate } = spectator.component.savingForm.controls;

    amount.setValue(25000);
    reachDate.setValue({
      date: new Date(),
      monthDiff: 48
    });

    expect(spectator.component.monthlyAmount).toEqual(521);
  });

  it('should submit goals if form is valid', () => {
    const { amount, reachDate } = spectator.component.savingForm.controls;
    const amountValue: number = 450000;
    const date: Date = new Date();

    amount.setValue(amountValue);
    reachDate.setValue({ date, monthDiff: 1 });
    spectator.component.confirmSavingGoal();

    expect(savingGoalsServiceSpy.submitSavingGoals).toHaveBeenCalledWith({
      amount: amountValue,
      reachDate: date
    });
  });

  it('should not submit goals if form is invalid', () => {
    const { amount, reachDate } = spectator.component.savingForm.controls;
    const amountValue: number = 0;
    const date: Date = new Date();

    amount.setValue(amountValue);
    reachDate.setValue({ date, monthDiff: 1 });
    spectator.component.confirmSavingGoal();

    expect(savingGoalsServiceSpy.submitSavingGoals).not.toHaveBeenCalled();
  });
});
