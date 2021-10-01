import { AppConfigurationTestingModule } from './app-configuration-testing.module';
import { APP_INITIALIZER } from '@angular/core';
import { APP_CONFIG } from '../app-configuration.model';

describe('AppConfigurationTestingModule', (): void => {
  describe('Unit Tests', (): void => {
    it('should return module configuration on initConfig', (): void => {
      const moduleConfig = AppConfigurationTestingModule.initConfig({});

      const appInitializer = moduleConfig.providers.find(item => item.provide === APP_INITIALIZER);

      expect(moduleConfig.ngModule).toBe(AppConfigurationTestingModule);
      expect(appInitializer).toBeFalsy();
    });

    it('should call AppConfigurationService initialize', (): void => {
      const moduleConfig = AppConfigurationTestingModule.initConfig({ apiEndpoint: 'localhost:4000' });

      const appConfig = moduleConfig.providers.find(item => item.provide === APP_CONFIG);

      expect(moduleConfig.ngModule).toBe(AppConfigurationTestingModule);
      expect(appConfig).toBeTruthy();
      expect(appConfig.useValue.apiEndpoint).toBe('localhost:4000');
    });
  });
});
