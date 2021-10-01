import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationProperties } from 'src/app/core/properties/application.properties';
import { SavingGoals } from 'src/app/shared/models/saving-goals';
import { AppConfigurationService } from '../config/app-configuration/app-configuration.service';

@Injectable()
export class SavingGoalsProxy {
  constructor(private config: AppConfigurationService<ApplicationProperties>, private http: HttpClient) { }

  private savingGoalsApiUrl: string = this.config.get().api.savingGoalsApi;

  public sendSavingGoals(body: SavingGoals): Observable<HttpResponse<SavingGoals>> {
    return this.http.post<SavingGoals>(`${this.savingGoalsApiUrl}/v1/saving-goals`, body, { observe: 'response' });
  }
}
