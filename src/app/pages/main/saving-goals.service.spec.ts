import { createServiceFactory, SpectatorService, SpyObject } from '@ngneat/spectator';
import { of } from 'rxjs';
import { SavingGoals } from 'src/app/shared/models/saving-goals';
import { SavingGoalsProxy } from 'src/app/shared/proxy/saving-goals.proxy';
import { SavingGoalsService } from './saving-goals.service';


describe('SavingGoalsService', () => {
  let spectator: SpectatorService<SavingGoalsService>;
  let savingGoalsProxySpy: SpyObject<SavingGoalsProxy>;

  const createService = createServiceFactory({
    service: SavingGoalsService,
    mocks: [SavingGoalsProxy]
  });

  beforeEach(() => {
    spectator = createService();
    savingGoalsProxySpy = spectator.inject(SavingGoalsProxy);

    savingGoalsProxySpy.sendSavingGoals.and.returnValue(of());
  });

  it('should call saving goals proxy ', () => {
    const data: SavingGoals = {
      amount: 24000,
      reachDate: new Date()
    };

    spectator.service.submitSavingGoals(data);

    expect(savingGoalsProxySpy.sendSavingGoals).toHaveBeenCalledWith(data);
  });
});
