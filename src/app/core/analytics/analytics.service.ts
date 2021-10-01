import { Injectable } from '@angular/core';

declare var dataLayer: any;

@Injectable()
export class AnalyticsService {
  constructor() {}

  setUserInformation(): void {
    const userLoggedId: string = 'get.user.id';
    const userType: string = 'get.user.type';

    dataLayer.push({
      userid: userLoggedId,
      'user-type': userType
    });
  }

  sendPageView(url: string) {
    dataLayer.push({
      event: 'page-view',
      url
    });
  }
}
