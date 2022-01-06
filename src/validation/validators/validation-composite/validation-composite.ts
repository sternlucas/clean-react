import { FieldValidation } from '@/validation/protocols/field-validation';
import { Validation } from '@/presentation/protocols';

export class ValidationComposite implements Validation {
  validators: FieldValidation[];

  private constructor(validators: FieldValidation[]) {
    this.validators = validators;
  }

  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators);
  }

  validate(fieldName: string, input: object): string {
    const validators = this.validators.filter(v => v.field === fieldName);

    for (let index = 0; index < validators.length; index += 1) {
      const element = validators[index];
      const error = element.validate(input);
      if (error) {
        return error.message;
      }
    }

    return null;
  }
}
