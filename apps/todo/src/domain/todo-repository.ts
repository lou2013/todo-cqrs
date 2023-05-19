import { Types } from 'mongoose';
import { Todo } from './todo';
import { TodoList } from './todo-list';

export interface TodoRepository {
  newId(): Promise<Types.ObjectId>;

  //- todo
  saveTodo(data: Todo | Todo[]): Promise<Todo | Todo[]>;
  updateTodo(id: string, data: Partial<Todo>): Promise<Todo>;
  moveTodo(id: string, toTodoListId: string): Promise<Todo>;
  deleteTodo(id: string): Promise<Todo>;

  //- todoList

  saveTodoList(data: TodoList | TodoList[]): Promise<TodoList[]>;
  updateTodoList(id: string, data: Partial<TodoList>): Promise<TodoList>;
  deleteTodoList(id: string): Promise<TodoList>;
}
