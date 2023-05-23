import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TodoRepository } from 'apps/todo/src/domain/todo-repository';
import { TodoRepositoryImplementation } from 'apps/todo/src/infrastructure/repository/todo-repository-implementation';
import { DeleteTodoCommand } from '../../interfaces/delete-todo-command';
import { DeleteTodoHandler } from '../delete-todo-command.handler';

describe('DeleteTodoHandler', () => {
  let handler: DeleteTodoHandler;
  let repository: TodoRepository;

  beforeEach(async () => {
    const repoProvider: Provider = {
      provide: TodoRepositoryImplementation,
      useValue: {},
    };

    const providers: Provider[] = [DeleteTodoHandler, repoProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(DeleteTodoHandler);
    repository = testModule.get(TodoRepositoryImplementation);
  });
  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should call deleteTodo from repository', async () => {
    repository.deleteTodo = jest.fn().mockResolvedValue(null);
    const todoId = 'todoId';
    const command = new DeleteTodoCommand(todoId);

    await handler.execute(command);
    expect(repository.deleteTodo).toBeCalledTimes(1);
    expect(repository.deleteTodo).toBeCalledWith(todoId);
  });
});
