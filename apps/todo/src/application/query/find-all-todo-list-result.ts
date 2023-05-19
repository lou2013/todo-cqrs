import { IQueryResult } from '@nestjs/cqrs';
import { FindTodoListByIdResult } from './find-todo-list-by-id';

export class FindAllTodoListResult implements IQueryResult {
  items: FindTodoListByIdResult[];

  constructor(props: FindAllTodoListResult) {
    Object.assign(this, props);
  }
}
