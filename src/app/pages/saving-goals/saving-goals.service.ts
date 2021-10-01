import { Injectable } from '@angular/core';
import { AnalyticsSavingGoalsService } from 'src/app/core/analytics/analytics.saving-goals.service';
import { SavingGoals } from 'src/app/shared/models/saving-goals';
import { SavingGoalsProxy } from 'src/app/shared/proxy/saving-goals.proxy';

@Injectable({
  providedIn: 'root'
})
export class SavingGoalsService {

  constructor(
    private readonly savingGoalsProxy: SavingGoalsProxy,
    private readonly analyticsSavingGoalsService: AnalyticsSavingGoalsService
  ) { }

  submitSavingGoals(data: SavingGoals) {
    this.analyticsSavingGoalsService.submit(data);

    this.savingGoalsProxy.sendSavingGoals(data).subscribe();
  }
}
