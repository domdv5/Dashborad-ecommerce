import { Module } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { SalesGateway } from './sales.gateway';
import { BigQueryModule } from 'src/bigquery/bigquery.module';

@Module({
  imports: [BigQueryModule],
  providers: [SimulationService, SalesGateway],
})
export class SimulationModule {}
