import { Module } from '@nestjs/common';
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
import { TodoServiceControllerImplementation } from './interface/controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTodoListHandler } from './application/command/handler/create-todo-list-command.handler';
import { TodoQueryImplementation } from './infrastructure/query/todo-query-implementation';
import { TodoRepositoryImplementation } from './infrastructure/repository/todo-repository-implementation';
import { CreateTodoHandler } from './application/command/handler/create-todo-command.handler';
import { DeleteTodoHandler } from './application/command/handler/delete-todo-command.handler';
import { FindAllTodoHandler } from './application/query/handler/find-all-todo.handler';
import { UpdateTodoHandler } from './application/command/handler/update-todo-command.handler';
import { FindTodoByIdHandler } from './application/query/handler/find-todo-by-id.handler';
import { DeleteTodoListHandler } from './application/command/handler/delete-todo-list-command.handler';
import { UpdateTodoListHandler } from './application/command/handler/update-todo-list-command.handler';
import { FindAllTodoListHandler } from './application/query/handler/find-all-todo-list.handler';
import { FindPaginateTodoHandler } from './application/query/handler/find-paginate-todo.handler';
import { FindTodoListByIdHandler } from './application/query/handler/find-todo-list-by-id.handler';
import { FindPaginateTodoListHandler } from './application/query/handler/find-paginate-todo-list.handler';
import { MoveTodoCommandHandler } from './application/command/handler/move-todo-command.handler';

const infrastructure = [TodoQueryImplementation, TodoRepositoryImplementation];
const application = [
  CreateTodoListHandler,
  UpdateTodoHandler,
  FindTodoByIdHandler,
  DeleteTodoListHandler,
  UpdateTodoListHandler,
  FindAllTodoListHandler,
  FindPaginateTodoHandler,
  FindTodoListByIdHandler,
  FindPaginateTodoListHandler,
  FindAllTodoHandler,
  CreateTodoHandler,
  DeleteTodoHandler,
  MoveTodoCommandHandler,
];
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
    CqrsModule,
  ],
  controllers: [TodoServiceControllerImplementation],
  providers: [...infrastructure, ...application],
})
export class TodoModule {}
