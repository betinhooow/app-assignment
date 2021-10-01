import { AppConfigurationModule, configInitializer } from './app-configuration.module';
import { APP_INITIALIZER } from '@angular/core';
import { AppConfiguration, APP_CONFIG_NAME, APP_CONFIG } from './app-configuration.model';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppConfigurationService } from './app-configuration.service';

describe('AppConfigurationModule', () => {
  describe('Unit Tests', () => {
    const myCustomConfig = { apiEndpoint: 'localhost' } as AppConfiguration;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, AppConfigurationModule],
        providers: [
          AppConfigurationService,
          { provide: APP_CONFIG_NAME, useValue: 'application-name' },
          { provide: APP_CONFIG, useValue: myCustomConfig },
          {
            provide: APP_INITIALIZER,
            useFactory: configInitializer,
            multi: true,
            deps: [AppConfigurationService]
          }
        ]
      });
    });

    it('should return module configuration on initConfig', () => {
      const moduleConfig = AppConfigurationModule.initConfig('application-name');

      const appInitializer = moduleConfig.providers.find(item => item.provide === APP_INITIALIZER);

      expect(moduleConfig.ngModule).toBe(AppConfigurationModule);
      expect(appInitializer).toBeTruthy();
      expect(appInitializer.multi).toBeTruthy();
      expect(appInitializer.provide).toBe(APP_INITIALIZER);
    });

    it('should call AppConfigurationService initialize', () => {
      const service = TestBed.get(AppConfigurationService);
      const spy = spyOn(service, 'initialize');

      const moduleConfig = AppConfigurationModule.initConfig('application-name');
      const appInitializer = moduleConfig.providers.find(item => item.provide === APP_INITIALIZER);

      appInitializer.useFactory(service)();

      expect(spy).toHaveBeenCalled();
    });

    it('should run initialize when run configInitializer Factory', () => {
      const service = TestBed.get(AppConfigurationService);
      const spy = spyOn(service, 'initialize');

      const appInitializer = configInitializer(service);

      appInitializer();

      expect(spy).toHaveBeenCalled();
    });

    it('should run initialize when run configInitializer', () => {
      const service = TestBed.get(AppConfigurationService);

      const appInitializer = configInitializer(service);

      appInitializer();

      expect(service.get()).toEqual(myCustomConfig);
    });
  });
});
