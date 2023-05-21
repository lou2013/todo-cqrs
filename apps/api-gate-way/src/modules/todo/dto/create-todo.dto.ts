import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'apps/api-gate-way/src/common/dto/base.dto';
import { Expose } from 'class-transformer';
import { IsInt, IsMongoId, IsString, Min } from 'class-validator';

export class CreateTodoDto extends BaseDto {
  @Expose()
  @IsInt()
  @Min(1)
  @ApiProperty({ type: Number, example: 1 })
  priority: number;

  @Expose()
  @IsString()
  @ApiProperty({ type: String, example: 'test' })
  title: string;

  @IsMongoId()
  @Expose()
  @ApiProperty({ type: String, example: 'some random mongo id' })
  todoListId: string;
}
