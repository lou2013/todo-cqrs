import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoRepositoryImplementation } from 'apps/todo/src/infrastructure/repository/todo-repository-implementation';
import { UpdateTodoListCommand } from '../interfaces/update-todo-list-command';

@CommandHandler(UpdateTodoListCommand)
export class UpdateTodoListHandler
  implements ICommandHandler<UpdateTodoListCommand, void>
{
  @Inject(TodoRepositoryImplementation)
  private readonly todoRepository: TodoRepositoryImplementation;

  async execute(command: UpdateTodoListCommand): Promise<void> {
    await this.todoRepository.updateTodoList(command.id, {
      description: command.description,
      name: command.name,
    });
    return;
  }
}
