import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { Empty } from 'lib/proto/todo/google/protobuf/empty.pb';
import {
  CreateTodoDto,
  CreateTodoList,
  DeleteTodoDto,
  DeleteTodoListDto,
  FindById,
  MoveTodoDto,
  PaginatedRequestDto,
  PaginatedTodoListResponseDto,
  PaginatedTodoResponseDto,
  Todo,
  TodoAllDto,
  TodoList,
  TodoListAllDto,
  todosServiceController,
  TODOS_SERVICE_NAME,
  UpdateTodoDto,
  UpdateTodoList,
} from 'lib/proto/todo/todo.pb';
import { CreateTodoCommand } from '../application/command/interfaces/create-todo-command';
import { CreateTodoListCommand } from '../application/command/interfaces/create-todo-list-command';
import { DeleteTodoCommand } from '../application/command/interfaces/delete-todo-command';
import { DeleteTodoListCommand } from '../application/command/interfaces/delete-todo-list-command';
import { MoveTodoCommand } from '../application/command/interfaces/move-todo-command';
import { UpdateTodoCommand } from '../application/command/interfaces/update-todo-command';
import { UpdateTodoListCommand } from '../application/command/interfaces/update-todo-list-command';
import { FindAllTodoListQuery } from '../application/query/interface/find-all-todo-list.query';
import { FindAllTodoQuery } from '../application/query/interface/find-all-todo.query';
import { FindPaginateTodoListQuery } from '../application/query/interface/find-paginate-todo-list.query';
import { FindPaginateTodoQuery } from '../application/query/interface/find-paginate-todo.query';
import { FindTodoByIdQuery } from '../application/query/interface/find-todo-by-id.query';
import { FindTodoListByIdQuery } from '../application/query/interface/find-todo-list-by-id.query';

@Controller()
export class TodoServiceControllerImplementation
  implements todosServiceController
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  // @GrpcMethod(TODOS_SERVICE_NAME, 'moveTodo')
  async moveTodo(request: MoveTodoDto): Promise<void> {
    await this.commandBus.execute(
      new MoveTodoCommand(request.todoId, request.newTodoListId),
    );
  }

  @GrpcMethod(TODOS_SERVICE_NAME, 'findTodoById')
  async findTodoById(request: FindById): Promise<Todo> {
    return await this.queryBus.execute(new FindTodoByIdQuery(request.id));
  }

  @GrpcMethod(TODOS_SERVICE_NAME, 'findAllTodo')
  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  async findAllTodo(request: Empty): Promise<TodoAllDto> {
    return await this.queryBus.execute(new FindAllTodoQuery());
  }

  @GrpcMethod(TODOS_SERVICE_NAME, 'createTodo')
  async createTodo(request: CreateTodoDto): Promise<void> {
    return await this.commandBus.execute(
      new CreateTodoCommand(
        request.priority,
        request.title,
        request.todoListId,
      ),
    );
  }

  @GrpcMethod(TODOS_SERVICE_NAME, 'updateTodo')
  async updateTodo(request: UpdateTodoDto): Promise<void> {
    return await this.commandBus.execute(
      new UpdateTodoCommand(request.id, request.priority, request.title),
    );
  }

  @GrpcMethod(TODOS_SERVICE_NAME, 'deleteTodo')
  async deleteTodo(request: DeleteTodoDto): Promise<void> {
    return await this.commandBus.execute(new DeleteTodoCommand(request.id));
  }

  @GrpcMethod(TODOS_SERVICE_NAME, 'findPaginatedTodo')
  async findPaginatedTodo(
    request: PaginatedRequestDto,
  ): Promise<PaginatedTodoResponseDto> {
    return await this.queryBus.execute(
      new FindPaginateTodoQuery(request.page, request.limit),
    );
  }

  @GrpcMethod(TODOS_SERVICE_NAME, 'findTodoListById')
  async findTodoListById(request: FindById): Promise<TodoList> {
    return await this.queryBus.execute(new FindTodoListByIdQuery(request.id));
  }

  @GrpcMethod(TODOS_SERVICE_NAME, 'findAllTodoList')
  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  async findAllTodoList(request: Empty): Promise<TodoListAllDto> {
    return await this.queryBus.execute(new FindAllTodoListQuery());
  }

  @GrpcMethod(TODOS_SERVICE_NAME, 'createTodoList')
  async createTodoList(request: CreateTodoList): Promise<void> {
    return await this.commandBus.execute(
      new CreateTodoListCommand(request.description, request.name),
    );
  }

  @GrpcMethod(TODOS_SERVICE_NAME, 'updateTodoList')
  async updateTodoList(request: UpdateTodoList): Promise<void> {
    return await this.commandBus.execute(
      new UpdateTodoListCommand(request.id, request.name, request.description),
    );
  }

  @GrpcMethod(TODOS_SERVICE_NAME, 'deleteTodoList')
  async deleteTodoList(request: DeleteTodoListDto): Promise<void> {
    return await this.commandBus.execute(new DeleteTodoListCommand(request.id));
  }

  @GrpcMethod(TODOS_SERVICE_NAME, 'findPaginatedTodoList')
  async findPaginatedTodoList(
    request: PaginatedRequestDto,
  ): Promise<PaginatedTodoListResponseDto> {
    return await this.queryBus.execute(
      new FindPaginateTodoListQuery(request.page, request.limit),
    );
  }
}
