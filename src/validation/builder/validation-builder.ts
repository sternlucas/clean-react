import { FieldValidation } from '@/validation/protocols/field-validation';
import { RequiredFieldValidation } from '@/validation/validators';

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

  build(): FieldValidation[] {
    return this.validations;
  }
}
