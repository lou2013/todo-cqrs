import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TodoQuery } from 'apps/todo/src/domain/todo-query';
import { TodoRepository } from 'apps/todo/src/domain/todo-repository';
import { CreateTodoCommand } from '../../interfaces/create-todo-command';
import { CreateTodoHandler } from '../create-todo-command.handler';
import { Types } from 'mongoose';
import { TodoQueryImplementation } from 'apps/todo/src/infrastructure/query/todo-query-implementation';
import { TodoRepositoryImplementation } from 'apps/todo/src/infrastructure/repository/todo-repository-implementation';

describe('CreateTodoCommandHandler', () => {
  let handler: CreateTodoHandler;
  let repository: TodoRepository;
  let query: TodoQuery;

  beforeEach(async () => {
    const repoProvider: Provider = {
      provide: TodoRepositoryImplementation,
      useValue: {},
    };
    const queryProvider: Provider = {
      provide: TodoQueryImplementation,
      useValue: {},
    };
    const providers: Provider[] = [
      CreateTodoHandler,
      repoProvider,
      queryProvider,
    ];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(CreateTodoHandler);
    repository = testModule.get(TodoRepositoryImplementation);
    query = testModule.get(TodoQueryImplementation);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should call saveTodo newId and moveTodo from repository', async () => {
      query.findTodoListById = jest.fn().mockResolvedValue(true);
      const responseId = '123';
      repository.newId = jest.fn().mockReturnValue(responseId);
      repository.saveTodo = jest.fn().mockResolvedValue([{ id: responseId }]);
      repository.moveTodo = jest.fn().mockResolvedValue(null);

      const command = new CreateTodoCommand(
        1,
        'title',
        new Types.ObjectId().toString(),
      );

      await handler.execute(command);
      expect(query.findTodoListById).toBeCalledTimes(1);
      expect(query.findTodoListById).toBeCalledWith(command.todoListId);
      expect(repository.newId).toBeCalledTimes(1);
      expect(repository.saveTodo).toBeCalledTimes(1);
      expect(repository.saveTodo).toBeCalledWith({
        ...command,
        id: responseId,
      });
      expect(repository.moveTodo).toBeCalledTimes(1);
      expect(repository.moveTodo).toBeCalledWith(
        responseId,
        command.todoListId,
      );
    });
  });
});
