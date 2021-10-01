import { Injectable, Inject } from '@angular/core';
import { AppConfiguration, APP_CONFIG } from '../app-configuration.model';

// @dynamic
@Injectable()
export class AppConfigurationTestingService<T extends AppConfiguration> {
  private configuration: any;

  constructor(@Inject(APP_CONFIG) private config: T) {
    this.configuration = this.config;
  }

  public get(): T {
    return this.configuration as T;
  }
}
