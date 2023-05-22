import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoRepositoryImplementation } from 'apps/todo/src/infrastructure/repository/todo-repository-implementation';
import { TodoRepository } from 'apps/todo/src/domain/todo-repository';
import { MoveTodoCommand } from '../interfaces/move-todo-command';

@CommandHandler(MoveTodoCommand)
export class MoveTodoCommandHandler
  implements ICommandHandler<MoveTodoCommand, void>
{
  @Inject(TodoRepositoryImplementation)
  private readonly todoRepository: TodoRepository;

  async execute(command: MoveTodoCommand): Promise<void> {
    await this.todoRepository.moveTodo(command.id, command.todoListId);
  }
}
