import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { AppConfiguration, APP_CONFIG, APP_CONFIG_NAME } from './app-configuration.model';
import { AppConfigurationService } from './app-configuration.service';

describe('AppConfigurationService', (): void => {
  interface MyCustomConfiguration extends AppConfiguration {
    myCustomSetting: string;
  }

  const myCustomConfig = { apiEndpoint: 'localhost', myCustomSetting: 'custom-value' } as MyCustomConfiguration;

  let spectator: SpectatorHttp<AppConfigurationService<MyCustomConfiguration>>;
  const createHttp = createHttpFactory<AppConfigurationService<MyCustomConfiguration>>({
    service: AppConfigurationService,
    providers: [
      AppConfigurationService,
      { provide: APP_CONFIG_NAME, useValue: 'application-name' },
      { provide: APP_CONFIG, useValue: myCustomConfig }
    ]
  });

  beforeEach((): void => {
    spectator = createHttp();
  });

  beforeEach((): void => {
    jasmine.clock().mockDate(new Date());
  });

  afterEach((): void => {
    jasmine.clock().uninstall();
  });

  it('should be created', (): void => {
    expect(spectator.service).toBeTruthy();
  });

  it('should return configuration provided on APP_CONFIG before initialize', (): void => {
    expect(spectator.service.get()).toEqual(myCustomConfig);
  });

  it('should get application-name.json on current location path', (): void => {
    const applicationName = 'application-name';
    const randomValue = new Date().getTime();

    spectator.service.initialize().then();

    spectator.expectOne(`./${applicationName}.json?${randomValue}`, HttpMethod.GET);
  });

  it('should merge configuration on initialize, prioritizing get from request', (): void => {
    const applicationName = 'application-name';
    const expectedResult = {
      apiEndpoint: 'http://localhost:0000',
      oktaConfig: {
        issuer: 'test',
        redirectUri: 'http://localhost:1111',
        clientId: 'application'
      }
    };

    spectator.service.initialize().then();
    const randomValue = new Date().getTime();

    const httpRequest = spectator.expectOne(`./${applicationName}.json?${randomValue}`, HttpMethod.GET);
    httpRequest.flush(expectedResult);

    expect(spectator.service.get()).toEqual({ ...myCustomConfig, ...expectedResult });
  });

  it('should allow Generics configuration type on get', (): void => {
    const applicationName = 'application-name';
    const expectedResult: MyCustomConfiguration = {
      apiEndpoint: 'http://localhost:4200',
      myCustomSetting: 'custom-settings-test'
    };

    spectator.service.initialize().then();

    const randomValue = new Date().getTime();
    const httpRequest = spectator.expectOne(`./${applicationName}.json?${randomValue}`, HttpMethod.GET);
    httpRequest.flush(expectedResult);

    expect(spectator.service.get().myCustomSetting).toBe(expectedResult.myCustomSetting);
  });
});
