import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppConfiguration, APP_CONFIG, APP_CONFIG_NAME } from './app-configuration.model';

// @dynamic
@Injectable()
export class AppConfigurationService<T extends AppConfiguration> {
  private configuration: any;

  constructor (private http: HttpClient, @Inject(APP_CONFIG_NAME) private appName: string, @Inject(APP_CONFIG) private config: T) {
    this.configuration = this.config;
  }

  public get(): T {
    return this.configuration;
  }

  public initialize(): Promise<void> {
    const randomValue = new Date().getTime();

    return this.http
      .get(`./${this.appName}.json?${randomValue}`)
      .pipe(
        tap((value: any) => (this.configuration = { ...this.configuration, ...value }))
      )
      .toPromise();
  }
}
