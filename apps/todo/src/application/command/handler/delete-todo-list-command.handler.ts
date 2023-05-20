import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoRepositoryImplementation } from 'apps/todo/src/infrastructure/repository/todo-repository-implementation';
import { DeleteTodoListCommand } from '../interfaces/delete-todo-list-command';

@CommandHandler(DeleteTodoListCommand)
export class DeleteTodoListHandler
  implements ICommandHandler<DeleteTodoListCommand, void>
{
  @Inject(TodoRepositoryImplementation)
  private readonly todoRepository: TodoRepositoryImplementation;

  async execute(command: DeleteTodoListCommand): Promise<void> {
    await this.todoRepository.deleteTodoList(command.id);
    return;
  }
}
