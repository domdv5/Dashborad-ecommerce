<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { useForecastStore } from '@/stores/forecast.store';
import { useForecastChartData } from '@/composables/useChartData';
import BaseLoader from '@/components/common/BaseLoader.vue';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const forecastStore = useForecastStore();
const { chartData } = useForecastChartData(computed(() => forecastStore.forecastData));

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
  <div class="forecast-chart">
    <BaseLoader v-if="forecastStore.loading" />
    <div v-else-if="forecastStore.error" class="forecast-chart__error">
      Error: {{ forecastStore.error }}
    </div>
    <div v-else class="forecast-chart__container">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style scoped>
.forecast-chart {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.forecast-chart__container {
  width: 100%;
  height: 400px;
}

.forecast-chart__error {
  color: var(--color-error);
  text-align: center;
}
</style>
