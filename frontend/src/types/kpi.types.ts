export interface KpiData {
  label: string;
  value: number | string;
  trend?: 'up' | 'down' | 'neutral';
  trendPercentage?: number;
  icon?: string;
  isRealtime?: boolean;
}

export interface RealtimeMetrics {
  lastMinuteSales: number;
  lastMinuteCount: number;
  averageTransactionValue: number;
  topCategory: string;
}
