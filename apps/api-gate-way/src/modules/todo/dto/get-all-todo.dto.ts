import { BaseDto } from 'apps/api-gate-way/src/common/dto/base.dto';
import { Expose, Type } from 'class-transformer';
import { GetTodoDto } from './get-todo.dto';

export class GetAllTodoDto extends BaseDto {
  @Expose()
  @Type(() => GetTodoDto)
  items: GetTodoDto[];

  constructor(data: Partial<GetAllTodoDto>) {
    super();
    Object.assign(this, data);
  }
}
