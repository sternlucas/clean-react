import { FieldValidationSpy } from '../test/mock-field-validation';
import { ValidationComposite } from './validation-composite';

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[];
};

const makeSut = (): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(''),
    new FieldValidationSpy(''),
  ];
  const sut = new ValidationComposite(fieldValidationsSpy);

  return {
    sut,
    fieldValidationsSpy,
  };
};

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const { sut, fieldValidationsSpy } = makeSut();
    fieldValidationsSpy[0].error = new Error('message');
    fieldValidationsSpy[1].error = new Error('message');
    const error = sut.validate('', '');
    expect(error).toBe('');
  });
});
