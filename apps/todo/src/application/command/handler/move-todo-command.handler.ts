import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectConnection } from '@nestjs/mongoose';
import { TodoQueryImplementation } from 'apps/todo/src/infrastructure/query/todo-query-implementation';
import { TodoRepositoryImplementation } from 'apps/todo/src/infrastructure/repository/todo-repository-implementation';
import { MoveTodoCommand } from '../interfaces/move-todo-command ';
import { Connection } from 'mongoose';
import { NotFoundError } from 'apps/todo/src/shared/errors/not-found-error';
import { CodeError } from 'apps/todo/src/shared/enum/code-error.enum';

@CommandHandler(MoveTodoCommand)
export class CreateTodoHandler
  implements ICommandHandler<MoveTodoCommand, void>
{
  @Inject(TodoRepositoryImplementation)
  private readonly todoRepository: TodoRepositoryImplementation;

  @Inject(TodoQueryImplementation)
  private readonly todoQuery: TodoQueryImplementation;

  @InjectConnection()
  private readonly databaseConnection: Connection;

  async execute(command: MoveTodoCommand): Promise<void> {
    const todo = await this.todoQuery.findTodoById(command.id);
    const session = await this.databaseConnection.startSession({});
    if (!todo)
      throw new NotFoundError({
        message: 'todo Not found',
        code: CodeError.NOT_FOUND,
      });
    if (todo.todoList) {
      await this.todoRepository.(
        { _id: todo.todoList },
        { $pull: { todos: todo.id } },
        { session },
      );
    }
    const newTodoList = await this.todoListEntity.findOneAndUpdate(
      { _id: toTodoListId },
      { $addToSet: { todos: todo.id } },
      { session },
    );
    if (!newTodoList)
      throw new NotFoundError({
        message: 'todoList Not found',
        code: CodeError.NOT_FOUND,
      });
    todo.todoList = newTodoList.id;
    await todo.save({ session });

    return todo.toObject();
  }
}
