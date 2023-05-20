import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { PaginateModel, Connection } from 'mongoose';
import { Todo } from '../../domain/todo';
import { TodoList } from '../../domain/todo-list';
import { TodoRepository } from '../../domain/todo-repository';
import { TodoEntity } from '../entity/todo-entity';
import { TodoListEntity } from '../entity/todo-list-entity';
import * as mongoose from 'mongoose';
import { isArray } from 'class-validator';
import { NotFoundError } from '../../shared/errors/not-found-error';
import { CodeError } from '../../shared/enum/code-error.enum';
import { TodoQueryImplementation } from '../query/todo-query-implementation';
import { TodoQuery } from '../../application/query/interface/todo-query';
@Injectable()
export class TodoRepositoryImplementation implements TodoRepository {
  @InjectModel(TodoEntity.name)
  private readonly todoEntity: PaginateModel<TodoEntity>;

  @InjectModel(TodoListEntity.name)
  private readonly todoListEntity: PaginateModel<TodoListEntity>;

  @Inject(TodoQueryImplementation)
  private readonly todoQueryImplementation: TodoQuery;

  @InjectConnection()
  private readonly databaseConnection: Connection;

  newId(): mongoose.Types.ObjectId {
    return new mongoose.Types.ObjectId();
  }

  async saveTodo(data: Todo | Todo[]): Promise<Todo[]> {
    data = isArray(data) ? data : [data];
    const todos = data.map((d) => new TodoEntity(d));
    const promises = todos.map((t) => t.save());
    return (await Promise.all(promises)).map((t) => t.toObject());
  }

  async updateTodo(
    id: string,
    data: Partial<Omit<Todo, 'todoList'>>,
  ): Promise<Todo> {
    return (
      await this.todoEntity.findOneAndUpdate(
        { _id: id },
        { $set: { ...data } },
        { new: true },
      )
    ).toObject();
  }

  async moveTodo(id: string, toTodoListId: string): Promise<Todo> {
    const todo = await this.todoQueryImplementation.findTodoById(id);
    const session = await this.databaseConnection.startSession({});
    try {
      if (!todo)
        throw new NotFoundError({
          message: 'todo Not found',
          code: CodeError.NOT_FOUND,
        });
      if (todo.todoList) {
        await this.todoListEntity.findOneAndUpdate(
          { _id: todo.todoList },
          { $pull: { todos: todo.id } },
          { session },
        );
      }
      const newTodoList = await this.todoListEntity.findOneAndUpdate(
        { _id: toTodoListId },
        { $addToSet: { todos: todo.id } },
        { session },
      );
      if (!newTodoList)
        throw new NotFoundError({
          message: 'todoList Not found',
          code: CodeError.NOT_FOUND,
        });
      const newTodo = await this.todoEntity.findOneAndUpdate(
        { _id: id },
        { todoList: newTodoList.id },
        { session, new: true },
      );
      await session.commitTransaction();
      return newTodo.toObject();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }

  async deleteTodo(id: string): Promise<Todo> {
    return (await this.todoEntity.findOneAndDelete({ _id: id })).toObject();
  }

  async saveTodoList(data: TodoList | TodoList[]): Promise<TodoList[]> {
    data = isArray(data) ? data : [data];
    const todoLists = data.map((d) => new TodoListEntity(d));
    const promises = todoLists.map((t) => t.save());
    return (await Promise.all(promises)).map((t) => t.toObject());
  }

  async updateTodoList(
    id: string,
    data: Partial<Omit<TodoList, 'todos'>>,
  ): Promise<TodoList> {
    return (
      await this.todoListEntity.findOneAndUpdate(
        { _id: id },
        { $set: { ...data } },
        { new: true },
      )
    ).toObject();
  }

  async deleteTodoList(id: string): Promise<TodoList> {
    return (await this.todoListEntity.findOneAndDelete({ _id: id })).toObject();
  }
}
