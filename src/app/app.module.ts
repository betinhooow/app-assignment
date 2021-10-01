import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnalyticsService } from './core/analytics/analytics.service';
import { OriginHeaderModule } from './shared/components/origin-header/origin-header.module';
import { AppConfigurationModule } from './shared/config/app-configuration/app-configuration.module';
import { ProxyModule } from './shared/proxy/proxy.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OriginHeaderModule,
    ProxyModule,
    HttpClientModule,
    AppConfigurationModule.initConfig('origin-test-app'),
  ],
  providers: [AnalyticsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
