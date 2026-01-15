<script setup lang="ts">
import { onMounted } from 'vue';
import { useSalesStore } from '@/stores/sales.store';
import { useForecastStore } from '@/stores/forecast.store';
import { useWebSocket } from '@/composables/useWebSocket';
import DashboardHeader from './DashboardHeader.vue';
import KpiGrid from '@/components/kpi/KpiGrid.vue';
import SalesHistoryChart from '@/components/charts/SalesHistoryChart.vue';
import ForecastChart from '@/components/charts/ForecastChart.vue';
import BaseCard from '@/components/common/BaseCard.vue';
import BaseLoader from '@/components/common/BaseLoader.vue';

const salesStore = useSalesStore();
const forecastStore = useForecastStore();
const { isConnected } = useWebSocket();

onMounted(async () => {
  await Promise.all([salesStore.fetchSalesByCategory(), forecastStore.fetchForecast()]);
});
</script>

<template>
  <div class="dashboard">
    <DashboardHeader />

    <div v-if="salesStore.loading && forecastStore.loading" class="dashboard__loading">
      <BaseLoader size="lg" />
    </div>

    <div v-else class="dashboard__content">
      <section class="dashboard__section">
        <h2 class="dashboard__section-title">
          Metricas en tiempo real
          <span v-if="isConnected" class="dashboard__live-badge">EN VIVO</span>
          <span v-else class="dashboard__disconnected-badge">DESCONECTADO</span>
        </h2>
        <KpiGrid />
      </section>

      <section class="dashboard__section">
        <BaseCard title="Historial de ventas por categoría">
          <SalesHistoryChart />
        </BaseCard>
      </section>

      <section class="dashboard__section">
        <BaseCard title="Pronóstico de ventas (próximos 7 días)">
          <ForecastChart />
        </BaseCard>
      </section>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-xl);
}

.dashboard__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.dashboard__content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.dashboard__section {
  width: 100%;
}

.dashboard__section-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-carbon-black);
  margin-bottom: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.dashboard__live-badge {
  background-color: #ef4444;
  color: white;
  font-size: var(--font-size-xs);
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  animation: pulse 2s infinite;
}

.dashboard__disconnected-badge {
  background-color: var(--color-gray-pearl);
  color: var(--color-carbon-black);
  font-size: var(--font-size-xs);
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@media (max-width: 768px) {
  .dashboard {
    padding: var(--spacing-md);
  }
}
</style>
