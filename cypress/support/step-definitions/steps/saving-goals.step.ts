import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { SavingGoalsElements } from '../../elements/saving-goals.element';
import { SavingGoalsPageObject } from '../../page-objects/saving-goals.po';

const savingGoalsPageObject: SavingGoalsPageObject = new SavingGoalsPageObject();

Given('the user is on the saving goals for home area', (): void => {
  savingGoalsPageObject.goToSavingGoalsPage();
});

Given('the saving goals elements was loaded', (): void => {
  savingGoalsPageObject.verifyVisibleElements();
});

Given('the current date is {string} of {int}', (month: string, year: number): void => {
  savingGoalsPageObject.setupDateNow(month, year);
});

When('the user set {string} for amount', (value: string): void => {
  savingGoalsPageObject.setInputValue(SavingGoalsElements.savingGoalsAmountInput, value);
});

And('the user set {int} months in the {futureOrPast}', (reachMonths: number, isInFuture: boolean): void => {
  if (isInFuture) {
    savingGoalsPageObject.goNextMonthTimes(reachMonths);
  } else {
    savingGoalsPageObject.goPreviousMonthTimes(reachMonths);
  }
});

Then('the montlhy amount should be {string}', (value: string): void => {
  savingGoalsPageObject.checkMonthlyAmount(value);
});

And('the reach date should be in {string} of {int}', (month: string, year: number): void => {
  savingGoalsPageObject.checkReachDate(month, year);
});

Then('should show a error message {string}', (message: string): void => {
  savingGoalsPageObject.checkErrorWarning(message);
});
