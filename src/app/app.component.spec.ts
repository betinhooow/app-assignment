import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { AppComponent } from './app.component';
import { OriginHeaderModule } from './shared/components/origin-header/origin-header.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory<AppComponent>({
    component: AppComponent,
    imports: [BrowserModule, AppRoutingModule, OriginHeaderModule]
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
