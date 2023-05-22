import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { isJSON } from 'class-validator';
import { Response } from 'express';
import { GRPC_TO_HTTP_CODE } from '../const/grpc-code-to-http-code.const';
import { GRPC_CODE_MESSAGES } from '../const/grpc-code-to-http-code.const copy';

export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    let message: string;

    let code: number;
    if (exception instanceof RpcException) {
      if (
        isJSON(
          (
            exception.getError() as {
              details: string;
              code: number;
            }
          ).details,
        )
      ) {
        const data = JSON.parse(
          (
            exception.getError() as {
              details: string;
              code: number;
            }
          ).details,
        ) as unknown as { message: string; code: number; err: unknown };
        code = GRPC_TO_HTTP_CODE[data.code];
        message = data.message;
      } else {
        message = GRPC_CODE_MESSAGES[exception.message.split(' ')[0]];
        code = 500;
      }
    }
    response.status(code).send({
      message: message,
    });
  }
}
