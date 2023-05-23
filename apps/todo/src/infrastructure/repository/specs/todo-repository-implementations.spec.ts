import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TodoQuery } from 'apps/todo/src/domain/todo-query';
import { TodoRepositoryImplementation } from 'apps/todo/src/infrastructure/repository/todo-repository-implementation';
import { TodoEntity } from '../../entity/todo-entity';
import { TodoListEntity } from '../../entity/todo-list-entity';
import { Connection, PaginateModel } from 'mongoose';
import { TodoQueryImplementation } from '../../query/todo-query-implementation';
import { getModelToken, getConnectionToken } from '@nestjs/mongoose';
import { TodoRepository } from 'apps/todo/src/domain/todo-repository';
import { Todo } from 'apps/todo/src/domain/todo';
import { isMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { NotFoundException } from 'apps/todo/src/shared/exceptions/not-found.exception';
import { TodoList } from 'apps/todo/src/domain/todo-list';
describe('TodoRepositoryImplementation', () => {
  let todoEntity: PaginateModel<TodoEntity>;

  let todoListEntity: PaginateModel<TodoListEntity>;

  let todoQueryImplementation: TodoQuery;

  let databaseConnection: Connection;

  let repository: TodoRepository;

  beforeEach(async () => {
    const todoEntityProvider: Provider = {
      provide: getModelToken(TodoEntity.name),
      useValue: {},
    };
    const todoListEntityProvider: Provider = {
      provide: getModelToken(TodoListEntity.name),
      useValue: {},
    };
    const todoQueryImplementationProvider: Provider = {
      provide: TodoQueryImplementation,
      useValue: {},
    };
    const connectionProvider: Provider = {
      provide: getConnectionToken(),
      useValue: {},
    };

    const providers: Provider[] = [
      TodoRepositoryImplementation,
      todoEntityProvider,
      todoListEntityProvider,
      todoQueryImplementationProvider,
      connectionProvider,
    ];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();
    repository = testModule.get(TodoRepositoryImplementation);
    todoEntity = testModule.get(getModelToken(TodoEntity.name));
    todoListEntity = testModule.get(getModelToken(TodoListEntity.name));
    todoQueryImplementation = testModule.get(TodoQueryImplementation);
    databaseConnection = testModule.get(getConnectionToken());
  });
  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('saving one todo must call save and return array', async () => {
    const savingValue: Todo = {
      id: 'string',
      priority: 1,
      title: 'string',
      todoListId: 'listId',
    };
    todoEntity.create = jest
      .fn()
      .mockResolvedValue([{ ...savingValue, toObject: () => savingValue }]);
    const data = await repository.saveTodo(savingValue);
    expect(todoEntity.create).toHaveBeenCalledTimes(1);
    expect(todoEntity.create).toHaveBeenCalledWith([savingValue]);
    expect(data).toStrictEqual([savingValue]);
  });

  it('saving multiple todos must call save and return array containing them all', async () => {
    const savingValue: Todo[] = [
      {
        id: 'string',
        priority: 1,
        title: 'string',
        todoListId: 'listId',
      },
      {
        id: 'string2',
        priority: 1,
        title: 'string',
        todoListId: 'listId',
      },
    ];
    todoEntity.create = jest
      .fn()
      .mockResolvedValue(
        savingValue.map((sv) => ({ ...sv, toObject: () => sv })),
      );
    const data = await repository.saveTodo(savingValue);
    expect(todoEntity.create).toHaveBeenCalledTimes(1);
    expect(todoEntity.create).toHaveBeenCalledWith(savingValue);
    expect(data).toStrictEqual(savingValue);
  });

  it('calling new id is expected to return new object Id', async () => {
    const newId = await repository.newId();
    expect(isMongoId(newId.toHexString())).toBe(true);
    expect(newId).toBeInstanceOf(Types.ObjectId);
  });

  it('calling updateTodo with data must call findOneAndUpdate With right parameters', async () => {
    const id = 'string';
    const todoListId = 'string';
    const newPriority = 7;
    const newTitle = '2';
    const updateTodo: Partial<Todo> = {
      priority: newPriority,
      title: newTitle,
    };
    todoEntity.findOneAndUpdate = jest.fn().mockResolvedValue({
      id,
      todoListId,
      priority: newPriority,
      title: newTitle,
      toObject: () => ({
        id,
        todoListId,
        priority: newPriority,
        title: newTitle,
      }),
    });
    const result = await repository.updateTodo(id, updateTodo);
    expect(result).toStrictEqual({
      id,
      todoListId,
      priority: newPriority,
      title: newTitle,
    });
    expect(todoEntity.findOneAndUpdate).toHaveBeenCalledTimes(1);
    expect(todoEntity.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: id },
      { $set: { ...updateTodo } },
      { new: true },
    );
  });

  it('calling moveTodo with wrong id must throw NotFoundError', async () => {
    const id = 'string';
    const newTodoListId = 'string2';
    const priority = 2;
    const title = 'stringgg';
    const session = {
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      abortTransaction: jest.fn(),
    };
    databaseConnection.startSession = jest.fn().mockResolvedValue(session);

    todoQueryImplementation.findTodoById = jest.fn().mockRejectedValue(() => {
      throw new NotFoundException({ message: 'test' });
    });

    todoListEntity.findOneAndUpdate = jest.fn();
    todoEntity.findOneAndUpdate = jest.fn().mockResolvedValue({
      id,
      todoListId: newTodoListId,
      priority,
      title,
      toObject: () => ({ id, todoListId: newTodoListId, priority, title }),
    });
    expect(async () => {
      await repository.moveTodo(id, newTodoListId);
    }).rejects.toThrow(NotFoundException);
  });

  it('calling moveTodo with wrong newTodoListId must throw NotFoundError', async () => {
    const id = 'string';
    const newTodoListId = 'string2';

    const session = {
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      abortTransaction: jest.fn(),
    };

    databaseConnection.startSession = jest.fn().mockResolvedValue(session);

    todoQueryImplementation.findTodoById = jest
      .fn()
      .mockResolvedValue({ id, todoListId: undefined });

    todoListEntity.findOneAndUpdate = jest.fn().mockRejectedValue(() => {
      throw new NotFoundException({ message: 'test' });
    });

    await expect(async () => {
      await repository.moveTodo(id, newTodoListId);
    }).rejects.toThrow(NotFoundException);
    expect(databaseConnection.startSession).toHaveBeenCalledTimes(1);
    expect(session.abortTransaction).toHaveBeenCalledTimes(1);
  });

  it('calling moveTodo with right data must call needed methods', async () => {
    const id = 'string';
    const newTodoListId = 'string2';
    const priority = 2;
    const title = 'stringgg';
    const oldListId = 'todoListId';
    const session = {
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      abortTransaction: jest.fn(),
    };
    databaseConnection.startSession = jest.fn().mockResolvedValue(session);

    todoQueryImplementation.findTodoById = jest
      .fn()
      .mockResolvedValue({ id, todoListId: oldListId });

    todoListEntity.findOneAndUpdate = jest
      .fn()
      .mockResolvedValue({ mockdata: 1 });
    todoEntity.findOneAndUpdate = jest.fn().mockResolvedValue({
      id,
      todoListId: newTodoListId,
      priority,
      title,
      toObject: () => ({ id, todoListId: newTodoListId, priority, title }),
    });
    await repository.moveTodo(id, newTodoListId);
    expect(todoQueryImplementation.findTodoById).toHaveBeenCalledTimes(1);
    expect(todoQueryImplementation.findTodoById).toHaveBeenCalledWith(id);
    expect(databaseConnection.startSession).toHaveBeenCalledTimes(1);
    expect(session.startTransaction).toHaveBeenCalledTimes(1);
    expect(session.commitTransaction).toHaveBeenCalledTimes(1);
    expect(todoListEntity.findOneAndUpdate).toHaveBeenCalledTimes(2);
    expect(todoListEntity.findOneAndUpdate).toHaveBeenNthCalledWith(
      1,
      { _id: oldListId },
      { $pull: { todos: id } },
      {
        session,
      },
    );
    expect(todoListEntity.findOneAndUpdate).toHaveBeenNthCalledWith(
      2,
      { _id: newTodoListId },
      { $addToSet: { todos: id } },
      {
        session,
      },
    );
  });

  it('calling deleteTodo must call respective methods', async () => {
    const todo: Todo = {
      id: 'string',
      priority: 1,
      title: 'string',
      todoListId: 'listId',
    };
    todoEntity.findOneAndDelete = jest
      .fn()
      .mockResolvedValue({ ...todo, toObject: () => todo });

    const data = await repository.deleteTodo(todo.id);
    expect(todoEntity.findOneAndDelete).toHaveBeenCalledTimes(1);
    expect(todoEntity.findOneAndDelete).toHaveBeenCalledWith({ _id: todo.id });
    expect(data).toStrictEqual(todo);
  });

  it('saving one todoList must call save and return array', async () => {
    const savingValue: TodoList = {
      id: 'string',
      description: 'string',
      name: 'listId',
      todos: [],
    };
    todoListEntity.create = jest
      .fn()
      .mockResolvedValue([{ ...savingValue, toObject: () => savingValue }]);
    const data = await repository.saveTodoList(savingValue);
    expect(todoListEntity.create).toHaveBeenCalledTimes(1);
    expect(todoListEntity.create).toHaveBeenCalledWith([savingValue]);
    expect(data).toStrictEqual([savingValue]);
  });

  it('calling updateTodo with data must call findOneAndUpdate With right parameters', async () => {
    const id = 'string';
    const newDescription = 'newDescription';
    const newName = '222';
    const updateTodoList: Partial<TodoList> = {
      description: newDescription,
      name: newName,
    };
    todoListEntity.findOneAndUpdate = jest.fn().mockResolvedValue({
      id,
      todos: [],
      description: newDescription,
      name: newName,
      toObject: () => ({
        id,
        todos: [],
        description: newDescription,
        name: newName,
      }),
    });
    const result = await repository.updateTodoList(id, updateTodoList);
    expect(result).toStrictEqual({
      id,
      todos: [],
      description: newDescription,
      name: newName,
    });
    expect(todoListEntity.findOneAndUpdate).toHaveBeenCalledTimes(1);
    expect(todoListEntity.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: id },
      { $set: { ...updateTodoList } },
      { new: true },
    );
  });

  it('calling deleteTodoList must call respective methods', async () => {
    const todoList: TodoList = {
      id: 'string',
      description: 'string',
      name: 'listId',
      todos: [
        {
          id: 'id1',
          title: 'titel1',
          priority: 1,
          todoListId: 'string',
        },
        {
          id: 'id2',
          title: 'titel2',
          priority: 1,
          todoListId: 'string',
        },
      ],
    };
    const session = {
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      abortTransaction: jest.fn(),
    };
    databaseConnection.startSession = jest.fn().mockResolvedValue(session);

    todoListEntity.findOneAndDelete = jest
      .fn()
      .mockResolvedValue({ ...todoList, toObject: () => todoList });
    todoEntity.deleteMany = jest.fn();
    const data = await repository.deleteTodoList(todoList.id);
    expect(todoListEntity.findOneAndDelete).toHaveBeenCalledTimes(1);
    expect(todoListEntity.findOneAndDelete).toHaveBeenCalledWith(
      {
        _id: todoList.id,
      },
      { populate: 'todos', session },
    );
    expect(todoEntity.deleteMany).toHaveBeenCalledTimes(1);
    expect(todoEntity.deleteMany).toHaveBeenCalledWith(
      {
        _id: { $in: [todoList?.todos?.map((todo) => todo.id)] },
      },
      { session },
    );
    expect(session.commitTransaction).toHaveBeenCalledTimes(1);
    expect(session.startTransaction).toHaveBeenCalledTimes(1);
    expect(data).toStrictEqual(todoList);
  });
  it('calling deleteTodoList that throws error must call abortTransaction', async () => {
    const todoList: TodoList = {
      id: 'string',
      description: 'string',
      name: 'listId',
      todos: [
        {
          id: 'id1',
          title: 'titel1',
          priority: 1,
          todoListId: 'string',
        },
        {
          id: 'id2',
          title: 'titel2',
          priority: 1,
          todoListId: 'string',
        },
      ],
    };
    const session = {
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      abortTransaction: jest.fn(),
    };
    databaseConnection.startSession = jest.fn().mockResolvedValue(session);

    todoEntity.deleteMany = jest.fn().mockRejectedValue(new Error('message'));

    todoListEntity.findOneAndDelete = jest
      .fn()
      .mockResolvedValue({ ...todoList, toObject: () => todoList });
    await expect(async () => {
      await repository.deleteTodoList(todoList.id);
    }).rejects.toThrow();
    expect(session.abortTransaction).toHaveBeenCalledTimes(1);
  });
});
