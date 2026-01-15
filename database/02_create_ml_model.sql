CREATE OR REPLACE MODEL `project-e757136e-5b64-48d0-abf.ecommerce_analytics.sales_forecast`
OPTIONS (
  model_type = 'ARIMA_PLUS',
  time_series_timestamp_col = 'date',
  time_series_data_col = 'total_sales'
) AS
SELECT
  DATE(timestamp) AS date,
  SUM(amount) AS total_sales
FROM `project-e757136e-5b64-48d0-abf.ecommerce_analytics.sales`
GROUP BY date
ORDER BY date;
