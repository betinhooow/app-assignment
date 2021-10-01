import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { AnalyticsSavingGoalsService } from './analytics.saving-goals.service';

declare global {
  interface Window {
    dataLayer: any[];
  }
}
describe('AnalyticsSavingGoalsService', (): void => {
  let spectator: SpectatorService<AnalyticsSavingGoalsService>;

  const createService = createServiceFactory({
    service: AnalyticsSavingGoalsService,
    mocks: []
  });

  beforeEach((): void => {
    spectator = createService();
    window.dataLayer = [];
  });

  it('should push dataLayer when access the saving goals page', (): void => {
    expect(window.dataLayer.length).toBe(0);

    spectator.service.access();

    expect(window.dataLayer.length).toBe(1);
    expect(window.dataLayer[0]).toEqual({
      event: 'saving-goals',
      label: 'saving-goals-access',
      action: 'access',
      userid: 'user-id-here'
    });
  });

  it('should push dataLayer with form data', (): void => {
    const amount: number = 1000;
    const reachDate: Date = new Date();
    expect(window.dataLayer.length).toBe(0);

    spectator.service.submit({ amount, reachDate });

    expect(window.dataLayer.length).toBe(1);
    expect(window.dataLayer[0]).toEqual({
      event: 'saving-goals',
      label: 'saving-goals-submit',
      action: 'submit',
      userid: 'user-id-here',
      amount,
      reachdate: reachDate
    });
  });
});
