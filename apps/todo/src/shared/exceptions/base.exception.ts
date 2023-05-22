import { RpcException } from '@nestjs/microservices';

export class BaseException extends RpcException {
  constructor({
    code,
    message,
    err,
  }: {
    code: number;
    message: string;
    err?: Error;
  }) {
    super({ code, message, err });
  }
}
