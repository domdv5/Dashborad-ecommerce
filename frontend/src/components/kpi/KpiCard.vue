<script setup lang="ts">
import { computed } from 'vue';
import RealtimeIndicator from './RealtimeIndicator.vue';

const props = defineProps<{
  label: string;
  value: number | string;
  trend?: 'up' | 'down' | 'neutral';
  trendPercentage?: number;
  isRealtime?: boolean;
}>();

const trendIcon = computed(() => {
  const trendMap = {
    up: '↑',
    down: '↓',
    neutral: '→',
  };
  return props.trend ? trendMap[props.trend] : '';
});

const trendColor = computed(() => {
  const colorMap = {
    up: 'var(--color-success)',
    down: 'var(--color-error)',
    neutral: 'var(--color-gray-pearl)',
  };
  return props.trend ? colorMap[props.trend] : '';
});
</script>

<template>
  <div class="kpi-card">
    <div class="kpi-card__header">
      <h3 class="kpi-card__label">{{ label }}</h3>
      <RealtimeIndicator v-if="isRealtime" />
    </div>

    <div class="kpi-card__value">
      {{ value }}
    </div>

    <div
      v-if="trend && trendPercentage !== undefined"
      class="kpi-card__trend"
      :style="{ color: trendColor }"
    >
      <span class="kpi-card__trend-icon">{{ trendIcon }}</span>
      <span class="kpi-card__trend-percentage"> {{ trendPercentage }}% </span>
    </div>
  </div>
</template>

<style scoped>
.kpi-card {
  background-color: var(--color-white-broken);
  border: 1px solid var(--color-gray-pearl);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  transition: box-shadow var(--transition-base);
}

.kpi-card:hover {
  box-shadow: var(--shadow-md);
}

.kpi-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.kpi-card__label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-carbon-black);
  margin: 0;
}

.kpi-card__value {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-carbon-black);
  margin-bottom: var(--spacing-sm);
}

.kpi-card__trend {
  display: flex;
  align-items: center;
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.kpi-card__trend-icon {
  margin-right: var(--spacing-xs);
}
</style>
