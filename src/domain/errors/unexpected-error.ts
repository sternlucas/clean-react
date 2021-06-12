export class UnexpectedError extends Error {
  constructor() {
    super('Algo errado aconteceu. Tente novamente.');
    this.name = 'UnexpectedError';
  }
}
