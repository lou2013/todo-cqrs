import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoQueryImplementation } from 'apps/todo/src/infrastructure/query/todo-query-implementation';
import { FindTodoListByIdQuery } from '../interface/find-todo-list-by-id.query';
import { FindTodoListByIdResult } from '../interface/result/find-todo-list-by-id-result';
import { TodoQuery } from '../interface/todo-query';

@QueryHandler(FindTodoListByIdQuery)
export class FindTodoListByIdHandler
  implements IQueryHandler<FindTodoListByIdQuery, FindTodoListByIdResult>
{
  @Inject(TodoQueryImplementation)
  private readonly todoQuery: TodoQuery;

  async execute(
    command: FindTodoListByIdQuery,
  ): Promise<FindTodoListByIdResult> {
    return await this.todoQuery.findTodoListById(command.id);
  }
}
