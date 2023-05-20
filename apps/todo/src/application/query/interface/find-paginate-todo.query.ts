import { IQuery } from '@nestjs/cqrs';

export class FindPaginateTodoQuery implements IQuery {
  constructor(readonly page: number, readonly limit: number) {}
}
