import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols/field-validation';

export class MinLengthValidation implements FieldValidation {
  field: string;

  minLength: number;

  constructor(field: string, minLength: number) {
    this.field = field;
    this.minLength = minLength;
  }

  validate(input: object): Error {
    return input[this.field]?.length < this.minLength
      ? new InvalidFieldError()
      : null;
  }
}
