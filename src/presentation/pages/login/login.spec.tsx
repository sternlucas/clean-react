import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import {
  AuthenticationSpy,
  SaveAccessTokenMock,
  ValidationStub,
  Helper,
} from '@/presentation/test';
import faker from 'faker';

import { InvalidCredentialsError } from '@/domain/errors';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Login } from '@/presentation/pages';

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });
const makeSut = (params?: SutParams): SutTypes => {
  const authenticationSpy = new AuthenticationSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();

  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;

  const sut = render(
    <Router history={history}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>,
  );
  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock,
  };
};

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password(),
): Promise<void> => {
  Helper.populateField(sut, 'email', email);
  Helper.populateField(sut, 'password', password);

  const form = sut.getByTestId('form');
  fireEvent.submit(form);

  await waitFor(() => form);
};

describe('Login Component', () => {
  afterAll(cleanup);

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helper.testChildCount(sut, 'error-wrap', 0);

    Helper.testButtonIsDisabled(sut, 'submit', true);

    Helper.testStatusForField(sut, 'email', validationError);
    Helper.testStatusForField(sut, 'password', validationError);
  });

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helper.populateField(sut, 'email');

    Helper.testStatusForField(sut, 'email', validationError);
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helper.populateField(sut, 'password');

    Helper.testStatusForField(sut, 'password', validationError);
  });

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut();

    Helper.populateField(sut, 'email');

    Helper.testStatusForField(sut, 'email');
  });

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut();

    Helper.populateField(sut, 'password');

    Helper.testStatusForField(sut, 'password');
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();

    Helper.populateField(sut, 'email');

    Helper.populateField(sut, 'password');

    Helper.testButtonIsDisabled(sut, 'submit', false);
  });

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut();

    await simulateValidSubmit(sut);

    Helper.testElementExists(sut, 'spinner');
  });

  test('Should call authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut();

    const email = faker.internet.email();
    const password = faker.internet.password();

    await simulateValidSubmit(sut, email, password);

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  test('Should call authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut();

    await simulateValidSubmit(sut);
    await simulateValidSubmit(sut);

    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('Should not call authentication if form is invalid', async () => {
    const validationError = faker.random.words();
    const { sut, authenticationSpy } = makeSut({ validationError });

    await simulateValidSubmit(sut);

    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('Should present error if authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut();

    const error = new InvalidCredentialsError();

    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error);

    await simulateValidSubmit(sut);

    Helper.testElementText(sut, 'main-error', error.message);

    Helper.testChildCount(sut, 'error-wrap', 1);
  });

  test('Should call SaveAccessToken on sucess', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut();

    await simulateValidSubmit(sut);

    expect(saveAccessTokenMock.accessToken).toBe(
      authenticationSpy.account.accessToken,
    );
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });

  test('Should present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut();

    const error = new InvalidCredentialsError();

    jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error);

    await simulateValidSubmit(sut);

    Helper.testElementText(sut, 'main-error', error.message);

    Helper.testChildCount(sut, 'error-wrap', 1);
  });

  test('Should go to signup page', async () => {
    const { sut } = makeSut();

    const register = sut.getByTestId('signup-link');
    fireEvent.click(register);

    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/signup');
  });
});
