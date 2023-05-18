import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TodoEntity,
  TodoEntitySchema,
} from './infrastructure/entity/TodoEntity';
import {
  TodoListEntity,
  TodoListEntitySchema,
} from './infrastructure/entity/TodoListEntity';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TodoEntity.name, schema: TodoEntitySchema },
      { name: TodoListEntity.name, schema: TodoListEntitySchema },
    ]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
