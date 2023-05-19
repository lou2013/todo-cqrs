import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { Empty } from 'apps/todo/proto/google/protobuf/empty.pb';
import {
  CreateTodoDto,
  CreateTodoList,
  DeleteTodoDto,
  DeleteTodoListDto,
  FindById,
  PaginatedRequestDto,
  PaginatedTodoResponseDto,
  Todo,
  TodoAllDto,
  TodoList,
  TodoListAllDto,
  todosServiceController,
  TODOS_SERVICE_NAME,
  UpdateTodoDto,
  UpdateTodoList,
} from 'apps/todo/proto/todo.pb';
import { Observable } from 'rxjs';

@Controller()
export class TodoServiceControllerImplementation
  implements todosServiceController
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod(TODOS_SERVICE_NAME, 'findTodoById')
  findTodoById(request: FindById): Todo | Observable<Todo> | Promise<Todo> {
    throw new Error('Method not implemented.');
  }

  @GrpcMethod(TODOS_SERVICE_NAME, 'findAllTodo')
  findAllTodo(
    request: Empty,
  ): TodoAllDto | Observable<TodoAllDto> | Promise<TodoAllDto> {
    throw new Error('Method not implemented.');
  }

  @GrpcMethod(TODOS_SERVICE_NAME, 'createTodo')
  createTodo(request: CreateTodoDto): Todo | Observable<Todo> | Promise<Todo> {
    throw new Error('Method not implemented.');
  }

  @GrpcMethod(TODOS_SERVICE_NAME, 'updateTodo')
  updateTodo(request: UpdateTodoDto): Todo | Observable<Todo> | Promise<Todo> {
    throw new Error('Method not implemented.');
  }

  @GrpcMethod(TODOS_SERVICE_NAME, 'deleteTodo')
  deleteTodo(request: DeleteTodoDto): Todo | Observable<Todo> | Promise<Todo> {
    throw new Error('Method not implemented.');
  }

  @GrpcMethod(TODOS_SERVICE_NAME, 'findPaginatedTodo')
  findPaginatedTodo(
    request: PaginatedRequestDto,
  ):
    | PaginatedTodoResponseDto
    | Observable<PaginatedTodoResponseDto>
    | Promise<PaginatedTodoResponseDto> {
    throw new Error('Method not implemented.');
  }

  @GrpcMethod(TODOS_SERVICE_NAME, 'findTodoListById')
  findTodoListById(
    request: FindById,
  ): TodoList | Observable<TodoList> | Promise<TodoList> {
    throw new Error('Method not implemented.');
  }

  @GrpcMethod(TODOS_SERVICE_NAME, 'findAllTodoList')
  findAllTodoList(
    request: Empty,
  ): TodoListAllDto | Observable<TodoListAllDto> | Promise<TodoListAllDto> {
    throw new Error('Method not implemented.');
  }

  @GrpcMethod(TODOS_SERVICE_NAME, 'createTodoList')
  createTodoList(
    request: CreateTodoList,
  ): TodoList | Observable<TodoList> | Promise<TodoList> {
    throw new Error('Method not implemented.');
  }

  @GrpcMethod(TODOS_SERVICE_NAME, 'updateTodoList')
  updateTodoList(
    request: UpdateTodoList,
  ): TodoList | Observable<TodoList> | Promise<TodoList> {
    throw new Error('Method not implemented.');
  }

  @GrpcMethod(TODOS_SERVICE_NAME, 'deleteTodoList')
  deleteTodoList(
    request: DeleteTodoListDto,
  ): TodoList | Observable<TodoList> | Promise<TodoList> {
    throw new Error('Method not implemented.');
  }

  @GrpcMethod(TODOS_SERVICE_NAME, 'findPaginatedTodoList')
  findPaginatedTodoList(
    request: PaginatedRequestDto,
  ): TodoList | Observable<TodoList> | Promise<TodoList> {
    throw new Error('Method not implemented.');
  }
}
