import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';

import { AppConfigurationService } from '../app-configuration.service';
import { APP_CONFIG } from '../app-configuration.model';
import { AppConfigurationTestingService } from './app-configuration-testing.service';

@NgModule()
export class AppConfigurationTestingModule {
  public static initConfig(configuration: any): ModuleWithProviders {
    return {
      ngModule: AppConfigurationTestingModule,
      providers: [
        { provide: AppConfigurationService, useClass: AppConfigurationTestingService },
        { provide: APP_CONFIG, useValue: configuration }
      ]
    };
  }
}
