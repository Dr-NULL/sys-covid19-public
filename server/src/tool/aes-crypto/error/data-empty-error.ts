export class DataEmptyError extends Error {
  constructor() {
    super();
    this.message = 'The cryptographic data wasn\'t loaded, please execute first this.randomKeys(\'--aes-algorithm--\') before encrypt/decript';
  }
}