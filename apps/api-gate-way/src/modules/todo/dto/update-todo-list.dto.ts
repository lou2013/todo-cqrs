import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'apps/api-gate-way/src/common/dto/base.dto';
import { Expose } from 'class-transformer';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateTodoDto extends BaseDto {
  @IsOptional()
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'test' })
  description: string;

  @IsOptional()
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'test' })
  name: string;
}
