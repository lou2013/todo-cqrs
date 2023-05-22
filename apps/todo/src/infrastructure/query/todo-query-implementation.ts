import { Injectable } from '@nestjs/common';
import { TodoQuery } from '../../domain/todo-query';
import { TodoEntity } from '../entity/todo-entity';
import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TodoListEntity } from '../entity/todo-list-entity';
import { FindAllTodoListResult } from '../../application/query/interface/result/find-all-todo-list-result';
import { FindAllTodoResult } from '../../application/query/interface/result/find-all-todo-result';
import { FindPaginateTodoListResult } from '../../application/query/interface/result/find-paginate-todo-list-result';
import { FindPaginateTodoResult } from '../../application/query/interface/result/find-paginate-todo-result';
import { FindTodoByIdResult } from '../../application/query/interface/result/find-todo-by-id-result';
import { FindTodoListByIdResult } from '../../application/query/interface/result/find-todo-list-by-id-result';
import { NotFoundException } from '../../shared/exceptions/not-found.exception';

@Injectable()
export class TodoQueryImplementation implements TodoQuery {
  @InjectModel(TodoEntity.name)
  private readonly todoEntity: PaginateModel<TodoEntity>;

  @InjectModel(TodoListEntity.name)
  private readonly todoListEntity: PaginateModel<TodoListEntity>;

  async findAllTodo(): Promise<FindAllTodoResult> {
    const todos = await this.todoEntity.find(
      {},
      {},
      { sort: { priority: 1, _id: 1 } },
    );

    return new FindAllTodoResult({
      items: todos.map((t) => t.toObject({ getters: true })),
    });
  }

  async findPaginatedTodo({
    limit,
    page,
  }: {
    page: number;
    limit: number;
  }): Promise<FindPaginateTodoResult> {
    const result = await this.todoEntity.paginate(
      {},
      { page, limit, sort: { priority: 1, _id: 1 } },
    );
    return new FindPaginateTodoResult({
      items: result.docs.map((t) => t.toObject({ getters: true })),
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
      limit: result.limit,
      nextPage: result.nextPage,
      offset: result.offset,
      page: result.page,
      totalDocs: result.totalDocs,
      totalPage: result.totalPages,
    });
  }

  async findTodoById(id: string): Promise<FindTodoByIdResult> {
    const todo = await this.todoEntity.findById(id);
    if (!todo)
      throw new NotFoundException({
        message: 'todo not found',
      });
    return new FindTodoByIdResult(todo?.toObject({ getters: true }));
  }

  async findAllTodoList(): Promise<FindAllTodoListResult> {
    const todoLists = await this.todoListEntity.find(
      {},
      {},
      { populate: 'todos' },
    );

    return new FindAllTodoListResult({
      items: todoLists.map((t) => ({
        ...t.toObject({ getters: true }),
        todos: t.todos.map((t) => t.toObject({ getters: true })),
      })),
    });
  }

  async findPaginatedTodoList({
    limit,
    page,
  }: {
    page: number;
    limit: number;
  }): Promise<FindPaginateTodoListResult> {
    const result = await this.todoListEntity.paginate(
      {},
      { page, limit, populate: 'todos' },
    );
    return new FindPaginateTodoListResult({
      items: result.docs.map((t) => ({
        ...t.toObject({ getters: true }),
        todos: t.todos.map((t) => t.toObject({ getters: true })),
      })),
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
      limit: result.limit,
      nextPage: result.nextPage,
      offset: result.offset,
      page: result.page,
      totalDocs: result.totalDocs,
      totalPage: result.totalDocs,
    });
  }

  async findTodoListById(id: string): Promise<FindTodoListByIdResult> {
    const todoList = await this.todoListEntity.findById(
      id,
      {},
      { populate: 'todos' },
    );
    if (!todoList)
      throw new NotFoundException({
        message: 'todoList not found',
      });
    return new FindTodoListByIdResult({
      ...todoList?.toObject({ getters: true }),
      todos: todoList?.todos?.map((t) => t.toObject({ getters: true })),
    });
  }
}
