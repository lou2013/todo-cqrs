import { Types } from 'mongoose';
import { Todo } from './todo';
import { TodoList } from './todo-list';

export interface TodoRepository {
  newId(): Types.ObjectId;

  //- todo
  saveTodo(data: Todo | Todo[]): Promise<Todo | Todo[]>;
  updateTodo(id: string, data: Partial<Todo>): Promise<Todo>;
  deleteTodo(id: string): Promise<Todo>;

  //- todoList

  saveTodoList(data: TodoList | TodoList[]): Promise<TodoList[]>;
  updateTodoList(id: string, data: Partial<TodoList>): Promise<TodoList>;
  deleteTodoList(id: string): Promise<TodoList>;
  addTodoToTodoList(id: string, todoId: string): Promise<TodoList>;
  removeTodoFromTodoList(id: string, todoId: string): Promise<TodoList>;
}
