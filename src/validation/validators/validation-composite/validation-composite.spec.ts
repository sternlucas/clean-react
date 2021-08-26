import { FieldValidationSpy } from '../test/mock-field-validation';
import { ValidationComposite } from './validation-composite';

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldValidationSpy = new FieldValidationSpy('');
    const fieldValidationSpy2 = new FieldValidationSpy('');
    fieldValidationSpy2.error = new Error('message');
    const sut = new ValidationComposite([
      fieldValidationSpy,
      fieldValidationSpy2,
    ]);
    const error = sut.validate('', '');
    expect(error).toBe('');
  });
});
