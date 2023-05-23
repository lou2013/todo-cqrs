import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TodoRepository } from 'apps/todo/src/domain/todo-repository';
import { TodoRepositoryImplementation } from 'apps/todo/src/infrastructure/repository/todo-repository-implementation';
import { UpdateTodoCommand } from '../../interfaces/update-todo-command';
import { UpdateTodoHandler } from '../update-todo-command.handler';

describe('UpdateTodoHandler', () => {
  let handler: UpdateTodoHandler;
  let repository: TodoRepository;

  beforeEach(async () => {
    const repoProvider: Provider = {
      provide: TodoRepositoryImplementation,
      useValue: {},
    };

    const providers: Provider[] = [UpdateTodoHandler, repoProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(UpdateTodoHandler);
    repository = testModule.get(TodoRepositoryImplementation);
  });
  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should call moveTodo from repository', async () => {
    repository.updateTodo = jest.fn().mockResolvedValue(null);
    const todoId = 'todoId';
    const priority = 1;
    const title = 'todoListId';
    const command = new UpdateTodoCommand(todoId, priority, title);

    await handler.execute(command);
    expect(repository.updateTodo).toBeCalledTimes(1);
    expect(repository.updateTodo).toBeCalledWith(todoId, {
      priority,
      title,
    });
  });
});
