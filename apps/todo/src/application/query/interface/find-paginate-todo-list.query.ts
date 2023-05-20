import { IQuery } from '@nestjs/cqrs';

export class FindPaginateTodoListQuery implements IQuery {
  constructor(readonly page: number, readonly limit: number) {}
}
