import { ArgumentsHost, RpcExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { BaseException } from '../exceptions/base.exception';

export class TodoErrorFilter implements RpcExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): Observable<any> {
    let message = `internal server error`;
    let code = 500;
    if (exception instanceof BaseException) {
      const baseException = exception.getError() as {
        message: string;
        code: number;
        err: Error;
      };
      message = baseException.message;
      code = baseException.code;
    }
    return throwError(() => ({
      details: JSON.stringify({ message, code, exception }),
      code: code,
    }));
  }
}

/**
 * {
    code: 12,
    details: 'The server does not implement the method createTodo',
    metadata: Metadata {
      internalRepr: Map(2) {
        'content-type' => [ 'application/grpc+proto' ],
        'date' => [ 'Mon, 22 May 2023 14:36:15 GMT' ]
      },
      options: {}
    }
  }
 */
