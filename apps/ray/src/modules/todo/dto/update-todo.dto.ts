import { BaseDto } from 'apps/ray/src/common/dto/base.dto';
import { Expose } from 'class-transformer';
import { IsInt, IsString, Min, IsOptional } from 'class-validator';

export class UpdateTodoDto extends BaseDto {
  @IsOptional()
  @Expose()
  @IsInt()
  @Min(1)
  priority: number;

  @IsOptional()
  @Expose()
  @IsString()
  title: string;
}
