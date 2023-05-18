import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from './BaseEntity';
import { Types, ObjectId } from 'mongoose';
import { Collection } from '../../shared/enum/collection.enum';
import { TodoEntity } from './TodoEntity';
@Schema({ collection: Collection.TodoList })
export class TodoListEntity extends BaseEntity {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: [Types.ObjectId], ref: Collection.TodoList, default: [] })
  todos: ObjectId[] | TodoEntity[];
}

export const TodoListEntitySchema =
  SchemaFactory.createForClass(TodoListEntity);
