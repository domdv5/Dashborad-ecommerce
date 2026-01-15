import { IsOptional, IsDateString } from 'class-validator';

export class SalesByCategoryQueryDto {
  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;
}
