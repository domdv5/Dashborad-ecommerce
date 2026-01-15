<script setup lang="ts">
import { computed } from 'vue';
import { useKpiStore } from '@/stores/kpi.store';
import KpiCard from './KpiCard.vue';
import { formatCurrency, formatNumber } from '@/utils/number.utils';

const kpiStore = useKpiStore();

const kpis = computed(() => {
  const metrics = kpiStore.realtimeMetrics;

  return [
    {
      label: 'Ventas Último Minuto',
      value: formatCurrency(metrics.lastMinuteSales),
      isRealtime: true,
    },
    {
      label: 'Cantidad Transacciones Último Minuto',
      value: formatNumber(metrics.lastMinuteCount),
      isRealtime: true,
    },
    {
      label: 'Promedio Valor de Transacción',
      value: formatCurrency(metrics.averageTransactionValue),
      isRealtime: true,
    },
    {
      label: 'Categoría Más Vendida',
      value: metrics.topCategory,
      isRealtime: true,
    },
  ];
});
</script>

<template>
  <div class="kpi-grid">
    <KpiCard
      v-for="(kpi, index) in kpis"
      :key="index"
      :label="kpi.label"
      :value="kpi.value"
      :is-realtime="kpi.isRealtime"
    />
  </div>
</template>

<style scoped>
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

@media (max-width: 768px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }
}
</style>
