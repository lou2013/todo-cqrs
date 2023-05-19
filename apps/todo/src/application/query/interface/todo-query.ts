import { FindAllTodoListResult } from '../find-all-todo-list-result';
import { FindAllTodoResult } from '../find-all-todo-result';
import { FindPaginateTodoListResult } from '../find-paginate-todo-list-result';
import { FindPaginateTodoResult } from '../find-paginate-todo-result';
import { FindTodoByIdResult } from '../find-todo-by-id-result';
import { FindTodoListByIdResult } from '../find-todo-list-by-id';

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
