import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoQueryImplementation } from 'apps/todo/src/infrastructure/query/todo-query-implementation';
import { FindPaginateTodoQuery } from '../interface/find-paginate-todo.query';
import { FindPaginateTodoResult } from '../interface/result/find-paginate-todo-result';
import { TodoQuery } from '../interface/todo-query';

@QueryHandler(FindPaginateTodoQuery)
export class FindPaginateTodo
  implements IQueryHandler<FindPaginateTodoQuery, FindPaginateTodoResult>
{
  @Inject(TodoQueryImplementation)
  private readonly todoQuery: TodoQuery;

  async execute(
    command: FindPaginateTodoQuery,
  ): Promise<FindPaginateTodoResult> {
    return await this.todoQuery.findPaginatedTodo({
      limit: command.limit,
      page: command.page,
    });
  }
}
