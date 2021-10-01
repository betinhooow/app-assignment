import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OriginHeaderModule } from './shared/components/origin-header/origin-header.module';
import { ProxyModule } from './shared/proxy/proxy.module';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigurationModule } from './shared/config/app-configuration/app-configuration.module';

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
  bootstrap: [AppComponent]
})
export class AppModule {}
