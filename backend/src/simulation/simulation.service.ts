import { Injectable, OnModuleInit } from '@nestjs/common';
import { SalesGateway } from './sales.gateway'
import { BigQueryService } from '../bigquery/bigquery.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SimulationService implements OnModuleInit {
  constructor(
    private readonly salesGateway: SalesGateway,
    private readonly bigQueryService: BigQueryService,
  ) {}

  onModuleInit() {
    this.loopSimulation();
  }

  private loopSimulation() {

    const delay = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;

    setTimeout(async () => {
      const sale = {
        transaction_id: uuidv4(),
        timestamp: new Date().toISOString(),
        amount: parseFloat((Math.random() * 200).toFixed(2)),
        category: ['Electronics', 'Clothing', 'Home', 'Books'][
          Math.floor(Math.random() * 4)
        ],
        region: ['US-East', 'EU-West', 'APAC', 'LATAM'][Math.floor(Math.random() * 3)],
        user_id: `user_${Math.floor(Math.random() * 100)}`,
      };
      

      // Emision ventas websocket
      this.salesGateway.sendNewSale(sale);

      //insercion en streaming a bigQuery
      try {
        await this.bigQueryService.insertStreaming(sale);
      } catch (err) {
        console.error('Error en streaming a BQ:', err);
      }

      this.loopSimulation();
    }, delay);
  }
}
