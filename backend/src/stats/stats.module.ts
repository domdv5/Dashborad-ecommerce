import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { BigQueryModule } from 'src/bigquery/bigquery.module';

@Module({
  imports:[BigQueryModule],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
