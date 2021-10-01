import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createComponentFactory, Spectator, SpyObject } from '@ngneat/spectator';
import { of } from 'rxjs';
import { FutureMonthSelectorModule } from 'src/app/shared/components/future-month-selector/future-month-selector.module';
import { InputCurrencyModule } from 'src/app/shared/components/input-currency/input-currency.module';
import { RadiusButtonModule } from 'src/app/shared/components/radius-button/radius-button.module';
import { SavingGoalsRoutingModule } from './saving-goals-routing.module';
import { SavingGoalsComponent } from './saving-goals.component';
import { SavingGoalsService } from './saving-goals.service';

describe('SavingGoalsComponent', (): void => {
  let spectator: Spectator<SavingGoalsComponent>;
  let savingGoalsServiceSpy: SpyObject<SavingGoalsService>;

  const createComponent = createComponentFactory<SavingGoalsComponent>({
    component: SavingGoalsComponent,
    imports: [
      CommonModule,
      SavingGoalsRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      InputCurrencyModule,
      FutureMonthSelectorModule,
      RadiusButtonModule,
    ],
    mocks: [SavingGoalsService]
  });

  beforeEach((): void => {
    spectator = createComponent();
    savingGoalsServiceSpy = spectator.inject(SavingGoalsService);

    savingGoalsServiceSpy.submitSavingGoals.and.returnValue(of({
      reachDate: new Date(),
      amount: 2000
    }))
  });

  it('should create', (): void => {
    expect(spectator.component).toBeTruthy();
  });

  it('should initialize the forms', (): void => {
    const { amount, reachDate } = spectator.component.savingForm.controls;

    expect(amount.validator).not.toBeNull();
    expect(amount.value).toEqual(0);
    expect(reachDate.validator).toBeNull();
    expect(reachDate.value).not.toBeNull();
    expect(spectator.component.monthlyAmount).toEqual(0);
  });

  it('should calculate monthly amount when amount changed', (): void => {
    const { amount } = spectator.component.savingForm.controls;

    amount.setValue(25000);

    expect(spectator.component.monthlyAmount).toEqual(25000);
  });

  it('should calculate monthly amount when reach date changed', (): void => {
    const { amount, reachDate } = spectator.component.savingForm.controls;

    amount.setValue(25000);
    reachDate.setValue({
      date: new Date(),
      monthDiff: 48
    });

    expect(spectator.component.monthlyAmount).toEqual(521);
  });

  it('should submit goals if form is valid', (): void => {
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

  it('should not submit goals if form is invalid', (): void => {
    const { amount, reachDate } = spectator.component.savingForm.controls;
    const amountValue: number = 0;
    const date: Date = new Date();

    amount.setValue(amountValue);
    reachDate.setValue({ date, monthDiff: 1 });
    spectator.component.confirmSavingGoal();

    expect(savingGoalsServiceSpy.submitSavingGoals).not.toHaveBeenCalled();
  });
});
