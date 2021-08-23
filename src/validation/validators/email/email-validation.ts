import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols/field-validation';

export class EmailValidation implements FieldValidation {
  readonly field: string;

  constructor(field: string) {
    this.field = field;
  }

  validate(value: string): Error {
    const emailRegex = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)",
    );
    return !value || emailRegex.test(value) ? null : new InvalidFieldError();
  }
}
