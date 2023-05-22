import { BaseDto } from 'apps/api-gate-way/src/common/dto/base.dto';
import { Expose, Type } from 'class-transformer';
import { GetTodoListDto } from './get-todo-list.dto';

export class GetAllTodoListDto extends BaseDto {
  @Expose()
  @Type(() => GetTodoListDto)
  items: GetTodoListDto[];

  constructor(data: Partial<GetAllTodoListDto>) {
    super();
    Object.assign(this, data);
  }
}
