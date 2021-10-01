import { AppElements } from '../elements/app.element';
import { SavingGoalsElements } from '../elements/saving-goals.element';

export class SavingGoalsPageObject {
  public goToSavingGoalsPage(): void {
    cy.visit('/origin/saving-goals');
    cy.location().should((location: Location): void => {
      expect(location.pathname).to.contain('/origin/saving-goals');
    });
  }

  public verifyVisibleElements(): void {
    cy.get(AppElements.appHeader).should('be.visible');
    cy.get(SavingGoalsElements.savingGoalsCard).should('be.visible');
  }

  public setupDateNow(month: string, year: number): void {
    cy.clock(new Date(`${month} 1, ${year} 00:00:00`), ['Date']);
  }

  public setInputValue(element: string, value: string): void {
    cy.get(element).type(value);
  }

  public goNextMonthTimes(times: number): void {
    for (let index = 2; index < times; index++) {
      cy.get(SavingGoalsElements.savingGoalsReachDateArrowRight).click();
    }
  }

  public goPreviousMonthTimes(times: number): void {
    for (let index = 0; index < times; index++) {
      cy.get(SavingGoalsElements.savingGoalsReachDateArrowLeft).click();
    }
  }

  public checkMonthlyAmount(value: string): void {
    cy.get(SavingGoalsElements.savingGoalsMonthlyAmount).contains(value);
  }

  public checkReachDate(month: string, year: number): void {
    cy.get(SavingGoalsElements.savingGoalsReachDate)
    .should('be.visible')
    .invoke('text')
    .then($text => {
      expect($text).includes(month);
      expect($text).includes(year);
    });
  }

  public pressArrowRight(times: number): void {
    for (let index = 0; index < times; index++) {
      cy.get('.month').click().type('{rightarrow}');
    }
  }
}
