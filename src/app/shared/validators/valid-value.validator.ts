import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validValueValidator(): ValidatorFn {
  return (form: FormControl): ValidationErrors => {
    let error: ValidationErrors = null;

    if (!form.value) {
      error = { invalidValue: true };
    }

    return error;
  };
}
