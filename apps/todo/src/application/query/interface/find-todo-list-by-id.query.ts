import { IQuery } from '@nestjs/cqrs';

export class FindTodoListByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
