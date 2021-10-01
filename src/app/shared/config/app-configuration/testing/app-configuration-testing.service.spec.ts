import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppConfigurationTestingService } from './app-configuration-testing.service';
import { AppConfiguration, APP_CONFIG } from '../app-configuration.model';
import { AppConfigurationService } from '../app-configuration.service';

describe('AppConfigurationTestingService', (): void => {
  describe('Unit Tests', (): void => {
    interface MyCustomConfiguration extends AppConfiguration {
      myCustomSetting: string;
    }

    const myCustomConfig = { apiEndpoint: 'localhost', myCustomSetting: 'custom-value' } as MyCustomConfiguration;

    beforeEach((): void => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          { provide: AppConfigurationService, useClass: AppConfigurationTestingService },
          { provide: APP_CONFIG, useValue: myCustomConfig }
        ]
      });
    });

    it('should be created', (): void => {
      const service: AppConfigurationService<AppConfiguration> = TestBed.get(AppConfigurationService);
      expect(service).toBeTruthy();
    });

    it('should return configuration provided on APP_CONFIG before initialize', (): void => {
      const service: AppConfigurationService<AppConfiguration> = TestBed.get(AppConfigurationService);

      expect(service.get()).toEqual(myCustomConfig);
    });
  });
});
