import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NgxCurrencyModule } from 'ngx-currency';
import { InputCurrencyComponent } from './input-currency.component';

describe('InputCurrencyComponent', () => {
  let spectator: Spectator<InputCurrencyComponent>;
  const createComponent = createComponentFactory<InputCurrencyComponent>({
    component: InputCurrencyComponent,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxCurrencyModule],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should set form value when initialized', () => {
    const amount: number = 4000;
    const label: string = 'currency input';

    spectator.setInput('label', label);
    spectator.component.writeValue(amount);

    expect(spectator.component.currencyValue).toEqual(amount);
    expect(spectator.component.label).toEqual(label);
  });

  it('should set currency when changed value', () => {
    const amount: number = 54892.32;
    spectator.component.handleChange(amount);

    expect(spectator.component.currencyValue).toEqual(amount);
  });

  it('should set currency when changed value', () => {
    const amount: number = 54892.32;
    spectator.component.handleChange(amount);

    expect(spectator.component.currencyValue).toEqual(amount);
  });

  it('should prevent action on paste value', () => {
    const spyEvent: KeyboardEvent = jasmine.createSpyObj('e', [ 'preventDefault' ]);
    spectator.component.onPaste(spyEvent);

    expect(spyEvent.preventDefault).toHaveBeenCalledTimes(1);
  });

  it('should register ControlValueAccessor methods', () => {
    const mockFunction: () => void = () => {};

    spectator.component.registerOnChange(mockFunction);
    spectator.component.registerOnTouched(mockFunction);

    expect(spectator.component.propagateChange).toEqual(mockFunction);
    expect(spectator.component.propagateTouched).toEqual(mockFunction);
  });
});
