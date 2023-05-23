import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TodoRepository } from 'apps/todo/src/domain/todo-repository';
import { TodoRepositoryImplementation } from 'apps/todo/src/infrastructure/repository/todo-repository-implementation';
import { DeleteTodoListCommand } from '../../interfaces/delete-todo-list-command';
import { DeleteTodoListHandler } from '../delete-todo-list-command.handler';

describe('DeleteTodoListHandler', () => {
  let handler: DeleteTodoListHandler;
  let repository: TodoRepository;

  beforeEach(async () => {
    const repoProvider: Provider = {
      provide: TodoRepositoryImplementation,
      useValue: {},
    };

    const providers: Provider[] = [DeleteTodoListHandler, repoProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(DeleteTodoListHandler);
    repository = testModule.get(TodoRepositoryImplementation);
  });
  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should call deleteTodoList from repository', async () => {
    repository.deleteTodoList = jest.fn().mockResolvedValue(null);
    const todoListId = 'todoListId';
    const command = new DeleteTodoListCommand(todoListId);

    await handler.execute(command);
    expect(repository.deleteTodoList).toBeCalledTimes(1);
    expect(repository.deleteTodoList).toBeCalledWith(todoListId);
  });
});
