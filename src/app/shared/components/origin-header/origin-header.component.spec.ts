import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { OriginHeaderComponent } from './origin-header.component';

describe('OriginHeaderComponent', () => {
  let spectator: Spectator<OriginHeaderComponent>;
  const createComponent = createComponentFactory<OriginHeaderComponent>({
    component: OriginHeaderComponent,
    imports: []
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});


