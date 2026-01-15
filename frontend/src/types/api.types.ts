export interface ForecastData {
  timestamp: {
    value: string
  }
  predicted_sales: number;
  lower_bound: number;
  upper_bound: number;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  details?: Record<string, unknown>;
}
