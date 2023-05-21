import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from './base-entity';
import { Types } from 'mongoose';
import { Collection } from '../../shared/enum/collection.enum';
import { TodoEntity } from './todo-entity';
@Schema({ collection: Collection.TodoList })
export class TodoListEntity extends BaseEntity {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: [Types.ObjectId], ref: Collection.Todo, default: [] })
  todos: Types.ObjectId[] | TodoEntity[];
}

export const TodoListEntitySchema =
  SchemaFactory.createForClass(TodoListEntity);
