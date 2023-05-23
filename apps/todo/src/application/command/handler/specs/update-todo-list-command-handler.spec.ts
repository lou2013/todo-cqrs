import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TodoRepository } from 'apps/todo/src/domain/todo-repository';
import { TodoRepositoryImplementation } from 'apps/todo/src/infrastructure/repository/todo-repository-implementation';
import { UpdateTodoListCommand } from '../../interfaces/update-todo-list-command';
import { UpdateTodoListHandler } from '../update-todo-list-command.handler';

describe('UpdateTodoListHandler', () => {
  let handler: UpdateTodoListHandler;
  let repository: TodoRepository;

  beforeEach(async () => {
    const repoProvider: Provider = {
      provide: TodoRepositoryImplementation,
      useValue: {},
    };

    const providers: Provider[] = [UpdateTodoListHandler, repoProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(UpdateTodoListHandler);
    repository = testModule.get(TodoRepositoryImplementation);
  });
  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should call moveTodo from repository', async () => {
    repository.updateTodoList = jest.fn().mockResolvedValue(null);
    const todoListId = 'todoListId';
    const description = 'description';
    const name = 'name';
    const command = new UpdateTodoListCommand(todoListId, name, description);

    await handler.execute(command);
    expect(repository.updateTodoList).toBeCalledTimes(1);
    expect(repository.updateTodoList).toBeCalledWith(todoListId, {
      description,
      name,
    });
  });
});
