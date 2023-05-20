import { FindAllTodoListResult } from './result/find-all-todo-list-result';
import { FindAllTodoResult } from './result/find-all-todo-result';
import { FindPaginateTodoListResult } from './result/find-paginate-todo-list-result';
import { FindPaginateTodoResult } from './result/find-paginate-todo-result';
import { FindTodoByIdResult } from './result/find-todo-by-id-result';
import { FindTodoListByIdResult } from './result/find-todo-list-by-id-result';

export interface TodoQuery {
  findTodoById(id: string): Promise<FindTodoByIdResult>;

  findAllTodo(): Promise<FindAllTodoResult>;

  findPaginatedTodo({}: {
    page: number;
    limit: number;
  }): Promise<FindPaginateTodoResult>;

  findTodoListById(id: string): Promise<FindTodoListByIdResult>;

  findAllTodoList(): Promise<FindAllTodoListResult>;

  findPaginatedTodoList({}: {
    page: number;
    limit: number;
  }): Promise<FindPaginateTodoListResult>;
}
