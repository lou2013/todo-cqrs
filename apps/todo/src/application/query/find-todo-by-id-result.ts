import { IQueryResult } from '@nestjs/cqrs';

export class FindTodoByIdResult implements IQueryResult {
  readonly id: string;
  readonly priority: number;
  readonly title: string;
  readonly todoList: string;
}