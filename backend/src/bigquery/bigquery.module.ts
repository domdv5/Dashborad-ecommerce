import { Module } from '@nestjs/common';
import { BigQueryService } from './bigquery.service';

@Module({
  providers: [BigQueryService],
  exports: [BigQueryService],
  controllers: [],
})
export class BigQueryModule {}
