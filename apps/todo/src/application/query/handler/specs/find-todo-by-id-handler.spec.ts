import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TodoQuery } from 'apps/todo/src/domain/todo-query';
import { TodoQueryImplementation } from 'apps/todo/src/infrastructure/query/todo-query-implementation';
import { FindTodoByIdQuery } from '../../interface/find-todo-by-id.query';
import { FindTodoByIdHandler } from '../find-todo-by-id.handler';

describe('FindTodoByIdHandler', () => {
  let handler: FindTodoByIdHandler;
  let queryDB: TodoQuery;

  beforeEach(async () => {
    const queryProvider: Provider = {
      provide: TodoQueryImplementation,
      useValue: {},
    };
    const providers: Provider[] = [FindTodoByIdHandler, queryProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(FindTodoByIdHandler);
    queryDB = testModule.get(TodoQueryImplementation);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should call findTodoById from queryImplementation', async () => {
      const id = 'string';
      const findTodoByIdResult = {
        id,
        priority: 1,
        title: 'string',
        todoListId: 'string',
      };
      queryDB.findTodoById = jest.fn().mockResolvedValue(findTodoByIdResult);

      const query = new FindTodoByIdQuery(id);

      const handlerResult = await handler.execute(query);
      expect(queryDB.findTodoById).toBeCalledTimes(1);
      expect(queryDB.findTodoById).toBeCalledWith(id);
      expect(handlerResult).toStrictEqual(findTodoByIdResult);
    });
  });
});
