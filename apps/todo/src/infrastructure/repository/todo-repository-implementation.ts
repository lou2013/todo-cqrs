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
import { TodoQueryImplementation } from '../query/todo-query-implementation';
import { TodoQuery } from '../../domain/todo-query';
import { NotFoundException } from '../../shared/exceptions/not-found.exception';
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
    return (await this.todoEntity.create(data)).map((t) =>
      t.toObject({ getters: true }),
    );
  }

  async updateTodo(
    id: string,
    data: Partial<Omit<Todo, 'todoListId'>>,
  ): Promise<Todo> {
    return (
      await this.todoEntity.findOneAndUpdate(
        { _id: id },
        { $set: { ...data } },
        { new: true },
      )
    )?.toObject({ getters: true });
  }

  async moveTodo(id: string, toTodoListId: string): Promise<Todo> {
    const todo = await this.todoQueryImplementation.findTodoById(id);
    if (!todo)
      throw new NotFoundException({
        message: 'todo Not found',
      });
    const session = await this.databaseConnection.startSession({});
    session.startTransaction({});
    try {
      if (todo.todoListId) {
        await this.todoListEntity.findOneAndUpdate(
          { _id: todo.todoListId },
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
        throw new NotFoundException({
          message: 'todoList Not found',
        });
      const newTodo = await this.todoEntity.findOneAndUpdate(
        { _id: id },
        { todoListId: newTodoList.id },
        { session, new: true },
      );
      await session.commitTransaction();
      return newTodo.toObject({ getters: true });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }

  async deleteTodo(id: string): Promise<Todo> {
    return (await this.todoEntity.findOneAndDelete({ _id: id })).toObject({
      getters: true,
    });
  }

  async saveTodoList(data: TodoList | TodoList[]): Promise<TodoList[]> {
    data = isArray(data) ? data : [data];
    return (await this.todoListEntity.create(data)).map((t) =>
      t.toObject({ getters: true }),
    );
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
    ).toObject({ getters: true });
  }

  async deleteTodoList(id: string): Promise<TodoList> {
    const session = await this.databaseConnection.startSession({});
    session.startTransaction();
    try {
      const todoList = await this.todoListEntity.findOneAndDelete(
        { _id: id },
        { populate: 'todos', session },
      );
      await this.todoEntity.deleteMany(
        {
          _id: { $in: todoList?.todos?.map((todo) => todo.id) },
        },
        { session },
      );
      await session.commitTransaction();
      return todoList?.toObject({ getters: true });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }
}
