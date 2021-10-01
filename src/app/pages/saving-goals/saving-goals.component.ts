import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { round } from 'lodash';
import { validValueValidator } from 'src/app/shared/validators/valid-value.validator';
import { SavingGoalsService } from './saving-goals.service';

@Component({
  selector: 'app-main',
  templateUrl: './saving-goals.component.html',
  styleUrls: ['./saving-goals.component.scss']
})
export class SavingGoalsComponent implements OnInit {
  savingForm: FormGroup;
  monthlyAmount: number = 0;

  constructor(private readonly formBuilder: FormBuilder, private readonly savingGoalsService: SavingGoalsService) {}

  ngOnInit(): void {
    const amount = new FormControl(0, validValueValidator());
    const reachDate = new FormControl({ date: new Date(), monthDiff: 1 });

    amount.valueChanges.subscribe((): void => this.calculateMonthlyAmount());
    reachDate.valueChanges.subscribe((): void => this.calculateMonthlyAmount());

    this.savingForm = this.formBuilder.group({ amount, reachDate });
  }

  get amount() {
    return this.savingForm.get('amount');
  }

  confirmSavingGoal(): void {
    const { amount, reachDate } = this.savingForm.controls;

    amount.markAsTouched();
    if (this.savingForm.valid) {
      this.savingGoalsService.submitSavingGoals({
        amount: amount.value,
        reachDate: reachDate.value.date
      });
    }
  }

  private calculateMonthlyAmount(): void {
    const { amount, reachDate } = this.savingForm.controls;

    this.monthlyAmount = round(amount.value / reachDate.value.monthDiff);
  }
}
