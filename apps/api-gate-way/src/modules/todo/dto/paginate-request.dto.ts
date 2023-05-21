import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'apps/api-gate-way/src/common/dto/base.dto';
import { Expose } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class PaginateRequestDto extends BaseDto {
  @Expose()
  @IsInt()
  @Min(1)
  @Max(100)
  @ApiProperty({ type: Number, example: 3 })
  limit: number;

  @Expose()
  @IsInt()
  @Min(1)
  @ApiProperty({ type: Number, example: 1 })
  page: number;
}
