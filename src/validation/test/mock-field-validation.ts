import { FieldValidation } from '@/validation/protocols/field-validation';

export class FieldValidationSpy implements FieldValidation {
  field: string;

  error: Error = null;

  constructor(field: string) {
    this.field = field;
  }

  validate(input: object): Error {
    return this.error;
  }
}
