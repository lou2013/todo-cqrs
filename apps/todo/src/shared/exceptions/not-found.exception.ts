import { CodeError } from '../enum/code-error.enum';
import { BaseException } from './base.exception';

export class NotFoundException extends BaseException {
  constructor({
    code = CodeError.NOT_FOUND,
    message = 'not found',
    err,
  }: {
    message: string;
    code?: number;
    err?: Error;
  }) {
    super({ code, message, err });
  }
}
