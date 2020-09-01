export class InvalidCipherError extends Error {
  constructor() {
    super();
    this.message = 'The cipher algorithm provided isn\'t valid.';
  }
}