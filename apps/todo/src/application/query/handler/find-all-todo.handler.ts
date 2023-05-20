import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoQueryImplementation } from 'apps/todo/src/infrastructure/query/todo-query-implementation';
import { FindAllTodoQuery } from '../interface/find-all-todo.query';
import { FindAllTodoResult } from '../interface/result/find-all-todo-result';

@QueryHandler(FindAllTodoQuery)
export class FindAllTodo
  implements IQueryHandler<FindAllTodoQuery, FindAllTodoResult>
{
  @Inject(TodoQueryImplementation)
  private readonly todoQuery: TodoQueryImplementation;

  async execute(): Promise<FindAllTodoResult> {
    return await this.todoQuery.findAllTodo();
  }
}
