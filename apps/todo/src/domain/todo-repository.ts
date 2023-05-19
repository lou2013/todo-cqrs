import { ObjectId } from 'mongoose';
import { Todo } from './todo';
export interface TodoRepository {
  findById(id: string): Promise<Todo>;
  findAll(): Promise<Todo[]>;
  save(todo: Todo | Todo[]): Promise<void>;
  newId(): Promise<ObjectId>;
}
