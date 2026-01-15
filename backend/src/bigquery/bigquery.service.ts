import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BigQuery } from '@google-cloud/bigquery';

@Injectable()
export class BigQueryService implements OnModuleInit {
  private readonly logger = new Logger(BigQueryService.name);
  private bigquery: BigQuery;

  private readonly datasetId: string;
  private readonly tableId: string;

  constructor(private readonly configService: ConfigService) {
    this.bigquery = new BigQuery({
      projectId: this.configService.get<string>('GCP_PROJECT_ID'),
      keyFilename: this.configService.get<string>('GCP_KEY_FILE'),
    });

    this.datasetId =
      this.configService.get<string>('BIGQUERY_DATASET') ??
      'ecommerce_analytics';

    this.tableId =
      this.configService.get<string>('BIGQUERY_SALES_TABLE') ?? 'sales';
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.bigquery.getDatasets({ maxResults: 1 });

      this.logger.log(
        `Connected to BigQuery (project: ${this.configService.get<string>(
          'GCP_PROJECT_ID',
        )})`,
      );
    } catch (error) {
      this.logger.error(
        'Failed to connect to BigQuery',
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }

  async runQuery<T extends Record<string, any> = Record<string, any>>(
    query: string,
    params?: Record<string, any>,
  ): Promise<T[]> {
    const options = {
      query,
      params,
      location: this.configService.get<string>('BIGQUERY_LOCATION') || 'US',
    };

    const [job] = await this.bigquery.createQueryJob(options);
    const [rows] = await job.getQueryResults();

    return rows as T[];
  }

  
  async insertStreaming(row: Record<string, any>): Promise<void> {
    try {
      await this.bigquery
        .dataset(this.datasetId)
        .table(this.tableId)
        .insert(row);

      this.logger.debug('Streaming insert into BigQuery successful');
    } catch (error) {
      this.logger.error(
        'Error during BigQuery streaming insert',
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }
}
