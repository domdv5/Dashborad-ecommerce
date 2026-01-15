import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { CategorySales, DateRange } from '@/types/sales.types';
import { statsApi } from '@/services/api/stats.api';

export const useSalesStore = defineStore('sales', () => {
  const categorySales = ref<CategorySales[]>([]);
  const dateRange = ref<DateRange>({ from: null, to: null });
  const loading = ref(false);
  const error = ref<string | null>(null);

  const sortedCategorySales = computed(() => {
    return [...categorySales.value].sort((a, b) => b.total_sales - a.total_sales);
  });

  const totalSales = computed(() => {
    return categorySales.value.reduce((sum, cat) => sum + cat.total_sales, 0);
  });

  async function fetchSalesByCategory(range?: DateRange) {
    loading.value = true;
    error.value = null;

    try {
      const params = range || dateRange.value;
      const response = await statsApi.getSalesByCategory(params);
      categorySales.value = response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch sales data';
      error.value = errorMessage;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function setDateRange(range: DateRange) {
    dateRange.value = range;
  }

  function resetStore() {
    categorySales.value = [];
    dateRange.value = { from: null, to: null };
    error.value = null;
  }

  return {
    categorySales,
    dateRange,
    loading,
    error,
    sortedCategorySales,
    totalSales,
    fetchSalesByCategory,
    setDateRange,
    resetStore,
  };
});
