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
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  page?: number | undefined;
  offset?: number | undefined;
  nextPage?: number | undefined;
  totalDocs?: number | undefined;
  totalPage?: number | undefined;
}

export interface PaginatedTodoListResponseDto {
  items: TodoList[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  page?: number | undefined;
  offset?: number | undefined;
  nextPage?: number | undefined;
  totalDocs?: number | undefined;
  totalPage?: number | undefined;
}

export interface FindById {
  id: string;
}

export interface Todo {
  id: string;
  title: string;
  priority: number;
  todoListId: string;
}

export interface CreateTodoDto {
  title: string;
  priority: number;
  todoListId: string;
}

export interface UpdateTodoDto {
  id: string;
  title?: string | undefined;
  priority?: number | undefined;
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
  id: string;
  name?: string | undefined;
  description?: string | undefined;
}

export interface DeleteTodoListDto {
  id: string;
}

export interface TodoListAllDto {
  items: TodoList[];
}

export interface MoveTodoDto {
  todoId: string;
  newTodoListId: string;
}

export const TODO_PACKAGE_NAME = "todo";

export interface todosServiceClient {
  /** crud todo */

  findTodoById(request: FindById): Observable<Todo>;

  findAllTodo(request: Empty): Observable<TodoAllDto>;

  createTodo(request: CreateTodoDto): Observable<Empty>;

  updateTodo(request: UpdateTodoDto): Observable<Empty>;

  deleteTodo(request: DeleteTodoDto): Observable<Empty>;

  findPaginatedTodo(request: PaginatedRequestDto): Observable<PaginatedTodoResponseDto>;

  moveTodo(request: MoveTodoDto): Observable<Empty>;

  /** crud TodoList */

  findTodoListById(request: FindById): Observable<TodoList>;

  findAllTodoList(request: Empty): Observable<TodoListAllDto>;

  createTodoList(request: CreateTodoList): Observable<Empty>;

  updateTodoList(request: UpdateTodoList): Observable<Empty>;

  deleteTodoList(request: DeleteTodoListDto): Observable<Empty>;

  findPaginatedTodoList(request: PaginatedRequestDto): Observable<PaginatedTodoListResponseDto>;
}

export interface todosServiceController {
  /** crud todo */

  findTodoById(request: FindById): Promise<Todo> | Observable<Todo> | Todo;

  findAllTodo(request: Empty): Promise<TodoAllDto> | Observable<TodoAllDto> | TodoAllDto;

  createTodo(request: CreateTodoDto): void;

  updateTodo(request: UpdateTodoDto): void;

  deleteTodo(request: DeleteTodoDto): void;

  findPaginatedTodo(
    request: PaginatedRequestDto,
  ): Promise<PaginatedTodoResponseDto> | Observable<PaginatedTodoResponseDto> | PaginatedTodoResponseDto;

  moveTodo(request: MoveTodoDto): void;

  /** crud TodoList */

  findTodoListById(request: FindById): Promise<TodoList> | Observable<TodoList> | TodoList;

  findAllTodoList(request: Empty): Promise<TodoListAllDto> | Observable<TodoListAllDto> | TodoListAllDto;

  createTodoList(request: CreateTodoList): void;

  updateTodoList(request: UpdateTodoList): void;

  deleteTodoList(request: DeleteTodoListDto): void;

  findPaginatedTodoList(
    request: PaginatedRequestDto,
  ): Promise<PaginatedTodoListResponseDto> | Observable<PaginatedTodoListResponseDto> | PaginatedTodoListResponseDto;
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
      "moveTodo",
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
