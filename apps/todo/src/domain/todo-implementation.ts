import { AggregateRoot } from '@nestjs/cqrs';
import { Todo } from './Todo';

export class TodoImplementation extends AggregateRoot implements Todo {
  //uses repo then commits?!
  move(): void {
    throw new Error('Method not implemented.');
  }
  delete(): void {
    throw new Error('Method not implemented.');
  }
  update(): void {
    throw new Error('Method not implemented.');
  }
}
