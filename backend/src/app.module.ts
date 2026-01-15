import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BigQueryService } from './bigquery/bigquery.service';
import { BigQueryModule } from './bigquery/bigquery.module';
import { StatsModule } from './stats/stats.module';
import { SimulationModule } from './simulation/simulation.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BigQueryModule,
    StatsModule,
    SimulationModule,
  ],
  controllers: [],
  providers: [BigQueryService],
})
export class AppModule {}
