import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AnalyticsService } from './core/analytics/analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<boolean> = new Subject();

  constructor(
    public router: Router,
    public analyticsService: AnalyticsService,
  ) {}

  ngOnInit(): void {
    this.analyticsService.setUserInformation();

    this.subscribeSendPageViewAnalytics();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private subscribeSendPageViewAnalytics(): void {
    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.analyticsService.sendPageView(this.router.url));
  }
}
