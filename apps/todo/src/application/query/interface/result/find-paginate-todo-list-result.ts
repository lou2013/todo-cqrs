import { IQueryResult } from '@nestjs/cqrs';
import { FindTodoListByIdResult } from './find-todo-list-by-id-result';

export class FindPaginateTodoListResult implements IQueryResult {
  items: FindTodoListByIdResult[];

  hasNextPage: boolean;

  hasPrevPage: boolean;

  limit: number;

  page?: number;

  offset?: number;

  nextPage?: number;

  totalDocs?: number;

  totalPage?: number;

  constructor(props: FindPaginateTodoListResult) {
    Object.assign(this, props);
  }
}
