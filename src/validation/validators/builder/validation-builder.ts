import { FieldValidation } from '@/validation/protocols/field-validation';
import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  CompareFieldsValidation,
} from '@/validation/validators';

export class ValidationBuilder {
  private fieldName: string;

  private validations: FieldValidation[];

  private constructor(fieldName: string, validtions: FieldValidation[]) {
    this.fieldName = fieldName;
    this.validations = validtions;
  }

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName));
    return this;
  }

  email(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName));
    return this;
  }

  min(length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, length));
    return this;
  }

  sameAs(fieldToCompare: string): ValidationBuilder {
    this.validations.push(
      new CompareFieldsValidation(this.fieldName, fieldToCompare),
    );
    return this;
  }

  build(): FieldValidation[] {
    return this.validations;
  }
}
