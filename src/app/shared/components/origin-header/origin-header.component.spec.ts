import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { OriginHeaderComponent } from './origin-header.component';

describe('OriginHeaderComponent', (): void => {
  let spectator: Spectator<OriginHeaderComponent>;
  const createComponent = createComponentFactory<OriginHeaderComponent>({
    component: OriginHeaderComponent,
    imports: []
  });

  beforeEach((): void => {
    spectator = createComponent();
  });

  it('should create', (): void => {
    expect(spectator.component).toBeTruthy();
  });
});


