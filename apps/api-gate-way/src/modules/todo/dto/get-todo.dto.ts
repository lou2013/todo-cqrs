import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'apps/api-gate-way/src/common/dto/base.dto';
import { Expose } from 'class-transformer';

export class GetTodoDto extends BaseDto {
  @Expose()
  @ApiProperty({ type: String, example: '646a92e57b62913ce0ee627c' })
  id: string;

  @Expose()
  @ApiProperty({ type: String, example: '646a92e57b62913ce0ee627c' })
  todoListId: string;

  @Expose()
  @ApiProperty({ type: Number, example: 1 })
  priority: number;

  @Expose()
  @ApiProperty({ type: String, example: 'test' })
  title: string;

  constructor(data: Partial<GetTodoDto>) {
    super();
    Object.assign(this, data);
  }
}
