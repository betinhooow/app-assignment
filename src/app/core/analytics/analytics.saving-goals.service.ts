import { Injectable } from '@angular/core';
import { SavingGoals } from 'src/app/shared/models/saving-goals';

declare var dataLayer: any;

@Injectable()
export class AnalyticsSavingGoalsService {
  constructor() {}

  private SAVING_GOALS: string = 'saving-goals';

  access(): void {
    dataLayer.push({
      event: this.SAVING_GOALS,
      label: 'saving-goals-access',
      action: 'access',
      userid: 'user-id-here'
    });
  }

  submit({ amount, reachDate }: SavingGoals): void {
    dataLayer.push({
      event: this.SAVING_GOALS,
      label: 'saving-goals-submit',
      action: 'submit',
      userid: 'user-id-here',
      amount,
      reachdate: reachDate
    });
  }
}
