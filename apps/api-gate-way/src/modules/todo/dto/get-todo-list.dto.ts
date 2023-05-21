import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'apps/api-gate-way/src/common/dto/base.dto';
import { Expose, Type } from 'class-transformer';
import { GetTodoDto } from './get-todo.dto';

export class GetTodoListDto extends BaseDto {
  @Expose()
  @ApiProperty({ type: String, example: '646a92e57b62913ce0ee627c' })
  id: string;

  @Expose()
  @ApiProperty({ type: GetTodoDto })
  @Type(() => GetTodoDto)
  todos: GetTodoDto[];

  @Expose()
  @ApiProperty({ type: String, example: 'test' })
  description: string;

  @Expose()
  @ApiProperty({ type: String, example: 'test' })
  name: string;

  constructor(data: Partial<GetTodoListDto>) {
    super();
    Object.assign(this, data);
  }
}
