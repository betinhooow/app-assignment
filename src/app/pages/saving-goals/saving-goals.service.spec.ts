import { createServiceFactory, SpectatorService, SpyObject } from '@ngneat/spectator';
import { of } from 'rxjs';
import { AnalyticsSavingGoalsService } from 'src/app/core/analytics/analytics.saving-goals.service';
import { SavingGoals } from 'src/app/shared/models/saving-goals';
import { SavingGoalsProxy } from 'src/app/shared/proxy/saving-goals.proxy';
import { SavingGoalsService } from './saving-goals.service';


describe('SavingGoalsService', (): void => {
  let spectator: SpectatorService<SavingGoalsService>;
  let savingGoalsProxySpy: SpyObject<SavingGoalsProxy>;
  let analyticsSavingGoalsServiceSpy: SpyObject<AnalyticsSavingGoalsService>;

  const createService = createServiceFactory({
    service: SavingGoalsService,
    mocks: [SavingGoalsProxy, AnalyticsSavingGoalsService]
  });

  beforeEach((): void => {
    spectator = createService();
    savingGoalsProxySpy = spectator.inject(SavingGoalsProxy);
    analyticsSavingGoalsServiceSpy = spectator.inject(AnalyticsSavingGoalsService);

    savingGoalsProxySpy.sendSavingGoals.and.returnValue(of());
  });

  it('should call saving goals proxy ', (): void => {
    const data: SavingGoals = {
      amount: 24000,
      reachDate: new Date()
    };

    spectator.service.submitSavingGoals(data);

    expect(savingGoalsProxySpy.sendSavingGoals).toHaveBeenCalledWith(data);
    expect(analyticsSavingGoalsServiceSpy.submit).toHaveBeenCalledWith(data);
  });
});
