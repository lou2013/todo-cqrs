import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoQueryImplementation } from 'apps/todo/src/infrastructure/query/todo-query-implementation';
import { FindTodoByIdQuery } from '../interface/find-todo-by-id.query';
import { FindTodoByIdResult } from '../interface/result/find-todo-by-id-result';
import { TodoQuery } from '../../../domain/todo-query';

@QueryHandler(FindTodoByIdQuery)
export class FindTodoByIdHandler
  implements IQueryHandler<FindTodoByIdQuery, FindTodoByIdResult>
{
  @Inject(TodoQueryImplementation)
  private readonly todoQuery: TodoQuery;

  async execute(command: FindTodoByIdQuery): Promise<FindTodoByIdResult> {
    return await this.todoQuery.findTodoById(command.id);
  }
}
