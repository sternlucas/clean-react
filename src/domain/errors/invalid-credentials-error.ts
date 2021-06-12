export class InvalidCredentialsError extends Error {
  constructor() {
    super('Credenciais invávalidas');
    this.name = 'InvalidCredentialsError';
  }
}
