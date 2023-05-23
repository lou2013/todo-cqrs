import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TodoQuery } from 'apps/todo/src/domain/todo-query';
import { TodoQueryImplementation } from 'apps/todo/src/infrastructure/query/todo-query-implementation';
import { FindAllTodoListHandler } from '../find-all-todo-list.handler';

describe('FindAllTodoListHandler', () => {
  let handler: FindAllTodoListHandler;
  let query: TodoQuery;

  beforeEach(async () => {
    const queryProvider: Provider = {
      provide: TodoQueryImplementation,
      useValue: {},
    };
    const providers: Provider[] = [FindAllTodoListHandler, queryProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(FindAllTodoListHandler);
    query = testModule.get(TodoQueryImplementation);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should call findAllTodoList from queryImplementation', async () => {
      const findAllTodoListResult = {
        items: [
          {
            id: 'string',
            description: 'string',
            name: 'name',
            todos: [
              {
                id: 'string',
                priority: 1,
                title: 'string',
                todoListId: 'string',
              },
            ],
          },
        ],
      };
      query.findAllTodoList = jest
        .fn()
        .mockResolvedValue(findAllTodoListResult);

      const handlerResult = await handler.execute();
      expect(query.findAllTodoList).toBeCalledTimes(1);
      expect(handlerResult).toStrictEqual(findAllTodoListResult);
    });
  });
});
