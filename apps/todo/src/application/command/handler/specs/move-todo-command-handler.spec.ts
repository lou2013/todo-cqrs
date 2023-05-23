import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TodoRepository } from 'apps/todo/src/domain/todo-repository';
import { TodoRepositoryImplementation } from 'apps/todo/src/infrastructure/repository/todo-repository-implementation';
import { MoveTodoCommand } from '../../interfaces/move-todo-command';
import { MoveTodoCommandHandler } from '../move-todo-command.handler';

describe('MoveTodoCommandHandler', () => {
  let handler: MoveTodoCommandHandler;
  let repository: TodoRepository;

  beforeEach(async () => {
    const repoProvider: Provider = {
      provide: TodoRepositoryImplementation,
      useValue: {},
    };

    const providers: Provider[] = [MoveTodoCommandHandler, repoProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(MoveTodoCommandHandler);
    repository = testModule.get(TodoRepositoryImplementation);
  });
  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should call moveTodo from repository', async () => {
    repository.moveTodo = jest.fn().mockResolvedValue(null);
    const todoId = 'todoId';
    const todoListId = 'todoListId';
    const command = new MoveTodoCommand(todoId, todoListId);

    await handler.execute(command);
    expect(repository.moveTodo).toBeCalledTimes(1);
    expect(repository.moveTodo).toBeCalledWith(todoId, todoListId);
  });
});
