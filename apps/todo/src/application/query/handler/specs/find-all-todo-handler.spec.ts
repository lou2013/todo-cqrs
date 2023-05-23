import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TodoQuery } from 'apps/todo/src/domain/todo-query';
import { TodoQueryImplementation } from 'apps/todo/src/infrastructure/query/todo-query-implementation';
import { FindAllTodoHandler } from '../find-all-todo.handler';

describe('FindAllTodoHandler', () => {
  let handler: FindAllTodoHandler;
  let queryDB: TodoQuery;

  beforeEach(async () => {
    const queryProvider: Provider = {
      provide: TodoQueryImplementation,
      useValue: {},
    };
    const providers: Provider[] = [FindAllTodoHandler, queryProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(FindAllTodoHandler);
    queryDB = testModule.get(TodoQueryImplementation);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should call findAllTodo from queryImplementation', async () => {
      const findAllTodoResult = {
        items: [
          {
            id: 'string',
            todoListId: 'string',
            priority: 1,
            title: 'string',
          },
        ],
      };
      queryDB.findAllTodo = jest.fn().mockResolvedValue(findAllTodoResult);

      const handlerResult = await handler.execute();
      expect(queryDB.findAllTodo).toBeCalledTimes(1);
      expect(handlerResult).toStrictEqual(findAllTodoResult);
    });
  });
});
