import { BaseDto } from 'apps/api-gate-way/src/common/dto/base.dto';
import { Expose } from 'class-transformer';
import { IsInt, IsString, Min } from 'class-validator';

export class CreateTodoDto extends BaseDto {
  @Expose()
  @IsInt()
  @Min(1)
  priority: number;

  @Expose()
  @IsString()
  title: string;
}
