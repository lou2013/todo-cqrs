import { BaseDto } from 'apps/api-gate-way/src/common/dto/base.dto';
import { FindPaginateTodoResult } from 'apps/todo/src/application/query/interface/result/find-paginate-todo-result';
import { Expose, Type } from 'class-transformer';
import { GetTodoDto } from './get-todo.dto';

export class GetPaginateTodoDto extends BaseDto {
  @Expose()
  @Type(() => GetTodoDto)
  items: GetTodoDto[];

  @Expose()
  hasNextPage: boolean;

  @Expose()
  hasPrevPage: boolean;

  @Expose()
  limit: number;

  @Expose()
  page?: number;

  @Expose()
  offset?: number;

  @Expose()
  nextPage?: number;

  @Expose()
  totalDocs?: number;

  @Expose()
  totalPage?: number;

  constructor(props: Partial<FindPaginateTodoResult>) {
    super();
    Object.assign(this, props);
  }
}
