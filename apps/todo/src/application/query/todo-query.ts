import { FindTodoByIdResult } from './find-todo-by-id-result';

export interface TodoQuery {
  findById({}: { id: string }): Promise<FindTodoByIdResult | null>;
  //....
}
