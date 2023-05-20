import { IQueryResult } from '@nestjs/cqrs';

export class FindTodoListByIdResult implements IQueryResult {
  readonly id: string;

  readonly description: string;

  readonly name: string;

  readonly todos: FindTodoListByIdResult[];

  constructor(props: FindTodoListByIdResult) {
    Object.assign(this, props);
  }
}
