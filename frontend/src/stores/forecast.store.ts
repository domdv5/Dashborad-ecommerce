import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ForecastData } from '@/types/api.types';
import { statsApi } from '@/services/api/stats.api';

export const useForecastStore = defineStore('forecast', () => {
  const forecastData = ref<ForecastData[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchForecast() {
    loading.value = true;
    error.value = null;

    try {
      const response = await statsApi.getForecastedSales();
      forecastData.value = response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch forecast data';
      error.value = errorMessage;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function resetStore() {
    forecastData.value = [];
    error.value = null;
  }

  return {
    forecastData,
    loading,
    error,
    fetchForecast,
    resetStore,
  };
});
