import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TodoQuery } from 'apps/todo/src/domain/todo-query';
import { TodoQueryImplementation } from 'apps/todo/src/infrastructure/query/todo-query-implementation';
import { FindPaginateTodoListQuery } from '../../interface/find-paginate-todo-list.query';
import { FindPaginateTodoListHandler } from '../find-paginate-todo-list.handler';

describe('FindPaginateTodoListHandler', () => {
  let handler: FindPaginateTodoListHandler;
  let queryDB: TodoQuery;

  beforeEach(async () => {
    const queryProvider: Provider = {
      provide: TodoQueryImplementation,
      useValue: {},
    };
    const providers: Provider[] = [FindPaginateTodoListHandler, queryProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(FindPaginateTodoListHandler);
    queryDB = testModule.get(TodoQueryImplementation);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should call findPaginatedTodoList from queryImplementation', async () => {
      const page = 1;
      const limit = 1;
      const findPaginatedTodoListResult = {
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

        hasNextPage: false,

        hasPrevPage: false,

        limit,

        page,

        offset: 2,

        nextPage: page + 1,

        totalDocs: 4,

        totalPage: 2,
      };
      queryDB.findPaginatedTodoList = jest
        .fn()
        .mockResolvedValue(findPaginatedTodoListResult);

      const query = new FindPaginateTodoListQuery(page, limit);

      const handlerResult = await handler.execute(query);
      expect(queryDB.findPaginatedTodoList).toBeCalledTimes(1);
      expect(queryDB.findPaginatedTodoList).toBeCalledWith({ page, limit });
      expect(handlerResult).toStrictEqual(findPaginatedTodoListResult);
    });
  });
});
