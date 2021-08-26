import { FieldValidation } from '@/validation/protocols/field-validation';
import { Validation } from '@/presentation/protocols';

export class ValidationComposite implements Validation {
  validators: FieldValidation[];

  constructor(validators: FieldValidation[]) {
    this.validators = validators;
  }

  validate(fieldName: string, fieldValue: string): string {
    const validators = this.validators.filter(v => v.field === fieldName);

    for (let index = 0; index < validators.length; index += 1) {
      const element = validators[index];
      const error = element.validate(fieldValue);
      if (error) {
        return error.message;
      }
    }

    return null;
  }
}
