CREATE TABLE `project-e757136e-5b64-48d0-abf.ecommerce_analytics.sales`
(
  transaction_id STRING,
  timestamp TIMESTAMP,
  amount FLOAT64,
  category STRING,
  region STRING,
  user_id STRING
)
PARTITION BY DATE(timestamp)
CLUSTER BY category, region;
