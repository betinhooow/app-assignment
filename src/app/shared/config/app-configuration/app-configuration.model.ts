import { InjectionToken } from '@angular/core';

export interface AppConfiguration {
  apiEndpoint: string;
}

export const APP_CONFIG_NAME = new InjectionToken<string>('APP_CONFIG_NAME');
export const APP_CONFIG = new InjectionToken<AppConfiguration>('APP_CONFIG');
