export class NotFoundError extends Error {
  code: string;

  constructor({ message, code }) {
    super(message);
    this.code = code;
  }
}
