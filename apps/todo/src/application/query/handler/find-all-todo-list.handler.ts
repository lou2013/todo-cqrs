import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoQueryImplementation } from 'apps/todo/src/infrastructure/query/todo-query-implementation';
import { FindAllTodoListQuery } from '../interface/find-all-todo-list.query';
import { FindAllTodoListResult } from '../interface/result/find-all-todo-list-result';
import { TodoQuery } from '../../../domain/todo-query';

@QueryHandler(FindAllTodoListQuery)
export class FindAllTodoListHandler
  implements IQueryHandler<FindAllTodoListQuery, FindAllTodoListResult>
{
  @Inject(TodoQueryImplementation)
  private readonly todoQuery: TodoQuery;

  async execute(): Promise<FindAllTodoListResult> {
    return await this.todoQuery.findAllTodoList();
  }
}
