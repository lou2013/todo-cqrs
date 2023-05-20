import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoRepositoryImplementation } from 'apps/todo/src/infrastructure/repository/todo-repository-implementation';
import { DeleteTodoCommand } from '../interfaces/delete-todo-command';

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler
  implements ICommandHandler<DeleteTodoCommand, void>
{
  @Inject(TodoRepositoryImplementation)
  private readonly todoRepository: TodoRepositoryImplementation;

  async execute(command: DeleteTodoCommand): Promise<void> {
    await this.todoRepository.deleteTodo(command.id);
    return;
  }
}
