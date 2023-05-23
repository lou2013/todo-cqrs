import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TodoQuery } from 'apps/todo/src/domain/todo-query';
import { TodoEntity } from '../../entity/todo-entity';
import { TodoListEntity } from '../../entity/todo-list-entity';
import { PaginateModel } from 'mongoose';
import { TodoQueryImplementation } from '../todo-query-implementation';
import { getModelToken } from '@nestjs/mongoose';
import { FindAllTodoResult } from 'apps/todo/src/application/query/interface/result/find-all-todo-result';
import { FindAllTodoListResult } from 'apps/todo/src/application/query/interface/result/find-all-todo-list-result';
import { FindTodoByIdResult } from 'apps/todo/src/application/query/interface/result/find-todo-by-id-result';
import { FindTodoListByIdResult } from 'apps/todo/src/application/query/interface/result/find-todo-list-by-id-result';
import { NotFoundException } from 'apps/todo/src/shared/exceptions/not-found.exception';
import { FindPaginateTodoResult } from 'apps/todo/src/application/query/interface/result/find-paginate-todo-result';
import { FindPaginateTodoListResult } from 'apps/todo/src/application/query/interface/result/find-paginate-todo-list-result';
describe('TodoRepositoryImplementation', () => {
  let todoEntity: PaginateModel<TodoEntity>;

  let todoListEntity: PaginateModel<TodoListEntity>;

  let queryImpl: TodoQuery;

  beforeEach(async () => {
    const todoEntityProvider: Provider = {
      provide: getModelToken(TodoEntity.name),
      useValue: {},
    };
    const todoListEntityProvider: Provider = {
      provide: getModelToken(TodoListEntity.name),
      useValue: {},
    };

    const providers: Provider[] = [
      TodoQueryImplementation,
      todoEntityProvider,
      todoListEntityProvider,
    ];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();
    todoEntity = testModule.get(getModelToken(TodoEntity.name));
    todoListEntity = testModule.get(getModelToken(TodoListEntity.name));
    queryImpl = testModule.get(TodoQueryImplementation);
  });
  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('calling findAllTodo must call find on todoEntity', async () => {
    const todoData = {
      id: 'string',
      priority: 1,
      title: 'string',
      todoListId: 'string',
    };
    todoEntity.find = jest.fn().mockResolvedValue([
      {
        ...todoData,
        toObject: () => todoData,
      },
    ]);
    const data = await queryImpl.findAllTodo();
    expect(todoEntity.find).toHaveBeenCalledTimes(1);
    expect(todoEntity.find).toHaveBeenCalledWith(
      {},
      {},
      { sort: { priority: 1, _id: 1 } },
    );
    expect(data).toBeInstanceOf(FindAllTodoResult);
    expect(data.items).toStrictEqual([todoData]);
  });
  it('calling findAllTodoList must call find on todoEntity', async () => {
    const todoData = {
      id: 'string',
      priority: 1,
      title: 'string',
      todoListId: 'string',
    };
    const todoDataList = {
      description: 'description',
      name: 'name',
      id: 'id1',
      todos: [todoData],
    };
    todoListEntity.find = jest.fn().mockResolvedValue([
      {
        ...todoDataList,
        todos: [todoData].map((t) => ({ ...t, toObject: () => t })),
        toObject: () => ({
          ...todoDataList,
          todos: [todoData].map((t) => ({ ...t, toObject: () => t })),
        }),
      },
    ]);
    const data = await queryImpl.findAllTodoList();
    expect(todoListEntity.find).toHaveBeenCalledTimes(1);
    expect(todoListEntity.find).toHaveBeenCalledWith(
      {},
      {},
      { populate: 'todos' },
    );
    expect(data).toBeInstanceOf(FindAllTodoListResult);
    expect(data.items).toStrictEqual([todoDataList]);
  });
  it('calling findTodoById respective functions', async () => {
    const todoData = {
      id: 'string',
      priority: 1,
      title: 'string',
      todoListId: 'string',
    };

    todoEntity.findById = jest.fn().mockResolvedValue({
      ...todoData,
      toObject: () => todoData,
    });
    const data = await queryImpl.findTodoById(todoData.id);
    expect(todoEntity.findById).toHaveBeenCalledTimes(1);
    expect(todoEntity.findById).toHaveBeenCalledWith(todoData.id);
    expect(data).toBeInstanceOf(FindTodoByIdResult);
    expect({ ...data }).toStrictEqual(todoData);
  });
  it('calling findTodoById if nothing exist must throw NotFoundException', async () => {
    const todoData = {
      id: 'string',
      priority: 1,
      title: 'string',
      todoListId: 'string',
    };

    todoEntity.findById = jest.fn().mockResolvedValue(null);

    expect(
      async () => await queryImpl.findTodoById(todoData.id),
    ).rejects.toThrow(NotFoundException);
    expect(todoEntity.findById).toHaveBeenCalledTimes(1);
  });
  it('calling findTodoListById respective functions', async () => {
    const todoData = {
      id: 'string',
      priority: 1,
      title: 'string',
      todoListId: 'string',
    };
    const todoDataList = {
      description: 'description',
      name: 'name',
      id: 'id1',
      todos: [todoData],
    };
    todoListEntity.findById = jest.fn().mockResolvedValue({
      ...todoDataList,
      todos: [todoData].map((t) => ({ ...t, toObject: () => t })),
      toObject: () => ({
        ...todoDataList,
        todos: [todoData].map((t) => ({ ...t, toObject: () => t })),
      }),
    });
    const data = await queryImpl.findTodoListById(todoDataList.id);
    expect(todoListEntity.findById).toHaveBeenCalledTimes(1);
    expect(todoListEntity.findById).toHaveBeenCalledWith(
      todoDataList.id,
      {},
      { populate: 'todos' },
    );
    expect(data).toBeInstanceOf(FindTodoListByIdResult);
    expect({ ...data }).toStrictEqual(todoDataList);
  });

  it('calling findTodoListById if nothing exist must throw NotFoundException', async () => {
    const todoData = {
      id: 'string',
      priority: 1,
      title: 'string',
      todoListId: 'string',
    };
    const todoDataList = {
      description: 'description',
      name: 'name',
      id: 'id1',
      todos: [todoData],
    };

    todoListEntity.findById = jest.fn().mockResolvedValue(null);

    expect(
      async () => await queryImpl.findTodoListById(todoDataList.id),
    ).rejects.toThrow(NotFoundException);
    expect(todoListEntity.findById).toHaveBeenCalledTimes(1);
  });

  it('calling findPaginatedTodo must call respective function', async () => {
    const todoData = {
      id: 'string',
      priority: 1,
      title: 'string',
      todoListId: 'string',
    };
    const page = 1;
    const limit = 3;
    todoEntity.paginate = jest.fn().mockResolvedValue({
      docs: [
        {
          ...todoData,
          toObject: () => todoData,
        },
      ],
      hasNextPage: true,
      hasPrevPage: true,
      limit,
      nextPage: page + 1,
      offset: page * limit,
      page: page,
      totalDocs: 1,
      totalPage: 3,
    });
    const data = await queryImpl.findPaginatedTodo({ limit, page });
    expect(todoEntity.paginate).toHaveBeenCalledTimes(1);
    expect(todoEntity.paginate).toHaveBeenCalledWith(
      {},
      { page, limit, sort: { priority: 1, _id: 1 } },
    );
    expect(data).toBeInstanceOf(FindPaginateTodoResult);
    expect(data.items).toStrictEqual([todoData]);
  });

  it('calling findPaginatedTodoList must call respective function', async () => {
    const todoData = {
      id: 'string',
      priority: 1,
      title: 'string',
      todoListId: 'string',
    };
    const todoDataList = {
      description: 'description',
      name: 'name',
      id: 'id1',
      todos: [todoData],
    };
    const page = 1;
    const limit = 3;
    todoListEntity.paginate = jest.fn().mockResolvedValue({
      docs: [
        {
          ...todoDataList,
          todos: [todoData].map((t) => ({ ...t, toObject: () => t })),
          toObject: () => ({
            ...todoDataList,
            todos: [todoData].map((t) => ({ ...t, toObject: () => t })),
          }),
        },
      ],
      hasNextPage: true,
      hasPrevPage: true,
      limit,
      nextPage: page + 1,
      offset: page * limit,
      page: page,
      totalDocs: 1,
      totalPage: 3,
    });
    const data = await queryImpl.findPaginatedTodoList({ limit, page });
    expect(todoListEntity.paginate).toHaveBeenCalledTimes(1);
    expect(todoListEntity.paginate).toHaveBeenCalledWith(
      {},
      { page, limit, populate: 'todos' },
    );
    expect(data).toBeInstanceOf(FindPaginateTodoListResult);
    expect(data.items).toStrictEqual([todoDataList]);
  });
});
