import { Types } from 'mongoose';
import { Todo } from './todo';
export interface TodoList {
  id: string;

  name: string;

  description: string;

  todos: Types.ObjectId[] | Todo[];
}
