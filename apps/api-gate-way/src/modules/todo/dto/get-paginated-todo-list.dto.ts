import { BaseDto } from 'apps/api-gate-way/src/common/dto/base.dto';
import { Expose, Type } from 'class-transformer';
import { GetTodoListDto } from './get-todo-list.dto';

export class GetPaginatedTodoListDto extends BaseDto {
  @Expose()
  @Type(() => GetTodoListDto)
  items: GetTodoListDto[];

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

  constructor(props: Partial<GetPaginatedTodoListDto>) {
    super();
    Object.assign(this, props);
  }
}
