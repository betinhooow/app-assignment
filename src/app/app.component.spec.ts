import { BrowserModule } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { createComponentFactory, Spectator, SpyObject } from '@ngneat/spectator';
import { ReplaySubject } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnalyticsService } from './core/analytics/analytics.service';
import { OriginHeaderModule } from './shared/components/origin-header/origin-header.module';

describe('AppComponent', (): void => {
  let spectator: Spectator<AppComponent>;
  let analyticsServiceSpy: SpyObject<AnalyticsService>;
  const eventSubject: ReplaySubject<NavigationEnd> = new ReplaySubject<NavigationEnd>(null);

  const RouteMock = {
    navigate: jasmine.createSpy('navigate'),
    events: eventSubject.asObservable(),
    url: 'origin/saving-goals'
  };

  const createComponent = createComponentFactory<AppComponent>({
    component: AppComponent,
    imports: [BrowserModule, AppRoutingModule, OriginHeaderModule],
    mocks: [AnalyticsService],
    providers: [
      { provide: Router, useValue: RouteMock },
    ]
  });

  beforeEach((): void => {
    spectator = createComponent();
    analyticsServiceSpy = spectator.inject(AnalyticsService);

    analyticsServiceSpy.setUserInformation.and.callThrough();
  });

  it('should call set user analytics service when setup', (): void => {
    expect(analyticsServiceSpy.setUserInformation).toHaveBeenCalledTimes(1);
  });

  it('should call page view analytics service when changed route', (): void => {
    eventSubject.next(new NavigationEnd(1, 'saving-goals', ''));

    expect(analyticsServiceSpy.sendPageView).toHaveBeenCalledWith('origin/saving-goals');
  });
});
