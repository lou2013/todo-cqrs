import { IQueryResult } from '@nestjs/cqrs';
import { FindTodoByIdResult } from './find-todo-by-id-result';

export class FindAllTodoResult implements IQueryResult {
  items: FindTodoByIdResult[];

  constructor(props: FindAllTodoResult) {
    Object.assign(this, props);
  }
}
