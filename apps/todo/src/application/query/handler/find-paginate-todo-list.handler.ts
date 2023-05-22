import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoQueryImplementation } from 'apps/todo/src/infrastructure/query/todo-query-implementation';
import { FindPaginateTodoListQuery } from '../interface/find-paginate-todo-list.query';
import { FindPaginateTodoListResult } from '../interface/result/find-paginate-todo-list-result';
import { TodoQuery } from '../../../domain/todo-query';

@QueryHandler(FindPaginateTodoListQuery)
export class FindPaginateTodoListHandler
  implements
    IQueryHandler<FindPaginateTodoListQuery, FindPaginateTodoListResult>
{
  @Inject(TodoQueryImplementation)
  private readonly todoQuery: TodoQuery;

  async execute(
    command: FindPaginateTodoListQuery,
  ): Promise<FindPaginateTodoListResult> {
    return await this.todoQuery.findPaginatedTodoList({
      limit: command.limit,
      page: command.page,
    });
  }
}
