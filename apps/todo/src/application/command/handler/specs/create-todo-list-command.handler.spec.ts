import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TodoRepository } from 'apps/todo/src/domain/todo-repository';
import { TodoRepositoryImplementation } from 'apps/todo/src/infrastructure/repository/todo-repository-implementation';
import { CreateTodoListCommand } from '../../interfaces/create-todo-list-command';
import { CreateTodoListHandler } from '../create-todo-list-command.handler';

describe('CreateTodoListHandler', () => {
  let handler: CreateTodoListHandler;
  let repository: TodoRepository;

  beforeEach(async () => {
    const repoProvider: Provider = {
      provide: TodoRepositoryImplementation,
      useValue: {},
    };

    const providers: Provider[] = [CreateTodoListHandler, repoProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(CreateTodoListHandler);
    repository = testModule.get(TodoRepositoryImplementation);
  });
  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should call saveTodoList newId from repository', async () => {
    const responseId = '123';
    repository.newId = jest.fn().mockReturnValue(responseId);
    repository.saveTodoList = jest.fn().mockResolvedValue(null);

    const command = new CreateTodoListCommand('description', 'name');

    await handler.execute(command);
    expect(repository.newId).toBeCalledTimes(1);
    expect(repository.saveTodoList).toBeCalledTimes(1);
    expect(repository.saveTodoList).toBeCalledWith({
      ...command,
      id: responseId,
      todos: [],
    });
  });
});
