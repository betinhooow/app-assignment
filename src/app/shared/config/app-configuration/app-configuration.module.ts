import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppConfiguration, APP_CONFIG, APP_CONFIG_NAME } from './app-configuration.model';
import { AppConfigurationService } from './app-configuration.service';

export function configInitializer(service: AppConfigurationService<AppConfiguration>): () => Promise<void> {
  return (): Promise<void> => service.initialize();
}

// @dynamic
@NgModule({
  imports: [HttpClientModule]
})
export class AppConfigurationModule {
  public static initConfig(applicationName: string, config?: AppConfiguration): ModuleWithProviders {
    return {
      ngModule: AppConfigurationModule,
      providers: [
        AppConfigurationService,
        { provide: APP_CONFIG_NAME, useValue: applicationName },
        { provide: APP_CONFIG, useValue: config },
        {
          provide: APP_INITIALIZER,
          useFactory: configInitializer,
          multi: true,
          deps: [AppConfigurationService]
        }
      ]
    };
  }
}
