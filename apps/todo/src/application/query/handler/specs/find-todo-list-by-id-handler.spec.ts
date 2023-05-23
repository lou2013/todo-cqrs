import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TodoQuery } from 'apps/todo/src/domain/todo-query';
import { TodoQueryImplementation } from 'apps/todo/src/infrastructure/query/todo-query-implementation';
import { FindTodoByIdQuery } from '../../interface/find-todo-by-id.query';
import { FindTodoListByIdHandler } from '../find-todo-list-by-id.handler';

describe('FindTodoListByIdHandler', () => {
  let handler: FindTodoListByIdHandler;
  let queryDB: TodoQuery;

  beforeEach(async () => {
    const queryProvider: Provider = {
      provide: TodoQueryImplementation,
      useValue: {},
    };
    const providers: Provider[] = [FindTodoListByIdHandler, queryProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(FindTodoListByIdHandler);
    queryDB = testModule.get(TodoQueryImplementation);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should call findTodoListById from queryImplementation', async () => {
      const id = 'string';
      const findTodoListByIdResult = {
        id,
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
      };
      queryDB.findTodoListById = jest
        .fn()
        .mockResolvedValue(findTodoListByIdResult);

      const query = new FindTodoByIdQuery(id);

      const handlerResult = await handler.execute(query);
      expect(queryDB.findTodoListById).toBeCalledTimes(1);
      expect(queryDB.findTodoListById).toBeCalledWith(id);
      expect(handlerResult).toStrictEqual(findTodoListByIdResult);
    });
  });
});
