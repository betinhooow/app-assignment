import { ChangeDetectorRef, Component, forwardRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';

@Component({
  selector: 'app-input-currency',
  templateUrl: './input-currency.component.html',
  styleUrls: ['./input-currency.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCurrencyComponent),
      multi: true
    }
  ]
})
export class InputCurrencyComponent implements OnInit, ControlValueAccessor {
  @Input() label = '';
  public currencyValue = 0;

  constructor() {}

  ngOnInit(): void {}

  writeValue(value: number): void {
    this.currencyValue = value;
  }

  handleChange(value: number): void {
    this.currencyValue = value;
    this.propagateChange(this.currencyValue);
    this.propagateTouched();
  }

  onPaste(event: KeyboardEvent): void {
    event.preventDefault();
  }

  propagateChange = (value: number): void => {};
  propagateTouched = (): void => {};

  registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn): void {
    this.propagateTouched = fn;
  }
}
