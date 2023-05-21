import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'apps/api-gate-way/src/common/dto/base.dto';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoListDto extends BaseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'test' })
  description: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'test' })
  name: string;
}
