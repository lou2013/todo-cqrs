import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoRepository } from 'apps/todo/src/domain/todo-repository';
import { TodoRepositoryImplementation } from 'apps/todo/src/infrastructure/repository/todo-repository-implementation';
import { CreateTodoCommand } from '../interfaces/create-todo-command';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler
  implements ICommandHandler<CreateTodoCommand, void>
{
  @Inject(TodoRepositoryImplementation)
  private readonly todoRepository: TodoRepository;

  async execute(command: CreateTodoCommand): Promise<void> {
    const todo = await this.todoRepository.saveTodo({
      ...command,
      id: this.todoRepository.newId().toString(),
    });
    await this.todoRepository.moveTodo(todo[0].id, command.todoListId);
    return;
  }
}
