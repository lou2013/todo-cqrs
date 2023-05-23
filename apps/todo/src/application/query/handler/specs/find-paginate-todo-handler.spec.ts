import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TodoQuery } from 'apps/todo/src/domain/todo-query';
import { TodoQueryImplementation } from 'apps/todo/src/infrastructure/query/todo-query-implementation';
import { FindPaginateTodoQuery } from '../../interface/find-paginate-todo.query';
import { FindPaginateTodoHandler } from '../find-paginate-todo.handler';

describe('FindPaginateTodoHandler', () => {
  let handler: FindPaginateTodoHandler;
  let queryDB: TodoQuery;

  beforeEach(async () => {
    const queryProvider: Provider = {
      provide: TodoQueryImplementation,
      useValue: {},
    };
    const providers: Provider[] = [FindPaginateTodoHandler, queryProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(FindPaginateTodoHandler);
    queryDB = testModule.get(TodoQueryImplementation);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should call findPaginatedTodo from queryImplementation', async () => {
      const page = 1;
      const limit = 1;
      const findPaginatedTodoResult = {
        items: [
          {
            id: 'string',
            todoListId: 'string',
            priority: 1,
            title: 'string',
          },
        ],

        hasNextPage: false,

        hasPrevPage: false,

        limit,

        page,

        offset: 2,

        nextPage: page + 1,

        totalDocs: 4,

        totalPage: 2,
      };
      queryDB.findPaginatedTodo = jest
        .fn()
        .mockResolvedValue(findPaginatedTodoResult);

      const query = new FindPaginateTodoQuery(page, limit);

      const handlerResult = await handler.execute(query);
      expect(queryDB.findPaginatedTodo).toBeCalledTimes(1);
      expect(queryDB.findPaginatedTodo).toBeCalledWith({ page, limit });
      expect(handlerResult).toStrictEqual(findPaginatedTodoResult);
    });
  });
});
