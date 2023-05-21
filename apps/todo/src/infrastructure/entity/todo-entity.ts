import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from './base-entity';
import { Types } from 'mongoose';
import { Collection } from '../../shared/enum/collection.enum';
import { TodoListEntity } from './todo-list-entity';
@Schema({ collection: Collection.Todo })
export class TodoEntity extends BaseEntity {
  @Prop({ type: Number })
  priority: number;

  @Prop({ type: String })
  title: string;

  @Prop({ type: Types.ObjectId, ref: Collection.TodoList })
  todoListId: Types.ObjectId | TodoListEntity;
}

export const TodoEntitySchema = SchemaFactory.createForClass(TodoEntity);
