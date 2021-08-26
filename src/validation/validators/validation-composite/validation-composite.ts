import { FieldValidation } from '@/validation/protocols/field-validation';
import { Validation } from '@/presentation/protocols';

export class ValidationComposite implements Validation {
  validators: FieldValidation[];

  constructor(validators: FieldValidation[]) {
    this.validators = validators;
  }

  validate(fieldName: string, fieldValue: string): string {
    const validators = this.validators.filter(v => v.field === fieldName);

    validators.forEach(v => {
      const error = v.validate(fieldValue);
      if (error) {
        return error.message;
      }

      return v;
    });

    return null;
  }
}
