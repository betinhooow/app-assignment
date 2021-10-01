import { Injectable } from '@angular/core';
import { SavingGoals } from 'src/app/shared/models/saving-goals';
import { SavingGoalsProxy } from 'src/app/shared/proxy/saving-goals.proxy';

@Injectable({
  providedIn: 'root'
})
export class SavingGoalsService {

  constructor(private readonly savingGoalsProxy: SavingGoalsProxy) { }

  submitSavingGoals(savingGoals: SavingGoals) {
    // if needed, do some extra logic based on data

    this.savingGoalsProxy.sendSavingGoals(savingGoals).subscribe();
  }
}
