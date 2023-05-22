import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    let message: string;
    let code: number;
    if (exception instanceof RpcException) {
      message = exception.message;
      // code = exception.getError()
    }
  }
}
