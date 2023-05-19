import { Injectable } from '@nestjs/common';
import { TodoQuery } from '../../application/query/todo-query';
import { TodoEntity } from '../entity/TodoEntity';
import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FindTodoByIdResult } from '../../application/query/find-todo-by-id-result';
import { FindAllTodoResult } from '../../application/query/find-all-todo-result';
import { FindPaginateTodoResult } from '../../application/query/find-paginate-todo-result';
import { TodoListEntity } from '../entity/TodoListEntity';
import { FindAllTodoListResult } from '../../application/query/find-all-todo-list-result';
import { FindPaginateTodoListResult } from '../../application/query/find-paginate-todo-list-result';
import { FindTodoListByIdResult } from '../../application/query/find-todo-list-by-id';

@Injectable()
export class TodoQueryImplementation implements TodoQuery {
  @InjectModel(TodoEntity.name)
  private readonly todoEntity: PaginateModel<TodoEntity>;

  @InjectModel(TodoListEntity.name)
  private readonly todoListEntity: PaginateModel<TodoListEntity>;

  async findAllTodo(): Promise<FindAllTodoResult> {
    const todos = await this.todoEntity.find();

    return new FindAllTodoResult({ items: todos.map((t) => t.toObject()) });
  }

  async findPaginatedTodo({
    limit,
    page,
  }: {
    page: number;
    limit: number;
  }): Promise<FindPaginateTodoResult> {
    const result = await this.todoEntity.paginate({}, { page, limit });
    return new FindPaginateTodoResult({
      items: result.docs.map((t) => t.toObject()),
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

  async findTodoById(id: string): Promise<FindTodoByIdResult> {
    const todo = await this.todoEntity.findById(id);
    return new FindTodoByIdResult(todo.toObject());
  }

  async findAllTodoList(): Promise<FindAllTodoListResult> {
    const todoLists = await this.todoListEntity.find(
      {},
      {},
      { populate: 'todos' },
    );

    return new FindAllTodoListResult({
      items: todoLists.map((t) => ({
        ...t.toObject(),
        todos: t.todos.map((t) => t.toObject()),
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
        ...t.toObject(),
        todos: t.todos.map((t) => t.toObject()),
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
    const todoList = await this.todoListEntity.findById(id);
    return new FindTodoListByIdResult({
      ...todoList.toObject(),
      todos: todoList.todos.map((t) => t.toObject()),
    });
  }
}
