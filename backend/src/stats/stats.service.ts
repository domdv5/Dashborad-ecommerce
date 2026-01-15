import { Injectable } from '@nestjs/common';
import { BigQueryService } from '../bigquery/bigquery.service';
import { SalesByCategoryQueryDto } from './dto/sales-by-category.query.dto.ts'

@Injectable()
export class StatsService {
  constructor(private readonly bigQueryService: BigQueryService) {}

  async getSalesByCategory(query: SalesByCategoryQueryDto) {
    const { from, to } = query;

    const whereClauses: string[] = [];
    const params: Record<string, any> = {};

    if (from) {
      whereClauses.push('DATE(timestamp) >= @from');
      params.from = from;
    }

    if (to) {
      whereClauses.push('DATE(timestamp) <= @to');
      params.to = to;
    }

    const whereSql =
      whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const sql = `
      SELECT
        category,
        ROUND(SUM(amount), 2) AS total_sales
      FROM \`ecommerce_analytics.sales\`
      ${whereSql}
      GROUP BY category
      ORDER BY total_sales DESC
    `;

    return this.bigQueryService.runQuery(sql, params);
  }

  async getForecastedSales() {
    const sql = `
    SELECT
      forecast_timestamp AS timestamp,
      ROUND(forecast_value, 2) AS predicted_sales,
      prediction_interval_lower_bound AS lower_bound,
      prediction_interval_upper_bound AS upper_bound
    FROM
      ML.FORECAST(MODEL \`ecommerce_analytics.sales_forecast\`, 
      STRUCT(7 AS horizon, 0.9 AS confidence_level))
  `;

    return this.bigQueryService.runQuery(sql);
  }
}
