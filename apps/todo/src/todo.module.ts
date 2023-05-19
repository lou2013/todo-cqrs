import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TodoEntity,
  TodoEntitySchema,
} from './infrastructure/entity/todo-entity';
import {
  TodoListEntity,
  TodoListEntitySchema,
} from './infrastructure/entity/todo-list-entity';
import { ConfigModule } from '@nestjs/config';
import { LoadConfigs } from './shared/configs/loader/loader';
import { MongooseLoaderModule } from './shared/db/mongodb.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [LoadConfigs],
    }),
    MongooseLoaderModule,
    MongooseModule.forFeature([
      { name: TodoEntity.name, schema: TodoEntitySchema },
      { name: TodoListEntity.name, schema: TodoListEntitySchema },
    ]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
