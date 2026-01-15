import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StatsService } from './stats.service';
import { SalesByCategoryQueryDto } from './dto/sales-by-category.query.dto.ts';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('sales-by-category')
  getSalesByCategory(@Query() query: SalesByCategoryQueryDto) {
    return this.statsService.getSalesByCategory(query);
  }

  @Get('get-forecasted-sales')
  getForecastedSales() {
    return this.statsService.getForecastedSales();
  }
}
