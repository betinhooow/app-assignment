import { TestRequest } from '@angular/common/http/testing';
import { createHttpFactory, createServiceFactory, HttpMethod, mockProvider, SpectatorHttp, SpectatorService, SpyObject } from '@ngneat/spectator';
import { of } from 'rxjs';
import { SavingGoals } from 'src/app/shared/models/saving-goals';
import { SavingGoalsProxy } from 'src/app/shared/proxy/saving-goals.proxy';
import { AppConfigurationService } from '../config/app-configuration/app-configuration.service';


describe('SavingGoalsProxy', (): void => {
  let spectator: SpectatorHttp<SavingGoalsProxy>;

  const savingGoalsApi: string = 'http://localhost-test/saving-goals/mock';
  const createHttp = createHttpFactory({
    service: SavingGoalsProxy,
    providers: [
      mockProvider(AppConfigurationService, {
        get: () => {
          return {
            api: { savingGoalsApi }
          };
        }
      })
    ]
  });

  beforeEach((): void => {
    spectator = createHttp();
  });

  it('should call saving goals post ', (): void => {
    const body: SavingGoals = {
      amount: 130000,
      reachDate: new Date()
    }
    // Execution
    spectator.service.sendSavingGoals(body).subscribe();

    // Assertion
    const req: TestRequest = spectator.expectOne(`${savingGoalsApi}/v1/saving-goals`, HttpMethod.POST);
    expect(req.request.body).toEqual(body);
  });
});
