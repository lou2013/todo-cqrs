import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from './BaseEntity';
import { Types, ObjectId } from 'mongoose';
import { Collection } from '../../shared/enum/collection.enum';
import { TodoListEntity } from './TodoListEntity';
@Schema({ collection: Collection.Todo })
export class TodoEntity extends BaseEntity {
  @Prop({ type: Number })
  priority: number;

  @Prop({ type: String })
  title: string;

  @Prop({ type: Types.ObjectId, ref: Collection.TodoList })
  todoList: ObjectId | TodoListEntity;
}

export const TodoEntitySchema = SchemaFactory.createForClass(TodoEntity);
