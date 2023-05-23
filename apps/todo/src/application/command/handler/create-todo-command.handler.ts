import { Inject } from '@nestjs/common';
import { TodoQueryImplementation } from 'apps/todo/src/infrastructure/query/todo-query-implementation';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoQuery } from 'apps/todo/src/domain/todo-query';
import { TodoRepository } from 'apps/todo/src/domain/todo-repository';
import { TodoRepositoryImplementation } from 'apps/todo/src/infrastructure/repository/todo-repository-implementation';
import { CreateTodoCommand } from '../interfaces/create-todo-command';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler
  implements ICommandHandler<CreateTodoCommand, void>
{
  @Inject(TodoRepositoryImplementation)
  private readonly todoRepository: TodoRepository;

  @Inject(TodoQueryImplementation)
  private readonly todoQuery: TodoQuery;

  async execute(command: CreateTodoCommand): Promise<void> {
    await this.todoQuery.findTodoListById(command.todoListId);
    const todo = await this.todoRepository.saveTodo({
      ...command,
      id: this.todoRepository.newId().toString(),
    });
    await this.todoRepository.moveTodo(todo[0].id, command.todoListId);
    return;
  }
}
