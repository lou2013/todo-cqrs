/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Empty } from "./google/protobuf/empty.pb";

export const protobufPackage = "todo";

export interface PaginatedRequestDto {
  limit: number;
  page: number;
}

export interface PaginatedTodoResponseDto {
  items: Todo[];
}

export interface FindById {
  id: string;
}

export interface Todo {
  id: string;
  title: string;
  priority: number;
}

export interface CreateTodoDto {
  title: string;
  priority: string;
  todoListId: string;
}

export interface UpdateTodoDto {
  id: string;
  title: string;
  priority: string;
  todoListId: string;
}

export interface DeleteTodoDto {
  id: string;
}

export interface TodoAllDto {
  items: Todo[];
}

export interface TodoList {
  id: string;
  name: string;
  description: string;
  todos: Todo[];
}

export interface CreateTodoList {
  name: string;
  description: string;
}

export interface UpdateTodoList {
  name: string;
  description: string;
}

export interface DeleteTodoListDto {
  id: string;
}

export interface TodoListAllDto {
  items: TodoList[];
}

export const TODO_PACKAGE_NAME = "todo";

export interface todosServiceClient {
  /** crud todo */

  findTodoById(request: FindById): Observable<Todo>;

  findAllTodo(request: Empty): Observable<TodoAllDto>;

  createTodo(request: CreateTodoDto): Observable<Todo>;

  updateTodo(request: UpdateTodoDto): Observable<Todo>;

  deleteTodo(request: DeleteTodoDto): Observable<Todo>;

  findPaginatedTodo(request: PaginatedRequestDto): Observable<PaginatedTodoResponseDto>;

  findTodoListById(request: FindById): Observable<TodoList>;

  findAllTodoList(request: Empty): Observable<TodoListAllDto>;

  createTodoList(request: CreateTodoList): Observable<TodoList>;

  updateTodoList(request: UpdateTodoList): Observable<TodoList>;

  deleteTodoList(request: DeleteTodoListDto): Observable<TodoList>;

  findPaginatedTodoList(request: PaginatedRequestDto): Observable<TodoList>;
}

export interface todosServiceController {
  /** crud todo */

  findTodoById(request: FindById): Promise<Todo> | Observable<Todo> | Todo;

  findAllTodo(request: Empty): Promise<TodoAllDto> | Observable<TodoAllDto> | TodoAllDto;

  createTodo(request: CreateTodoDto): Promise<Todo> | Observable<Todo> | Todo;

  updateTodo(request: UpdateTodoDto): Promise<Todo> | Observable<Todo> | Todo;

  deleteTodo(request: DeleteTodoDto): Promise<Todo> | Observable<Todo> | Todo;

  findPaginatedTodo(
    request: PaginatedRequestDto,
  ): Promise<PaginatedTodoResponseDto> | Observable<PaginatedTodoResponseDto> | PaginatedTodoResponseDto;

  findTodoListById(request: FindById): Promise<TodoList> | Observable<TodoList> | TodoList;

  findAllTodoList(request: Empty): Promise<TodoListAllDto> | Observable<TodoListAllDto> | TodoListAllDto;

  createTodoList(request: CreateTodoList): Promise<TodoList> | Observable<TodoList> | TodoList;

  updateTodoList(request: UpdateTodoList): Promise<TodoList> | Observable<TodoList> | TodoList;

  deleteTodoList(request: DeleteTodoListDto): Promise<TodoList> | Observable<TodoList> | TodoList;

  findPaginatedTodoList(request: PaginatedRequestDto): Promise<TodoList> | Observable<TodoList> | TodoList;
}

export function todosServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "findTodoById",
      "findAllTodo",
      "createTodo",
      "updateTodo",
      "deleteTodo",
      "findPaginatedTodo",
      "findTodoListById",
      "findAllTodoList",
      "createTodoList",
      "updateTodoList",
      "deleteTodoList",
      "findPaginatedTodoList",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("todosService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("todosService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TODOS_SERVICE_NAME = "todosService";
