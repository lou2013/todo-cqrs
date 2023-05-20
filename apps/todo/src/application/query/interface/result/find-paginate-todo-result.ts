import { IQueryResult } from '@nestjs/cqrs';
import { FindTodoByIdResult } from './find-todo-by-id-result';

export class FindPaginateTodoResult implements IQueryResult {
  items: FindTodoByIdResult[];

  hasNextPage: boolean;

  hasPrevPage: boolean;

  limit: number;

  page?: number;

  offset?: number;

  nextPage?: number;

  totalDocs?: number;

  totalPage?: number;

  constructor(props: FindPaginateTodoResult) {
    Object.assign(this, props);
  }
}
