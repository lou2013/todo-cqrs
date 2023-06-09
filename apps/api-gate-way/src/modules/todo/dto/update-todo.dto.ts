import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'apps/api-gate-way/src/common/dto/base.dto';
import { Expose } from 'class-transformer';
import { IsInt, IsString, Min, IsOptional } from 'class-validator';

export class UpdateTodoDto extends BaseDto {
  @IsOptional()
  @Expose()
  @IsInt()
  @Min(1)
  @ApiProperty({ type: Number, example: 1 })
  priority: number;

  @IsOptional()
  @Expose()
  @IsString()
  @ApiProperty({ type: String, example: 'test' })
  title: string;
}
