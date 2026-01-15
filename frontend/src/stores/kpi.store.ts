import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { SaleEvent } from '@/types/sales.types';
import type { RealtimeMetrics } from '@/types/kpi.types';

export const useKpiStore = defineStore('kpi', () => {
  const recentSales = ref<SaleEvent[]>([]);
  const lastMinuteThreshold = 60000;

  const lastMinuteSales = computed(() => {
    const now = Date.now();
    const oneMinuteAgo = now - lastMinuteThreshold;

    return recentSales.value.filter((sale) => {
      const saleTime = new Date(sale.timestamp).getTime();
      return saleTime >= oneMinuteAgo;
    });
  });

  const lastMinuteTotalAmount = computed(() => {
    return lastMinuteSales.value.reduce((sum, sale) => sum + sale.amount, 0);
  });

  const lastMinuteCount = computed(() => {
    return lastMinuteSales.value.length;
  });

  const averageTransactionValue = computed(() => {
    if (lastMinuteCount.value === 0) {
      return 0;
    }
    return lastMinuteTotalAmount.value / lastMinuteCount.value;
  });

  const topCategoryLastMinute = computed(() => {
    const categoryCounts = new Map<string, number>();

    lastMinuteSales.value.forEach((sale) => {
      const currentCount = categoryCounts.get(sale.category) || 0;
      categoryCounts.set(sale.category, currentCount + 1);
    });

    const entries = Array.from(categoryCounts.entries());
    if (entries.length === 0) {
      return 'N/A';
    }

    return entries.reduce((max, current) => {
      return current[1] > max[1] ? current : max;
    })[0];
  });

  const realtimeMetrics = computed<RealtimeMetrics>(() => ({
    lastMinuteSales: lastMinuteTotalAmount.value,
    lastMinuteCount: lastMinuteCount.value,
    averageTransactionValue: averageTransactionValue.value,
    topCategory: topCategoryLastMinute.value,
  }));

  function addSale(sale: SaleEvent) {
    recentSales.value.push(sale);

    const fiveMinutesAgo = Date.now() - 300000;
    recentSales.value = recentSales.value.filter((s) => {
      return new Date(s.timestamp).getTime() >= fiveMinutesAgo;
    });
  }

  function clearSales() {
    recentSales.value = [];
  }

  return {
    recentSales,
    lastMinuteSales,
    lastMinuteTotalAmount,
    lastMinuteCount,
    averageTransactionValue,
    topCategoryLastMinute,
    realtimeMetrics,
    addSale,
    clearSales,
  };
});
