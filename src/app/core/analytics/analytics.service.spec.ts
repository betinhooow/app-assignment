import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { AnalyticsService } from './analytics.service';

declare global {
  interface Window {
    dataLayer: any[];
  }
}
describe('AnalyticsService', (): void => {
  let spectator: SpectatorService<AnalyticsService>;

  const createService = createServiceFactory({
    service: AnalyticsService,
    mocks: []
  });

  beforeEach((): void => {
    spectator = createService();
    window.dataLayer = [];
  });

  it('should push dataLayer with user data', (): void => {
    expect(window.dataLayer.length).toBe(0);

    spectator.service.setUserInformation();

    expect(window.dataLayer.length).toBe(1);
    expect(window.dataLayer[0]).toEqual({
      userid: 'get.user.id',
      'user-type': 'get.user.type'
    });
  });

  it('should push dataLayer with user data', (): void => {
    const url: string = 'page-route';
    expect(window.dataLayer.length).toBe(0);

    spectator.service.sendPageView(url);

    expect(window.dataLayer.length).toBe(1);
    expect(window.dataLayer[0]).toEqual({
      event: 'page-view',
      url
    });
  });
});
