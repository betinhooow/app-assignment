import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { validValueValidator } from './valid-value.validator';

@Component({
  template: ''
})
class ValidValueValidatorTestComponent implements OnInit {
  constructor() {}

  form: FormControl = new FormControl();

  ngOnInit(): void {
    this.form.setValidators(validValueValidator());
  }
}

describe('Valid Value Validator', () => {
  let spectator: Spectator<ValidValueValidatorTestComponent>;

  const createComponent = createComponentFactory<ValidValueValidatorTestComponent>({
    component: ValidValueValidatorTestComponent,
    shallow: true,
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  [
    { value: '', expectedError: { invalidValue: true } },
    { value: 0, expectedError: { invalidValue: true } },
    { value: null, expectedError: { invalidValue: true } },
    { value: 'some-value', expectedError: null },
    { value: 1000, expectedError: null }
  ].forEach(({ expectedError, value }) => {
    it(`should ${!expectedError && 'not'} set error when inserted value is ${value}`, () => {
      spectator.component.form.markAsDirty();
      spectator.component.form.setValue(value);

      expect(spectator.component.form.valid).toBe(!expectedError);
      expect(spectator.component.form.errors).toEqual(expectedError);
    });
  });
});
