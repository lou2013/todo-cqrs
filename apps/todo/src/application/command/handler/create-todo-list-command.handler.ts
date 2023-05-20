import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoRepository } from 'apps/todo/src/domain/todo-repository';
import { TodoRepositoryImplementation } from 'apps/todo/src/infrastructure/repository/todo-repository-implementation';
import { CreateTodoListCommand } from '../interfaces/create-todo-list-command';

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler
  implements ICommandHandler<CreateTodoListCommand, void>
{
  @Inject(TodoRepositoryImplementation)
  private readonly todoRepository: TodoRepository;

  async execute(command: CreateTodoListCommand): Promise<void> {
    await this.todoRepository.saveTodoList({
      ...command,
      id: this.todoRepository.newId().toString(),
      todos: [],
    });
    return;
  }
}
