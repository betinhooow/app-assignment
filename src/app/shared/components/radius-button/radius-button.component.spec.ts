import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { RadiusButtonComponent } from './radius-button.component';


describe('RadiusButtonComponent', (): void => {
  let spectator: Spectator<RadiusButtonComponent>;
  const createComponent = createComponentFactory<RadiusButtonComponent>({
    component: RadiusButtonComponent,
    imports: []
  });

  beforeEach((): void => {
    spectator = createComponent();
  });

  it('should create with label param', (): void => {
    const label: string = "label button";
    spectator.setInput('label', label);

    expect(spectator.component).toBeTruthy();
    expect(spectator.component.label).toEqual(label);
  });
});

