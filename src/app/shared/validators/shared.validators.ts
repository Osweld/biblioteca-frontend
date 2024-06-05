import { AbstractControl, ValidatorFn } from '@angular/forms';

export function greaterThanZeroValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid = control.value > 0;
    return isValid ? null : { greaterThanZero: { value: control.value } };
  };
}
