import { apiClient } from './client';
import type { DateRange, CategorySales } from '@/types/sales.types';
import type { ForecastData, ApiResponse } from '@/types/api.types';

export const statsApi = {
  async getSalesByCategory(range: DateRange): Promise<ApiResponse<CategorySales[]>> {
    const params: Record<string, string> = {};

    if (range.from) {
      params.from = range.from;
    }
    if (range.to) {
      params.to = range.to;
    }

    const response = await apiClient.get<CategorySales[]>('/stats/sales-by-category', {
      params,
    });
    return {
      data: response.data,
      status: response.status,
    };
  },

  async getForecastedSales(): Promise<ApiResponse<ForecastData[]>> {
    const response = await apiClient.get<ForecastData[]>('/stats/get-forecasted-sales');
    return {
      data: response.data,
      status: response.status,
    };
  },
};
