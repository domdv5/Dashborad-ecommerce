<script setup lang="ts">
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useSalesStore } from '@/stores/sales.store';
import { useSalesChartData } from '@/composables/useChartData';
import BaseLoader from '@/components/common/BaseLoader.vue';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const salesStore = useSalesStore();
const { chartData } = useSalesChartData(computed(() => salesStore.categorySales));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value: number | string) => {
          return typeof value === 'number' ? `$${value.toLocaleString()}` : value;
        },
      },
    },
  },
};
</script>

<template>
  <div class="sales-history-chart">
    <BaseLoader v-if="salesStore.loading" />
    <div v-else-if="salesStore.error" class="sales-history-chart__error">
      Error: {{ salesStore.error }}
    </div>
    <div v-else class="sales-history-chart__container">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style scoped>
.sales-history-chart {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sales-history-chart__container {
  width: 100%;
  height: 400px;
}

.sales-history-chart__error {
  color: var(--color-error);
  text-align: center;
}
</style>
