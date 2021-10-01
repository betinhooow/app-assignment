import { AppConfiguration } from "src/app/shared/config/app-configuration/app-configuration.model";

export interface ApplicationProperties extends AppConfiguration {
  api: ApplicationPropertiesApi;
}

export interface ApplicationPropertiesApi {
  savingGoalsApi: string;
}
