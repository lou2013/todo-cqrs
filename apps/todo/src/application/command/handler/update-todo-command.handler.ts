import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoRepositoryImplementation } from 'apps/todo/src/infrastructure/repository/todo-repository-implementation';
import { UpdateTodoCommand } from '../interfaces/update-todo-command';

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoHandler
  implements ICommandHandler<UpdateTodoCommand, void>
{
  @Inject(TodoRepositoryImplementation)
  private readonly todoRepository: TodoRepositoryImplementation;

  async execute(command: UpdateTodoCommand): Promise<void> {
    await this.todoRepository.updateTodo(command.id, {
      priority: command.priority,
      title: command.title,
    });
    return;
  }
}
