import { IQuery } from '@nestjs/cqrs';

export class FindTodoByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
