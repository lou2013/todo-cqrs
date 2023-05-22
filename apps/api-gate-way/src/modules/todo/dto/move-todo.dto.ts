import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'apps/api-gate-way/src/common/dto/base.dto';
import { Expose } from 'class-transformer';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class MoveTodoDto extends BaseDto {
  @Expose()
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: '646aab7bad91aea9c8f2c6db' })
  newTodoListId: string;
}
